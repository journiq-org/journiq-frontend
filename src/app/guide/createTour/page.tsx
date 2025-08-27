"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Calendar, Image as ImageIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { listDestinations } from "@/redux/slices/destinationSlice";
import toast from "react-hot-toast";

interface Destination {
  _id: string;
  name: string;
}

const AddTourPage = () => {
  const [destination, setDestinations] = useState<Destination[]>([]);
  const [itinerary, setItinerary] = useState<string[]>([""]);
  const [highlights, setHighlights] = useState<string[]>([""]);
  const [included, setIncluded] = useState<string[]>([""]);
  const [excluded, setExcluded] = useState<string[]>([""]);
  const [availability, setAvailability] = useState<{ date: string; slots: string }[]>([
    { date: "", slots: "" },
  ]);
  const [images, setImages] = useState<File[]>([]);

  const dispatch = useDispatch<AppDispatch>()
  const { destinations} = useSelector((state:any) => state.destination)

  // Fetch destinations
  useEffect(() => {
    const fetchDestination = async () => {
        const res = await dispatch(listDestinations()).unwrap()
        .then((res) => {
            setDestinations(res.data.data.name)
        })
        .catch((err) => {
            toast.error('Error fetching destination')
            console.error(err)
        })
    }
    fetchDestination();
  },[dispatch])
//   useEffect(() => {
//     const fetchDestinations = async () => {
//       try {
//         const res = await fetch("/api/destinations"); // 👈 adjust your API path
//         const data = await res.json();
//         setDestinations(data.data || []);
//       } catch (err) {
//         console.error("Failed to fetch destinations", err);
//       }
//     };
//     fetchDestinations();
//   }, []);

  // Handle multiple images with preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#E0DDD7] p-8">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-xl rounded-2xl bg-[#EFEDE9]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#5E361D]">
              ➕ Add New Tour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-8">
              {/* Basic Info */}
              <div>
                <h2 className="text-lg font-semibold text-[#5E361D] mb-3">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Title</Label>
                    <Input placeholder="Enter tour title" />
                  </div>
                  <div>
                    <Label>Duration (Days)</Label>
                    <Input type="number" placeholder="e.g. 5" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Enter detailed description..."
                      className="h-28"
                    />
                  </div>
                </div>
              </div>

              {/* Destination & Category */}
              <div>
                <h2 className="text-lg font-semibold text-[#5E361D] mb-3">
                  Destination & Category
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Destination</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {destination.map((d) => (
                          <SelectItem key={d._id} value={d._id}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Adventure">Adventure</SelectItem>
                        <SelectItem value="Cultural">Cultural</SelectItem>
                        <SelectItem value="Nature">Nature</SelectItem>
                        <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                        <SelectItem value="Wildlife">Wildlife</SelectItem>
                        <SelectItem value="Historical">Historical</SelectItem>
                        <SelectItem value="Beach">Beach</SelectItem>
                        <SelectItem value="Urban">Urban</SelectItem>
                        <SelectItem value="Religious">Religious</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Dynamic Arrays */}
              {[
                { label: "Itinerary", state: itinerary, setState: setItinerary },
                { label: "Highlights", state: highlights, setState: setHighlights },
                { label: "Included", state: included, setState: setIncluded },
                { label: "Excluded", state: excluded, setState: setExcluded },
              ].map((field) => (
                <div key={field.label}>
                  <h2 className="text-lg font-semibold text-[#5E361D] mb-3">
                    {field.label}
                  </h2>
                  {field.state.map((val, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-2">
                      <Input
                        value={val}
                        onChange={(e) => {
                          const newArr = [...field.state];
                          newArr[idx] = e.target.value;
                          field.setState(newArr);
                        }}
                        placeholder={`Enter ${field.label.toLowerCase()}...`}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() =>
                          field.setState(field.state.filter((_, i) => i !== idx))
                        }
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => field.setState([...field.state, ""])}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add {field.label}
                  </Button>
                </div>
              ))}

              {/* Availability (date + slots) */}
              <div>
                <h2 className="text-lg font-semibold text-[#5E361D] mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5" /> Availability
                </h2>
                {availability.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-4 mb-2">
                    <Input
                      type="date"
                      value={item.date}
                      onChange={(e) => {
                        const newArr = [...availability];
                        newArr[idx].date = e.target.value;
                        setAvailability(newArr);
                      }}
                    />
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={item.slots}
                        placeholder="Slots"
                        onChange={(e) => {
                          const newArr = [...availability];
                          newArr[idx].slots = e.target.value;
                          setAvailability(newArr);
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() =>
                          setAvailability(availability.filter((_, i) => i !== idx))
                        }
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setAvailability([...availability, { date: "", slots: "" }])
                  }
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Availability
                </Button>
              </div>

              {/* Image Upload + Preview */}
              <div>
                <h2 className="text-lg font-semibold text-[#5E361D] mb-3 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" /> Tour Images
                </h2>
                <Input type="file" multiple accept="image/*" onChange={handleImageChange} />
                <div className="flex flex-wrap gap-4 mt-4">
                  {images.map((file, idx) => (
                    <div key={idx} className="relative w-32 h-32 border rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                        onClick={() => removeImage(idx)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <Button className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#5E361D] to-[#7B4B27] text-white hover:scale-105 transition">
                  Save Tour
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddTourPage;
