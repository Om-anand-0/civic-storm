
import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useReports } from "@/context/ReportContext";
import { useAuth } from "@/context/AuthContext";
import { ReportStatusBadge } from "@/components/reports/ReportStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/data/mockData";
import { ReportStatus } from "@/types";
import { 
  AlertTriangle, 
  ArrowLeft,
  Calendar, 
  Flag, 
  MapPin,
  Tag,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getReportById, updateReportStatus } = useReports();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  const report = getReportById(id || "");
  
  // Handle report not found
  if (!report) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Report Not Found</h1>
        <p className="mb-6">The report you're looking for doesn't exist or you don't have permission to view it.</p>
        <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
      </div>
    );
  }

  // Status update handling (admin only)
  const handleStatusUpdate = (newStatus: ReportStatus) => {
    updateReportStatus(report.id, newStatus);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 hover:bg-gray-100"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="md:flex md:gap-8">
        <div className="md:w-2/3">
          <div className="flex items-center mb-4">
            {report.type === "civic" ? (
              <Flag className="h-5 w-5 text-civic-blue mr-2" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-civic-blue mr-2" />
            )}
            <span className="text-sm text-gray-500">
              {report.type === "civic" ? "Civic Issue" : "Road Hazard"}
            </span>
          </div>
          
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold">{report.title}</h1>
            <ReportStatusBadge status={report.status} className="text-sm px-3 py-1" />
          </div>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{report.description}</p>
            </CardContent>
          </Card>
          
          {report.imageUrl && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Image</h2>
                <img 
                  src={report.imageUrl} 
                  alt={report.title} 
                  className="rounded-lg max-h-96 w-auto"
                />
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="md:w-1/3 mt-8 md:mt-0">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-3">Details</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Location</h3>
                      <p>{report.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Tag className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Issue Type</h3>
                      <p>{report.reportType.replace('_', ' ')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Reported On</h3>
                      <p>{formatDate(report.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status Management (Admin only) */}
              {user?.isAdmin && (
                <div>
                  <h2 className="text-lg font-semibold mb-3">Update Status</h2>
                  <div className="space-y-3">
                    <Select 
                      defaultValue={report.status} 
                      onValueChange={(value) => handleStatusUpdate(value as ReportStatus)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
