// "use client";

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



// "use client";

// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Plus, Trash2, Calendar } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { listDestinations } from "@/redux/slices/destinationSlice";
// import toast from "react-hot-toast";
// import * as yup from 'yup';
// import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Tour } from "@/types/tour";
// import api from "@/lib/api";
// import { createTour } from "@/redux/slices/tourSlice";
// import { useRouter } from "next/navigation";

// interface AddForm {
//     title: string;
//     description: string;
//     duration: number;
//     destination: string;
//     category: string;
//     itinerary: string[];
//     highlights: string[];
//     included: string[];
//     excluded: string[];
//     price: number;
//     availability: {
//         date: Date;
//         slots: number;
//     }[];
//     images: File[];
//     meetingPoint: string;
// }

// const schema: yup.Schema<AddForm> = yup.object({
//     title: yup.string().required("Title is required").min(3),
//     description: yup.string().required("Description is required").min(10),
//     duration: yup.number().typeError("Duration must be a number").required().positive(),
//     destination: yup.string().required("Destination is required"),
//     category: yup.string().required("Category is required"),
//     itinerary: yup.array().of(yup.string().required()).min(1).required(),
//     highlights: yup.array().of(yup.string().trim()).compact((val) => !val || val.length === 0).min(1, "Please add at least one highlight").required(),
//     included: yup.array().of(yup.string().trim()).compact((val) => !val || val.length === 0).min(1, "Please add at least one included item").required(),
//     excluded: yup.array().of(yup.string().trim()).compact((val) => !val || val.length === 0).min(1, "Please add at least one excluded item").required(),
//     price: yup.number().typeError("Price must be a number").required().positive(),
//     availability: yup.array().of(
//         yup.object({
//             date: yup.date().required("Date is required"),
//             slots: yup.number().required().integer().min(1),
//         })
//     ).min(1).required(),
//     images: yup.array().of(
//         yup.mixed<File>().required("File is required").test("fileType", "Only jpg, jpeg or png files are allowed", (file) =>
//             file ? ["image/jpeg", "image/png"].includes(file.type) : false
//         )
//     ).min(1, "Please upload at least one image").required(),
//     meetingPoint: yup.string().required().min(3),
// });

// const AddTourPage = () => {
//     const router = useRouter();
//     const dispatch = useDispatch<AppDispatch>();
//     const { destinations } = useSelector((state: any) => state.destination);

//     useEffect(() => {
//         dispatch(listDestinations()).unwrap();
//     }, [dispatch]);

//     const { register, handleSubmit, control, formState: { errors } } = useForm<AddForm>({
//         resolver: yupResolver(schema),
//         defaultValues: {
//             title: "",
//             description: "",
//             duration: 1,
//             destination: "",
//             category: "",
//             price: 1,
//             meetingPoint: "",
//             itinerary: ["Day 1 itinerary"],
//             highlights: [""],
//             included: [""],
//             excluded: [""],
//             availability: [{ date: new Date(), slots: 1 }],
//             images: [],
//         }
//     });

//     const itineraryField = useFieldArray<AddForm, "itinerary">({ control, name: "itinerary" });
//     const highlightsField = useFieldArray<AddForm, "highlights">({ control, name: "highlights" });
//     const includedField = useFieldArray<AddForm, "included">({ control, name: "included" });
//     const excludedField = useFieldArray<AddForm, "excluded">({ control, name: "excluded" });
//     const availabilityField = useFieldArray<AddForm, "availability">({ control, name: "availability" });

//     const onSubmit: SubmitHandler<AddForm> = async (data) => {
//         console.log("🚀 onSubmit triggered with data:", data);

//         const formData = new FormData();
//         formData.append('title', data.title);
//         formData.append("description", data.description);
//         formData.append("duration", String(data.duration));
//         formData.append("destination", data.destination);
//         formData.append("category", data.category);
//         formData.append("price", String(data.price));
//         formData.append("meetingPoint", data.meetingPoint);

//         data.itinerary.forEach((item) => formData.append("itinerary[]", item));
//         data.highlights.forEach((item) => formData.append("highlights[]", item));
//         data.included.forEach((item) => formData.append("included[]", item));
//         data.excluded.forEach((item) => formData.append("excluded[]", item));
//         data.availability.forEach((slot, idx) => {
//             formData.append(`availability[${idx}][date]`, slot.date.toISOString());
//             formData.append(`availability[${idx}][slots]`, String(slot.slots));
//         });
//         data.images.forEach((file) => formData.append("images", file));

