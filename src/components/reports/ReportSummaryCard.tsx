
import { Report } from "@/types";
import { formatDate } from "@/data/mockData";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReportStatusBadge } from "./ReportStatusBadge";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface ReportSummaryCardProps {
  report: Report;
  showActions?: boolean;
}

export function ReportSummaryCard({ report, showActions = false }: ReportSummaryCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">
              {report.type === "civic" ? "Civic Issue" : "Road Hazard"}
            </Badge>
            <CardTitle className="text-lg">{report.title}</CardTitle>
          </div>
          <ReportStatusBadge status={report.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{report.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{report.location}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between text-xs text-gray-500">
        <span>Reported on: {formatDate(report.createdAt)}</span>
        {showActions && (
          <Link to={`/report/${report.id}`} className="text-civic-blue hover:underline">
            View Details
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
