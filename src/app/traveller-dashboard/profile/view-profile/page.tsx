"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchUserProfile, deleteUser, logout } from "@/redux/slices/userSlice";
import { Edit2, Mail, Phone, MapPin, FileText, User as UserIcon, Loader2 } from "lucide-react";
import TravellerNavbar from "@/components/TravellerNavbar";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress } from "@mui/material";
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
        router.push("/traveller-dashboard");
        return;
      }
      dispatch(fetchUserProfile());
    };
    checkToken();
  }, [dispatch, router]);

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteUser()).unwrap();
      await fetch("/api/auth/clear-cookie", { method: "POST", credentials: "include" });
      toast.success("Account deleted successfully!");
      dispatch(logout());
      router.push("/register");
    } catch {
      toast.error("Failed to delete account");
    } finally {
      setOpenDialog(false);
    }
  };

  if (loading) {
    return (
      <>
        <TravellerNavbar />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <TravellerNavbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <TravellerNavbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#22252c] via-[#1e3a8a] to-[#22252c] px-8 py-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={getImageUrl(profile?.profilePic)}
                  alt={profile?.name || "Profile"}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <button
                  onClick={() => router.push("/traveller-dashboard/profile/edit-profile")}
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg"
                >
                  <Edit2 size={16} />
                </button>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{profile?.name || "Traveller"}</h1>
                <p className="text-blue-100 mb-4">Enjoy your trips with us!</p>
                <button
                  onClick={() => router.push("/traveller-dashboard/profile/edit-profile")}
                  className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-medium hover:bg-blue-50 flex items-center gap-2 mx-auto md:mx-0"
                >
                  <Edit2 size={16} /> Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <UserIcon size={20} /> Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Mail className="text-blue-600" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="text-slate-900 font-medium">{profile?.email}</p>
                    </div>
                  </div>
                  {profile?.phone && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Phone className="text-green-600" size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Phone</p>
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

              {/* Bio */}
              {profile?.bio && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <FileText size={20} /> About Me
                  </h3>
                  <div className="p-4 bg-slate-50 rounded-lg min-h-[100px]">
                    <p className="text-slate-700">{profile.bio}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center ">
              <button
                onClick={() => router.push("/traveller-dashboard/profile/edit-profile")}
                className="bg-gradient-to-r from-[#22252c] via-[#1e3a8a] to-[#22252c] shadow-xl text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 justify-center hover:shadow-md"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
              <button
                onClick={() => router.push("/traveller-dashboard/profile/change-password")}
                className="bg-green-100 hover:bg-green-200 text-slate-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 justify-center"
              >
                Change Password
              </button>
              <button
                onClick={() => setOpenDialog(true)}
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 justify-center"
              >
                Delete Account
              </button>
            </div>
          </div>

          {/* Dialog */}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Confirm Account Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to permanently delete your account? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
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
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

