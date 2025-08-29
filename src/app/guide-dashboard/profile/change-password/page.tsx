// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import TravellerNavbar from "@/components/TravellerNavbar";
// import GuideNavbar from "@/components/GuideNavbar";

// const ChangePasswordPage = () => {
//   const router = useRouter();
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       toast.error("New password and confirm password do not match");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/users/change-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // send the cookie token
//         body: JSON.stringify({ oldPassword, newPassword }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.message || "Failed to change password");
//         setLoading(false);
//         return;
//       }

//       toast.success("Password changed successfully");
//       setOldPassword("");
//       setNewPassword("");
//       setConfirmPassword("");

//       // Optionally redirect after password change
//       router.push("/traveller-dashboard/profile/view-profile");
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//     <GuideNavbar/>
//     <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-6">Change Password</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="password"
//           placeholder="Old Password"
//           value={oldPassword}
//           onChange={(e) => setOldPassword(e.target.value)}
//           required
//           className="p-3 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//           className="p-3 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           className="p-3 border rounded"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
//         >
//           {loading ? "Changing..." : "Change Password"}
//         </button>
//       </form>
//     </div>
//     </>
//   );
// };

// export default ChangePasswordPage;



"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, Shield, ArrowLeft, CheckCircle, AlertCircle, Key, Loader2 } from "lucide-react";
import TravellerNavbar from "@/components/TravellerNavbar";
import GuideNavbar from "@/components/GuideNavbar";

const ChangePasswordPage = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthLabel = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return { label: "Weak", color: "bg-red-500", textColor: "text-red-700" };
      case 2:
      case 3:
        return { label: "Medium", color: "bg-yellow-500", textColor: "text-yellow-700" };
      case 4:
      case 5:
        return { label: "Strong", color: "bg-green-500", textColor: "text-green-700" };
      default:
        return { label: "Weak", color: "bg-red-500", textColor: "text-red-700" };
    }
  };

  const passwordStrength = getPasswordStrength(newPassword);
  const strengthInfo = getStrengthLabel(passwordStrength);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    if (passwordStrength < 3) {
      toast.error("Password is too weak. Please use a stronger password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send the cookie token
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to change password");
        setLoading(false);
        return;
      }

      toast.success("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Optionally redirect after password change
      router.push("/traveller-dashboard/profile/view-profile");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GuideNavbar />
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
                <h1 className="text-2xl font-bold text-slate-900">Change Password</h1>
                <p className="text-slate-600 mt-1">Update your account password</p>
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
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Shield className="text-blue-600" size={24} />
                      Password Security
                    </h2>
                    <p className="text-slate-600">Keep your account secure with a strong password</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Current Password */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <Key size={16} className="text-slate-400" />
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showOldPassword ? "text" : "password"}
                          placeholder="Enter your current password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          required
                          className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                        >
                          {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <Lock size={16} className="text-slate-400" />
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>

                      {/* Password Strength Indicator */}
                      {newPassword && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-slate-600">Password strength:</span>
                            <span className={`text-xs font-medium ${strengthInfo.textColor}`}>
                              {strengthInfo.label}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.color}`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            Use at least 8 characters with uppercase, lowercase, numbers, and symbols
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm New Password */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <CheckCircle size={16} className="text-slate-400" />
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className={`w-full px-4 py-3 pr-12 border rounded-lg placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors duration-200 ${
                            confirmPassword && newPassword !== confirmPassword
                              ? 'border-red-300 text-red-900'
                              : 'border-slate-300 text-slate-900'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>

                      {/* Password Match Indicator */}
                      {confirmPassword && newPassword !== confirmPassword && (
                        <div className="flex items-center gap-2 mt-2">
                          <AlertCircle size={16} className="text-red-500" />
                          <span className="text-xs text-red-600">Passwords do not match</span>
                        </div>
                      )}

                      {confirmPassword && newPassword === confirmPassword && newPassword && (
                        <div className="flex items-center gap-2 mt-2">
                          <CheckCircle size={16} className="text-green-500" />
                          <span className="text-xs text-green-600">Passwords match</span>
                        </div>
                      )}
                    </div>

                    {/* Submit Buttons */}
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
                          disabled={loading || !oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword || passwordStrength < 3}
                          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              Updating Password...
                            </>
                          ) : (
                            <>
                              <Shield size={18} />
                              Change Password
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
              {/* Password Requirements */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Shield className="text-blue-600" size={20} />
                  Password Requirements
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${newPassword.length >= 8 ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                    <span className={`text-sm ${newPassword.length >= 8 ? 'text-green-700' : 'text-slate-600'}`}>
                      At least 8 characters
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(newPassword) ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                    <span className={`text-sm ${/[A-Z]/.test(newPassword) ? 'text-green-700' : 'text-slate-600'}`}>
                      One uppercase letter
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${/[a-z]/.test(newPassword) ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                    <span className={`text-sm ${/[a-z]/.test(newPassword) ? 'text-green-700' : 'text-slate-600'}`}>
                      One lowercase letter
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${/[0-9]/.test(newPassword) ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                    <span className={`text-sm ${/[0-9]/.test(newPassword) ? 'text-green-700' : 'text-slate-600'}`}>
                      One number
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${/[^A-Za-z0-9]/.test(newPassword) ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                    <span className={`text-sm ${/[^A-Za-z0-9]/.test(newPassword) ? 'text-green-700' : 'text-slate-600'}`}>
                      One special character
                    </span>
                  </li>
                </ul>
              </div>

              {/* Security Tips */}
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  🔒 Security Tips
                </h3>
                <ul className="text-sm text-amber-800 space-y-2">
                  <li>• Use a unique password for each account</li>
                  <li>• Avoid using personal information</li>
                  <li>• Change your password regularly</li>
                  <li>• Never share your password with others</li>
                  <li>• Enable two-factor authentication if available</li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => router.push("/guide-dashboard/profile/view-profile")}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => router.push("/guide-dashboard/profile/edit-profile")}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                  >
                    Edit Profile
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

export default ChangePasswordPage;