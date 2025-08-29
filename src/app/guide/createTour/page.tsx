// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { createTour, selectTourLoading } from "@/redux/slices/createTourSlice";
// import { useFieldArray, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import toast from "react-hot-toast";

// // ✅ Validation schema
// const schema = yup.object({
//   title: yup.string().required("Title is required"),
//   description: yup.string().required("Description is required"),
//   itinerary: yup.string().required("Itinerary is required"),
//   highlights: yup.string().required("Highlights are required"),
//   included: yup.string().required("Included items are required"),
//   excluded: yup.string().required("Excluded items are required"),
//   duration: yup.number().positive().required("Duration is required"),
//   price: yup.number().positive().required("Price is required"),
//   availability: yup
//     .array()
//     .of(
//       yup.object({
//         date: yup.string().required("Date is required"), // keep as string for <input type="date">
//         slots: yup.number().positive().required("Slots are required"),
//       })
//     )
//     .optional(),
//   images: yup
//     .mixed()
//     .test("fileRequired", "At least 1 image required", (value) => {
//       return value instanceof FileList && value.length > 0;
//     }),
//   meetingPoint: yup.string().required("Meeting point is required"),
//   category: yup.string().required("Category is required"),
// });

// // ✅ Infer form type
// type TourFormValue = yup.InferType<typeof schema>;

// export default function CreateTourPage() {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const loading = useSelector(selectTourLoading);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     control,
//     watch,
//     formState: { errors },
//   } = useForm<TourFormValue>({
//   resolver: yupResolver(schema) as any,
//   defaultValues: {
//     title: "",
//     description: "",
//     itinerary: "",
//     highlights: "",
//     duration: 0,
//     price: 0,
//     availability: [],
//     included: "",
//     excluded: "",
//     meetingPoint: "",
//     category: "Others",
//     images: undefined,
//   },
// });



//   const categoryValue = watch("category") || "Others";

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "availability",
//   });

//   // ✅ Submit handler
//   const onSubmit = async (data: TourFormValue) => {
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("duration", data.duration.toString());
//     formData.append("price", data.price.toString());
//     formData.append("meetingPoint", data.meetingPoint);
//     formData.append("category", data.category);

//     // Convert multi-line inputs → arrays
//     data.itinerary.split("\n").filter(Boolean).forEach((i) => formData.append("itinerary[]", i));
//     data.highlights.split("\n").filter(Boolean).forEach((h) => formData.append("highlights[]", h));
//     data.included.split("\n").filter(Boolean).forEach((i) => formData.append("included[]", i));
//     data.excluded.split("\n").filter(Boolean).forEach((e) => formData.append("excluded[]", e));

//     // Availability
//     data.availability?.forEach((a, idx) => {
//       formData.append(`availability[${idx}][date]`, a.date);
//       formData.append(`availability[${idx}][slots]`, a.slots.toString());
//     });

//     // Images
//   if (data.images && data.images instanceof FileList && data.images.length > 0) {
//   Array.from(data.images).forEach((file) => formData.append("images", file));
// }

//     try {
//       await dispatch(createTour(formData)).unwrap();
//       toast.success("Tour created successfully!");
//       router.push("/guide/tours");
//     } catch (err: any) {
//       toast.error(err || "Failed to create tour");
//       console.error("createTour error:", err);
//     }
//   };

//   return (
//     <motion.div
//       className="min-h-screen flex justify-center items-center p-6"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <Card className="w-full max-w-4xl shadow-xl rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-lg">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-gray-900">
//             ✨ Create New Tour
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form className="space-y-5 text-gray-800" onSubmit={handleSubmit(onSubmit)}>
//             {/* Title */}
//             <div>
//               <label className="text-sm font-medium">Title</label>
//               <Input {...register("title")} placeholder="Enter tour title" />
//               {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
//             </div>

//             {/* Description */}
//             <div>
//               <label className="text-sm font-medium">Description</label>
//               <Textarea {...register("description")} placeholder="Tour description" rows={4} />
//               {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
//             </div>

//             {/* Duration + Price */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-medium">Duration (days)</label>
//                 <Input type="number" {...register("duration")} placeholder="e.g. 5" />
//                 {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
//               </div>
//               <div>
//                 <label className="text-sm font-medium">Price ($)</label>
//                 <Input type="number" {...register("price")} placeholder="e.g. 120" />
//                 {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
//               </div>
//             </div>

//             {/* Availability */}
//             <div>
//               <label className="text-sm font-medium">Availability</label>
//               {fields.map((field, index) => (
//                 <div key={field.id} className="grid grid-cols-2 gap-3 mb-2">
//                   <Input type="date" {...register(`availability.${index}.date` as const)} />
//                   <Input type="number" placeholder="Slots" {...register(`availability.${index}.slots` as const)} />
//                   <Button type="button" onClick={() => remove(index)}>Remove</Button>
//                 </div>
//               ))}
//               <Button type="button" onClick={() => append({ date: "", slots: 1 })}>
//                 Add Availability
//               </Button>
//             </div>

//             {/* Images */}
//             <div>
//               <label className="text-sm font-medium">Images</label>
//               <Input type="file" multiple accept="image/*" {...register("images")} />
//               {errors.images && <p className="text-red-500 text-sm">{errors.images.message as string}</p>}
//             </div>

//             {/* Category */}
//             <div>
//               <label className="text-sm font-medium">Category</label>
//               <Select value={categoryValue} onValueChange={(val) => setValue("category", val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {["Adventure","Cultural","Nature","Food & Drink","Wildlife","Historical","Beach","Urban","Religious","Others"].map((cat) => (
//                     <SelectItem key={cat} value={cat}>{cat}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end gap-4 pt-4">
//               <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
//               <Button type="submit" disabled={loading} className="bg-primary text-white">
//                 {loading ? "Creating..." : "Create"}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }





// "use client";

// import { listDestinations } from '@/redux/slices/destinationSlice';
// import { AppDispatch } from '@/redux/store';
// import { useRouter } from 'next/navigation';
// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Plus, Trash2, Calendar, Image as ImageIcon } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { listDestinations } from "@/redux/slices/destinationSlice";
// import toast from "react-hot-toast";
// import * as yup from 'yup'
// import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Tour } from "@/types/tour";
// import api from "@/lib/api";
// import { createTour } from "@/redux/slices/tourSlice";
// import { useRouter } from "next/navigation";


// // const schema = yup.object().shape({
// //    title: yup
// //     .string()
// //     .required("Title is required")
// //     .min(3, "Title must be at least 3 characters long"),

// //   description: yup
// //     .string()
// //     .required("Description is required")
// //     .min(10, "Description must be at least 10 characters long"),

// //   duration: yup
// //     .number()
// //     .typeError("Duration must be a number")
// //     .required("Duration is required")
// //     .positive("Duration must be greater than 0"),

