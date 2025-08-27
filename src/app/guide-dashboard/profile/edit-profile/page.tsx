"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchUserProfile, editUserProfile } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check, X, Upload } from "lucide-react";
import GuideNavbar from "@/components/GuideNavbar";

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
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setConfirmed(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(profile?.profilePic ? getImageUrl(profile.profilePic) : null);
    setConfirmed(false);
    toast("Image reset to current profile picture.", { icon: "↩️" });
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
    <GuideNavbar/>
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Edit Profile</h2>

        {/* Image Preview */}
        <div className="flex flex-col items-center mb-8 relative w-full">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow-lg"
              />
              {!confirmed && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmed(true);
                      toast.success("Image confirmed!");
                    }}
                    className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600 shadow-lg transition"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 shadow-lg transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
              {confirmed && (
                <span className="absolute -top-2 right-0 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                  Confirmed
                </span>
              )}
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition">
              <Upload className="text-gray-500 mb-2" size={28} />
              <span className="text-gray-700 font-medium">Upload Profile Picture</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 rounded-xl p-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-xl p-4 text-gray-500 bg-gray-100 cursor-not-allowed outline-none shadow-sm"
            value={email}
            readOnly
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded-xl p-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            className="w-full border border-gray-300 rounded-xl p-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <textarea
            placeholder="Bio"
            className="w-full border border-gray-300 rounded-xl p-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm resize-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default EditProfile;
