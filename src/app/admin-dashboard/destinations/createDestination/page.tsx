"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createDestination } from "@/redux/slices/destinationSlice";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// ✅ Validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().optional(),
  description: yup.string().required("Description is required"),
  images: yup
    .mixed<FileList>()
    .required("At least one image is required")
    .test("fileCount", "Upload at least one file", (v) => !!v && v.length > 0),
  popularAttractionsRaw: yup.string().optional(), // CSV -> array
  bestSeason: yup.string().optional(),
  tagsRaw: yup.string().optional(), // CSV -> array
  lat: yup
    .number()
    .typeError("Latitude must be a number")
    .optional()
    .nullable(),
  lng: yup
    .number()
    .typeError("Longitude must be a number")
    .optional()
    .nullable(),
  is_active: yup.boolean().default(true),
});

type FormValues = {
  name: string;
  country: string;
  city?: string;
  description: string;
  images: FileList;
  popularAttractionsRaw?: string; // comma-separated input
  bestSeason?: string;
  tagsRaw?: string; // comma-separated input
  lat?: number | null;
  lng?: number | null;
  is_active: boolean;
};

export default function CreateDestinationPage() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { is_active: true },
  });

const onSubmit = (data: FormValues) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("country", data.country);
  if (data.city) formData.append("city", data.city);
  formData.append("description", data.description);

  // Arrays need JSON.stringify (convert CSV -> array first)
  const popularAttractions = data.popularAttractionsRaw
    ? data.popularAttractionsRaw.split(",").map((s) => s.trim())
    : [];
  formData.append("popularAttractions", JSON.stringify(popularAttractions));

  const tags = data.tagsRaw
    ? data.tagsRaw.split(",").map((s) => s.trim())
    : [];
  formData.append("tags", JSON.stringify(tags));

  if (data.bestSeason) {
    formData.append("bestSeason", data.bestSeason);
  }

  // Location as JSON string
  if (data.lat !== null && data.lng !== null) {
    formData.append("location", JSON.stringify({ lat: data.lat, lng: data.lng }));
  }

  // Images
  if (data.images && data.images.length > 0) {
    Array.from(data.images).forEach((file) => {
      formData.append("images", file);
    });
  }

  // Debug log
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  dispatch(createDestination(formData));
};


  return (
    <div className="max-w-2xl mx-auto mt-6">
      <Card className="p-4 shadow-lg">
        <CardHeader>
          <CardTitle>Create Destination</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <Label>Name</Label>
              <Input placeholder="Destination name" {...register("name")} />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Country */}
            <div>
              <Label>Country</Label>
              <Input placeholder="Country" {...register("country")} />
              {errors.country && (
                <p className="text-red-500">{errors.country.message}</p>
              )}
            </div>

            {/* City (optional) */}
            <div>
              <Label>City (optional)</Label>
              <Input placeholder="City" {...register("city")} />
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Textarea placeholder="Destination description" {...register("description")} />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Images */}
            <div>
              <Label>Upload Images</Label>
              <Input type="file" multiple {...register("images")} />
              {errors.images && (
                <p className="text-red-500">{errors.images.message as string}</p>
              )}
            </div>

            {/* Popular Attractions (CSV) */}
            <div>
              <Label>Popular Attractions (comma separated)</Label>
              <Input
                placeholder="E.g. Taj Mahal, Red Fort"
                {...register("popularAttractionsRaw")}
              />
            </div>

            {/* Best Season (optional) */}
            <div>
              <Label>Best Season (optional)</Label>
              <Input placeholder="Summer, Winter…" {...register("bestSeason")} />
            </div>

            {/* Tags (CSV) */}
            <div>
              <Label>Tags (comma separated)</Label>
              <Input placeholder="mountains, temple, wildlife" {...register("tagsRaw")} />
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Latitude</Label>
                <Input type="number" step="any" {...register("lat", { valueAsNumber: true })} />
                {errors.lat && <p className="text-red-500">{errors.lat.message}</p>}
              </div>
              <div>
                <Label>Longitude</Label>
                <Input type="number" step="any" {...register("lng", { valueAsNumber: true })} />
                {errors.lng && <p className="text-red-500">{errors.lng.message}</p>}
              </div>
            </div>

            {/* Active toggle */}
            {/* <div className="flex items-center gap-3">
              <input id="is_active" type="checkbox" {...register("is_active")} defaultChecked />
              <Label htmlFor="is_active">Active</Label>
            </div> */}

            {/* Submit */}
            <Button type="submit" className="w-full">
              Create Destination
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
