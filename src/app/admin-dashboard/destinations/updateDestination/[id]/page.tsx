// "use client";

// import React, { useEffect, useState } from "react";
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
// import { useParams, useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { getSingleDestination, updateDestination } from "@/redux/slices/destinationSlice";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from 'yup';
// import toast from "react-hot-toast";
// import { ArrowLeft, Save, X, Upload, ImageIcon, MapPin, Globe, Tag } from "lucide-react";

// // Validation schema
// const schema = yup.object().shape({
//   name: yup.string().required("Destination name is required"),
//   country: yup.string().required("Country is required"),
//   city: yup.string().required("City is required"),
//   description: yup.string().required("Description is required"),
//   popularAttractions: yup.string().required("Popular attractions are required"),
//   bestSeason: yup.string().required("Best season is required"),
//   tags: yup.string().required("Tags are required"),
//   location: yup.object().shape({
//     lat: yup.number().required("Latitude is required"),
//     lng: yup.number().required("Longitude is required"),
//   }),
// });

// type DestinationFormValue = yup.InferType<typeof schema>;

// export default function UpdateDestinationPage() {
//   const [loaded, setLoaded] = useState(false);
//   const [existingImages, setExistingImages] = useState<string[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [newImages, setNewImages] = useState<FileList | null>(null)

//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { selectedDestination, loading } = useSelector((state: any) => state.destination);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<DestinationFormValue>({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       name: "",
//       country: "",
//       city: "",
//       description: "",
//       popularAttractions: "",
//       bestSeason: "",
//       tags: "",
//       location: {
//         lat: 0,
//         lng: 0,
//       },
//     },
//   });

