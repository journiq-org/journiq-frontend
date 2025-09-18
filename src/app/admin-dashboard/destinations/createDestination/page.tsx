// "use client";

// import React, { useState, useCallback } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { createDestination } from "@/redux/slices/destinationSlice";

// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import {
//   MapPin,
//   Image as ImageIcon,
//   Tag,
//   Calendar,
//   Building,
//   FileText,
//   Loader2,
//   CheckCircle,
//   AlertCircle,
//   X,
//   Plus,
//   Upload,
//   Trash2
// } from "lucide-react";

// // Validation schema
// // const schema = yup.object({
// //   name: yup.string().required("Destination name is required").min(2, "Name must be at least 2 characters"),
// //   country: yup.string().required("Country is required"),
// //   city: yup.string().optional(),
// //   description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
// //   images: yup.array().of(
// //     yup.mixed<File>()
// //       .required("File is required")
// //       .test("fileType", "Only jpg, jpeg or png files are allowed", (file) =>
// //         file ? ["image/jpeg", "image/png", "image/jpg"].includes(file.type) : false
// //       )
// //   ).min(1, "Please upload at least one image").required(),
// //   popularAttractions: yup.array().of(yup.string().trim().min(1, "Attraction name cannot be empty")).min(1, "At least one attraction is required"),
// //   bestSeason: yup.string().optional(),
// //   tags: yup.array().of(yup.string().trim().min(1, "Tag cannot be empty")).min(1, "At least one tag is required"),
// //   lat: yup
// //     .number()
// //     .typeError("Latitude must be a valid number")
// //     .min(-90, "Latitude must be between -90 and 90")
// //     .max(90, "Latitude must be between -90 and 90")
// //     .optional()
// //     .nullable(),
// //   lng: yup
// //     .number()
// //     .typeError("Longitude must be a valid number")
// //     .min(-180, "Longitude must be between -180 and 180")
// //     .max(180, "Longitude must be between -180 and 180")
// //     .optional()
// //     .nullable(),
// // });

// const schema = yup.object({
//   name: yup.string().required("Destination name is required").min(2, "Name must be at least 2 characters"),
//   country: yup.string().required("Country is required"),
//   city: yup.string().optional(),
//   description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
//   images: yup.array().of(
//     yup.mixed<File>()
//       .required("File is required")
//       .test("fileType", "Only jpg, jpeg or png files are allowed", (file) =>
//         file ? ["image/jpeg", "image/png", "image/jpg"].includes(file.type) : false
//       )
//   ).min(1, "Please upload at least one image").required(),
//   popularAttractions: yup.array().of(yup.string().trim().min(1, "Attraction name cannot be empty")).min(1, "At least one attraction is required"),
//   bestSeason: yup.string().optional(),
//   tags: yup.array().of(yup.string().trim().min(1, "Tag cannot be empty")).min(1, "At least one tag is required"),
//   lat: yup
//     .number()
//     .typeError("Latitude must be a valid number")
//     .min(-90, "Latitude must be between -90 and 90")
//     .max(90, "Latitude must be between -90 and 90")
//     .optional(),
//   lng: yup
//     .number()
//     .typeError("Longitude must be a valid number")
//     .min(-180, "Longitude must be between -180 and 180")
//     .max(180, "Longitude must be between -180 and 180")
//     .optional(),
// });



// // Define form data interface explicitly to avoid type inference issues
// // interface DestinationFormData {
// //   name: string;
// //   country: string;
// //   city: string | null;
// //   description: string;
// //   images: File[];
// //   popularAttractions: string[];
// //   bestSeason: string | null;
// //   tags: string[];
// //   lat?: number | null;
// //   lng?: number | null;
// // }
// interface DestinationFormData {
//   name: string;
//   country: string;
//   city?: string;
//   description: string;
//   images: File[];
//   popularAttractions: string[];
//   bestSeason?: string;
//   tags: string[];
//   lat?: number;
//   lng?: number;
// }

// interface ImagePreview {
//   file: File;
//   preview: string;
//   id: string;
// }

// export default function CreateDestinationPage() {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
//   const [dragOver, setDragOver] = useState(false);
  
//   // State for dynamic arrays
//   const [popularAttractions, setPopularAttractions] = useState<string[]>(['']);
//   const [tags, setTags] = useState<string[]>(['']);

