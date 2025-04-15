
import { ReportForm } from "@/components/reports/ReportForm";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ReportIssue = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reportType = searchParams.get("type") === "hazard" ? "hazard" : "civic";

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="mb-6">You need to be logged in to submit a report.</p>
          <Button onClick={() => navigate("/auth")}>Log In or Sign Up</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Report an Issue</h1>
        <p className="text-gray-600">
          Fill out the form below to submit a new {reportType === "hazard" ? "road hazard" : "civic issue"} report.
        </p>
      </div>
      <ReportForm defaultType={reportType as "civic" | "hazard"} />
    </div>
  );
};

export default ReportIssue;
