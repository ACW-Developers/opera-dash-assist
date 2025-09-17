import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Database, Search, Users, FileText, Calendar, Download, Activity, TrendingUp } from "lucide-react";
import { usePatients } from "@/hooks/usePatients";
import { useProcedures } from "@/hooks/useProcedures";
import PatientList from "@/components/PatientList";
import { supabase } from "@/integrations/supabase/client";

export default function RecordsManagement() {
  const { patients } = usePatients();
  const { procedures } = useProcedures();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const activePatients = patients.filter(p => 
    procedures.some(proc => proc.patient_id === p.id && proc.status !== 'completed')
  ).length;

  const completedProcedures = procedures.filter(p => p.status === 'completed').length;
  const dataIntegrity = patients.length > 0 ? 
    ((patients.filter(p => p.medical_history && p.emergency_contact_name).length / patients.length) * 100).toFixed(1) : 
    '100';

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">Records Management</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">Records Management</h1>
          <p className="text-muted-foreground">
            Comprehensive patient data and surgical history management
          </p>
        </div>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <Database className="w-16 h-16 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Authentication Required</h3>
              <p className="text-muted-foreground">
                Please sign in to access patient records and manage surgical data.
              </p>
              <Button onClick={() => window.location.href = '/auth'} className="bg-primary hover:bg-primary/90">
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{patients.length}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Active Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activePatients}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently active</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Total Procedures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{procedures.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Procedures logged</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Data Integrity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{dataIntegrity}%</div>
            <p className="text-xs text-muted-foreground mt-1">Quality score</p>
          </CardContent>
        </Card>
      </div>

      <PatientList />
    </div>
  );
}