//   // Form setup with explicit typing
//   // const {
//   //   register,
//   //   handleSubmit,
//   //   setValue,
//   //   watch,
//   //   formState: { errors, isValid },
//   // } = useForm<DestinationFormData>({
//   //   resolver: yupResolver(schema),
//   //   defaultValues: {
//   //     popularAttractions: [''],
//   //     tags: ['']
//   //   },
//   //   mode: 'onChange'
//   // });

//   const {
//   register,
//   handleSubmit,
//   setValue,
//   watch,
//   formState: { errors, isValid },
// } = useForm<DestinationFormData>({
//   resolver: yupResolver(schema),
//   defaultValues: {
//     name: '',
//     country: '',
//     city: '',
//     description: '',
//     images: [],
//     popularAttractions: [''],
//     bestSeason: '',
//     tags: ['']
//   },
//   mode: 'onChange'
// });

//   // Helper functions for dynamic arrays
//   const addItem = (array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>, fieldName: keyof DestinationFormData) => {
//     const newArray = [...array, ''];
//     setArray(newArray);
//     setValue(fieldName, newArray as any);
//   };

//   const removeItem = (index: number, array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>, fieldName: keyof DestinationFormData) => {
//     if (array.length > 1) {
//       const newArray = array.filter((_, i) => i !== index);
//       setArray(newArray);
//       setValue(fieldName, newArray as any);
//     }
//   };

//   const updateItem = (index: number, value: string, array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>, fieldName: keyof DestinationFormData) => {
//     const newArray = [...array];
//     newArray[index] = value;
//     setArray(newArray);
//     setValue(fieldName, newArray as any);
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

//       const totalImages = imagePreviews.length + validImages.length;
//       if (totalImages > 10) {
//         toast.error("Maximum 10 images allowed");
//         return;
//       }

//       const previews = validImages.map(file => ({
//         file,
//         preview: URL.createObjectURL(file),
//         id: Math.random().toString(36).substr(2, 9)
//       }));

//       setImagePreviews(prev => [...prev, ...previews]);
//       setValue("images", [...imagePreviews.map(p => p.file), ...validImages]);
//     }
//   };

//   const removeSelectedImage = (index: number) => {
//     const newPreviews = imagePreviews.filter((_, i) => i !== index);
//     const newImages = newPreviews.map(p => p.file);
    
//     setImagePreviews(newPreviews);
//     setValue("images", newImages);
//   };

//   // Drag and drop handlers
//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragOver(true);
//     } else if (e.type === "dragleave") {
//       setDragOver(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragOver(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const files = Array.from(e.dataTransfer.files);
//       const imageFiles = files.filter(file => file.type.startsWith('image/'));

//       if (imageFiles.length !== files.length) {
//         toast.error("Only image files are allowed");
//       }

//       const totalImages = imagePreviews.length + imageFiles.length;
//       if (totalImages > 10) {
//         toast.error("Maximum 10 images allowed");
//         return;
//       }

//       const validImages = imageFiles.filter(file => {
//         if (file.size > 5 * 1024 * 1024) {
//           toast.error(`${file.name} is too large (max 5MB)`);
//           return false;
//         }
//         return true;
//       });

//       const previews = validImages.map(file => ({
//         file,
//         preview: URL.createObjectURL(file),
//         id: Math.random().toString(36).substr(2, 9)
//       }));

//       setImagePreviews(prev => [...prev, ...previews]);
//       setValue("images", [...imagePreviews.map(p => p.file), ...validImages]);
//     }
//   };

//   const clearAllImages = () => {
//     setImagePreviews([]);
//     setValue("images", []);
//   };

//   // Form submission handler with proper typing
//   const onSubmit = async (data: DestinationFormData) => {
//     if (isSubmitting) return;

//     setIsSubmitting(true);
    
//     try {
//       const formData = new FormData();

//       // Basic fields
//   formData.append("name", data.name);
//   formData.append("country", data.country);
//   if (data.city && data.city.trim() !== '') {
//     formData.append("city", data.city);
//   }
//   formData.append("description", data.description);

//   // Arrays - send as JSON strings to match backend expectations
//   const filteredAttractions = data.popularAttractions.filter(attr => attr && attr.trim() !== '');
//   formData.append("popularAttractions", JSON.stringify(filteredAttractions));

//   // Filter out undefined values and send as JSON strings
//   const filteredTags = data.tags.filter(tag => tag && tag.trim() !== "");
//   formData.append("tags", JSON.stringify(filteredTags));

