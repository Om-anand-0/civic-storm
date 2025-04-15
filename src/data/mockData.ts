
import { IssueType, HazardType, Report, User } from "@/types";

export const currentUser: User = {
  id: "user-1",
  name: "Jane Smith",
  email: "jane.smith@example.com",
  isAdmin: false
};

export const mockUsers: User[] = [
  currentUser,
  {
    id: "user-2",
    name: "Admin User",
    email: "admin@civicstorm.com",
    isAdmin: true
  }
];

export const issueTypes: { value: IssueType; label: string }[] = [
  { value: 'garbage', label: 'Trash/Garbage Issue' },
  { value: 'pothole', label: 'Pothole' },
  { value: 'broken_streetlight', label: 'Broken Streetlight' },
  { value: 'graffiti', label: 'Graffiti' },
  { value: 'other', label: 'Other Issue' }
];

export const hazardTypes: { value: HazardType; label: string }[] = [
  { value: 'accident', label: 'Accident Prone Area' },
  { value: 'dangerous_turn', label: 'Dangerous Turn' },
  { value: 'no_streetlight', label: 'No Streetlight' },
  { value: 'flooding', label: 'Flooding/Water Hazard' },
  { value: 'construction', label: 'Construction Hazard' },
  { value: 'other', label: 'Other Hazard' }
];

export const locations: string[] = [
  "Downtown Area",
  "Central Park",
  "Main Street",
  "Oak Avenue",
  "Riverside District",
  "Industrial Park",
  "Shopping District",
  "School Zone",
  "City Hall"
];

export const mockReports: Report[] = [
  {
    id: "report-1",
    type: "civic",
    title: "Overflowing Trash Bin",
    description: "Trash bin near the park entrance is overflowing for the past 3 days",
    location: "Central Park",
    reportType: "garbage",
    status: "pending",
    createdAt: "2025-04-10T10:30:00Z",
    updatedAt: "2025-04-10T10:30:00Z",
    userId: "user-1"
  },
  {
    id: "report-2",
    type: "hazard",
    title: "Dangerous Intersection",
    description: "Cars speeding through intersection with poor visibility",
    location: "Oak Avenue & Main Street",
    reportType: "dangerous_turn",
    status: "in_progress",
    createdAt: "2025-04-09T08:15:00Z",
    updatedAt: "2025-04-11T14:20:00Z",
    userId: "user-1"
  },
  {
    id: "report-3",
    type: "civic",
    title: "Large Pothole",
    description: "Deep pothole causing vehicle damage",
    location: "Main Street",
    reportType: "pothole",
    status: "resolved",
    createdAt: "2025-04-05T16:45:00Z",
    updatedAt: "2025-04-12T11:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1626168121742-d3aab1f0e549?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    userId: "user-1"
  },
  {
    id: "report-4",
    type: "civic",
    title: "Broken Streetlight",
    description: "Streetlight has been out for over a week causing safety concerns",
    location: "Riverside District",
    reportType: "broken_streetlight",
    status: "in_progress",
    createdAt: "2025-04-08T20:10:00Z",
    updatedAt: "2025-04-11T09:25:00Z",
    userId: "user-2"
  },
  {
    id: "report-5",
    type: "hazard",
    title: "Missing Street Sign",
    description: "Stop sign is missing at the intersection",
    location: "School Zone",
    reportType: "other",
    status: "pending",
    createdAt: "2025-04-12T15:30:00Z",
    updatedAt: "2025-04-12T15:30:00Z",
    userId: "user-1"
  }
];

// Helper function to format dates
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
