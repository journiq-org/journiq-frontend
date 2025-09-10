// "use client";

// import React, { useState, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { fetchUserProfile, editUserProfile } from "@/redux/slices/userSlice";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { Check, X, Upload } from "lucide-react";
// import GuideNavbar from "@/components/GuideNavbar";

// const getImageUrl = (path?: string) =>
//   !path ? "/default-avatar.png" : path.startsWith("http") ? path : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`;

// const EditProfile = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const { profile, loading } = useAppSelector((state) => state.user);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [location, setLocation] = useState("");
//   const [bio, setBio] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [confirmed, setConfirmed] = useState(false);

//   useEffect(() => {
//     dispatch(fetchUserProfile());
//   }, [dispatch]);

//   useEffect(() => {
//     if (profile) {
//       setName(profile.name || "");
//       setEmail(profile.email || "");
//       setPhone(profile.phone || "");
//       setLocation(profile.location || "");
//       setBio(profile.bio || "");
//       if (profile.profilePic) setPreview(getImageUrl(profile.profilePic));
//     }
//   }, [profile]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0];
//     if (selected) {
//       setFile(selected);
//       setPreview(URL.createObjectURL(selected));
//       setConfirmed(false);
//     }
//   };

//   const handleRemoveFile = () => {
//     setFile(null);
//     setPreview(profile?.profilePic ? getImageUrl(profile.profilePic) : null);
//     setConfirmed(false);
//     toast("Image reset to current profile picture.", { icon: "↩️" });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("email", email);
//       formData.append("phone", phone);
//       formData.append("location", location);
//       formData.append("bio", bio);
//       if (file) formData.append("profilePic", file);

//       await dispatch(editUserProfile(formData)).unwrap();
//       toast.success("Profile updated successfully!");
//       router.push("/guide-dashboard/profile/view-profile");
//     } catch (err: any) {
//       toast.error(err?.message || "Failed to update profile");
//     }
//   };

//   return (
//     <>
//     <GuideNavbar/>
//     <div className="flex justify-center items-center min-h-[80vh] bg-gray-100 px-4">
//       <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Edit Profile</h2>

//         {/* Image Preview */}
//         <div className="flex flex-col items-center mb-8 relative w-full">
//           {preview ? (
//             <div className="relative">
//               <img
//                 src={preview}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow-lg"
//               />
//               {!confirmed && (
//                 <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setConfirmed(true);
//                       toast.success("Image confirmed!");
//                     }}
//                     className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600 shadow-lg transition"
//                   >
//                     <Check size={18} />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleRemoveFile}
//                     className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 shadow-lg transition"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//               )}
//               {confirmed && (
//                 <span className="absolute -top-2 right-0 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
//                   Confirmed
//                 </span>
//               )}
//             </div>
//           ) : (
//             <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition">
//               <Upload className="text-gray-500 mb-2" size={28} />
//               <span className="text-gray-700 font-medium">Upload Profile Picture</span>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               />
//             </label>
//           )}
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input
//             type="text"
//             placeholder="Name"
//             className="w-full border border-gray-300 rounded-xl p-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border border-gray-300 rounded-xl p-4 text-gray-500 bg-gray-100 cursor-not-allowed outline-none shadow-sm"
//             value={email}
//             readOnly
//           />

//           <input
//             type="text"
//             placeholder="Phone Number"
//             className="w-full border border-gray-300 rounded-xl p-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />

//           <input
//             type="text"
//             placeholder="Location"
//             className="w-full border border-gray-300 rounded-xl p-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />

//           <textarea
//             placeholder="Bio"
//             className="w-full border border-gray-300 rounded-xl p-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm resize-none"
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             rows={4}
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg"
//           >
//             {loading ? "Updating..." : "Update Profile"}
//           </button>
//         </form>
//       </div>
//     </div>
//     </>
//   );
// };

// export default EditProfile;


"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchUserProfile, editUserProfile } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check, X, Upload, ArrowLeft, Save, Camera, User, Mail, Phone, MapPin, FileText, Loader2, Edit3, RotateCcw, ZoomIn, ZoomOut, Crop, Trash2 } from "lucide-react";
import GuideNavbar from "@/components/GuideNavbar";
import TravellerNavbar from "@/components/TravellerNavbar";

