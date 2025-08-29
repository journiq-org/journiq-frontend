"use client";

import React from "react";
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
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createTour, selectTourLoading } from "@/redux/slices/createTourSlice";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

// ✅ Validation schema
const schema = yup.object({
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
        date: yup.string().required("Date is required"), // keep as string for <input type="date">
        slots: yup.number().positive().required("Slots are required"),
      })
    )
    .optional(),
  images: yup
    .mixed()
    .test("fileRequired", "At least 1 image required", (value) => {
      return value instanceof FileList && value.length > 0;
    }),
  meetingPoint: yup.string().required("Meeting point is required"),
  category: yup.string().required("Category is required"),
});

// ✅ Infer form type
type TourFormValue = yup.InferType<typeof schema>;

export default function CreateTourPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectTourLoading);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<TourFormValue>({
  resolver: yupResolver(schema) as any,
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
    category: "Others",
    images: undefined,
  },
});



  const categoryValue = watch("category") || "Others";

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  // ✅ Submit handler
  const onSubmit = async (data: TourFormValue) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("duration", data.duration.toString());
    formData.append("price", data.price.toString());
    formData.append("meetingPoint", data.meetingPoint);
    formData.append("category", data.category);

    // Convert multi-line inputs → arrays
    data.itinerary.split("\n").filter(Boolean).forEach((i) => formData.append("itinerary[]", i));
    data.highlights.split("\n").filter(Boolean).forEach((h) => formData.append("highlights[]", h));
    data.included.split("\n").filter(Boolean).forEach((i) => formData.append("included[]", i));
    data.excluded.split("\n").filter(Boolean).forEach((e) => formData.append("excluded[]", e));

    // Availability
    data.availability?.forEach((a, idx) => {
      formData.append(`availability[${idx}][date]`, a.date);
      formData.append(`availability[${idx}][slots]`, a.slots.toString());
    });

    // Images
  if (data.images && data.images instanceof FileList && data.images.length > 0) {
  Array.from(data.images).forEach((file) => formData.append("images", file));
}

    try {
      await dispatch(createTour(formData)).unwrap();
      toast.success("Tour created successfully!");
      router.push("/guide/tours");
    } catch (err: any) {
      toast.error(err || "Failed to create tour");
      console.error("createTour error:", err);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex justify-center items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">
            ✨ Create New Tour
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5 text-gray-800" onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input {...register("title")} placeholder="Enter tour title" />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea {...register("description")} placeholder="Tour description" rows={4} />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {/* Duration + Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Duration (days)</label>
                <Input type="number" {...register("duration")} placeholder="e.g. 5" />
                {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium">Price ($)</label>
                <Input type="number" {...register("price")} placeholder="e.g. 120" />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="text-sm font-medium">Availability</label>
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-2 gap-3 mb-2">
                  <Input type="date" {...register(`availability.${index}.date` as const)} />
                  <Input type="number" placeholder="Slots" {...register(`availability.${index}.slots` as const)} />
                  <Button type="button" onClick={() => remove(index)}>Remove</Button>
                </div>
              ))}
              <Button type="button" onClick={() => append({ date: "", slots: 1 })}>
                Add Availability
              </Button>
            </div>

            {/* Images */}
            <div>
              <label className="text-sm font-medium">Images</label>
              <Input type="file" multiple accept="image/*" {...register("images")} />
              {errors.images && <p className="text-red-500 text-sm">{errors.images.message as string}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryValue} onValueChange={(val) => setValue("category", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {["Adventure","Cultural","Nature","Food & Drink","Wildlife","Historical","Beach","Urban","Religious","Others"].map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={loading} className="bg-primary text-white">
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
