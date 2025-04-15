
import React, { createContext, useContext, useState } from "react";
import { Report, ReportStatus, IssueType, HazardType } from "@/types";
import { mockReports } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "./AuthContext";

interface ReportContextType {
  reports: Report[];
  addReport: (report: Omit<Report, "id" | "createdAt" | "updatedAt" | "userId" | "status">) => void;
  updateReportStatus: (id: string, status: ReportStatus) => void;
  getUserReports: () => Report[];
  getAllReports: () => Report[];
  getReportById: (id: string) => Report | undefined;
  filterReports: (criteria: {
    type?: "civic" | "hazard";
    status?: ReportStatus;
    searchTerm?: string;
  }) => Report[];
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider = ({ children }: { children: React.ReactNode }) => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const { user } = useAuth();

  const addReport = (reportData: Omit<Report, "id" | "createdAt" | "updatedAt" | "userId" | "status">) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to create a report",
        variant: "destructive"
      });
      return;
    }
    
    const now = new Date().toISOString();
    const newReport: Report = {
      ...reportData,
      id: `report-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      userId: user.id,
      status: 'pending'
    };
    
    setReports(prev => [newReport, ...prev]);
    
    toast({
      title: "Report Submitted",
      description: "Your report has been successfully submitted",
    });
  };

  const updateReportStatus = (id: string, status: ReportStatus) => {
    setReports(prev => 
      prev.map(report => 
        report.id === id 
          ? { ...report, status, updatedAt: new Date().toISOString() } 
          : report
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Report status has been updated to ${status.replace('_', ' ')}`,
    });
  };

  const getUserReports = () => {
    if (!user) return [];
    return reports.filter(report => report.userId === user.id);
  };

  const getAllReports = () => {
    return reports;
  };

  const getReportById = (id: string) => {
    return reports.find(report => report.id === id);
  };

  const filterReports = (criteria: {
    type?: "civic" | "hazard";
    status?: ReportStatus;
    searchTerm?: string;
  }) => {
    return reports.filter(report => {
      let match = true;
      
      if (criteria.type && report.type !== criteria.type) {
        match = false;
      }
      
      if (criteria.status && report.status !== criteria.status) {
        match = false;
      }
      
      if (criteria.searchTerm) {
        const searchTerm = criteria.searchTerm.toLowerCase();
        const matchesSearch = 
          report.title.toLowerCase().includes(searchTerm) ||
          report.description.toLowerCase().includes(searchTerm) ||
          report.location.toLowerCase().includes(searchTerm);
        
        if (!matchesSearch) {
          match = false;
        }
      }
      
      return match;
    });
  };

  return (
    <ReportContext.Provider value={{ 
      reports, 
      addReport, 
      updateReportStatus, 
      getUserReports,
      getAllReports,
      getReportById,
      filterReports
    }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error("useReports must be used within a ReportProvider");
  }
  return context;
};