// //   destination: yup.string().required("Destination is required"),

// //   category: yup.string().required("Category is required"),

// //   itinerary: yup
// //     .array()
// //     .of(yup.string().required("Itinerary item is required"))
// //     .min(1, "At least one itinerary item is required"),

// //   highlights: yup.array().of(yup.string()),

// //   included: yup.array().of(yup.string()),

// //   excluded: yup.array().of(yup.string()),

// //   price: yup
// //     .number()
// //     .typeError("Price must be a number")
// //     .required("Price is required")
// //     .positive("Price must be greater than 0"),

// //   availability: yup
// //     .array()
// //     .of(
// //       yup.object().shape({
// //         date: yup
// //           .date()
// //           .required("Date is required")
// //           .typeError("Invalid date format"),
// //         slots: yup
// //           .number()
// //           .typeError("Slots must be a number")
// //           .required("Slots are required")
// //           .integer("Slots must be an integer")
// //           .min(1, "At least 1 slot required"),
// //       })
// //     )
// //     .min(1, "At least one availability slot is required"),
// //       images: yup
// //       .array()
// //       .min(1, "Please upload at least one image")
// //       .test("fileType", "Only jpg, jpeg or png files are allowed", (value) => {
// //         if (!value || value.length === 0) return true;
// //           return value.every((file) =>
// //           [ "image/jpeg", "image/png"].includes(file.type)
// //         );
// //       }),



// //   meetingPoint: yup
// //     .string()
// //     .required("Meeting point is required")
// //     .min(3, "Meeting point must be at least 3 characters"),
// // });

//   interface AddForm {
//     title: string;
//     description: string;
//     duration: number;
//     destination: string;
//     category: string;
//     itinerary: string[];
//     highlights: string[] 
//     included: string[] 
//     excluded: string[]
//     price: number;
//     availability: {
//       date: Date;
//       slots: number;
//     }[];
//     images: File[];   // <-- no `| undefined`
//     meetingPoint: string;
//   }

// const schema: yup.Schema<AddForm> = yup.object({
//   title: yup.string().required("Title is required").min(3),
//   description: yup.string().required("Description is required").min(10),
//   duration: yup.number().typeError("Duration must be a number").required().positive(),
//   destination: yup.string().required("Destination is required"),
//   category: yup.string().required("Category is required"),
  
//   itinerary: yup.array().of(yup.string().required()).min(1).required(),  // ✅ add .required()
// highlights: yup.array()
//   .of(yup.string().trim())
//   .compact((val) => !val || val.length === 0) // removes empty strings
//   .min(1, "Please add at least one highlight")
//   .required(),

// included: yup.array()
//   .of(yup.string().trim())
//   .compact((val) => !val || val.length === 0)
//   .min(1, "Please add at least one included item")
//   .required(),

// excluded: yup.array()
//   .of(yup.string().trim())
//   .compact((val) => !val || val.length === 0)
//   .min(1, "Please add at least one excluded item")
//   .required(),

//   price: yup.number().typeError("Price must be a number").required().positive(),

//   availability: yup.array().of(
//     yup.object({
//       date: yup.date().required("Date is required"),
//       slots: yup.number().required().integer().min(1),
//     })
//   ).min(1).required(), // ✅

//     images: yup.array().of(
//       yup.mixed<File>()
//         .required("File is required") // 🔑 ensures no `undefined`
//         .test("fileType", "Only jpg, jpeg or png files are allowed", (file) =>
//           file ? ["image/jpeg", "image/png"].includes(file.type) : false
//         )
//     ).min(1, "Please upload at least one image").required(),

//   meetingPoint: yup.string().required().min(3),
// });




// interface Destination {
//   _id: string;
//   name: string;
// }



// const AddTourPage = () => {

//   // const [itinerary, setItinerary] = useState<string[]>([""]);
//   // const [highlights, setHighlights] = useState<string[]>([""]);
//   // const [included, setIncluded] = useState<string[]>([""]);
//   // const [excluded, setExcluded] = useState<string[]>([""]);
//   // const [availability, setAvailability] = useState<{ date: string; slots: string }[]>([
//   //   { date: '', slots: '' },
//   // ]);
//   // const [images, setImages] = useState<File[]>([]);

//   const router = useRouter()
//   const dispatch = useDispatch<AppDispatch>()
//   const { destinations} = useSelector((state:any) => state.destination)
  

//     // Fetch destinations
//     useEffect(() => {
//         dispatch(listDestinations()).unwrap()
//     },[dispatch])

//   // Handle multiple images with preview
//   // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (e.target.files) {
//   //     setImages((prev) => [...prev, ...Array.from(e.target.files!)]);
//   //   }
//   // };

//   // const removeImage = (index: number) => {
//   //   setImages((prev) => prev.filter((_, i) => i !== index));
//   // };



//   const{ 
//     register,
//     handleSubmit,
//     control,
//     formState: {errors},
//   } = useForm<AddForm>({
//     resolver: yupResolver(schema),
//      defaultValues: {
//         title: "",
//         description: "",
//         duration: 1,
//         destination: "",
//         category: "",
//         price: 1,
//         meetingPoint: "",
//         itinerary: ["Day 1 itinerary"],
//         highlights: [""],
//         included: [""],
//         excluded: [""],
//         availability: [{ date: new Date(), slots: 1 }],
//         images: [],
//         }
//   })

// const itineraryField   = useFieldArray<AddForm, "itinerary">({ control, name: "itinerary" })
// const highlightsField  = useFieldArray<AddForm, "highlights">({ control, name: "highlights" })
// const includedField    = useFieldArray<AddForm, "included">({ control, name: "included" })
// const excludedField    = useFieldArray<AddForm, "excluded">({ control, name: "excluded" })
// const availabilityField = useFieldArray<AddForm, "availability">({ control, name: "availability" })


// const fieldSections: { label: string; field: any; name: keyof AddForm }[] = [
//   { label: "Itinerary",  field: itineraryField,  name: "itinerary" },
//   { label: "Highlights", field: highlightsField, name: "highlights" },
//   { label: "Included",   field: includedField,   name: "included" },
//   { label: "Excluded",   field: excludedField,   name: "excluded" },
// ];




//   const onSubmit: SubmitHandler<AddForm> = async(data) => {
//     console.log("🚀 onSubmit triggered with data:", data);

//     const formData = new FormData()
//     formData.append('title',data.title)
//     formData.append("description", data.description);
//     formData.append("duration", String(data.duration));
//     formData.append("destination", data.destination);
//     formData.append("category", data.category);
//     formData.append("price", String(data.price));
//     formData.append("meetingPoint", data.meetingPoint)

//     // //arrays
//     // itinerary.forEach((item) => formData.append('itinerary[]',item))
//     // highlights.forEach((item) => formData.append('highlights[]',item))
//     // included.forEach((item) => formData.append('included',item))
//     // excluded.forEach((item) => formData.append('excluded',item))
//     // availability.forEach((item) => {
//     //   formData.append("availability[]", JSON.stringify(item));
//     // });
// // arrays
//   data.itinerary.forEach((item) => formData.append("itinerary[]", item));
//   data.highlights.forEach((item) => formData.append("highlights[]", item));
//   data.included.forEach((item) => formData.append("included[]", item));
//   data.excluded.forEach((item) => formData.append("excluded[]", item));

//   // availability
//   data.availability.forEach((slot, idx) => {
//     formData.append(`availability[${idx}][date]`, slot.date.toISOString());
//     formData.append(`availability[${idx}][slots]`, String(slot.slots));
//   });

//   // images
//   data.images.forEach((file) => formData.append("images", file));


    
//     // images
//       // images.forEach((file) => formData.append("images", file));

//     await dispatch(createTour(formData)).unwrap()
//     .then((res) => {
//        console.log("✅ Tour created response:", res);
//       toast.success('Tour Created Successfully')
//       router.push('/guide/tour')
//     })
//     .catch((err) => {
//        console.error("❌ Tour creation failed:", err);
//       toast.error('Tour creation failed')
//     })
//   }


//   const onError = (errors: any) => {
//   console.error("❌ Validation Errors:", errors);
// };

//   return (
//     <div className="min-h-screen bg-[#E0DDD7] p-8">
//       <div className="max-w-5xl mx-auto">
//         <Card className="shadow-xl rounded-2xl bg-[#EFEDE9]">
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-[#5E361D]">
//                Add New Tour
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form className="space-y-8" onSubmit={handleSubmit(onSubmit, onError)}>
//               {/* Basic Info */}
//               <div>
//                 <h2 className="text-lg font-semibold text-[#5E361D] mb-3">
//                   Basic Information
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <Label>Title</Label>
//                     <Input {...register('title')} placeholder="Enter tour title" />
//                     {errors.title && (
//                     <p className="text-red-500 text-sm">
//                       {errors.title.message}
//                     </p>
//                   )}
//                   </div>
//                   <div>
//                     <Label>Duration (Days)</Label>
//                     <Input {...register('duration')} type="number" placeholder="e.g. 5" />
//                     {errors.duration && (
//                     <p className="text-red-500 text-sm">
//                       {errors.duration.message}
//                     </p>
//                   )}
//                   </div>
//                   <div className="md:col-span-2">
//                     <Label>Description</Label>
//                     <Textarea
//                       placeholder="Enter detailed description..."
//                       className="h-28"
//                       {...register('description')}
//                     />
//                      {errors.description && (
//                         <p className="text-red-500 text-sm">
//                           {errors.description.message}
//                         </p>
//                       )}
//                   </div>
//                 </div>
//               </div>

//                {/* Destination & Category */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <Label>Destination</Label>
//                   <Controller
//                     name="destination"
//                     control={control}
//                     defaultValue=""
//                     render={({ field }) => (
//                       <Select {...field} value={field.value || ''} onValueChange={field.onChange}>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select destination" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {destinations.map((d: Destination) => (
//                             <SelectItem key={d._id} value={d._id}>
//                               {d.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                   {errors.destination && (
//                     <p className="text-red-500 text-sm">
//                       {errors.destination.message}
//                     </p>
//                   )}
//                 </div>
//                      <div>
//                   <Label>Category</Label>
//                   <Controller
//                     name="category"
//                     control={control}
//                     defaultValue=""
//                     render={({ field }) => (
//                       <Select {...field} value={field.value || ''} onValueChange={field.onChange}>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Adventure">Adventure</SelectItem>
//                           <SelectItem value="Cultural">Cultural</SelectItem>
//                           <SelectItem value="Nature">Nature</SelectItem>
//                           <SelectItem value="Food & Drink">Food & Drink</SelectItem>
//                           <SelectItem value="Wildlife">Wildlife</SelectItem>
//                           <SelectItem value="Historical">Historical</SelectItem>
//                           <SelectItem value="Beach">Beach</SelectItem>
//                           <SelectItem value="Urban">Urban</SelectItem>
//                           <SelectItem value="Religious">Religious</SelectItem>
//                           <SelectItem value="Others">Others</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                   {errors.category && (
//                     <p className="text-red-500 text-sm">
//                       {errors.category.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//                {/* Price + Meeting Point */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <Label>Price</Label>
//                   <Input type="number" {...register("price")} />
//                   {errors.price && (
//                     <p className="text-red-500 text-sm">
//                       {errors.price.message}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <Label>Meeting Point</Label>
//                   <Input placeholder="e.g. Airport" {...register("meetingPoint")} />
//                   {errors.meetingPoint && (
//                     <p className="text-red-500 text-sm">
//                       {errors.meetingPoint.message}
//                     </p>
//                   )}
//                 </div>
//               </div>


//                {/* Dynamic Arrays */}
//               {/* {[
//                 { label: "Itinerary", field: itineraryField, name: "itinerary" as const },
//                 { label: "Highlights", field: highlightsField, name: "highlights" as const },
//                 { label: "Included", field: includedField, name: "included" as const },
//                 { label: "Excluded", field: excludedField, name: "excluded" as const },
//               ].map(({ label, field, name }) => (
//                 <div key={label}>
//                   <h2 className="text-lg font-semibold text-[#5E361D] mb-3">{label}</h2>
//                   {field.fields.map((f, idx) => (
//                     <div key={f.id} className="flex items-center gap-2 mb-2">
//                       <Input {...register(`${name}.${idx}`)} placeholder={`Enter ${label.toLowerCase()}...`} />
//                       <Button type="button" variant="destructive" size="icon" onClick={() => field.remove(idx)}>
//                         <Trash2 size={16} />
//                       </Button>
//                     </div>
//                   ))}
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     onClick={() =>
//                       availabilityField.append({ date: new Date(), slots: 0 }) // ✅ correct type
//                     }
//                   >
//                     <Plus className="w-4 h-4 mr-1" /> Add Availability
//                   </Button>
//                   {errors[name] && <p className="text-red-500 text-sm">{(errors[name] as any)?.message}</p>}
//                 </div>
//               ))} */}


//               {fieldSections.map(({ label, field, name }) => (
//                 <div key={name}>
//                   <h3 className="font-semibold">{label}</h3>
//                   {field.fields.map((item, index) => (
//                     <div key={item.id} className="flex gap-2 mb-2">
//                       <Controller
//                           name={`${name}.${index}` as const}
//                           control={control}
//                           render={({ field }) => (
//                             <Input {...field} placeholder={`${label} ${index + 1}`} />
//                           )}
//                         />
//                       <Button
//                         type="button"
//                         variant="destructive"
//                         onClick={() => field.remove(index)}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   ))}
//                   {errors[name] && (
//                     <p className="text-red-500 text-sm">{(errors as any)[name]?.message}</p>
//                   )}
//                   <Button type="button" variant="outline" onClick={() => field.append("")}>
//                     Add {label}
//                   </Button>
//                 </div>
//               ))}



//               {/* Availability */}
//               {/* <div>
//                 <h2 className="text-lg font-semibold text-[#5E361D] mb-3 flex items-center gap-2">
//                   <Calendar className="w-5 h-5" /> Availability
//                 </h2>
//                 {availabilityField.fields.map((f, idx) => (
//                   <div key={f.id} className="grid grid-cols-2 gap-4 mb-2">
//                     <Input type="date" {...register(`availability.${idx}.date`)} />
//                     <div className="flex gap-2">
//                       <Input type="number" placeholder="Slots" {...register(`availability.${idx}.slots`)} />
//                       <Button type="button" variant="destructive" size="icon" onClick={() => availabilityField.remove(idx)}>
//                         <Trash2 size={16} />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//                 <Button type="button" variant="outline" size="sm" onClick={() => availabilityField.append({ date: new Date(), slots: 1 })}>
//                   <Plus className="w-4 h-4 mr-1" /> Add Availability
//                 </Button>
//               </div> */}



//               <div>
//   <h2 className="text-lg font-semibold text-[#5E361D] mb-3 flex items-center gap-2">
//     <Calendar className="w-5 h-5" /> Availability
//   </h2>
//   {availabilityField.fields.map((f, idx) => (
//     <div key={f.id} className="grid grid-cols-2 gap-4 mb-2">
//       <Controller
//         name={`availability.${idx}.date`}
//         control={control}
//         render={({ field }) => (
//           <Input
//             type="date"
//             value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
//             onChange={(e) => field.onChange(new Date(e.target.value))}
//           />
//         )}
//       />
//       <div className="flex gap-2">
//         <Input type="number" placeholder="Slots" {...register(`availability.${idx}.slots`)} />
//         <Button type="button" variant="destructive" size="icon" onClick={() => availabilityField.remove(idx)}>
//           <Trash2 size={16} />
//         </Button>
//       </div>
//     </div>
//   ))}
//   <Button
//     type="button"
//     variant="outline"
//     size="sm"
//     onClick={() =>
//       availabilityField.append({ date: new Date(), slots: 1 })
//     }
//   >
//     <Plus className="w-4 h-4 mr-1" /> Add Availability
//   </Button>
// </div>






//               {/* Image Upload + Preview */}
             
             
//               {/* <div>
//                 <h2 className="text-lg font-semibold text-[#5E361D] mb-3 flex items-center gap-2">
//                   <ImageIcon className="w-5 h-5" /> Tour Images
//                 </h2>
//                 <Input type="file" multiple accept="image/*" onChange={handleImageChange} />
//                 <div className="flex flex-wrap gap-4 mt-4">
//                   {images.map((file, idx) => (
//                     <div key={idx} className="relative w-32 h-32 border rounded-lg overflow-hidden">
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt="preview"
//                         className="object-cover w-full h-full"
//                       />
//                       <button
//                         type="button"
//                         className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
//                         onClick={() => removeImage(idx)}
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div> */}

//                 {/* Images */}
//             <Controller
//   name="images"
//   control={control}
//   defaultValue={[]}
//   render={({ field }) => (
//     <>
//       <Input
//         type="file"
//         multiple
//         accept="image/png,image/jpeg"
//         onChange={(e) => {
//           const files = Array.from(e.target.files || []);
//           field.onChange(files);
//         }}
//       />
//       {errors.images && (
//         <p className="text-red-500 text-sm">{errors.images.message as string}</p>
//       )}
//       <div className="flex flex-wrap gap-4 mt-4">
//         {field.value?.map((file: File, idx: number) => (
//           <div
//             key={idx}
//             className="relative w-32 h-32 border rounded-lg overflow-hidden"
//           >
//             <img
//               src={URL.createObjectURL(file)}
//               alt="preview"
//               className="object-cover w-full h-full"
//             />
//             <button
//               type="button"
//               className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
//               onClick={() => {
//                 const newFiles = field.value.filter((_: any, i: number) => i !== idx);
//                 field.onChange(newFiles);
//               }}
//             >
//               <Trash2 size={14} />
//             </button>
//           </div>
//         ))}
//       </div>
//     </>
//   )}
// />




//               {/* <Controller
//                 name="images"
//                 control={control}
//                 defaultValue={[]}
//                 render={({ field }) => (
//                   <>
//                     <Input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={(e) => {
//                         const files = Array.from(e.target.files || []);
//                         field.onChange(files); // update RHF
//                       }}
//                     />
//                     <div className="flex flex-wrap gap-4 mt-4">
//                       {field.value?.map((file: File, idx: number) => (
//                         <div key={idx} className="relative w-32 h-32 border rounded-lg overflow-hidden">
//                           <img
//                             src={URL.createObjectURL(file)}
//                             alt="preview"
//                             className="object-cover w-full h-full"
//                           />
//                           <button
//                             type="button"
//                             className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
//                             onClick={() => {
//                               const newFiles = field.value.filter((_: any, i: number) => i !== idx);
//                               field.onChange(newFiles);
//                             }}
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               /> */}


