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

export default function UpdateTourPage() {
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    
  })

  return (
    <motion.div
      className="min-h-screen flex justify-center items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">
            ✨ Update Tour
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5 text-gray-800">
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-gray-700">Title</label>
              <Input placeholder="Enter tour title" className="text-gray-900" />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Textarea
                placeholder="Tour description"
                rows={4}
                className="text-gray-900"
              />
            </div>

            {/* Duration + Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Duration (days)</label>
                <Input type="number" placeholder="e.g. 5" className="text-gray-900" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Price ($)</label>
                <Input type="number" placeholder="e.g. 120" className="text-gray-900" />
              </div>
            </div>

            {/* Meeting Point */}
            <div>
              <label className="text-sm font-medium text-gray-700">Meeting Point</label>
              <Input placeholder="e.g. Central Station" className="text-gray-900" />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <Select>
                <SelectTrigger className="text-gray-900 ">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
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
                    <SelectItem key={cat} value={cat} className="text-gray-800">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl px-6 text-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2"
              >
                Update
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