//   // Optional fields
//   if (data.bestSeason && data.bestSeason.trim() !== '') {
//     formData.append("bestSeason", data.bestSeason);
//   }

//   // Location (only if both coordinates are provided)
//   if (data.lat !== undefined && data.lng !== undefined && 
//       data.lat !== null && data.lng !== null) {
//     formData.append("location", JSON.stringify({ 
//       lat: Number(data.lat), 
//       lng: Number(data.lng) 
//     }));
//   }

    

//       // Debug: Log what we're sending
//       console.log("📤 Sending FormData:");
//       for (let [key, value] of formData.entries()) {
//         console.log(key, value);
//       }

//       await dispatch(createDestination(formData)).unwrap();
      
//       toast.success('Destination created successfully!', {
//         icon: '🎉',
//         duration: 4000,
//       });
      
//       router.push('/admin-dashboard/destinations');
      
//     } catch (error: any) {
//       console.error('Destination creation failed:', error);
      
//       const errorMessage = error?.message || 'Failed to create destination. Please try again.';
//       toast.error(errorMessage, {
//         icon: '❌',
//         duration: 5000,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Create New Destination</h1>
//               <p className="text-gray-600 mt-2">Add a new destination for guides to create tours</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               {isValid && imagePreviews.length > 0 && (
//                 <div className="flex items-center text-green-600">
//                   <CheckCircle className="w-5 h-5 mr-1" />
//                   <span className="text-sm">Ready to submit</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Main Form */}
//           <div className="lg:col-span-3 space-y-8">
//             <Card className="shadow-lg border-0 bg-white">
//               <CardHeader className="pb-6">
//                 <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
//                   <MapPin size={24} />
//                   Destination Information
//                 </CardTitle>
//                 <p className="text-slate-600 mt-2">Provide comprehensive details about the destination</p>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//                   {/* Basic Information Section */}
//                   <div className="space-y-6">
//                     <div className="flex items-center gap-2 mb-4">
//                       <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//                         <span className="text-blue-600 text-sm font-bold">1</span>
//                       </div>
//                       <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium text-slate-700">Destination Name *</Label>
//                         <Input
//                           {...register("name")}
//                           placeholder="e.g., Taj Mahal, Paris, Bali"
//                           className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                         />
//                         {errors.name && (
//                           <p className="text-red-500 text-sm flex items-center gap-1">
//                             <span>•</span> {errors.name.message}
//                           </p>
//                         )}
//                       </div>

//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium text-slate-700">Country *</Label>
//                         <Input
//                           {...register("country")}
//                           placeholder="e.g., India, France, Indonesia"
//                           className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                         />
//                         {errors.country && (
//                           <p className="text-red-500 text-sm flex items-center gap-1">
//                             <span>•</span> {errors.country.message}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label className="text-sm font-medium text-slate-700">City (Optional)</Label>
//                       <Input
//                         {...register("city")}
//                         placeholder="e.g., Agra, Paris, Ubud"
//                         className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label className="text-sm font-medium text-slate-700">Description *</Label>
//                       <Textarea
//                         {...register("description")}
//                         placeholder="Describe the destination, its attractions, culture, best time to visit, etc."
//                         rows={4}
//                         className="focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
//                       />
//                       {errors.description && (
//                         <p className="text-red-500 text-sm flex items-center gap-1">
//                           <span>•</span> {errors.description.message}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Destination Content */}
//                   <div className="space-y-6">
//                     <div className="flex items-center gap-2 mb-4">
//                       <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
//                         <span className="text-amber-600 text-sm font-bold">2</span>
//                       </div>
//                       <h3 className="text-lg font-semibold text-slate-900">Destination Content</h3>
//                     </div>