//               {/* Submit */}
//               <div className="flex justify-end">
//                 <button type="submit" className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#5E361D] to-[#7B4B27] text-white hover:scale-105 transition">
//                   Save Tour
//                 </button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AddTourPage;



// 'use client'

// import { listDestinations } from '@/redux/slices/destinationSlice';
// import { AppDispatch } from '@/redux/store';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useRouter } from 'next/navigation';
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import * as yup from 'yup';
// import { useForm, Controller, useFieldArray } from "react-hook-form";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Trash2, Plus, Calendar, ImageIcon } from "lucide-react";



// interface Destination {
//   _id: string;
//   name: string;
// }


// const schema = yup.object({
// title: yup.string().required("Title is required").min(3),
// description: yup.string().required("Description is required").min(10),
// duration: yup.number().typeError("Duration must be a number").required().positive(),
// destination: yup.string().required("Destination is required"),
// category: yup.string().required("Category is required"),

// itinerary: yup.array().of(yup.string().required()).min(1).required(),  // ✅ add .required()
// highlights: yup.array()
// .of(yup.string().trim())
// .compact((val) => !val || val.length === 0) // removes empty strings
// .min(1, "Please add at least one highlight")
// .required(),

// included: yup.array()
// .of(yup.string().trim())
// .compact((val) => !val || val.length === 0)
// .min(1, "Please add at least one included item")
// .required(),

// excluded: yup.array()
// .of(yup.string().trim())
// .compact((val) => !val || val.length === 0)
// .min(1, "Please add at least one excluded item")
// .required(),

// price: yup.number().typeError("Price must be a number").required().positive(),

