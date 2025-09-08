// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { fetchUserProfile } from "@/redux/slices/userSlice";
// import { Edit2 } from "lucide-react";
// import GuideTourDetailsPage from "@/app/guide/viewTourDetails/[tourId]/page";
// import GuideNavbar from "@/components/GuideNavbar";

// const getImageUrl = (path?: string) =>
//   path?.startsWith("http") ? path : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}` || "/default-avatar.png";

// const ProfilePage = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const { profile, loading, error } = useAppSelector((state) => state.user);

//   useEffect(() => {
//     const checkToken = async () => {
//       const res = await fetch("/api/auth/get-cookie");
//       const { token } = await res.json();
//       if (!token) {
//         router.push("/guide-dashboard");
//         return;
//       }
//       dispatch(fetchUserProfile());
//     };

//     checkToken();
//   }, [dispatch, router]);

//   if (loading) return <p className="text-black text-center mt-10">Loading profile...</p>;
//   if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

//   return (
// <>
//     <GuideNavbar/>
//     <div className="flex flex-col items-center justify-center min-h-[70vh] text-center text-black p-6">
//       <img
//         src={getImageUrl(profile?.profilePic)}
//         alt={profile?.name || "Profile"}
//         className="w-28 h-28 rounded-full object-cover mb-4 border shadow"
//       />
//       <h1 className="text-2xl font-bold mb-2">Welcome, {profile?.name}</h1>
//       <p className="mb-1">Email: {profile?.email}</p>
//       <p className="mb-1">Phone: {profile?.phone}</p>
//       {profile?.location && <p className="mb-1">Location: {profile.location}</p>}
//       {profile?.bio && <p className="mb-4 text-gray-600 max-w-md">Bio: {profile.bio}</p>}

//       <button
//         onClick={() => router.push("/guide-dashboard/profile/edit-profile")}
//         className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
//       >
//         <Edit2 size={18} />
//         Edit Profile
//       </button>
//     </div>
//     </>
//   );
// };

// export default ProfilePage;





"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { deleteUser, fetchUserProfile, logout } from "@/redux/slices/userSlice";
import { Edit2, Mail, Phone, MapPin, FileText, User as UserIcon, Loader2 } from "lucide-react";
import GuideNavbar from "@/components/GuideNavbar";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import toast from "react-hot-toast";

const getImageUrl = (path?: string) =>
  path?.startsWith("http") ? path : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}` || "/default-avatar.png";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { profile, loading, error } = useAppSelector((state) => state.user);


const [openDialog, setOpenDialog] = useState(false);

useEffect(() => {
    const checkToken = async () => {
      const res = await fetch("/api/auth/get-cookie");
      const { token } = await res.json();
      if (!token) {
        router.push("/guide-dashboard");
        return;
      }
      dispatch(fetchUserProfile());
    };

    checkToken();
  }, [dispatch, router]);

   const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteUser()).unwrap();
      await fetch("/api/auth/clear-cookie", {
        method: "POST",
        credentials: "include",
      });
      toast.success("Account deleted successfully!");
      dispatch(logout());
      router.push("/register");
    } catch (err) {
      toast.error("Failed to delete account");
    } finally {
      setOpenDialog(false);
    }
  };

  if (loading) {
    return (
      <>
        <GuideNavbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 text-blue-600 animate-spin mb-4" />
            <p className="text-slate-600 text-lg">Loading your profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <GuideNavbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">⚠</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Error Loading Profile</h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchUserProfile())}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <GuideNavbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
              <span className="text-slate-500">•</span>
              <p className="text-slate-600">Manage your personal information</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <img
                    src={getImageUrl(profile?.profilePic)}
                    alt={profile?.name || "Profile"}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button
                    onClick={() => router.push("/guide-dashboard/profile/edit-profile")}
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {profile?.name || "Guide"}
                  </h1>
                  <p className="text-blue-100 mb-4">
                    Professional Tour Guide
                  </p>
                  <button
                    onClick={() => router.push("/guide-dashboard/profile/edit-profile")}
                    className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2 mx-auto md:mx-0"
                  >
                    <Edit2 size={16} />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <UserIcon size={20} />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Mail className="text-blue-600" size={18} />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Email Address</p>
                          <p className="text-slate-900 font-medium">{profile?.email}</p>
                        </div>
                      </div>

                      {profile?.phone && (
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Phone className="text-green-600" size={18} />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Phone Number</p>
                            <p className="text-slate-900 font-medium">{profile.phone}</p>
                          </div>
                        </div>
                      )}

                      {profile?.location && (
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <MapPin className="text-purple-600" size={18} />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Location</p>
                            <p className="text-slate-900 font-medium">{profile.location}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio & Additional Info */}
                <div className="space-y-6">
                  {profile?.bio && (
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <FileText size={20} />
                        About Me
                      </h3>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-slate-700 leading-relaxed">{profile.bio}</p>
                      </div>
                    </div>
                  )}

                  {/* Quick Stats */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">--</div>
                        <div className="text-sm text-slate-600">Total Tours</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">--</div>
                        <div className="text-sm text-slate-600">Total Bookings</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/guide-dashboard/profile/edit-profile")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 justify-center shadow-sm hover:shadow-md"
            >
              <Edit2 size={18} />
              Edit Profile Information
            </button>
            <button
              onClick={() => router.push("/guide-dashboard/profile/change-password")}
              className="bg-green-100 hover:bg-green-200 text-slate-700 px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 justify-center"
            >
              Change Password
            </button>
            <button
            onClick={() => setOpenDialog(true)}
            className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 justify-center"
          >
            Delete Account
          </button>
          </div>

          
      {/* Confirm Delete Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete your account? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            startIcon={loading ? <CircularProgress size={18} /> : null}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

          {/* Additional Info Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <UserIcon className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Profile Completion</h3>
              <p className="text-slate-600 text-sm">Keep your profile updated</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Tour Management</h3>
              <p className="text-slate-600 text-sm">Create and manage tours</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Mail className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Communication</h3>
              <p className="text-slate-600 text-sm">Stay connected with travelers</p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default ProfilePage;