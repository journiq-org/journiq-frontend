


"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { listDestinations } from "@/redux/slices/destinationSlice";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Calendar, ImageIcon, X, Upload, FileImage, ArrowLeft, Save, Tag, MapPin, IndianRupee } from "lucide-react";
import { createTour } from "@/redux/slices/tourSlice";
import GuideNavbar from "@/components/GuideNavbar";

interface Destination {
  _id: string;
  name: string;
}

// Validation Schema
const schema = yup.object({
  title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
  description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
  duration: yup.number().typeError("Duration must be a number").required("Duration is required").positive("Duration must be greater than 0"),
  destination: yup.string().required("Destination is required"),
  category: yup.string().required("Category is required"),

  itinerary: yup.array()
    .of(yup.string().trim().required("Itinerary item is required"))
    .min(1, "At least one itinerary item is required")
    .required(),

  highlights: yup.array()
    .of(yup.string().trim())
    .compact((val) => !val || val.length === 0)
    .min(1, "Please add at least one highlight")
    .required(),

  included: yup.array()
    .of(yup.string().trim())
    .compact((val) => !val || val.length === 0)
    .min(1, "Please add at least one included item")
    .required(),

  excluded: yup.array()
    .of(yup.string().trim())
    .compact((val) => !val || val.length === 0)
    .min(1, "Please add at least one excluded item")
    .required(),

  price: yup.number().typeError("Price must be a number").required("Price is required").positive("Price must be greater than 0"),

  availability: yup.array().of(
    yup.object({
      date: yup.string().required("Date is required"),
      slots: yup.number().required("Slots is required").integer("Slots must be an integer").min(1, "At least 1 slot required"),
    })
  ).min(1, "At least one availability slot is required").required(),

  images: yup.array().of(
    yup.mixed<File>()
      .required("File is required")
      .test("fileType", "Only jpg, jpeg or png files are allowed", (file) =>
        file ? ["image/jpeg", "image/png"].includes(file.type) : false
      )
  ).min(1, "Please upload at least one image").required(),

  meetingPoint: yup.string().required("Meeting point is required").min(3, "Meeting point must be at least 3 characters"),
});

// Use the inferred type directly to avoid type mismatches
type TourFormData = yup.InferType<typeof schema>;

const AddTourPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { destinations } = useSelector((state: any) => state.destination);

  // State for dynamic arrays
  const [itinerary, setItinerary] = useState<string[]>([""]);
  const [highlights, setHighlights] = useState<string[]>([""]);
  const [included, setIncluded] = useState<string[]>([""]);
  const [excluded, setExcluded] = useState<string[]>([""]);

  // State for image upload
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Fetch destinations on component mount
  const [page, setPage] = useState(1);
  const limit = 20;
  const skip = (page - 1) * limit;

  useEffect(() => {
    dispatch(listDestinations({ skip, limit }));
  }, [dispatch, page]);

  // Form setup
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TourFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      duration: 1,
      destination: "",
      category: "",
      price: 1,
      meetingPoint: "",
      itinerary: itinerary,
      highlights: highlights,
      included: included,
      excluded: excluded,
      availability: [{ date: "", slots: 1 }],
      images: [],
    }
  });

  // useFieldArray for availability
  const { fields: availabilityFields, append: appendAvailability, remove: removeAvailability } = useFieldArray({
    control,
    name: "availability",
  });

  // Watch category for Select component
  const categoryValue = watch("category") || "Others";

  // Helper functions for dynamic arrays
  const addItem = (array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>) => {
    setArray([...array, ""]);
  };

  const removeItem = (index: number, array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (array.length > 1) {
      const newArray = array.filter((_, i) => i !== index);
      setArray(newArray);
      // Update form value
      const fieldName = array === itinerary ? "itinerary" :
                       array === highlights ? "highlights" :
                       array === included ? "included" : "excluded";
      setValue(fieldName as any, newArray);
    }
  };

  const updateItem = (index: number, value: string, array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>) => {
    const newArray = [...array];
    newArray[index] = value;
    setArray(newArray);
    // Update form value
    const fieldName = array === itinerary ? "itinerary" :
                     array === highlights ? "highlights" :
                     array === included ? "included" : "excluded";
    setValue(fieldName as any, newArray);
  };

  // Enhanced image handling functions
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      const validImages = newImages.filter(file => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
          toast.error(`${file.name} is not a valid image file`);
          return false;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          toast.error(`${file.name} is too large (max 5MB)`);
          return false;
        }
        return true;
      });

      const totalImages = selectedImages.length + validImages.length;
      if (totalImages > 10) {
        toast.error("Maximum 10 images allowed");
        return;
      }

      setSelectedImages(prev => [...prev, ...validImages]);
      setValue("images", [...selectedImages, ...validImages]);
    }
  };

  const removeSelectedImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setValue("images", newImages);
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter(file => file.type.startsWith('image/'));

      if (imageFiles.length !== files.length) {
        toast.error("Only image files are allowed");
      }

      const totalImages = selectedImages.length + imageFiles.length;
      if (totalImages > 10) {
        toast.error("Maximum 10 images allowed");
        return;
      }

      setSelectedImages(prev => [...prev, ...imageFiles]);
      setValue("images", [...selectedImages, ...imageFiles]);
    }
  };

  const clearAllImages = () => {
    setSelectedImages([]);
    setValue("images", []);
  };

  // Form submission handler - FIXED to send JSON strings as expected by backend
  const onSubmit = async (data: TourFormData) => {
    console.log(" onSubmit triggered with data:", data);

    const formData = new FormData();

    // Basic fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("duration", String(data.duration));
    formData.append("destination", data.destination);
    formData.append("category", data.category);
    formData.append("price", String(data.price));
    formData.append("meetingPoint", data.meetingPoint);

    // Arrays - send as JSON strings to match backend expectations
    formData.append("itinerary", JSON.stringify(data.itinerary));

    // Filter out undefined values and send as JSON strings
    const filteredHighlights = data.highlights?.filter((item): item is string => item !== undefined && item.trim() !== "") || [];
    const filteredIncluded = data.included?.filter((item): item is string => item !== undefined && item.trim() !== "") || [];
    const filteredExcluded = data.excluded?.filter((item): item is string => item !== undefined && item.trim() !== "") || [];

    formData.append("highlights", JSON.stringify(filteredHighlights));
    formData.append("included", JSON.stringify(filteredIncluded));
    formData.append("excluded", JSON.stringify(filteredExcluded));

    // Availability - send as JSON string
    formData.append("availability", JSON.stringify(data.availability));

    // Images
    data.images.forEach((file) => {
      if (file) {
        formData.append("images", file);
      }
    });

    // Debug: Log what we're sending
    console.log(" Sending FormData:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      await dispatch(createTour(formData)).unwrap();
      toast.success("Tour created successfully!");
      router.push("/guide/tours");
    } catch (err: any) {
      console.error(" Tour creation failed:", err);
      toast.error(err?.message || "Failed to create tour");
    }
  };

  const onError = (errors: any) => {
    console.error(" Validation Errors:", errors);
  };

  return (
    <>
    <GuideNavbar/>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 group"
              >
              <ArrowLeft size={20} className="text-slate-600 group-hover:text-slate-900" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Create New Tour</h1>
              <p className="text-slate-600 mt-1">Fill in the details to create your tour</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Tag size={24} />
                  Tour Information
                </CardTitle>
                <p className="text-slate-600 mt-2">Provide comprehensive details about your tour</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
                  {/* Basic Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-sm font-bold">1</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Tour Title</Label>
                      <Input
                        {...register("title")}
                        placeholder="Enter an attractive title for your tour"
                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      {errors.title && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Description</Label>
                      <Textarea
                        {...register("description")}
                        placeholder="Describe your tour in detail - what makes it special?"
                        rows={4}
                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
                        />
                      {errors.description && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location & Category */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <MapPin className="text-green-600" size={16} />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Location & Category</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Destination</Label>
                        <Controller
                          name="destination"
                          control={control}
                          render={({ field }) => (
                            <Select
                            {...field}
                            value={field.value || ""}
                            onValueChange={field.onChange}
                            >
                              <SelectTrigger className="focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <SelectValue placeholder="Select destination" />
                              </SelectTrigger>
                              <SelectContent>
                                {destinations?.map((d: Destination) => (
                                  <SelectItem key={d._id} value={d._id}>
                                    {d.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          />
                        {errors.destination && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <span>•</span> {errors.destination.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Category</Label>
                        <Select value={categoryValue} onValueChange={(val) => setValue("category", val)}>
                          <SelectTrigger className="focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Adventure",
                              "Cultural",
                              "Nature",
                              "Food & Drink",
                              "Wildlife",
                              "Historical",
                              "Beach",
                              "Urban",
                              "Religious",
                              "Others",
                            ].map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.category && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <span>•</span> {errors.category.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Duration */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <IndianRupee className="text-purple-600" size={16} />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Pricing & Duration</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Duration (Days)</Label>
                        <Input
                          {...register("duration")}
                          type="number"
                          placeholder="e.g. 5"
                          className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          />
                        {errors.duration && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <span>•</span> {errors.duration.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Price (₹)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">₹</span>
                          <Input
                            {...register("price")}
                            type="number"
                            placeholder="Enter price per person"
                            className="pl-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            />
                        </div>
                        {errors.price && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <span>•</span> {errors.price.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Meeting Point</Label>
                      <Input
                        {...register("meetingPoint")}
                        placeholder="e.g. Airport Terminal, Hotel Lobby, City Center"
                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      {errors.meetingPoint && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.meetingPoint.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tour Content */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <span className="text-amber-600 text-sm font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Tour Content</h3>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Itinerary</Label>
                      {itinerary.map((item, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                            <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <Input
                              value={item}
                              onChange={(e) => updateItem(index, e.target.value, itinerary, setItinerary)}
                              placeholder={`Day ${index + 1} itinerary`}
                              className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(index, itinerary, setItinerary)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                      {errors.itinerary && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.itinerary.message}
                        </p>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addItem(itinerary, setItinerary)}
                        className="mt-2"
                        >
                        <Plus size={16} className="mr-2" />
                        Add Day
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Highlights</Label>
                        {highlights.map((item, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={item}
                              onChange={(e) => updateItem(index, e.target.value, highlights, setHighlights)}
                              placeholder={`Highlight ${index + 1}`}
                              className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeItem(index, highlights, setHighlights)}
                              className="text-red-600 border-red-300 hover:bg-red-50"
                              >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        ))}
                        {errors.highlights && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <span>•</span> {errors.highlights.message}
                          </p>
                        )}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addItem(highlights, setHighlights)}
                          className="mt-1"
                          >
                          <Plus size={16} className="mr-1" />
                          Add Highlight
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">What's Included</Label>
                        {included.map((item, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={item}
                              onChange={(e) => updateItem(index, e.target.value, included, setIncluded)}
                              placeholder={`Included item ${index + 1}`}
                              className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeItem(index, included, setIncluded)}
                              className="text-red-600 border-red-300 hover:bg-red-50"
                              >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        ))}
                        {errors.included && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <span>•</span> {errors.included.message}
                          </p>
                        )}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addItem(included, setIncluded)}
                          className="mt-1"
                          >
                          <Plus size={16} className="mr-1" />
                          Add Item
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">What's Excluded</Label>
                      {excluded.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => updateItem(index, e.target.value, excluded, setExcluded)}
                            placeholder={`Excluded item ${index + 1}`}
                            className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(index, excluded, setExcluded)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                      {errors.excluded && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.excluded.message}
                        </p>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addItem(excluded, setExcluded)}
                        className="mt-1"
                        >
                        <Plus size={16} className="mr-1" />
                        Add Item
                      </Button>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Calendar className="text-indigo-600" size={16} />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Availability</h3>
                    </div>

                    <div className="space-y-3">
                      {availabilityFields.map((field, idx) => (
                        <div key={field.id} className="flex items-end gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="flex-1">
                            <Label className="text-sm font-medium text-slate-700 mb-1 block">Date</Label>
                            <Input
                              type="date"
                              {...register(`availability.${idx}.date` as const)}
                              className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                          </div>
                          <div className="flex-1">
                            <Label className="text-sm font-medium text-slate-700 mb-1 block">Available Slots</Label>
                            <Input
                              type="number"
                              placeholder="Number of slots"
                              {...register(`availability.${idx}.slots` as const)}
                              className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeAvailability(idx)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {errors.availability && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span>•</span> {errors.availability.message}
                      </p>
                    )}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => appendAvailability({date: "" , slots: 1 })}
                      className="w-full border-2 border-dashed border-slate-300 text-slate-600 hover:bg-slate-50"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Availability Date
                    </Button>
                  </div>

                  {/* Images */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                        <ImageIcon className="text-pink-600" size={16} />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Tour Images</h3>
                    </div>

                    <div
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                        dragActive
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-300 hover:border-slate-400'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      >
                      <FileImage className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                      <p className="text-slate-600 mb-2">
                        Drag and drop images here, or click to select
                      </p>
                      <p className="text-sm text-slate-500 mb-4">
                        Supports JPG, PNG • Max 5MB per file • Up to 10 images
                      </p>

                      <input
                        type="file"
                        multiple
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleImageSelect}
                        className="hidden"
                        id="image-upload"
                        />
                      <label
                        htmlFor="image-upload"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer inline-flex items-center gap-2"
                        >
                        <Upload size={16} />
                        Choose Images
                      </label>
                    </div>

                    {selectedImages.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-slate-900">
                            Selected Images ({selectedImages.length}/10)
                          </h4>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={clearAllImages}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            Clear All
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {selectedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Selected ${index + 1}`}
                                className="rounded-xl w-full h-32 object-cover shadow-md"
                                />
                              <button
                                type="button"
                                onClick={() => removeSelectedImage(index)}
                                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                >
                                <X size={12} />
                              </button>
                              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                {(image.size / 1024 / 1024).toFixed(1)}MB
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {errors.images && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span>•</span> {errors.images.message as string}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6 border-t border-slate-200">
                    <Button
                      type="submit"
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                      >
                      <Save size={18} />
                      Create Tour
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Indicator */}
            <Card className="bg-white shadow-sm border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Form Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-slate-700">Basic Information</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-slate-700">Location & Category</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-slate-700">Pricing & Duration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-xs font-bold">2</span>
                    </div>
                    <span className="text-sm text-slate-700">Tour Content</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 text-xs font-bold">3</span>
                    </div>
                    <span className="text-sm text-slate-700">Availability</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-slate-600 text-xs font-bold">4</span>
                    </div>
                    <span className="text-sm text-slate-700">Images</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-blue-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-900">💡 Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Use descriptive titles that highlight unique features</li>
                  <li>• Include high-quality images to attract travelers</li>
                  <li>• Set competitive pricing based on market rates</li>
                  <li>• Provide detailed itinerary with daily activities</li>
                  <li>• Be specific about what's included and excluded</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
</>
  );
};

export default AddTourPage;