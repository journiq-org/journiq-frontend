"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { guideUpdateTour, guideViewSingleTour } from "@/redux/slices/tourSlice";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import toast from "react-hot-toast";
import { ArrowLeft, Save, X, Upload, ImageIcon, MapPin, Calendar, IndianRupee, Tag } from "lucide-react";

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  itinerary: yup.string().required("Itinerary is required"),
  highlights: yup.string().required("Highlights are required"),
  included: yup.string().required("Included items are required"),
  excluded: yup.string().required("Excluded items are required"),
  duration: yup.number().positive().required("Duration is required"),
  price: yup.number().positive().required("Price is required"),
  availability: yup
    .array()
    .of(
      yup.object({
        date: yup.date().required(),
        slots: yup.number().positive().required(),
      })
    )
    .optional(),
  images: yup
    .mixed<FileList>()
    .test(
      "fileRequired",
      "At least 1 image required",
      (value) => !value || value.length > 0
    ),
  meetingPoint: yup.string().required("Meeting point is required"),
  category: yup.string().required("Category is required"),
});

// Type inference from schema
type TourFormValue = yup.InferType<typeof schema>;

export default function UpdateTourPage() {

  
  const [loaded, setLoaded] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedTour } = useSelector((state: any) => state.tour);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      itinerary: "",
      highlights: "",
      duration: 0,
      price: 0,
      availability: [],
      included: "",
      excluded: "",
      meetingPoint: "",
      category: "",
    },
  });

  const categoryValue = watch("category") || selectedTour?.category || 'Others';

  // FieldArray for availability
  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  useEffect(() => {
    if (id) {
      dispatch(guideViewSingleTour(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedTour && !loaded) {
      reset({
        ...selectedTour,
        itinerary: selectedTour.itinerary.join('\n'), //convert array into textarea string
        highlights: selectedTour.highlights.join("\n"),
        included: selectedTour.included.join("\n"),
        excluded: selectedTour.excluded.join("\n"),
        availability: selectedTour.availability?.map((a: { date: string | Date; slots: number }) => ({
          ...a,
          date: new Date(a.date).toISOString().split("T")[0], // format to YYYY-MM-DD
        })) || [],
        category: selectedTour.category || "Others",
      });
      setExistingImages(selectedTour.images || []); // keep images in local state
      setLoaded(true);
    }
  }, [selectedTour, reset, loaded]);

  const onSubmit = async (data: TourFormValue) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("duration", data.duration.toString());
    formData.append("price", data.price.toString());
    formData.append("meetingPoint", data.meetingPoint);
    formData.append("category", data.category);
    formData.append("destination", selectedTour.destination._id);

    data.itinerary.split("\n").filter(Boolean).forEach(i => formData.append("itinerary[]", i));
    data.highlights.split("\n").filter(Boolean).forEach(h => formData.append("highlights[]", h));
    data.included.split("\n").filter(Boolean).forEach(i => formData.append("included[]", i));
    data.excluded.split("\n").filter(Boolean).forEach(e => formData.append("excluded[]", e));

    data.availability?.forEach((a, idx) => {
      const formattedDate = new Date(a.date).toISOString().split("T")[0]; // "YYYY-MM-DD"
      formData.append(`availability[${idx}][date]`, formattedDate);
      formData.append(`availability[${idx}][slots]`, a.slots.toString());
    });

    // Keep existing images
    existingImages.forEach((img) => formData.append("existingImages[]", img));

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => formData.append("images", file));
    }

    console.log("FormData to send:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      await dispatch(guideUpdateTour({ id, formData })).unwrap();
      toast.success('Tour updated successfully');
      router.push(`/guide/viewTourDetails/${id}`);
    } catch (err) {
      toast.error('Error updating tour');
      console.error(err, 'update tour error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/guide/viewTourDetails/${id}`);
  };

  if (!selectedTour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Loading tour details...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft size={20} className="text-slate-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Update Tour</h1>
                <p className="text-slate-600 mt-1">Edit your tour details and information</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Tag className="text-blue-600" size={18} />
                </div>
                Tour Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Tour Title</label>
                      <Input
                        {...register('title')}
                        placeholder="Enter tour title"
                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Category</label>
                      <Select
                        value={categoryValue}
                        onValueChange={(val) => setValue("category", val)}
                      >
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
                          ].map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Description</label>
                    <Textarea
                      {...register('description')}
                      placeholder="Describe your tour in detail..."
                      rows={4}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span>•</span> {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Destination Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center">
                      <MapPin className="text-green-600" size={16} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Destination</h3>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center gap-2">
                      <MapPin className="text-slate-500" size={18} />
                      <span className="text-slate-900 font-medium">
                        {selectedTour?.destination?.name}, {selectedTour?.destination?.country}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mt-1">Destination cannot be changed after tour creation</p>
                  </div>
                </div>

                {/* Tour Details Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                      <Calendar className="text-purple-600" size={16} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Tour Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Duration (Days)</label>
                      <Input
                        {...register('duration')}
                        type="number"
                        placeholder="e.g. 5"
                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.duration && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.duration.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Price (₹)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                        <Input
                          {...register('price')}
                          type="number"
                          placeholder="Enter price"
                          className="pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <label className="text-sm font-medium text-slate-700">Meeting Point</label>
                    <Input
                      {...register('meetingPoint')}
                      placeholder="e.g. Airport Terminal, Hotel Lobby"
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.meetingPoint && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span>•</span> {errors.meetingPoint.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Itinerary & Highlights */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-amber-100 rounded-md flex items-center justify-center">
                      <span className="text-amber-600 text-xs font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Tour Content</h3>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Itinerary</label>
                    <Textarea
                      {...register('itinerary')}
                      placeholder="Day 1: Arrival and hotel check-in&#10;Day 2: City sightseeing tour&#10;Day 3: Cultural experiences"
                      rows={6}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    {errors.itinerary && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span>•</span> {errors.itinerary.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Highlights</label>
                      <Textarea
                        {...register('highlights')}
                        placeholder="Professional guide&#10;Comfortable transportation&#10;Local cuisine tasting"
                        rows={4}
                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      {errors.highlights && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.highlights.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">What's Included</label>
                      <Textarea
                        {...register('included')}
                        placeholder="Hotel accommodation&#10;Breakfast and meals&#10;Transportation&#10;Entrance fees"
                        rows={4}
                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      {errors.included && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.included.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">What's Excluded</label>
                    <Textarea
                      {...register('excluded')}
                      placeholder="International flights&#10;Travel insurance&#10;Personal expenses&#10;Visa fees"
                      rows={3}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    {errors.excluded && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span>•</span> {errors.excluded.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Availability Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-indigo-100 rounded-md flex items-center justify-center">
                      <Calendar className="text-indigo-600" size={16} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Availability</h3>
                  </div>

                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-end gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex-1">
                          <label className="text-sm font-medium text-slate-700 mb-1 block">Date</label>
                          <Input
                            type="date"
                            {...register(`availability.${index}.date` as const)}
                            className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-sm font-medium text-slate-700 mb-1 block">Available Slots</label>
                          <Input
                            type="number"
                            placeholder="Number of slots"
                            {...register(`availability.${index}.slots` as const)}
                            className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => remove(index)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ date: new Date(), slots: 1 })}
                    className="w-full border-2 border-dashed border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    <Calendar className="mr-2" size={16} />
                    Add Availability Date
                  </Button>
                </div>

                {/* Images Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-pink-100 rounded-md flex items-center justify-center">
                      <ImageIcon className="text-pink-600" size={16} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Tour Images</h3>
                  </div>

                  {/* Existing Images */}
                  {existingImages.length > 0 && (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-slate-700">Current Images</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {existingImages.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`}
                              alt={`Current ${idx + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-slate-200"
                            />
                            <button
                              type="button"
                              onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upload New Images */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Add New Images</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                      <Upload className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                      <div className="text-sm text-slate-600 mb-2">
                        Click to upload or drag and drop
                      </div>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        {...register("images")}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                      >
                        Choose Images
                      </label>
                    </div>
                    {errors.images && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span>•</span> {errors.images.message as string}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="px-8 py-2.5"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2" size={16} />
                        Update Tour
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}