//                     <div className="space-y-2">
//                       <Label className="text-sm font-medium text-slate-700">Popular Attractions *</Label>
//                       {popularAttractions.map((item, index) => (
//                         <div key={index} className="flex gap-3 items-center">
//                           <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                             <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
//                           </div>
//                           <div className="flex-1">
//                             <Input
//                               value={item}
//                               onChange={(e) => updateItem(index, e.target.value, popularAttractions, setPopularAttractions, "popularAttractions")}
//                               placeholder={`Attraction ${index + 1}`}
//                               className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                           </div>
//                           <Button
//                             type="button"
//                             variant="outline"
//                             size="sm"
//                             onClick={() => removeItem(index, popularAttractions, setPopularAttractions, "popularAttractions")}
//                             className="text-red-600 border-red-300 hover:bg-red-50"
//                           >
//                             <Trash2 size={16} />
//                           </Button>
//                         </div>
//                       ))}
//                       {errors.popularAttractions && (
//                         <p className="text-red-500 text-sm flex items-center gap-1">
//                           <span>•</span> {errors.popularAttractions.message}
//                         </p>
//                       )}
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => addItem(popularAttractions, setPopularAttractions, "popularAttractions")}
//                         className="mt-2"
//                       >
//                         <Plus size={16} className="mr-2" />
//                         Add Attraction
//                       </Button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium text-slate-700">Tags *</Label>
//                         {tags.map((item, index) => (
//                           <div key={index} className="flex gap-2">
//                             <Input
//                               value={item}
//                               onChange={(e) => updateItem(index, e.target.value, tags, setTags, "tags")}
//                               placeholder={`Tag ${index + 1}`}
//                               className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                             <Button
//                               type="button"
//                               variant="outline"
//                               size="sm"
//                               onClick={() => removeItem(index, tags, setTags, "tags")}
//                               className="text-red-600 border-red-300 hover:bg-red-50"
//                             >
//                               <Trash2 size={16} />
//                             </Button>
//                           </div>
//                         ))}
//                         {errors.tags && (
//                           <p className="text-red-500 text-sm flex items-center gap-1">
//                             <span>•</span> {errors.tags.message}
//                           </p>
//                         )}
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="sm"
//                           onClick={() => addItem(tags, setTags, "tags")}
//                           className="mt-1"
//                         >
//                           <Plus size={16} className="mr-1" />
//                           Add Tag
//                         </Button>
//                       </div>

//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium text-gray-700">Best Season (Optional)</Label>
//                         <Input
//                           {...register("bestSeason")}
//                           placeholder="e.g., Winter, Summer, Monsoon"
//                           className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Location */}
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2 mb-4">
//                       <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
//                         <MapPin className="text-green-600" size={16} />
//                       </div>
//                       <h3 className="text-lg font-semibold text-slate-900">Location Coordinates</h3>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium text-slate-700">Latitude (Optional)</Label>
//                         <Input
//                           {...register("lat")}
//                           type="number"
//                           step="any"
//                           placeholder="e.g., 27.1751"
//                           className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                         />
//                         {errors.lat && (
//                           <p className="text-red-500 text-sm flex items-center gap-1">
//                             <span>•</span> {errors.lat.message}
//                           </p>
//                         )}
//                       </div>

//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium text-slate-700">Longitude (Optional)</Label>
//                         <Input
//                           {...register("lng")}
//                           type="number"
//                           step="any"
//                           placeholder="e.g., 78.0421"
//                           className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                         />
//                         {errors.lng && (
//                           <p className="text-red-500 text-sm flex items-center gap-1">
//                             <span>•</span> {errors.lng.message}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Images */}
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2 mb-4">
//                       <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
//                         <ImageIcon className="text-purple-600" size={16} />
//                       </div>
//                       <h3 className="text-lg font-semibold text-slate-900">Destination Images</h3>
//                     </div>

//                     <div
//                       className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
//                         dragOver
//                           ? 'border-blue-500 bg-blue-50'
//                           : 'border-slate-300 hover:border-slate-400'
//                       }`}
//                       onDragEnter={handleDrag}
//                       onDragLeave={handleDrag}
//                       onDragOver={handleDrag}
//                       onDrop={handleDrop}
//                     >
//                       <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
//                       <p className="text-slate-600 mb-2">
//                         Drag and drop images here, or click to select files
//                       </p>
//                       <p className="text-sm text-slate-500 mb-4">
//                         Supports JPG, PNG • Max 5MB per file • Up to 10 images
//                       </p>

//                       <input
//                         type="file"
//                         multiple
//                         accept="image/png,image/jpeg,image/jpg"
//                         onChange={handleImageSelect}
//                         className="hidden"
//                         id="image-upload"
//                       />
//                       <label
//                         htmlFor="image-upload"
//                         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer inline-flex items-center gap-2"
//                       >
//                         <Upload size={16} />
//                         Choose Images
//                       </label>
//                     </div>

