
import { useState } from "react";
import { useReports } from "@/context/ReportContext";
import { useAuth } from "@/context/AuthContext";
import { ReportSummaryCard } from "@/components/reports/ReportSummaryCard";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ReportStatusBadge } from "@/components/reports/ReportStatusBadge";
import { ChevronDown, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Navigate } from "react-router-dom";

const Admin = () => {
  const { isAuthenticated, user } = useAuth();
  const { getAllReports } = useReports();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "civic" | "hazard">("all");
  
  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/" />;
  }

  const allReports = getAllReports();
  const pendingReports = allReports.filter(report => report.status === "pending");
  const inProgressReports = allReports.filter(report => report.status === "in_progress");
  const resolvedReports = allReports.filter(report => report.status === "resolved");

  // Filter reports based on search term and type
  const filteredReports = allReports.filter(report => {
    let matchesType = filterType === "all" || report.type === filterType;
    let matchesSearch = searchTerm === "" || 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage and update all reported issues
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-1/3 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">Reports Overview</h2>
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
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-xl font-bold text-civic-blue">{allReports.filter(r => r.type === "civic").length}</div>
              <div className="text-sm text-gray-600">Civic Issues</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-xl font-bold text-civic-blue">{allReports.filter(r => r.type === "hazard").length}</div>
              <div className="text-sm text-gray-600">Road Hazards</div>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Search & Filter</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search reports..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  {filterType === "all" ? "All Types" : filterType === "civic" ? "Civic Issues" : "Road Hazards"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterType("all")}>
                  All Types
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("civic")}>
                  Civic Issues
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("hazard")}>
                  Road Hazards
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-8">
        <TabsList>
          <TabsTrigger value="all">All Reports ({filteredReports.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingReports.length})</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress ({inProgressReports.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedReports.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Reported On</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-500">{report.id.split('-')[1]}</td>
                    <td className="py-3 px-4 font-medium">{report.title}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">
                        {report.type === "civic" ? "Civic Issue" : "Road Hazard"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{report.location}</td>
                    <td className="py-3 px-4">
                      <ReportStatusBadge status={report.status} />
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Link to={`/report/${report.id}`}>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                
                {filteredReports.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-gray-500">
                      No reports matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingReports
              .filter(report => filterType === "all" || report.type === filterType)
              .map(report => (
                <ReportSummaryCard key={report.id} report={report} showActions />
              ))}
              
            {pendingReports.filter(report => filterType === "all" || report.type === filterType).length === 0 && (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No pending reports match your filters</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="in_progress" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressReports
              .filter(report => filterType === "all" || report.type === filterType)
              .map(report => (
                <ReportSummaryCard key={report.id} report={report} showActions />
              ))}
              
            {inProgressReports.filter(report => filterType === "all" || report.type === filterType).length === 0 && (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No in-progress reports match your filters</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="resolved" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resolvedReports
              .filter(report => filterType === "all" || report.type === filterType)
              .map(report => (
                <ReportSummaryCard key={report.id} report={report} showActions />
              ))}
              
            {resolvedReports.filter(report => filterType === "all" || report.type === filterType).length === 0 && (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No resolved reports match your filters</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
