// "use client";
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { fetchAllUsers } from "@/redux/slices/adminSlice";

// const AdminUsersPage = () => {
//   const dispatch = useAppDispatch();
//   const { allUsers, loading, error } = useAppSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(fetchAllUsers());
//   }, [dispatch]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">All Users</h1>

//       {loading && <p>Loading users...</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {allUsers.length > 0 && (
//         <div className="overflow-x-auto border rounded-lg">
//           <table className="w-full text-sm border-collapse">
//             <thead className="bg-gray-100 border-b">
//               <tr>
//                 <th className="p-2 border">User ID</th>
//                 <th className="p-2 border">Name</th>
//                 <th className="p-2 border">Email</th>
//                 <th className="p-2 border">Phone</th>
//                 <th className="p-2 border">Joined At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {allUsers.map((u) => (
//                 <tr key={u._id} className="hover:bg-gray-50 border-b">
//                   <td className="p-2 border">{u._id}</td>
//                   <td className="p-2 border">{u.name}</td>
//                   <td className="p-2 border">{u.email}</td>
//                   <td className="p-2 border">{u.phone || "-"}</td>
//                   <td className="p-2 border">{new Date(u.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {allUsers.length === 0 && !loading && <p>No users found.</p>}
//     </div>
//   );
// };

// export default AdminUsersPage;


// "use client";
// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { fetchAllUsers, toggleBlockUser, adminDeleteUser } from "@/redux/slices/adminSlice";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import toast from "react-hot-toast";

// const AdminUsersPage = () => {
//   const dispatch = useAppDispatch();
//   const { allUsers, loading, error } = useAppSelector((state) => state.admin);
  

//   const [selectedUser, setSelectedUser] = useState<any | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     dispatch(fetchAllUsers());
//   }, [dispatch]);

//   const handleBlockToggle = (id: string) => {
//     dispatch(toggleBlockUser(id))
//     .then((res) => {
//       toast.success('User Blocked Successfully')
//     })

    
//   };

//   const handleDelete = (id: string) => {
//     if (confirm("Are you sure you want to delete this user?")) {
//       dispatch(adminDeleteUser(id));
//     }
//   };

//   const openUserDetails = (user: any) => {
//     setSelectedUser(user);
//     setShowModal(true);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">All Users</h1>

//       {loading && <p>Loading users...</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {allUsers.length > 0 && (
//         <div className="overflow-x-auto border rounded-lg">
//           <table className="w-full text-sm border-collapse">
//             <thead className="bg-gray-100 border-b text-left">
//               <tr>
//                 <th className="p-2 border">User ID</th>
//                 <th className="p-2 border">Name</th>
//                 <th className="p-2 border">Email</th>
//                 <th className="p-2 border">Phone</th>
//                 <th className="p-2 border">Joined At</th>
//                 <th className="p-2 border">Status</th>
//                 <th className="p-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {allUsers.map((u) => (
//                 <tr key={u._id} className="hover:bg-gray-50 border-b">
//                   <td className="p-2 border">{u._id}</td>
//                   <td
//                     className="p-2 border cursor-pointer text-blue-600 underline"
//                     onClick={() => openUserDetails(u)}
//                   >
//                     {u.name}
//                   </td>
//                   <td className="p-2 border">{u.email}</td>
//                   <td className="p-2 border">{u.phone || "-"}</td>
//                   <td className="p-2 border">
//                     {new Date(u.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="p-2 border">
//                     {u.isBlocked ? (
//                       <span className="text-red-600 font-semibold">Blocked</span>
//                     ) : (
//                       <span className="text-green-600 font-semibold">Active</span>
//                     )}
//                   </td>
//                   <td className="p-2 border space-x-2">
//                     <Button
//                       size="sm"
//                       variant={u.isBlocked ? "default" : "destructive"}
//                       onClick={() => handleBlockToggle(u._id)}
//                     >
//                       {u.isBlocked ? "Unblock" : "Block"}
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => handleDelete(u._id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {allUsers.length === 0 && !loading && <p>No users found.</p>}

//       {/* User Detail Modal */}
//       <Dialog open={showModal} onOpenChange={setShowModal}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>User Details</DialogTitle>
//           </DialogHeader>

//           {selectedUser && (
//             <div className="space-y-2">
//               {selectedUser.profilePic && (
//                 <img
//                   src={selectedUser.profilePic}
//                   alt={selectedUser.name}
//                   className="w-24 h-24 rounded-full object-cover mx-auto"
//                 />
//               )}
//               <p><strong>Name:</strong> {selectedUser.name}</p>
//               <p><strong>Email:</strong> {selectedUser.email}</p>
//               <p><strong>Phone:</strong> {selectedUser.phone || "-"}</p>
//               <p><strong>Role:</strong> {selectedUser.role}</p>
//               <p><strong>Location:</strong> {selectedUser.location || "-"}</p>
//               <p><strong>Bio:</strong> {selectedUser.bio || "-"}</p>
//               <p>
//                 <strong>Status:</strong>{" "}
//                 {selectedUser.isBlocked ? (
//                   <span className="text-red-600">Blocked</span>
//                 ) : (
//                   <span className="text-green-600">Active</span>
//                 )}
//               </p>
//               <p>
//                 <strong>Joined:</strong>{" "}
//                 {new Date(selectedUser.createdAt).toLocaleString()}
//               </p>
//             </div>
//           )}

//           <DialogFooter>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Close
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminUsersPage;
"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { 
  fetchAllUsers, 
  toggleBlockUser, 
  adminDeleteUser, 
  getBlockedUsers 
} from "@/redux/slices/adminSlice";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MoreHorizontal, 
  Shield, 
  ShieldCheck, 
  Trash2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Loader2,
  Users,
  UserX
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { User as UserType } from "@/types/user";

