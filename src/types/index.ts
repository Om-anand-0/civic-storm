
export type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

export type IssueType = 'garbage' | 'pothole' | 'broken_streetlight' | 'graffiti' | 'other';

export type HazardType = 'accident' | 'dangerous_turn' | 'no_streetlight' | 'flooding' | 'construction' | 'other';

export type ReportStatus = 'pending' | 'in_progress' | 'resolved';

export interface Report {
  id: string;
  type: 'civic' | 'hazard';
  title: string;
  description: string;
  location: string;
  reportType: IssueType | HazardType;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  userId: string;
}
