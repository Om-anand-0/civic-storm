
import { useState } from "react";
import { useReports } from "@/context/ReportContext";
import { useAuth } from "@/context/AuthContext";
import { ReportSummaryCard } from "@/components/reports/ReportSummaryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const { getUserReports } = useReports();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  const userReports = getUserReports();
  const pendingReports = userReports.filter(report => report.status === "pending");
  const inProgressReports = userReports.filter(report => report.status === "in_progress");
  const resolvedReports = userReports.filter(report => report.status === "resolved");

  // Filter reports based on search term
  const filteredReports = userReports.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">My Dashboard</h1>
          <p className="text-gray-600">
            Track and manage your reported issues
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/report">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-1/3 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">Reports Summary</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-status-pending bg-opacity-10 p-3 rounded-lg">
              <div className="text-2xl font-bold text-status-pending">{pendingReports.length}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-status-in-progress bg-opacity-10 p-3 rounded-lg">
              <div className="text-2xl font-bold text-status-in-progress">{inProgressReports.length}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="bg-status-resolved bg-opacity-10 p-3 rounded-lg">
              <div className="text-2xl font-bold text-status-resolved">{resolvedReports.length}</div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">Search Reports</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search by title, description or location..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-8">
        <TabsList>
          <TabsTrigger value="all">All Reports ({userReports.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingReports.length})</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress ({inProgressReports.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedReports.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {searchTerm ? (
            <>
              <h3 className="text-lg font-medium mb-4">Search Results: {filteredReports.length} reports found</h3>
              {filteredReports.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredReports.map(report => (
                    <ReportSummaryCard key={report.id} report={report} showActions />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No reports match your search criteria</p>
                </div>
              )}
            </>
          ) : (
            <>
              {userReports.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userReports.map(report => (
                    <ReportSummaryCard key={report.id} report={report} showActions />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">You haven't submitted any reports yet</p>
                  <Link to="/report">
                    <Button className="mt-4">Submit Your First Report</Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          {pendingReports.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingReports.map(report => (
                <ReportSummaryCard key={report.id} report={report} showActions />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No pending reports</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="in_progress" className="mt-6">
          {inProgressReports.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressReports.map(report => (
                <ReportSummaryCard key={report.id} report={report} showActions />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No reports in progress</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="resolved" className="mt-6">
          {resolvedReports.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resolvedReports.map(report => (
                <ReportSummaryCard key={report.id} report={report} showActions />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No resolved reports yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
