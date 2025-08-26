"use client";

import React, { useEffect } from "react";
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
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { guideViewSingleTour } from "@/redux/slices/tourSlice";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { watch } from "fs";


// stirng fields for textarea (which posses values in array)
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


//declaring type from schema
type TourFormValue = yup.InferType<typeof schema>



export default function UpdateTourPage() {

    const { id } = useParams<{ id: string }>();

    const dispatch = useDispatch<AppDispatch>()
    const {selectedTour} = useSelector((state:any) => state.tour)

    useEffect(() => {
        if(id){
            dispatch(guideViewSingleTour(id))
        }
    },[id,dispatch])

    const{
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        watch,
        formState: {errors},
    } = useForm({
            resolver : yupResolver(schema),
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
                    category: "Adventure",
                },
        })
        const categoryValue = watch("category"); // watch current category

        // FieldArray for availability
        const { fields, append, remove } = useFieldArray({
            control,
            name: "availability",
        });

    useEffect(() => {
        if(selectedTour){
            reset({
                ...selectedTour,
                itinerary: selectedTour.itinerary.join('\n'), //convert array into textarea string
                highlights: selectedTour.highlights.join("\n"),
                included: selectedTour.included.join("\n"),
                excluded: selectedTour.excluded.join("\n"),
                availability: selectedTour.availability?.map((a :{ date: string | Date; slots: number }) => ({
                    ...a,
                    date: new Date(a.date).toISOString().split("T")[0], // format to YYYY-MM-DD
                })) || [],
                category: selectedTour.category || "Adventure",
                        })
        }
    },[selectedTour,reset])

  
    const onSubmit = async(data: TourFormValue) => {

        const formData = new FormData()
         formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("duration", data.duration.toString());
        formData.append("price", data.price.toString());
        formData.append("meetingPoint", data.meetingPoint);
        formData.append("category", data.category);

      // textarea fields -> split back into arrays
    data.itinerary
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean)
      .forEach((i) => formData.append("itinerary[]", i));

    data.highlights
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean)
      .forEach((h) => formData.append("highlights[]", h));

    data.included
      .split("\n")
      .map((inc) => inc.trim())
      .filter(Boolean)
      .forEach((inc) => formData.append("included[]", inc));

    data.excluded
      .split("\n")
      .map((exc) => exc.trim())
      .filter(Boolean)
      .forEach((exc) => formData.append("excluded[]", exc));

    // availability
    if (data.availability) {
      data.availability.forEach((a, idx) => {
        formData.append(`availability[${idx}][date]`, a.date.toISOString());
        formData.append(`availability[${idx}][slots]`, a.slots.toString());
      });
    }

    // images
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    }


  return (
    <motion.div
      className="min-h-screen flex justify-center items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">
            ✨ Update Tour
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5 text-gray-800" onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input {...register('title')} placeholder="Enter tour title" />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea {...register('description')} placeholder="Tour description" rows={4} />
               {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

            {/* Destination (dropdown for destinations)
            <div>
              <label className="text-sm font-medium">Destination</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dest1">Destination 1</SelectItem>
                  <SelectItem value="dest2">Destination 2</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            {/* Destination (Read-only) */}
            <div>
            <label className="text-sm font-medium">Destination</label>
                <p className="text-gray-800 font-semibold">{selectedTour?.destination?.name} ,{selectedTour?.destination?.country}</p>
            </div>

            {/* Itinerary */}
            <div>
              <label className="text-sm font-medium">Itinerary</label>
              <Textarea
                {...register('itinerary')}
                placeholder="Day 1: ..., Day 2: ..."
                rows={4}
              />
               {errors.itinerary && (
                <p className="text-red-500 text-sm">{errors.itinerary.message}</p>
              )}
            </div>

            {/* Highlights */}
            <div>
              <label className="text-sm font-medium">Highlights</label>
              <Textarea {...register('highlights')} placeholder="Highlight 1, Highlight 2" rows={3} />
               {errors.highlights && (
                <p className="text-red-500 text-sm">{errors.highlights.message}</p>
              )}
            </div>

            {/* Duration + Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Duration (days)</label>
                <Input {...register('duration')} type="number" placeholder="e.g. 5" />
                {errors.duration && (
                  <p className="text-red-500 text-sm">{errors.duration.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Price ($)</label>
                <Input {...register('price')} type="number" placeholder="e.g. 120" />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
            </div>

           {/* Availability */}
            <div>
              <label className="text-sm font-medium">Availability</label>
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-2 gap-3 mb-2">
                  <Input type="date" {...register(`availability.${index}.date` as const)} />
                  <Input type="number" placeholder="Slots" {...register(`availability.${index}.slots` as const)} />
                  <Button type="button" onClick={() => remove(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => append({ date: new Date(), slots: 1 })}>
                Add Availability
              </Button>
            </div>

            {/* Images */}
            <div>
              <label className="text-sm font-medium">Images</label>
              <Input type="file" multiple accept="image/*" {...register("images")}/>
               {errors.images && (
                <p className="text-red-500 text-sm">{errors.images.message as string}</p>
              )}
            </div>

            {/* Included */}
            <div>
              <label className="text-sm font-medium">Included</label>
              <Textarea {...register('included')} placeholder="e.g. Hotel, Breakfast, Guide" rows={3} />
              {errors.included && (
                <p className="text-red-500 text-sm">{errors.included.message}</p>
              )}
            </div>

            {/* Excluded */}
            <div>
              <label className="text-sm font-medium">Excluded</label>
              <Textarea {...register('excluded')} placeholder="e.g. Flights, Personal expenses" rows={3} />
              {errors.excluded && (
                <p className="text-red-500 text-sm">{errors.excluded.message}</p>
              )}
            </div>

            {/* Meeting Point */}
            <div>
              <label className="text-sm font-medium">Meeting Point</label>
              <Input {...register('meetingPoint')} placeholder="e.g. Central Station" />
               {errors.meetingPoint && (
                <p className="text-red-500 text-sm">{errors.meetingPoint.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select
              value={categoryValue}
                   onValueChange={(val) => setValue("category", val)}
                >
                <SelectTrigger>
                  <SelectValue  placeholder="Select category" />
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
                <p className="text-red-500 text-sm">{errors.category.message}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" className="rounded-xl px-6">
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white rounded-xl px-6">
                Update
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
