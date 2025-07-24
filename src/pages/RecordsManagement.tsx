import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Database, Search, Users, FileText, Calendar, Download } from "lucide-react";

export default function RecordsManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Records Management</h1>
        <p className="text-muted-foreground">
          Comprehensive patient data and surgical history management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,247</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">892</div>
            <p className="text-xs text-muted-foreground mt-1">Currently active</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Surgeries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2,103</div>
            <p className="text-xs text-muted-foreground mt-1">Procedures logged</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Data Integrity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">99.8%</div>
            <p className="text-xs text-muted-foreground mt-1">Quality score</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Patient Records Database
          </CardTitle>
          <CardDescription>
            Search and manage patient medical records
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input placeholder="Search patients by name, ID, procedure..." />
            </div>
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          
          <div className="text-center text-muted-foreground py-8">
            Enter search criteria to view patient records
          </div>
        </CardContent>
      </Card>
    </div>
  );
}