//         try {
//             await dispatch(createTour(formData)).unwrap();
//             toast.success('Tour Created Successfully');
//             router.push('/guide/tour');
//         } catch (err) {
//             console.error("❌ Tour creation failed:", err);
//             toast.error('Tour creation failed: ' + (err.message || 'Unknown error'));
//         }
//     };

//     const onError = (errors: any) => {
//         console.error("❌ Validation Errors:", errors);
//     };

//     return (
//         <div className="min-h-screen bg-[#E0DDD7] p-8">
//             <div className="max-w-5xl mx-auto">
//                 <Card className="shadow-xl rounded-2xl bg-[#EFEDE9]">
//                     <CardHeader>
//                         <CardTitle className="text-2xl font-bold text-[#5E361D]">
//                             Add New Tour
//                         </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <form className="space-y-8" onSubmit={handleSubmit(onSubmit, onError)}>
//                             {/* Basic Info */}
//                             <div>
//                                 <h2 className="text-lg font-semibold text-[#5E361D] mb-3">
//                                     Basic Information
//                                 </h2>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div>
//                                         <Label>Title</Label>
//                                         <Input {...register('title')} placeholder="Enter tour title" />
//                                         {errors.title && (
//                                             <p className="text-red-500 text-sm">
//                                                 {errors.title.message}
//                                             </p>
//                                         )}
//                                     </div>
//                                     <div>
//                                         <Label>Duration (Days)</Label>
//                                         <Input {...register('duration')} type="number" placeholder="e.g. 5" />
//                                         {errors.duration && (
//                                             <p className="text-red-500 text-sm">
//                                                 {errors.duration.message}
//                                             </p>
//                                         )}
//                                     </div>
//                                     <div className="md:col-span-2">
//                                         <Label>Description</Label>
//                                         <Textarea
//                                             placeholder="Enter detailed description..."
//                                             className="h-28"
//                                             {...register('description')}
//                                         />
//                                         {errors.description && (
//                                             <p className="text-red-500 text-sm">
//                                                 {errors.description.message}
//                                             </p>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Destination & Category */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <Label>Destination</Label>
//                                     <Controller
//                                         name="destination"
//                                         control={control}
//                                         defaultValue=""
//                                         render={({ field }) => (
//                                             <Select {...field} value={field.value || ''} onValueChange={field.onChange}>
//                                                 <SelectTrigger>
//                                                     <SelectValue placeholder="Select destination" />
//                                                 </SelectTrigger>
//                                                 <SelectContent>
//                                                     {destinations.map((d: Destination) => (
//                                                         <SelectItem key={d._id} value={d._id}>
//                                                             {d.name}
//                                                         </SelectItem>
//                                                     ))}
//                                                 </SelectContent>
//                                             </Select>
//                                         )}
//                                     />
//                                     {errors.destination && (
//                                         <p className="text-red-500 text-sm">
//                                             {errors.destination.message}
//                                         </p>
//                                     )}
//                                 </div>
//                                 <div>
//                                     <Label>Category</Label>
//                                     <Controller
//                                         name="category"
//                                         control={control}
//                                         defaultValue=""
//                                         render={({ field }) => (
//                                             <Select {...field} value={field.value || ''} onValueChange={field.onChange}>
//                                                 <SelectTrigger>
//                                                     <SelectValue placeholder="Select category" />
//                                                 </SelectTrigger>
//                                                 <SelectContent>
//                                                     <SelectItem value="Adventure">Adventure</SelectItem>
//                                                     <SelectItem value="Cultural">Cultural</SelectItem>
//                                                     <SelectItem value="Nature">Nature</SelectItem>
//                                                     <SelectItem value="Food & Drink">Food & Drink</SelectItem>
//                                                     <SelectItem value="Wildlife">Wildlife</SelectItem>
//                                                     <SelectItem value="Historical">Historical</SelectItem>
//                                                     <SelectItem value="Beach">Beach</SelectItem>
//                                                     <SelectItem value="Urban">Urban</SelectItem>
//                                                     <SelectItem value="Religious">Religious</SelectItem>
//                                                     <SelectItem value="Others">Others</SelectItem>
//                                                 </SelectContent>
//                                             </Select>
//                                         )}
//                                     />
//                                     {errors.category && (
//                                         <p className="text-red-500 text-sm">
//                                             {errors.category.message}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Price + Meeting Point */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <Label>Price</Label>
//                                     <Input type="number" {...register("price")} />
//                                     {errors.price && (
//                                         <p className="text-red-500 text-sm">
//                                             {errors.price.message}
//                                         </p>
//                                     )}
//                                 </div>
//                                 <div>
//                                     <Label>Meeting Point</Label>
//                                     <Input placeholder="e.g. Airport" {...register("meetingPoint")} />
//                                     {errors.meetingPoint && (
//                                         <p className="text-red-500 text-sm">
//                                             {errors.meetingPoint.message}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Dynamic Arrays */}
//                             {[
//                                 { label: "Itinerary", field: itineraryField, name: "itinerary" },
//                                 { label: "Highlights", field: highlightsField, name: "highlights" },
//                                 { label: "Included", field: includedField, name: "included" },
//                                 { label: "Excluded", field: excludedField, name: "excluded" },
//                             ].map(({ label, field, name }) => (
//                                 <div key={name}>
//                                     <h3 className="font-semibold">{label}</h3>
//                                     {field.fields.map((item, index) => (
//                                         <div key={item.id} className="flex gap-2 mb-2">
//                                             <Controller
//                                                 name={`${name}.${index}` as const}
//                                                 control={control}
//                                                 render={({ field }) => (
//                                                     <Input {...field} placeholder={`${label} ${index + 1}`} />
//                                                 )}
//                                             />
//                                             <Button
//                                                 type="button"
//                                                 variant="destructive"
//                                                 onClick={() => field.remove(index)}
//                                             >
//                                                 Remove
//                                             </Button>
//                                         </div>
//                                     ))}
//                                     {errors[name] && (
//                                         <p className="text-red-500 text-sm">{(errors as any)[name]?.message}</p>
//                                     )}
//                                     <Button type="button" variant="outline" onClick={() => field.append("")}>
//                                         Add {label}
//                                     </Button>
//                                 </div>
//                             ))}

