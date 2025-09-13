"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchAllGuides, verifyGuide, revokeGuide } from "@/redux/slices/adminSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Search, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Loader2,
  Users,
  Eye,
  ShieldCheck,
  ShieldX
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { User as UserType } from "@/types/user";

const AdminGuidesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { allGuides, loading, error , total} = useAppSelector((state) => state.admin);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGuides, setFilteredGuides] = useState<UserType[]>([]);

  //pagination
  const [page , setPage] = useState(1)
  const limit = 10
  const skip = (page - 1) * limit
  const totalPages = Math.ceil(total/limit)

  useEffect(() => {
    dispatch(fetchAllGuides({page, limit, skip}));
  }, [dispatch, page, limit]);

  useEffect(() => {
    if (allGuides) {
      const filtered = allGuides.filter(guide => 
        guide.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide._id?.includes(searchTerm)
      );
      setFilteredGuides(filtered);
    }
  }, [allGuides, searchTerm]);

  const handleVerify = async (id: string) => {
    try {
      await dispatch(verifyGuide(id)).unwrap();
      toast.success('Guide verified successfully');
    } catch (error) {
      toast.error('Guide verification failed');
    }
  };

  const handleRevoke = async (id: string) => {
    try {
      await dispatch(revokeGuide(id)).unwrap();
      toast.success('Guide verification revoked successfully');
    } catch (error) { 
      toast.error('Failed to revoke guide verification');
    }
  };

  const openGuideDetails = (guideId: string) => {
    router.push(`/admin-dashboard/guideDetails/${guideId}`);
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'G';
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getVerifiedGuidesCount = () => {
    return allGuides.filter(guide => guide.isVerified).length;
  };

  const getPendingGuidesCount = () => {
    return allGuides.filter(guide => !guide.isVerified).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading guides...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Guide Management</h1>
          <p className="text-gray-600 mt-1">Manage and verify tour guides</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="px-3 py-1">
            <Users className="h-4 w-4 mr-1" />
            {allGuides.length} Total
          </Badge>
          <Badge variant="default" className="px-3 py-1 bg-green-100 text-green-700">
            <ShieldCheck className="h-4 w-4 mr-1" />
            {getVerifiedGuidesCount()} Verified
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 bg-yellow-100 text-yellow-700">
            <ShieldX className="h-4 w-4 mr-1" />
            {getPendingGuidesCount()} Pending
          </Badge>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search guides by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <XCircle className="h-5 w-5" />
              <span className="font-medium">Error loading guides</span>
            </div>
            <p className="text-red-500 mt-1">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Guides Table */}
      {filteredGuides.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>All Guides</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Guide</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Joined</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuides.map((guide: UserType) => (
                    <tr key={guide._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={guide.profilePic} alt={guide.name} />
                            <AvatarFallback className="bg-green-100 text-green-600">
                              {getInitials(guide.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <button
                              onClick={() => openGuideDetails(guide._id)}
                              className="font-medium text-gray-900 hover:text-green-600 transition-colors text-left"
                            >
                              {guide.name}
                            </button>
                            <p className="text-sm text-gray-500">ID: {guide._id.slice(-8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span>{guide.email}</span>
                          </div>
                          {guide.phone && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span>{guide.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={guide.isVerified ? "default" : "secondary"} 
                          className={`capitalize ${guide.isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                        >
                          {guide.isVerified ? "Verified" : "Pending"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(guide.createdAt)}</span>
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
                            <DropdownMenuItem onClick={() => openGuideDetails(guide._id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {guide.isVerified ? (
                              <DropdownMenuItem onClick={() => handleRevoke(guide._id)}>
                                <XCircle className="h-4 w-4 mr-2" />
                                Revoke Verification
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleVerify(guide._id)}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Verify Guide
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>

          
            {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="normal-case font-semibold px-6 text-[#4b2e2e] border-[#4b2e2e] hover:bg-[#f1e5d1] hover:border-[#4b2e2e]"
            >
              Previous
            </Button>

            <p className="text-base font-semibold">
              Page {page} of {totalPages || 1}
            </p>

            <Button
              variant="outline"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((prev) => prev + 1)}
              className="normal-case font-semibold px-6 text-[#4b2e2e] border-[#4b2e2e] hover:bg-[#f1e5d1] hover:border-[#4b2e2e]"
            >
              Next
            </Button>
          </div>


        </Card>
      ) : !loading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "No guides found" : "No guides registered yet"}
              </h3>
              <p className="text-gray-500">
                {searchTerm ? "Try adjusting your search terms." : "Guides will appear here once they register."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminGuidesPage;