
import { cn } from "@/lib/utils";
import { ReportStatus } from "@/types";
import { CheckCircle, Clock, RotateCw } from "lucide-react";

interface ReportStatusBadgeProps {
  status: ReportStatus;
  showLabel?: boolean;
  className?: string;
}

export function ReportStatusBadge({ status, showLabel = true, className }: ReportStatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: "Pending",
      icon: Clock,
      className: "bg-status-pending text-white",
    },
    in_progress: {
      label: "In Progress",
      icon: RotateCw,
      className: "bg-status-in-progress text-white",
    },
    resolved: {
      label: "Resolved",
      icon: CheckCircle,
      className: "bg-status-resolved text-white",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn("inline-flex items-center px-2 py-1 rounded-full text-xs font-medium", config.className, className)}>
      <Icon className="h-3 w-3 mr-1" />
      {showLabel && config.label}
    </div>
  );
}