// availability: yup.array().of(
//   yup.object({
//     date: yup.date().required("Date is required"),
//     slots: yup.number().required().integer().min(1),
//   })
// ).min(1).required(), // ✅

//   images: yup.array().of(
//     yup.mixed<File>()
//       .required("File is required") // 🔑 ensures no `undefined`
//       .test("fileType", "Only jpg, jpeg or png files are allowed", (file) =>
//         file ? ["image/jpeg", "image/png"].includes(file.type) : false
//       )
//   ).min(1, "Please upload at least one image").required(),

// meetingPoint: yup.string().required().min(3),
// });

// //declaring type
// type AddTourType = yup.InferType<typeof schema>


// const AddTourPage = () => {

//   const router = useRouter()
//   const dispatch = useDispatch<AppDispatch>()
//   const{destinations} = useSelector((state: any) => state.destination)

//   useEffect(() => {
//     dispatch(listDestinations())
//   },[])

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: {errors},
//   } = useForm ({
//     resolver: yupResolver(schema)
//   })

//   const onSubmit = () =>{

//   }

//   return (
//     <div>
//          <div className="min-h-screen bg-[#E0DDD7] p-8">
//       <div className="max-w-5xl mx-auto">
//         <Card className="shadow-xl rounded-2xl bg-[#EFEDE9]">
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-[#5E361D]">
//               Add New Tour
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form
//               className="space-y-8"
//               onSubmit={handleSubmit(onSubmit)}
//             >
//               {/* Basic Info */}
//               <div>
//                 <h2 className="text-lg font-semibold text-[#5E361D] mb-3">
//                   Basic Information
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <Label>Title</Label>
//                     <Input
//                       {...register("title")}
//                       placeholder="Enter tour title"
//                     />
//                     {errors.title && (
//                       <p className="text-red-500 text-sm">
//                         {errors.title.message}
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <Label>Duration (Days)</Label>
//                     <Input
//                       {...register("duration")}
//                       type="number"
//                       placeholder="e.g. 5"
//                     />
//                     {errors.duration && (
//                       <p className="text-red-500 text-sm">
//                         {errors.duration.message}
//                       </p>
//                     )}
//                   </div>
//                   <div className="md:col-span-2">
//                     <Label>Description</Label>
//                     <Textarea
//                       placeholder="Enter detailed description..."
//                       className="h-28"
//                       {...register("description")}
//                     />
//                     {errors.description && (
//                       <p className="text-red-500 text-sm">
//                         {errors.description.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Destination & Category */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <Label>Destination</Label>
//                   <Controller
//                     name="destination"
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         {...field}
//                         value={field.value || ""}
//                         onValueChange={field.onChange}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select destination" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {destinations.map((d: Destination) => (
//                             <SelectItem key={d._id} value={d._id}>
//                               {d.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                   {errors.destination && (
//                     <p className="text-red-500 text-sm">
//                       {errors.destination.message}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <Label>Category</Label>
//                   <Controller
//                     name="category"
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         {...field}
//                         value={field.value || ""}
//                         onValueChange={field.onChange}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {[
//                             "Adventure",
//                             "Cultural",
//                             "Nature",
//                             "Food & Drink",
//                             "Wildlife",
//                             "Historical",
//                             "Beach",
//                             "Urban",
//                             "Religious",
//                             "Others",
//                           ].map((c) => (
//                             <SelectItem key={c} value={c}>
//                               {c}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                   {errors.category && (
//                     <p className="text-red-500 text-sm">
//                       {errors.category.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Price + Meeting Point */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <Label>Price</Label>
//                   <Input type="number" {...register("price")} />
//                   {errors.price && (
//                     <p className="text-red-500 text-sm">
//                       {errors.price.message}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <Label>Meeting Point</Label>
//                   <Input
//                     placeholder="e.g. Airport"
//                     {...register("meetingPoint")}
//                   />
//                   {errors.meetingPoint && (
//                     <p className="text-red-500 text-sm">
//                       {errors.meetingPoint.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Dynamic Array Sections (Itinerary, Highlights, Included, Excluded) */}
//               {fieldSections.map(({ label, field, name }) => (
//                 <div key={name}>
//                   <h3 className="font-semibold text-[#5E361D] mb-3">{label}</h3>
//                   {field.fields.map((item, index) => (
//                     <div key={item.id} className="flex gap-2 mb-2">
//                       <Controller
//                         name={`${name}.${index}`}
//                         control={control}
//                         render={({ field }) => (
//                           <Input
//                             {...field}
//                             placeholder={`${label} ${index + 1}`}
//                           />
//                         )}
//                       />
//                       <Button
//                         type="button"
//                         variant="destructive"
//                         onClick={() => field.remove(index)}
//                       >
//                         <Trash2 size={16} />
//                       </Button>
//                     </div>
//                   ))}
//                   {errors[name] && (
//                     <p className="text-red-500 text-sm">
//                       {(errors as any)[name]?.message}
//                     </p>
//                   )}
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => field.append("")}
//                   >
//                     <Plus className="w-4 h-4 mr-1" /> Add {label}
//                   </Button>
//                 </div>
//               ))}

//               {/* Availability */}
//               <div>
//                 <h2 className="text-lg font-semibold text-[#5E361D] mb-3 flex items-center gap-2">
//                   <Calendar className="w-5 h-5" /> Availability
//                 </h2>
//                 {availabilityField.fields.map((f, idx) => (
//                   <div key={f.id} className="grid grid-cols-2 gap-4 mb-2">
//                     <Controller
//                       name={`availability.${idx}.date`}
//                       control={control}
//                       render={({ field }) => (
//                         <Input
//                           type="date"
//                           value={
//                             field.value
//                               ? new Date(field.value).toISOString().split("T")[0]
//                               : ""
//                           }
//                           onChange={(e) => field.onChange(e.target.value)}
//                         />
//                       )}
//                     />
//                     <div className="flex gap-2">
//                       <Input
//                         type="number"
//                         placeholder="Slots"
//                         {...register(`availability.${idx}.slots`)}
//                       />
//                       <Button
//                         type="button"
//                         variant="destructive"
//                         size="icon"
//                         onClick={() => availabilityField.remove(idx)}
//                       >
//                         <Trash2 size={16} />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   onClick={() =>
//                     availabilityField.append({
//                       date: new Date().toISOString().split("T")[0],
//                       slots: 1,
//                     })
//                   }
//                 >
//                   <Plus className="w-4 h-4 mr-1" /> Add Availability
//                 </Button>
//               </div>