//                     {imagePreviews.length > 0 && (
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between">
//                           <h4 className="text-lg font-medium text-slate-900">
//                             Selected Images ({imagePreviews.length}/10)
//                           </h4>
//                           <Button
//                             type="button"
//                             variant="outline"
//                             onClick={clearAllImages}
//                             className="text-red-600 border-red-300 hover:bg-red-50"
//                           >
//                             Clear All
//                           </Button>
//                         </div>

//                         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                           {imagePreviews.map((image, index) => (
//                             <div key={index} className="relative group">
//                               <img
//                                 src={image.preview}
//                                 alt={`Selected ${index + 1}`}
//                                 className="rounded-xl w-full h-32 object-cover shadow-md"
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() => removeSelectedImage(index)}
//                                 className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
//                               >
//                                 <X size={12} />
//                               </button>
//                               <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
//                                 {(image.file.size / 1024 / 1024).toFixed(1)}MB
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {errors.images && (
//                       <p className="text-red-500 text-sm flex items-center gap-1">
//                         <span>•</span> {errors.images.message as string}
//                       </p>
//                     )}
//                   </div>

//                   {/* Submit Button */}
//                   <div className="flex justify-end pt-6 border-t border-slate-200">
//                     <Button
//                       type="submit"
//                       disabled={isSubmitting || !isValid}
//                       className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <Loader2 size={18} className="animate-spin" />
//                           Creating...
//                         </>
//                       ) : (
//                         <>
//                           <CheckCircle size={18} />
//                           Create Destination
//                         </>
//                       )}
//                     </Button>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Progress Indicator */}
//             <Card className="bg-white shadow-sm border border-slate-200">
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold text-slate-900">Form Progress</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
//                       <span className="text-blue-600 text-xs font-bold">✓</span>
//                     </div>
//                     <span className="text-sm text-slate-700">Basic Information</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
//                       <span className="text-amber-600 text-xs font-bold">2</span>
//                     </div>
//                     <span className="text-sm text-slate-700">Destination Content</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
//                       <span className="text-green-600 text-xs font-bold">3</span>
//                     </div>
//                     <span className="text-sm text-slate-700">Location</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
//                       <span className="text-purple-600 text-xs font-bold">4</span>
//                     </div>
//                     <span className="text-sm text-slate-700">Images</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Quick Tips */}
//             <Card className="bg-blue-50 border border-blue-200">
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold text-blue-900">💡 Quick Tips</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm text-blue-800">
//                   <li>• Use descriptive names that highlight unique features</li>
//                   <li>• Include high-quality images to showcase the destination</li>
//                   <li>• Add popular attractions to help guides create tours</li>
//                   <li>• Use relevant tags for better discoverability</li>
//                   <li>• Fill location coordinates for map features</li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import React, { useState, useCallback } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Image as ImageIcon,
  Tag,
  Calendar,
  Building,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Upload,
  Trash2
} from "lucide-react";

// Validation schema - simplified to avoid type inference issues
const schema = yup.object({
  name: yup.string().required("Destination name is required").min(2, "Name must be at least 2 characters"),
  country: yup.string().required("Country is required"),
  city: yup.string().optional(),
  description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
  images: yup.array().of(
    yup.mixed<File>()
      .required("File is required")
      .test("fileType", "Only jpg, jpeg or png files are allowed", (file) =>
        file ? ["image/jpeg", "image/png", "image/jpg"].includes(file.type) : false
      )
  ).min(1, "Please upload at least one image").required(),
  // Remove complex array validation - we'll handle this manually
  popularAttractions: yup.array().of(yup.string()).min(1, "At least one attraction is required"),
  bestSeason: yup.string().optional(),
  tags: yup.array().of(yup.string()).min(1, "At least one tag is required"),
  lat: yup
    .number()
    .typeError("Latitude must be a valid number")
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .optional(),
  lng: yup
    .number()
    .typeError("Longitude must be a valid number")
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
    .optional(),
});

// Define form data interface explicitly to avoid type inference issues
interface DestinationFormData {
  name: string;
  country: string;
  city?: string;
  description: string;
  images: File[];
  popularAttractions: string[];
  bestSeason?: string;
  tags: string[];
  lat?: number;
  lng?: number;
}

interface ImagePreview {
  file: File;
  preview: string;
  id: string;
}

export default function CreateDestinationPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [dragOver, setDragOver] = useState(false);
  
  // State for dynamic arrays
  const [popularAttractions, setPopularAttractions] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>(['']);

  // Form setup with explicit typing
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      country: '',
      city: '',
      description: '',
      images: [],
      popularAttractions: [''],
      bestSeason: '',
      tags: ['']
    },
    mode: 'onChange'
  });

  // Helper functions for dynamic arrays
  const addItem = (array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>, fieldName: keyof DestinationFormData) => {
    const newArray = [...array, ''];
    setArray(newArray);
    setValue(fieldName, newArray);
  };

  const removeItem = (index: number, array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>, fieldName: keyof DestinationFormData) => {
    if (array.length > 1) {
      const newArray = array.filter((_, i) => i !== index);
      setArray(newArray);
      setValue(fieldName, newArray);
    }
  };

  const updateItem = (index: number, value: string, array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>, fieldName: keyof DestinationFormData) => {
    const newArray = [...array];
    newArray[index] = value;
    setArray(newArray);
    setValue(fieldName, newArray);
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

      const totalImages = imagePreviews.length + validImages.length;
      if (totalImages > 10) {
        toast.error("Maximum 10 images allowed");
        return;
      }

      const previews = validImages.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9)
      }));

      setImagePreviews(prev => [...prev, ...previews]);
      setValue("images", [...imagePreviews.map(p => p.file), ...validImages]);
    }
  };

  const removeSelectedImage = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newImages = newPreviews.map(p => p.file);
    
    setImagePreviews(newPreviews);
    setValue("images", newImages);
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragOver(true);
    } else if (e.type === "dragleave") {
      setDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter(file => file.type.startsWith('image/'));

      if (imageFiles.length !== files.length) {
        toast.error("Only image files are allowed");
      }

      const totalImages = imagePreviews.length + imageFiles.length;
      if (totalImages > 10) {
        toast.error("Maximum 10 images allowed");
        return;
      }

      const validImages = imageFiles.filter(file => {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 5MB)`);
          return false;
        }
        return true;
      });

      const previews = validImages.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9)
      }));

      setImagePreviews(prev => [...prev, ...previews]);
      setValue("images", [...imagePreviews.map(p => p.file), ...validImages]);
    }
  };

  const clearAllImages = () => {
    setImagePreviews([]);
    setValue("images", []);
  };

  // Custom validation for arrays (since we removed complex yup validation)
  const validateArrays = () => {
    const filteredAttractions = popularAttractions.filter(attr => attr.trim() !== '');
    const filteredTags = tags.filter(tag => tag.trim() !== '');
    
    if (filteredAttractions.length === 0) {
      return "At least one attraction is required";
    }
    if (filteredTags.length === 0) {
      return "At least one tag is required";
    }
    return null;
  };

  // Form submission handler with proper typing
  const onSubmit = async (data: DestinationFormData) => {
    if (isSubmitting) return;

    // Custom validation for arrays
    const arrayValidationError = validateArrays();
    if (arrayValidationError) {
      toast.error(arrayValidationError);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();

      // Basic fields
      formData.append("name", data.name);
      formData.append("country", data.country);
      if (data.city && data.city.trim() !== '') {
        formData.append("city", data.city);
      }
      formData.append("description", data.description);

      // Arrays - send as JSON strings to match backend expectations
      const filteredAttractions = data.popularAttractions.filter(attr => attr && attr.trim() !== '');
      formData.append("popularAttractions", JSON.stringify(filteredAttractions));

      // Filter out undefined values and send as JSON strings
      const filteredTags = data.tags.filter(tag => tag && tag.trim() !== "");
      formData.append("tags", JSON.stringify(filteredTags));

      // Optional fields
      if (data.bestSeason && data.bestSeason.trim() !== '') {
        formData.append("bestSeason", data.bestSeason);
      }

      // Location (only if both coordinates are provided)
      if (data.lat !== undefined && data.lng !== undefined) {
        formData.append("location", JSON.stringify({ 
          lat: Number(data.lat), 
          lng: Number(data.lng) 
        }));
      }

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

      await dispatch(createDestination(formData)).unwrap();
      
      toast.success('Destination created successfully!', {
        icon: '🎉',
        duration: 4000,
      });
      
      router.push('/admin-dashboard/destinations');
      return
      
    } catch (error: any) {
      console.error('Destination creation failed:', error);
      
      const errorMessage = error?.message || 'Failed to create destination. Please try again.';
      toast.error(errorMessage, {
        icon: '❌',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Destination</h1>
              <p className="text-gray-600 mt-2">Add a new destination for guides to create tours</p>
            </div>
            <div className="flex items-center space-x-2">
              {isValid && imagePreviews.length > 0 && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-1" />
                  <span className="text-sm">Ready to submit</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-3 space-y-8">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <MapPin size={24} />
                  Destination Information
                </CardTitle>
                <p className="text-slate-600 mt-2">Provide comprehensive details about the destination</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit as SubmitHandler<any>)} className="space-y-8">
                  {/* Basic Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-sm font-bold">1</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Destination Name *</Label>
                        <Input
                          {...register("name")}
                          placeholder="e.g., Taj Mahal, Paris, Bali"
                          className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <span>•</span> {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Country *</Label>
                        <Input
                          {...register("country")}
                          placeholder="e.g., India, France, Indonesia"
                          className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                        {errors.country && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <span>•</span> {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">City (Optional)</Label>
                      <Input
                        {...register("city")}
                        placeholder="e.g., Agra, Paris, Ubud"
                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Description *</Label>
                      <Textarea
                        {...register("description")}
                        placeholder="Describe the destination, its attractions, culture, best time to visit, etc."
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

                  {/* Destination Content */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <span className="text-amber-600 text-sm font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Destination Content</h3>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Popular Attractions *</Label>
                      {popularAttractions.map((item, index) => (
                        <div key={index} className="flex gap-3 items-center">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <Input
                              value={item}
                              onChange={(e) => updateItem(index, e.target.value, popularAttractions, setPopularAttractions, "popularAttractions")}
                              placeholder={`Attraction ${index + 1}`}
                              className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(index, popularAttractions, setPopularAttractions, "popularAttractions")}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                      {errors.popularAttractions && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.popularAttractions.message}
                        </p>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addItem(popularAttractions, setPopularAttractions, "popularAttractions")}
                        className="mt-2"
                      >
                        <Plus size={16} className="mr-2" />
                        Add Attraction
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Tags *</Label>
                        {tags.map((item, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={item}
                              onChange={(e) => updateItem(index, e.target.value, tags, setTags, "tags")}
                              placeholder={`Tag ${index + 1}`}
                              className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeItem(index, tags, setTags, "tags")}
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        ))}
                        {errors.tags && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <span>•</span> {errors.tags.message}
                          </p>
                        )}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addItem(tags, setTags, "tags")}
                          className="mt-1"
                        >
                          <Plus size={16} className="mr-1" />
                          Add Tag
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Best Season (Optional)</Label>
                        <Input
                          {...register("bestSeason")}
                          placeholder="e.g., Winter, Summer, Monsoon"
                          className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <MapPin className="text-green-600" size={16} />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Location Coordinates</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Latitude (Optional)</Label>
                        <Input
                          {...register("lat")}
                          type="number"
                          step="any"
                          placeholder="e.g., 27.1751"
                          className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                        {errors.lat && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <span>•</span> {errors.lat.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Longitude (Optional)</Label>
                        <Input
                          {...register("lng")}
                          type="number"
                          step="any"
                          placeholder="e.g., 78.0421"
                          className="focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                        {errors.lng && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <span>•</span> {errors.lng.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <ImageIcon className="text-purple-600" size={16} />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Destination Images</h3>
                    </div>

                    <div
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                        dragOver
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                      <p className="text-slate-600 mb-2">
                        Drag and drop images here, or click to select files
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

                    {imagePreviews.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-slate-900">
                            Selected Images ({imagePreviews.length}/10)
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
                          {imagePreviews.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image.preview}
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
                                {(image.file.size / 1024 / 1024).toFixed(1)}MB
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
                      disabled={isSubmitting || !isValid}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <CheckCircle size={18} />
                          Create Destination
                        </>
                      )}
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
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-xs font-bold">2</span>
                    </div>
                    <span className="text-sm text-slate-700">Destination Content</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs font-bold">3</span>
                    </div>
                    <span className="text-sm text-slate-700">Location</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-xs font-bold">4</span>
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
                  <li>• Use descriptive names that highlight unique features</li>
                  <li>• Include high-quality images to showcase the destination</li>
                  <li>• Add popular attractions to help guides create tours</li>
                  <li>• Use relevant tags for better discoverability</li>
                  <li>• Fill location coordinates for map features</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}