//                             {/* Availability */}
//                             <div>
//                                 <h2 className="text-lg font-semibold text-[#5E361D] mb-3 flex items-center gap-2">
//                                     <Calendar className="w-5 h-5" /> Availability
//                                 </h2>
//                                 {availabilityField.fields.map((f, idx) => (
//                                     <div key={f.id} className="grid grid-cols-2 gap-4 mb-2">
//                                         <Controller
//                                             name={`availability.${idx}.date`}
//                                             control={control}
//                                             render={({ field }) => (
//                                                 <Input
//                                                     type="date"
//                                                     value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
//                                                     onChange={(e) => field.onChange(new Date(e.target.value))}
//                                                 />
//                                             )}
//                                         />
//                                         <div className="flex gap-2">
//                                             <Input type="number" placeholder="Slots" {...register(`availability.${idx}.slots`)} />
//                                             <Button type="button" variant="destructive" size="icon" onClick={() => availabilityField.remove(idx)}>
//                                                 <Trash2 size={16} />
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 ))}
//                                 <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => availabilityField.append({ date: new Date(), slots: 1 })}
//                                 >
//                                     <Plus className="w-4 h-4 mr-1" /> Add Availability
//                                 </Button>
//                             </div>

//                             {/* Image Upload + Preview */}
//                             <Controller
//                                 name="images"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <>
//                                         <Input
//                                             type="file"
//                                             multiple
//                                             accept="image/png,image/jpeg"
//                                             onChange={(e) => {
//                                                 const files = Array.from(e.target.files || []);
//                                                 field.onChange(files);
//                                             }}
//                                         />
//                                         {errors.images && (
//                                             <p className="text-red-500 text-sm">{errors.images.message as string}</p>
//                                         )}
//                                         <div className="flex flex-wrap gap-4 mt-4">
//                                             {field.value?.map((file: File, idx: number) => (
//                                                 <div key={idx} className="relative w-32 h-32 border rounded-lg overflow-hidden">
//                                                     <img
//                                                         src={URL.createObjectURL(file)}
//                                                         alt="preview"
//                                                         className="object-cover w-full h-full"
//                                                     />
//                                                     <button
//                                                         type="button"
//                                                         className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
//                                                         onClick={() => {
//                                                             const newFiles = field.value.filter((_: any, i: number) => i !== idx);
//                                                             field.onChange(newFiles);
//                                                         }}
//                                                     >
//                                                         <Trash2 size={14} />
//                                                     </button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </>
//                                 )}
//                             />

//                             {/* Submit */}
//                             <div className="flex justify-end">
//                                 <button type="submit" className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#5E361D] to-[#7B4B27] text-white hover:scale-105 transition">
//                                     Save Tour
//                                 </button>
//                             </div>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default AddTourPage;