//   useEffect(() => {
//     if (id) {
//       dispatch(getSingleDestination(id));
//     }
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (selectedDestination && !loaded) {
//       reset({
//         ...selectedDestination,
//         popularAttractions: selectedDestination.popularAttractions?.join('\n') || '',
//         tags: selectedDestination.tags?.join('\n') || '',
//         location: {
//           lat: selectedDestination.location?.lat || 0,
//           lng: selectedDestination.location?.lng || 0,
//         },
//       });
//       setExistingImages(selectedDestination.images || []);
//       setLoaded(true);
//     }
//   }, [selectedDestination, reset, loaded]);

//   const onSubmit = async (data: DestinationFormValue) => {
//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("country", data.country);
//     formData.append("city", data.city);
//     formData.append("description", data.description);
//     formData.append("bestSeason", data.bestSeason);

//     // Handle arrays
//     data.popularAttractions.split("\n").filter(Boolean).forEach(attraction => 
//       formData.append("popularAttractions[]", attraction.trim())
//     );
//     data.tags.split("\n").filter(Boolean).forEach(tag => 
//       formData.append("tags[]", tag.trim())
//     );

//     // Handle location
//     formData.append("location[lat]", data.location.lat.toString());
//     formData.append("location[lng]", data.location.lng.toString());

//         // Always send existingImages array (even if empty)
//     existingImages.forEach((img) => formData.append("existingImages[]", img));
    
//     // If no existing images, explicitly send empty array
//     if (existingImages.length === 0) {
//         formData.append("existingImages", "");
//     }

//     // Handle new images
//     if (newImages && newImages.length > 0) {
//         Array.from(newImages).forEach((file) => formData.append("images", file));
//     }


//     console.log("FormData to send:");
//     for (let pair of formData.entries()) {
//       console.log(pair[0], pair[1]);
//     }

//     try {
//       await dispatch(updateDestination({ id, formData })).unwrap();
//       toast.success('Destination updated successfully');
//       router.push(`/admin-dashboard/destinations/destinationDetails/${id}`);
//     } catch (err) {
//       toast.error('Error updating destination');
//       console.error(err, 'update destination error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setNewImages(e.target.files);
//     }
//   };

//   const handleCancel = () => {
//     router.push(`/admin-dashboard/destinations/destinationDetails/${id}`);
//   };

//   if (!selectedDestination && loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         <span className="ml-3 text-slate-600">Loading destination details...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b border-slate-200">
//         <div className="max-w-4xl mx-auto px-6 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={handleCancel}
//                 className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
//               >
//                 <ArrowLeft size={20} className="text-slate-600" />
//               </button>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">Update Destination</h1>
//                 <p className="text-slate-600 mt-1">Edit destination details and information</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Card className="shadow-lg border-0 bg-white">
//             <CardHeader className="pb-6">
//               <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
//                 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <Globe className="text-blue-600" size={18} />
//                 </div>
//                 Destination Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//                 {/* Basic Information Section */}
//                 <div className="space-y-6">
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
//                       <span className="text-blue-600 text-xs font-bold">1</span>
//                     </div>
//                     <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-slate-700">Destination Name</label>
//                       <Input
//                         {...register('name')}
//                         placeholder="Enter destination name"
//                         className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                       {errors.name && (
//                         <p className="text-red-500 text-sm flex items-center gap-1">
//                           <span>•</span> {errors.name.message}
//                         </p>
//                       )}
//                     </div>

//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-slate-700">Country</label>
//                       <Input
//                         {...register('country')}
//                         placeholder="Enter country"
//                         className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                       {errors.country && (
//                         <p className="text-red-500 text-sm flex items-center gap-1">
//                           <span>•</span> {errors.country.message}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-slate-700">City</label>
//                     <Input
//                       {...register('city')}
//                       placeholder="Enter city"
//                       className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                     {errors.city && (
//                       <p className="text-red-500 text-sm flex items-center gap-1">
//                         <span>•</span> {errors.city.message}
//                       </p>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-slate-700">Description</label>
//                     <Textarea
//                       {...register('description')}
//                       placeholder="Describe the destination in detail..."
//                       rows={4}
//                       className="focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                     />
//                     {errors.description && (
//                       <p className="text-red-500 text-sm flex items-center gap-1">
//                         <span>•</span> {errors.description.message}
//                       </p>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-slate-700">Best Season</label>
//                     <Input
//                       {...register('bestSeason')}
//                       placeholder="e.g., Winter, Summer, All Year"
//                       className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                     {errors.bestSeason && (
//                       <p className="text-red-500 text-sm flex items-center gap-1">
//                         <span>•</span> {errors.bestSeason.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Location Section */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center">
//                       <MapPin className="text-green-600" size={16} />
//                     </div>
//                     <h3 className="text-lg font-semibold text-slate-900">Location</h3>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-slate-700">Latitude</label>
//                       <Input
//                         {...register('location.lat')}
//                         type="number"
//                         step="any"
//                         placeholder="e.g., 40.7128"
//                         className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                       {errors.location?.lat && (
//                         <p className="text-red-500 text-sm flex items-center gap-1">
//                           <span>•</span> {errors.location.lat.message}
//                         </p>
//                       )}
//                     </div>

//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-slate-700">Longitude</label>
//                       <Input
//                         {...register('location.lng')}
//                         type="number"
//                         step="any"
//                         placeholder="e.g., -74.0060"
//                         className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                       {errors.location?.lng && (
//                         <p className="text-red-500 text-sm flex items-center gap-1">
//                           <span>•</span> {errors.location.lng.message}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Attractions & Tags */}
//                 <div className="space-y-6">
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
//                       <Tag className="text-purple-600" size={16} />
//                     </div>
//                     <h3 className="text-lg font-semibold text-slate-900">Attractions & Tags</h3>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-slate-700">Popular Attractions</label>
//                       <Textarea
//                         {...register('popularAttractions')}
//                         placeholder="Enter each attraction on a new line&#10;Eiffel Tower&#10;Louvre Museum&#10;Seine River Cruise"
//                         rows={4}
//                         className="focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                       />
//                       {errors.popularAttractions && (
//                         <p className="text-red-500 text-sm flex items-center gap-1">
//                           <span>•</span> {errors.popularAttractions.message}
//                         </p>
//                       )}
//                     </div>

//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-slate-700">Tags</label>
//                       <Textarea
//                         {...register('tags')}
//                         placeholder="Enter each tag on a new line&#10;Historical&#10;Romantic&#10;Urban&#10;Culture"
//                         rows={4}
//                         className="focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                       />
//                       {errors.tags && (
//                         <p className="text-red-500 text-sm flex items-center gap-1">
//                           <span>•</span> {errors.tags.message}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Images Section */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-6 h-6 bg-pink-100 rounded-md flex items-center justify-center">
//                       <ImageIcon className="text-pink-600" size={16} />
//                     </div>
//                     <h3 className="text-lg font-semibold text-slate-900">Destination Images</h3>
//                   </div>

//                   {/* Existing Images */}
//                   {existingImages.length > 0 && (
//                     <div className="space-y-3">
//                       <label className="text-sm font-medium text-slate-700">Current Images</label>
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         {existingImages.map((img, idx) => (
//                           <div key={idx} className="relative group">
//                             <img
//                               src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`}
//                               alt={`Current ${idx + 1}`}
//                               className="w-full h-24 object-cover rounded-lg border border-slate-200"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))}
//                               className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
//                             >
//                               <X size={12} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Upload New Images */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-slate-700">Add New Images</label>
//                     <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
//                       <Upload className="mx-auto h-8 w-8 text-slate-400 mb-2" />
//                       <div className="text-sm text-slate-600 mb-2">
//                         Click to upload or drag and drop
//                       </div>
//                       <Input
//                         type="file"
//                         multiple
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         // {...register("images")}
//                         className="hidden"
//                         id="image-upload"
//                       />
//                       <label
//                         htmlFor="image-upload"
//                         className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
//                       >
//                         Choose Images
//                       </label>
//                       {newImages && newImages.length > 0 && (
//                         <p className="text-sm text-green-600 mt-2">
//                           {newImages.length} image(s) selected
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={handleCancel}
//                     className="px-8 py-2.5"
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                         Updating...
//                       </>
//                     ) : (
//                       <>
//                         <Save className="mr-2" size={16} />
//                         Update Destination
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// }





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
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getSingleDestination, updateDestination } from "@/redux/slices/destinationSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import toast from "react-hot-toast";
import { ArrowLeft, Save, X, Upload, ImageIcon, MapPin, Globe, Tag, Trash2 } from "lucide-react";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Destination name is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  description: yup.string().required("Description is required"),
  popularAttractions: yup.string().required("Popular attractions are required"),
  bestSeason: yup.string().required("Best season is required"),
  tags: yup.string().required("Tags are required"),
  location: yup.object().shape({
    lat: yup.number().required("Latitude is required"),
    lng: yup.number().required("Longitude is required"),
  }),
});

type DestinationFormValue = yup.InferType<typeof schema>;

interface ImagePreview {
  file: File;
  preview: string;
  id: string;
}

export default function UpdateDestinationPage() {
  const [loaded, setLoaded] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedDestination, loading } = useSelector((state: any) => state.destination);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DestinationFormValue>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      country: "",
      city: "",
      description: "",
      popularAttractions: "",
      bestSeason: "",
      tags: "",
      location: {
        lat: 0,
        lng: 0,
      },
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(getSingleDestination(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedDestination && !loaded) {
      reset({
        ...selectedDestination,
        popularAttractions: selectedDestination.popularAttractions?.join('\n') || '',
        tags: selectedDestination.tags?.join('\n') || '',
        location: {
          lat: selectedDestination.location?.lat || 0,
          lng: selectedDestination.location?.lng || 0,
        },
      });
      setExistingImages(selectedDestination.images || []);
      setLoaded(true);
    }
  }, [selectedDestination, reset, loaded]);

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

      const totalImages = existingImages.length + imagePreviews.length + validImages.length;
      if (totalImages > 20) {
        toast.error("Maximum 20 images allowed total");
        return;
      }

      const previews = validImages.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9)
      }));

      setImagePreviews(prev => [...prev, ...previews]);
    }
  };

  const removeSelectedImage = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
  };

  const removeExistingImage = (index: number) => {
    const newExistingImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(newExistingImages);
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

      const totalImages = existingImages.length + imagePreviews.length + imageFiles.length;
      if (totalImages > 20) {
        toast.error("Maximum 20 images allowed total");
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
    }
  };

  const clearAllNewImages = () => {
    setImagePreviews([]);
  };

  const onSubmit = async (data: DestinationFormValue) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("description", data.description);
    formData.append("bestSeason", data.bestSeason);

    // Handle arrays
    data.popularAttractions.split("\n").filter(Boolean).forEach(attraction => 
      formData.append("popularAttractions[]", attraction.trim())
    );
    data.tags.split("\n").filter(Boolean).forEach(tag => 
      formData.append("tags[]", tag.trim())
    );

    // Handle location
    formData.append("location[lat]", data.location.lat.toString());
    formData.append("location[lng]", data.location.lng.toString());

    // Handle existing images
    existingImages.forEach((img) => formData.append("existingImages[]", img));
    
    // If no existing images, explicitly send empty array
    if (existingImages.length === 0) {
        formData.append("existingImages", "");
    }

    // Handle new images
    imagePreviews.forEach((preview) => {
      formData.append("images", preview.file);
    });

    console.log("FormData to send:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      await dispatch(updateDestination({ id, formData })).unwrap();
      toast.success('Destination updated successfully');
      router.push(`/admin-dashboard/destinations/destinationDetails/${id}`);
    } catch (err) {
      toast.error('Error updating destination');
      console.error(err, 'update destination error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/admin-dashboard/destinations/destinationDetails/${id}`);
  };

  if (!selectedDestination && loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Loading destination details...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
                <h1 className="text-2xl font-bold text-slate-900">Update Destination</h1>
                <p className="text-slate-600 mt-1">Edit destination details and information</p>
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
                  <Globe className="text-blue-600" size={18} />
                </div>
                Destination Information
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
                      <label className="text-sm font-medium text-slate-700">Destination Name</label>
                      <Input
                        {...register('name')}
                        placeholder="Enter destination name"
                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Country</label>
                      <Input
                        {...register('country')}
                        placeholder="Enter country"
                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">City</label>
                    <Input
                      {...register('city')}
                      placeholder="Enter city"
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span>•</span> {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Description</label>
                    <Textarea
                      {...register('description')}
                      placeholder="Describe the destination in detail..."
                      rows={4}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span>•</span> {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Best Season</label>
                    <Input
                      {...register('bestSeason')}
                      placeholder="e.g., Winter, Summer, All Year"
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.bestSeason && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span>•</span> {errors.bestSeason.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center">
                      <MapPin className="text-green-600" size={16} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Location</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Latitude</label>
                      <Input
                        {...register('location.lat')}
                        type="number"
                        step="any"
                        placeholder="e.g., 40.7128"
                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.location?.lat && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.location.lat.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Longitude</label>
                      <Input
                        {...register('location.lng')}
                        type="number"
                        step="any"
                        placeholder="e.g., -74.0060"
                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.location?.lng && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.location.lng.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Attractions & Tags */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                      <Tag className="text-purple-600" size={16} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Attractions & Tags</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Popular Attractions</label>
                      <Textarea
                        {...register('popularAttractions')}
                        placeholder="Enter each attraction on a new line&#10;Eiffel Tower&#10;Louvre Museum&#10;Seine River Cruise"
                        rows={4}
                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      {errors.popularAttractions && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.popularAttractions.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Tags</label>
                      <Textarea
                        {...register('tags')}
                        placeholder="Enter each tag on a new line&#10;Historical&#10;Romantic&#10;Urban&#10;Culture"
                        rows={4}
                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      {errors.tags && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.tags.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Images Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-pink-100 rounded-md flex items-center justify-center">
                      <ImageIcon className="text-pink-600" size={16} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Destination Images</h3>
                  </div>

                  {/* Existing Images */}
                  {existingImages.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700">Current Images ({existingImages.length})</label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setExistingImages([])}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          Remove All
                        </Button>
                      </div>
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
                              onClick={() => removeExistingImage(idx)}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                            >
                              <X size={12} />
                            </button>
                            <div className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                              Existing
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upload New Images */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Add New Images</label>
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
                        Supports JPG, PNG • Max 5MB per file • Up to 20 images total
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

                    {/* New Images Preview */}
                    {imagePreviews.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-slate-900">
                            New Images ({imagePreviews.length})
                          </h4>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={clearAllNewImages}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            Clear All
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {imagePreviews.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image.preview}
                                alt={`New ${index + 1}`}
                                className="rounded-lg w-full h-24 object-cover shadow-md border border-slate-200"
                              />
                              <button
                                type="button"
                                onClick={() => removeSelectedImage(index)}
                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                              >
                                <X size={12} />
                              </button>
                              <div className="absolute bottom-1 left-1 bg-green-600 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                {(image.file.size / 1024 / 1024).toFixed(1)}MB
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Total Images Summary */}
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-600">
                        Total Images: <span className="font-medium">{existingImages.length + imagePreviews.length}</span> 
                        (Existing: {existingImages.length}, New: {imagePreviews.length})
                      </p>
                    </div>
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
                        Update Destination
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