const AdminUsersPage = () => {
  const dispatch = useAppDispatch();
  const { allUsers, blockedUsers, loading, error } = useAppSelector((state) => state.admin);
  
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [blockedUsersError, setBlockedUsersError] = useState<string | null>(null);

  useEffect(() => {
    // Load all users first
    dispatch(fetchAllUsers());
    
    // Try to load blocked users, but handle 404 gracefully
    dispatch(getBlockedUsers())
      .unwrap()
      .catch((err) => {
        // If it's a 404 (no blocked users), don't treat it as an error
        if (err?.response?.status === 404 || err?.message?.includes('404')) {
          console.log('No blocked users found - this is normal');
          setBlockedUsersError(null);
        } else {
          // For other errors, set the error state
          setBlockedUsersError(err?.message || 'Failed to load blocked users');
        }
      });
  }, [dispatch]);

  useEffect(() => {
    const usersToFilter = activeTab === "all" ? allUsers : blockedUsers;
    if (usersToFilter) {
      const filtered = usersToFilter.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user._id?.includes(searchTerm)
      );
      setFilteredUsers(filtered);
    }
  }, [allUsers, blockedUsers, searchTerm, activeTab]);

  const handleBlockToggle = async (id: string) => {
    try {
      const resultAction = await dispatch(toggleBlockUser(id));
      const updatedUser = resultAction.payload;
      
      toast.success(
        updatedUser.isBlocked 
          ? 'User blocked successfully' 
          : 'User unblocked successfully'
      );
      
      // Only refresh all users - blocked users list is updated by Redux slice
      dispatch(fetchAllUsers());
      
      // Note: We don't call getBlockedUsers() here because the Redux slice
      // already handles updating the blockedUsers array when a user is toggled
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(adminDeleteUser(id)).unwrap();
      toast.success('User deleted successfully');
      
      // Refresh both lists after deletion
      dispatch(fetchAllUsers());
      // Note: Redux slice handles removing deleted user from blockedUsers
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const openUserDetails = (user: UserType) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchTerm(""); // Clear search when switching tabs
  };

  // Only show loading if we're loading all users
  if (loading && allUsers.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all user accounts</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="px-3 py-1">
            <Users className="h-4 w-4 mr-1" />
            {allUsers.length} Total
          </Badge>
          <Badge variant="destructive" className="px-3 py-1">
            <UserX className="h-4 w-4 mr-1" />
            {blockedUsers.length} Blocked
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>All Users ({allUsers.length})</span>
          </TabsTrigger>
          <TabsTrigger value="blocked" className="flex items-center space-x-2">
            <UserX className="h-4 w-4" />
            <span>Blocked Users ({blockedUsers.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Search */}
        <Card className="mt-4">
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={`Search ${activeTab === "all" ? "all users" : "blocked users"} by name, email, or ID...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
        </Card>

        {/* Error State - Only show if allUsers failed to load */}
        {error && allUsers.length === 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-red-600">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Error loading users</span>
              </div>
              <p className="text-red-500 mt-1">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Blocked Users Error - Show only if there's an actual error loading blocked users */}
        {blockedUsersError && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-yellow-600">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Blocked users warning</span>
              </div>
              <p className="text-yellow-600 mt-1">{blockedUsersError}</p>
            </CardContent>
          </Card>
        )}

        {/* All Users Tab */}
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>All Users</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredUsers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Joined</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user: UserType) => (
                        <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.profilePic} alt={user.name} />
                                <AvatarFallback className="bg-blue-100 text-blue-600">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <button
                                  onClick={() => openUserDetails(user)}
                                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors text-left"
                                >
                                  {user.name}
                                </button>
                                <p className="text-sm text-gray-500">ID: {user._id.slice(-8)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2 text-sm">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span>{user.email}</span>
                              </div>
                              {user.phone && (
                                <div className="flex items-center space-x-2 text-sm">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span>{user.phone}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant={user.isBlocked ? "destructive" : "default"} className="capitalize">
                              {user.isBlocked ? "Blocked" : "Active"}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(user.createdAt)}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openUserDetails(user)}>
                                  <User className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleBlockToggle(user._id)}>
                                  {user.isBlocked ? (
                                    <>
                                      <ShieldCheck className="h-4 w-4 mr-2" />
                                      Unblock User
                                    </>
                                  ) : (
                                    <>
                                      <Shield className="h-4 w-4 mr-2" />
                                      Block User
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete User
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete User</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete {user.name}? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : !loading && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchTerm ? "No users found" : "No users registered yet"}
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm ? "Try adjusting your search terms." : "Users will appear here once they register."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blocked Users Tab */}
        <TabsContent value="blocked" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserX className="h-5 w-5" />
                <span>Blocked Users</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredUsers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Blocked Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user: UserType) => (
                        <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-red-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.profilePic} alt={user.name} />
                                <AvatarFallback className="bg-red-100 text-red-600">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <button
                                  onClick={() => openUserDetails(user)}
                                  className="font-medium text-gray-900 hover:text-red-600 transition-colors text-left"
                                >
                                  {user.name}
                                </button>
                                <p className="text-sm text-gray-500">ID: {user._id.slice(-8)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2 text-sm">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span>{user.email}</span>
                              </div>
                              {user.phone && (
                                <div className="flex items-center space-x-2 text-sm">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span>{user.phone}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(user.createdAt)}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openUserDetails(user)}>
                                  <User className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleBlockToggle(user._id)}>
                                  <ShieldCheck className="h-4 w-4 mr-2" />
                                  Unblock User
                                </DropdownMenuItem>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete User
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete User</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete {user.name}? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : !loading && (
                <div className="text-center py-12">
                  <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchTerm ? "No blocked users found" : "No blocked users"}
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm ? "Try adjusting your search terms." : "Blocked users will appear here."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Detail Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>User Details</span>
            </DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={selectedUser.profilePic} alt={selectedUser.name} />
                  <AvatarFallback className={`text-xl ${selectedUser.isBlocked ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                    {getInitials(selectedUser.name)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* User Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{selectedUser.name}</p>
                    <p className="text-sm text-gray-500">User ID: {selectedUser._id}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <p>{selectedUser.email}</p>
                </div>

                {selectedUser.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <p>{selectedUser.phone}</p>
                  </div>
                )}

                {selectedUser.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <p>{selectedUser.location}</p>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <div>
                    <Badge variant={selectedUser.isBlocked ? "destructive" : "default"}>
                      {selectedUser.isBlocked ? "Blocked" : "Active"}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">
                      Role: {selectedUser.role || "User"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <p className="text-sm">
                    Joined {new Date(selectedUser.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {selectedUser.bio && (
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Bio</h4>
                    <p className="text-sm text-gray-600">{selectedUser.bio}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsersPage;