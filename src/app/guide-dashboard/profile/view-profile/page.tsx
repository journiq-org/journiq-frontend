"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchUserProfile } from "@/redux/slices/userSlice";
import { Edit2 } from "lucide-react";

const getImageUrl = (path?: string) =>
  path?.startsWith("http") ? path : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}` || "/default-avatar.png";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { profile, loading, error } = useAppSelector((state) => state.user);

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

  if (loading) return <p className="text-black text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center text-black p-6">
      <img
        src={getImageUrl(profile?.profilePic)}
        alt={profile?.name || "Profile"}
        className="w-28 h-28 rounded-full object-cover mb-4 border shadow"
      />
      <h1 className="text-2xl font-bold mb-2">Welcome, {profile?.name}</h1>
      <p className="mb-1">Email: {profile?.email}</p>
      <p className="mb-1">Phone: {profile?.phone}</p>
      {profile?.location && <p className="mb-1">Location: {profile.location}</p>}
      {profile?.bio && <p className="mb-4 text-gray-600 max-w-md">Bio: {profile.bio}</p>}

      <button
        onClick={() => router.push("/guide-dashboard/profile/edit-profile")}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
      >
        <Edit2 size={18} />
        Edit Profile
      </button>
    </div>
  );
};

export default ProfilePage;