//               {/* Images */}
//               <div>
//                 <h2 className="text-lg font-semibold text-[#5E361D] mb-3 flex items-center gap-2">
//                   <ImageIcon className="w-5 h-5" /> Tour Images
//                 </h2>
//                 <Controller
//                   name="images"
//                   control={control}
//                   defaultValue={[]}
//                   render={({ field }) => (
//                     <>
//                       <Input
//                         type="file"
//                         multiple
//                         accept="image/png,image/jpeg"
//                         onChange={(e) => {
//                           const files = Array.from(e.target.files || []);
//                           field.onChange(files);
//                         }}
//                       />
//                       {errors.images && (
//                         <p className="text-red-500 text-sm">
//                           {errors.images.message as string}
//                         </p>
//                       )}
//                       <div className="flex flex-wrap gap-4 mt-4">
//                         {field.value?.map((file: File, idx: number) => (
//                           <div
//                             key={idx}
//                             className="relative w-32 h-32 border rounded-lg overflow-hidden"
//                           >
//                             <img
//                               src={URL.createObjectURL(file)}
//                               alt="preview"
//                               className="object-cover w-full h-full"
//                             />
//                             <button
//                               type="button"
//                               className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
//                               onClick={() => {
//                                 const newFiles = field.value.filter(
//                                   (_: any, i: number) => i !== idx
//                                 );
//                                 field.onChange(newFiles);
//                               }}
//                             >
//                               <Trash2 size={14} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 />
//               </div>

//               {/* Submit */}
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#5E361D] to-[#7B4B27] text-white hover:scale-105 transition"
//                 >
//                   Save Tour
//                 </button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default AddTourPage






// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { listDestinations } from "@/redux/slices/destinationSlice";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import toast from "react-hot-toast";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Trash2, Plus, Calendar, ImageIcon, X, Upload, FileImage } from "lucide-react";
// import { createTour } from "@/redux/slices/tourSlice";

// interface Destination {
//   _id: string;
//   name: string;
// }

// // Validation Schema
// const schema = yup.object({
//   title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
//   description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
//   duration: yup.number().typeError("Duration must be a number").required("Duration is required").positive("Duration must be greater than 0"),
//   destination: yup.string().required("Destination is required"),
//   category: yup.string().required("Category is required"),
  
//   itinerary: yup.array()
//     .of(yup.string().trim().required("Itinerary item is required"))
//     .min(1, "At least one itinerary item is required")
//     .required(),
    
//   highlights: yup.array()
//     .of(yup.string().trim())
//     .compact((val) => !val || val.length === 0)
//     .min(1, "Please add at least one highlight")
//     .required(),

//   included: yup.array()
//     .of(yup.string().trim())
//     .compact((val) => !val || val.length === 0)
//     .min(1, "Please add at least one included item")
//     .required(),

//   excluded: yup.array()
//     .of(yup.string().trim())
//     .compact((val) => !val || val.length === 0)
//     .min(1, "Please add at least one excluded item")
//     .required(),

//   price: yup.number().typeError("Price must be a number").required("Price is required").positive("Price must be greater than 0"),

//   availability: yup.array().of(
//     yup.object({
//       date: yup.date().required("Date is required"),
//       slots: yup.number().required("Slots is required").integer("Slots must be an integer").min(1, "At least 1 slot required"),
//     })
//   ).min(1, "At least one availability slot is required").required(),

//   images: yup.array().of(
//     yup.mixed<File>()
//       .required("File is required")
//       .test("fileType", "Only jpg, jpeg or png files are allowed", (file) =>
//         file ? ["image/jpeg", "image/png"].includes(file.type) : false
//       )
//   ).min(1, "Please upload at least one image").required(),

//   meetingPoint: yup.string().required("Meeting point is required").min(3, "Meeting point must be at least 3 characters"),
// });

// // Use the inferred type directly to avoid type mismatches
// type TourFormData = yup.InferType<typeof schema>;

// const AddTourPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { destinations } = useSelector((state: any) => state.destination);

//   // State for dynamic arrays
//   const [itinerary, setItinerary] = useState<string[]>([""]);
//   const [highlights, setHighlights] = useState<string[]>([""]);
//   const [included, setIncluded] = useState<string[]>([""]);
//   const [excluded, setExcluded] = useState<string[]>([""]);
//   const [availability, setAvailability] = useState<{ date: Date; slots: number }[]>([
//     { date: new Date(), slots: 1 }
//   ]);

//   // State for image upload
//   const [selectedImages, setSelectedImages] = useState<File[]>([]);
//   const [dragActive, setDragActive] = useState(false);

//   // Fetch destinations on component mount
//   React.useEffect(() => {
//     dispatch(listDestinations());
//   }, [dispatch]);

//   // Form setup with inferred type
//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<TourFormData>({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       title: "",
//       description: "",
//       duration: 1,
//       destination: "",
//       category: "",
//       price: 1,
//       meetingPoint: "",
//       itinerary: itinerary,
//       highlights: highlights,
//       included: included,
//       excluded: excluded,
//       availability: availability,
//       images: [],
//     }
//   });

//   // Watch category for Select component
//   const categoryValue = watch("category") || "Others";

//   // Helper functions for dynamic arrays
//   const addItem = (array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>) => {
//     setArray([...array, ""]);
//   };

//   const removeItem = (index: number, array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>) => {
//     if (array.length > 1) {
//       const newArray = array.filter((_, i) => i !== index);
//       setArray(newArray);
//       // Update form value
//       const fieldName = array === itinerary ? "itinerary" : 
//                        array === highlights ? "highlights" :
//                        array === included ? "included" : "excluded";
//       setValue(fieldName as any, newArray);
//     }
//   };

//   const updateItem = (index: number, value: string, array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>) => {
//     const newArray = [...array];
//     newArray[index] = value;
//     setArray(newArray);
//     // Update form value
//     const fieldName = array === itinerary ? "itinerary" : 
//                      array === highlights ? "highlights" :
//                      array === included ? "included" : "excluded";
//     setValue(fieldName as any, newArray);
//   };

//   const addAvailability = () => {
//     const newAvailability = [...availability, { date: new Date(), slots: 1 }];
//     setAvailability(newAvailability);
//     setValue("availability", newAvailability);
//   };

//   const removeAvailability = (index: number) => {
//     if (availability.length > 1) {
//       const newAvailability = availability.filter((_, i) => i !== index);
//       setAvailability(newAvailability);
//       setValue("availability", newAvailability);
//     }
//   };

//   const updateAvailability = (index: number, field: 'date' | 'slots', value: any) => {
//     const newAvailability = [...availability];
//     newAvailability[index] = {
//       ...newAvailability[index],
//       [field]: field === 'date' ? new Date(value) : Number(value)
//     };
//     setAvailability(newAvailability);
//     setValue("availability", newAvailability);
//   };

//   // Enhanced image handling functions
//   const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       const newImages = Array.from(files);
//       const validImages = newImages.filter(file => {
//         const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//         if (!validTypes.includes(file.type)) {
//           toast.error(`${file.name} is not a valid image file`);
//           return false;
//         }
//         if (file.size > 5 * 1024 * 1024) { // 5MB limit
//           toast.error(`${file.name} is too large (max 5MB)`);
//           return false;
//         }
//         return true;
//       });