const getImageUrl = (path?: string) =>
  !path ? "/default-avatar.png" : path.startsWith("http") ? path : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`;

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { profile, loading } = useAppSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
      setLocation(profile.location || "");
      setBio(profile.bio || "");
      if (profile.profilePic) setPreview(getImageUrl(profile.profilePic));
    }
  }, [profile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(selected.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, GIF)');
        return;
      }

      // Validate file size (5MB max)
      if (selected.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setConfirmed(false);
      setImageScale(1);
      setImageRotation(0);
      toast.success('Image uploaded successfully!');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const selected = files[0];
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

      if (!validTypes.includes(selected.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, GIF)');
        return;
      }

      if (selected.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setConfirmed(false);
      setImageScale(1);
      setImageRotation(0);
      toast.success('Image uploaded successfully!');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(profile?.profilePic ? getImageUrl(profile.profilePic) : null);
    setConfirmed(false);
    setImageScale(1);
    setImageRotation(0);
    toast("Image reset to current profile picture.", { icon: "↩️" });
  };

  const handleZoomIn = () => {
    setImageScale(prev => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setImageScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleRotate = () => {
    setImageRotation(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setImageScale(1);
    setImageRotation(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("bio", bio);
      if (file) formData.append("profilePic", file);

      await dispatch(editUserProfile(formData)).unwrap();
      toast.success("Profile updated successfully!");
      router.push("/guide-dashboard/profile/view-profile");
    } catch (err: any) {
      toast.error(err?.message || "Failed to update profile");
    }
  };

  return (
    <>
      <TravellerNavbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 group"
              >
                <ArrowLeft size={20} className="text-slate-600 group-hover:text-slate-900" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
                <p className="text-slate-600 mt-1">Update your personal information</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Profile Information</h2>
                    <p className="text-slate-600">Update your personal details and profile picture</p>
                  </div>

                  {/* Enhanced Image Editing Section */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                          <Camera className="text-blue-600" size={16} />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Profile Picture</h3>
                      </div>
                      {file && (
                        <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                          {(file.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                      )}
                    </div>

                    {/* Image Upload/Preview Area */}
                    <div className="space-y-6">
                      {/* Main Image Display */}
                      <div className="flex justify-center">
                        <div
                          className={`relative w-48 h-48 rounded-2xl overflow-hidden border-4 shadow-lg transition-all duration-300 ${
                            isDragOver ? 'border-blue-500 bg-blue-50' : 'border-white'
                          }`}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                        >
                          {preview ? (
                            <>
                              <img
                                src={preview}
                                alt="Profile"
                                className="w-full h-full object-cover transition-transform duration-200"
                                style={{
                                  transform: `scale(${imageScale}) rotate(${imageRotation}deg)`,
                                  transformOrigin: 'center center'
                                }}
                              />

                              {/* Image Overlay */}
                              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="bg-white/90 hover:bg-white text-slate-700 p-3 rounded-full shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-200"
                                  title="Change image"
                                >
                                  <Camera size={20} />
                                </button>
                              </div>

                              {/* Status Badge */}
                              {confirmed && (
                                <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1.5 shadow-lg">
                                  <Check size={12} />
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50">
                              <Camera className="text-slate-400 mb-3" size={32} />
                              <p className="text-sm text-slate-600 font-medium">No image selected</p>
                            </div>
                          )}

                          {/* Drag overlay */}
                          {isDragOver && (
                            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                              <div className="text-center">
                                <Upload className="text-blue-600 mx-auto mb-2" size={24} />
                                <p className="text-blue-700 font-medium">Drop image here</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Image Controls */}
                      {preview && (
                        <div className="bg-slate-50 rounded-xl p-4">
                          <div className="flex flex-wrap items-center justify-center gap-3">
                            <button
                              type="button"
                              onClick={handleZoomIn}
                              className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-lg transition-colors duration-200"
                              title="Zoom in"
                            >
                              <ZoomIn size={16} />
                              Zoom In
                            </button>
                            <button
                              type="button"
                              onClick={handleZoomOut}
                              className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-lg transition-colors duration-200"
                              title="Zoom out"
                            >
                              <ZoomOut size={16} />
                              Zoom Out
                            </button>
                            <button
                              type="button"
                              onClick={handleRotate}
                              className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-lg transition-colors duration-200"
                              title="Rotate"
                            >
                              <RotateCcw size={16} />
                              Rotate
                            </button>
                            <button
                              type="button"
                              onClick={handleReset}
                              className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-lg transition-colors duration-200"
                              title="Reset"
                            >
                              <RotateCcw size={16} />
                              Reset
                            </button>
                          </div>

                          <div className="mt-3 text-center">
                            <p className="text-xs text-slate-500">
                              Scale: {(imageScale * 100).toFixed(0)}% • Rotation: {imageRotation}°
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Upload Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />

                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                        >
                          <Upload size={16} />
                          {preview ? 'Change Image' : 'Upload Image'}
                        </button>

                        {preview && (
                          <>
                            {!confirmed ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setConfirmed(true);
                                    toast.success("Image confirmed!");
                                  }}
                                  className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                                >
                                  <Check size={16} />
                                  Confirm
                                </button>
                                <button
                                  type="button"
                                  onClick={handleRemoveFile}
                                  className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                                >
                                  <X size={16} />
                                  Remove
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setConfirmed(false);
                                  toast("You can now make changes to the image.", { icon: "🔄" });
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200"
                              >
                                <Edit3 size={16} />
                                Edit Again
                              </button>
                            )}
                          </>
                        )}
                      </div>

                      {/* Upload Guidelines */}
                      <div className="text-center text-sm text-slate-600 bg-slate-50 rounded-lg p-4">
                        <p className="font-medium mb-1">Image Guidelines:</p>
                        <ul className="text-xs space-y-1">
                          <li>• Recommended size: 400x400px or larger</li>
                          <li>• Supported formats: JPEG, PNG, GIF</li>
                          <li>• Maximum file size: 5MB</li>
                          <li>• Square images work best for profile photos</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center">
                          <User className="text-green-600" size={16} />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Full Name</label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors duration-200"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                          <Mail size={16} className="text-slate-400" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-500 bg-slate-50 cursor-not-allowed outline-none"
                          value={email}
                          readOnly
                        />
                        <p className="text-xs text-slate-500">Email cannot be changed</p>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                          <Phone className="text-purple-600" size={16} />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Contact Information</h3>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Phone Number</label>
                        <input
                          type="text"
                          placeholder="Enter your phone number"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors duration-200"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                          <MapPin size={16} className="text-slate-400" />
                          Location
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your location"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors duration-200"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* About Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-amber-100 rounded-md flex items-center justify-center">
                          <FileText className="text-amber-600" size={16} />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">About You</h3>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Bio</label>
                        <textarea
                          placeholder="Tell us about yourself, your experience, and what makes you a great guide..."
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-colors duration-200"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          rows={4}
                        />
                        <p className="text-xs text-slate-500">
                          {bio.length}/500 characters
                        </p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t border-slate-200">
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => router.back()}
                          className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              Updating...
                            </>
                          ) : (
                            <>
                              <Save size={18} />
                              Update Profile
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Live Preview</h3>
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img
                      src={preview || "/default-avatar.png"}
                      alt="Profile Preview"
                      className="w-full h-full rounded-full object-cover border-2 border-slate-200"
                      style={{
                        transform: `scale(${Math.min(imageScale, 1)}) rotate(${imageRotation}deg)`,
                        transformOrigin: 'center center'
                      }}
                    />
                    {confirmed && (
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                        <Check size={10} />
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-slate-900">{name || "Your Name"}</h4>
                  <p className="text-sm text-slate-600 mb-2">Professional Tour Guide</p>
                  <div className="text-xs text-slate-500 space-y-1">
                    {email && <p>📧 {email}</p>}
                    {phone && <p>📱 {phone}</p>}
                    {location && <p>📍 {location}</p>}
                  </div>
                </div>
              </div>

              {/* Image Editing Tips */}
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">🎨 Image Editing Tips</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Use zoom to adjust image size</li>
                  <li>• Rotate image for better alignment</li>
                  <li>• Reset to return to original state</li>
                  <li>• Confirm changes before saving</li>
                  <li>• High-quality images look better</li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => router.push("/traveller-dashboard/profile/change-password")}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={() => router.push("/traveller-dashboard/profile/view-profile")}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;