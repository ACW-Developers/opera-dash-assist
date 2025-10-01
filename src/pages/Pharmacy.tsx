import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Pill,
  User,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePrescriptions } from "@/hooks/usePrescriptions";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export default function Pharmacy() {
  const [activeTab, setActiveTab] = useState("pending");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { prescriptions, updatePrescription, refreshPrescriptions } = usePrescriptions();

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

  const handleDispenseMedication = async (prescriptionId: string) => {
    await updatePrescription(prescriptionId, {
      status: "dispensed",
      dispensed_date: new Date().toISOString(),
      dispensed_by: "Pharmacy Staff"
    });
    
    toast({
      title: "Medication dispensed",
      description: `Prescription has been dispensed successfully.`,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>Please sign in to access the pharmacy module.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => window.location.href = '/auth'}>Sign In</Button>
        </CardContent>
      </Card>
    );
  }

  const pendingPrescriptions = prescriptions.filter(p => p.status === "pending");
  const dispensedPrescriptions = prescriptions.filter(p => p.status === "dispensed");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Pharmacy Management</h1>
        <p className="text-muted-foreground">
          Prescription management and medication dispensing
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pending ({pendingPrescriptions.length})
          </TabsTrigger>
          <TabsTrigger value="dispensed">
            Dispensed ({dispensedPrescriptions.length})
          </TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="grid gap-6">
            {pendingPrescriptions.length === 0 ? (
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="text-center py-8 text-muted-foreground">
                  No pending prescriptions
                </CardContent>
              </Card>
            ) : (
              pendingPrescriptions.map((prescription) => (
                <Card key={prescription.id} className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-medical rounded-full flex items-center justify-center">
                          <Pill className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">
                            {prescription.patients?.first_name} {prescription.patients?.last_name}
                          </CardTitle>
                          <CardDescription>
                            Patient ID: {prescription.patients?.patient_id}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="default">
                        Pending Dispensing
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold">Prescription Details</h3>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Medication
                            </Label>
                            <p className="text-foreground font-medium">{prescription.medication_name}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Dosage
                              </Label>
                              <p className="text-foreground">{prescription.dosage}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Frequency
                              </Label>
                              <p className="text-foreground">{prescription.frequency}</p>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Duration
                            </Label>
                            <p className="text-foreground">{prescription.duration}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <User className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold">Instructions</h3>
                        </div>
                        
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm text-foreground">
                            {prescription.instructions || "No special instructions"}
                          </p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">
                            Prescribed On
                          </Label>
                          <p className="text-foreground">
                            {format(new Date(prescription.created_at), "PPP")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                      <Button
                        className="bg-gradient-medical text-white"
                        onClick={() => handleDispenseMedication(prescription.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Dispense Medication
                      </Button>
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Print Label
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="dispensed" className="space-y-6">
          <div className="grid gap-6">
            {dispensedPrescriptions.length === 0 ? (
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="text-center py-8 text-muted-foreground">
                  No dispensed prescriptions
                </CardContent>
              </Card>
            ) : (
              dispensedPrescriptions.map((prescription) => (
                <Card key={prescription.id} className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-success rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">
                            {prescription.patients?.first_name} {prescription.patients?.last_name}
                          </CardTitle>
                          <CardDescription>
                            {prescription.medication_name}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default" className="mb-2">Dispensed</Badge>
                        <div className="text-sm text-muted-foreground">
                          {prescription.dispensed_date && format(new Date(prescription.dispensed_date), "PPP")}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <Label className="text-xs text-muted-foreground">Dosage</Label>
                        <p className="text-foreground">{prescription.dosage}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Frequency</Label>
                        <p className="text-foreground">{prescription.frequency}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Duration</Label>
                        <p className="text-foreground">{prescription.duration}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Dispensed By</Label>
                        <p className="text-foreground">{prescription.dispensed_by || "N/A"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Total Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{prescriptions.length}</div>
                <p className="text-sm text-muted-foreground mt-1">All time</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{pendingPrescriptions.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Awaiting dispensing</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Dispensed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{dispensedPrescriptions.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Completed</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