//       const totalImages = selectedImages.length + validImages.length;
//       if (totalImages > 10) {
//         toast.error("Maximum 10 images allowed");
//         return;
//       }

//       setSelectedImages(prev => [...prev, ...validImages]);
//       setValue("images", [...selectedImages, ...validImages]);
//     }
//   };

//   const removeSelectedImage = (index: number) => {
//     const newImages = selectedImages.filter((_, i) => i !== index);
//     setSelectedImages(newImages);
//     setValue("images", newImages);
//   };

//   // Drag and drop handlers
//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const files = Array.from(e.dataTransfer.files);
//       const imageFiles = files.filter(file => file.type.startsWith('image/'));

//       if (imageFiles.length !== files.length) {
//         toast.error("Only image files are allowed");
//       }

//       const totalImages = selectedImages.length + imageFiles.length;
//       if (totalImages > 10) {
//         toast.error("Maximum 10 images allowed");
//         return;
//       }

//       setSelectedImages(prev => [...prev, ...imageFiles]);
//       setValue("images", [...selectedImages, ...imageFiles]);
//     }
//   };

//   const clearAllImages = () => {
//     setSelectedImages([]);
//     setValue("images", []);
//   };

//   // Form submission handler - FIXED to send JSON strings as expected by backend
//   const onSubmit = async (data: TourFormData) => {
//     console.log("🚀 onSubmit triggered with data:", data);

//     const formData = new FormData();
    
//     // Basic fields
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("duration", String(data.duration));
//     formData.append("destination", data.destination);
//     formData.append("category", data.category);
//     formData.append("price", String(data.price));
//     formData.append("meetingPoint", data.meetingPoint);

//     // Arrays - send as JSON strings to match backend expectations
//     formData.append("itinerary", JSON.stringify(data.itinerary));
    
//     // Filter out undefined values and send as JSON strings
//     const filteredHighlights = data.highlights?.filter((item): item is string => item !== undefined && item.trim() !== "") || [];
//     const filteredIncluded = data.included?.filter((item): item is string => item !== undefined && item.trim() !== "") || [];
//     const filteredExcluded = data.excluded?.filter((item): item is string => item !== undefined && item.trim() !== "") || [];
    
//     formData.append("highlights", JSON.stringify(filteredHighlights));
//     formData.append("included", JSON.stringify(filteredIncluded));
//     formData.append("excluded", JSON.stringify(filteredExcluded));

//     // Availability - send as JSON string
//     formData.append("availability", JSON.stringify(data.availability));

//     // Images
//     data.images.forEach((file) => {
//       if (file) {
//         formData.append("images", file);
//       }
//     });

//     // Debug: Log what we're sending
//     console.log("📤 Sending FormData:");
//     for (let [key, value] of formData.entries()) {
//       console.log(key, value);
//     }

//     try {
//       await dispatch(createTour(formData)).unwrap();
//       toast.success("Tour created successfully!");
//       router.push("/guide/tours");
//     } catch (err: any) {
//       console.error("❌ Tour creation failed:", err);
//       toast.error(err?.message || "Failed to create tour");
//     }
//   };

//   const onError = (errors: any) => {
//     console.error("❌ Validation Errors:", errors);
//   };

//   return (
//     <div className="min-h-screen bg-[#E0DDD7] p-8">
//       <div className="max-w-5xl mx-auto">
//         <Card className="shadow-xl rounded-2xl bg-[#EFEDE9]">
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-[#5E361D]">
//               Add New Tour
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form
//               className="space-y-8"
//               onSubmit={handleSubmit(onSubmit, onError)}
//             >
//               {/* Basic Info */}
//               <div>
//                 <h2 className="text-lg font-semibold text-[#5E361D] mb-3">
//                   Basic Information
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <Label>Title</Label>
//                     <Input
//                       {...register("title")}
//                       placeholder="Enter tour title"
//                     />
//                     {errors.title && (
//                       <p className="text-red-500 text-sm">
//                         {errors.title.message}
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <Label>Duration (Days)</Label>
//                     <Input
//                       {...register("duration")}
//                       type="number"
//                       placeholder="e.g. 5"
//                     />
//                     {errors.duration && (
//                       <p className="text-red-500 text-sm">
//                         {errors.duration.message}
//                       </p>
//                     )}
//                   </div>
//                   <div className="md:col-span-2">
//                     <Label>Description</Label>
//                     <Textarea
//                       placeholder="Enter detailed description..."
//                       className="h-28"
//                       {...register("description")}
//                     />
//                     {errors.description && (
//                       <p className="text-red-500 text-sm">
//                         {errors.description.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Destination & Category */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <Label>Destination</Label>
//                   <Controller
//                     name="destination"
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         {...field}
//                         value={field.value || ""}
//                         onValueChange={field.onChange}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select destination" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {destinations?.map((d: Destination) => (
//                             <SelectItem key={d._id} value={d._id}>
//                               {d.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                   {errors.destination && (
//                     <p className="text-red-500 text-sm">
//                       {errors.destination.message}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <Label>Category</Label>
//                   <Select value={categoryValue} onValueChange={(val) => setValue("category", val)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {[
//                         "Adventure",
//                         "Cultural",
//                         "Nature",
//                         "Food & Drink",
//                         "Wildlife",
//                         "Historical",
//                         "Beach",
//                         "Urban",
//                         "Religious",
//                         "Others",
//                       ].map((c) => (
//                         <SelectItem key={c} value={c}>
//                           {c}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {errors.category && (
//                     <p className="text-red-500 text-sm">
//                       {errors.category.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Price + Meeting Point */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <Label>Price</Label>
//                   <Input type="number" {...register("price")} />
//                   {errors.price && (
//                     <p className="text-red-500 text-sm">
//                       {errors.price.message}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <Label>Meeting Point</Label>
//                   <Input
//                     placeholder="e.g. Airport"
//                     {...register("meetingPoint")}
//                   />
//                   {errors.meetingPoint && (
//                     <p className="text-red-500 text-sm">
//                       {errors.meetingPoint.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Dynamic Array Sections */}
//               {[
//                 { label: "Itinerary", array: itinerary, setArray: setItinerary, fieldName: "itinerary" as const },
//                 { label: "Highlights", array: highlights, setArray: setHighlights, fieldName: "highlights" as const },
//                 { label: "Included", array: included, setArray: setIncluded, fieldName: "included" as const },
//                 { label: "Excluded", array: excluded, setArray: setExcluded, fieldName: "excluded" as const },
//               ].map(({ label, array, setArray, fieldName }) => (
//                 <div key={fieldName}>
//                   <h3 className="font-semibold text-[#5E361D] mb-3">{label}</h3>
//                   {array.map((item, index) => (
//                     <div key={index} className="flex gap-2 mb-2">
//                       <Input
//                         value={item}
//                         onChange={(e) => updateItem(index, e.target.value, array, setArray)}
//                         placeholder={`${label} ${index + 1}`}
//                       />
//                       <Button
//                         type="button"
//                         variant="destructive"
//                         onClick={() => removeItem(index, array, setArray)}
//                       >
//                         <Trash2 size={16} />
//                       </Button>
//                     </div>
//                   ))}
//                   {errors[fieldName] && (
//                     <p className="text-red-500 text-sm">
//                       {(errors as any)[fieldName]?.message}
//                     </p>
//                   )}
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => addItem(array, setArray)}
//                   >
//                     <Plus className="w-4 h-4 mr-1" /> Add {label}
//                   </Button>
//                 </div>
//               ))}

//               {/* Availability */}
//               <div>
//                 <h2 className="text-lg font-semibold text-[#5E361D] mb-3 flex items-center gap-2">
//                   <Calendar className="w-5 h-5" /> Availability
//                 </h2>
//                 {availability.map((slot, idx) => (
//                   <div key={idx} className="grid grid-cols-2 gap-4 mb-2">
//                     <Input
//                       type="date"
//                       value={slot.date ? slot.date.toISOString().split("T")[0] : ""}
//                       onChange={(e) => updateAvailability(idx, 'date', e.target.value)}
//                     />
//                     <Input
//                       type="number"
//                       placeholder="Slots"
//                       value={slot.slots || ""}
//                       onChange={(e) => updateAvailability(idx, 'slots', e.target.value)}
//                     />
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       onClick={() => removeAvailability(idx)}
//                     >
//                       <Trash2 size={16} />
//                     </Button>
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   onClick={addAvailability}
//                 >
//                   <Plus className="w-4 h-4 mr-1" /> Add Availability
//                 </Button>
//                 {errors.availability && (
//                   <p className="text-red-500 text-sm">
//                     {errors.availability.message}
//                   </p>
//                 )}
//               </div>

//               {/* Enhanced Images Section */}
//               <div>
//                 <h2 className="text-lg font-semibold text-[#5E361D] mb-3 flex items-center gap-2">
//                   <ImageIcon className="w-5 h-5" /> Tour Images
//                 </h2>
                
//                 {/* Drag and Drop Zone */}
//                 <div 
//                   className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
//                     dragActive 
//                       ? 'border-blue-500 bg-blue-50' 
//                       : 'border-gray-300 hover:border-gray-400'
//                   }`}
//                   onDragEnter={handleDrag}
//                   onDragLeave={handleDrag}
//                   onDragOver={handleDrag}
//                   onDrop={handleDrop}
//                 >
//                   <FileImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                   <p className="text-gray-600 mb-2">
//                     Drag and drop images here, or click to select
//                   </p>
//                   <p className="text-sm text-gray-500 mb-4">
//                     Supports JPG, PNG • Max 5MB per file • Up to 10 images
//                   </p>
                  
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/png,image/jpeg,image/jpg"
//                     onChange={handleImageSelect}
//                     className="hidden"
//                     id="image-upload"
//                   />
//                   <label
//                     htmlFor="image-upload"
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer inline-flex items-center gap-2"
//                   >
//                     <Upload size={16} />
//                     Choose Images
//                   </label>
//                 </div>

//                 {/* Selected Images Preview */}
//                 {selectedImages.length > 0 && (
//                   <div className="mt-6">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-medium">
//                         Selected Images ({selectedImages.length}/10)
//                       </h3>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={clearAllImages}
//                         className="text-red-600 border-red-300 hover:bg-red-50"
//                       >
//                         Clear All
//                       </Button>
//                     </div>
                    
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                       {selectedImages.map((image, index) => (
//                         <div key={index} className="relative group">
//                           <img
//                             src={URL.createObjectURL(image)}
//                             alt={`Selected ${index + 1}`}
//                             className="rounded-xl w-full h-32 object-cover shadow-md"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeSelectedImage(index)}
//                             className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
//                           >
//                             <X size={12} />
//                           </button>
//                           <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
//                             {(image.size / 1024 / 1024).toFixed(1)}MB
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {errors.images && (
//                   <p className="text-red-500 text-sm mt-2">
//                     {errors.images.message as string}
//                   </p>
//                 )}
//               </div>

//               {/* Submit */}
//               <div className="flex justify-end">
//                 <Button
//                   type="submit"
//                   className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#5E361D] to-[#7B4B27] text-white hover:scale-105 transition"
//                 >
//                   Save Tour
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AddTourPage;




"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { listDestinations } from "@/redux/slices/destinationSlice";
import { useForm, Controller } from "react-hook-form";
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
import { Trash2, Plus, Calendar, ImageIcon, X, Upload, FileImage, ArrowLeft, Save, Tag, MapPin, DollarSign } from "lucide-react";
import { createTour } from "@/redux/slices/tourSlice";

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
      date: yup.date().required("Date is required"),
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
  const [availability, setAvailability] = useState<{ date: Date; slots: number }[]>([
    { date: new Date(), slots: 1 }
  ]);

  // State for image upload
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Fetch destinations on component mount
  React.useEffect(() => {
    dispatch(listDestinations());
  }, [dispatch]);

  // Form setup with inferred type
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
      availability: availability,
      images: [],
    }
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

  const addAvailability = () => {
    const newAvailability = [...availability, { date: new Date(), slots: 1 }];
    setAvailability(newAvailability);
    setValue("availability", newAvailability);
  };

  const removeAvailability = (index: number) => {
    if (availability.length > 1) {
      const newAvailability = availability.filter((_, i) => i !== index);
      setAvailability(newAvailability);
      setValue("availability", newAvailability);
    }
  };

  const updateAvailability = (index: number, field: 'date' | 'slots', value: any) => {
    const newAvailability = [...availability];
    newAvailability[index] = {
      ...newAvailability[index],
      [field]: field === 'date' ? new Date(value) : Number(value)
    };
    setAvailability(newAvailability);
    setValue("availability", newAvailability);
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
    console.log("🚀 onSubmit triggered with data:", data);

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
    console.log("📤 Sending FormData:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      await dispatch(createTour(formData)).unwrap();
      toast.success("Tour created successfully!");
      router.push("/guide/tours");
    } catch (err: any) {
      console.error("❌ Tour creation failed:", err);
      toast.error(err?.message || "Failed to create tour");
    }
  };

  const onError = (errors: any) => {
    console.error("❌ Validation Errors:", errors);
  };

  return (
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
                        <DollarSign className="text-purple-600" size={16} />
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
                      {availability.map((slot, idx) => (
                        <div key={idx} className="flex items-end gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
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
                      onClick={addAvailability}
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
                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-slate-600 text-xs font-bold">3</span>
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
  );
};

export default AddTourPage;