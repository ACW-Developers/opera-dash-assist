import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  CheckSquare, 
  User, 
  Clock, 
  AlertTriangle,
  Shield,
  FileText,
  Activity,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PreOperative() {
  const [activeTab, setActiveTab] = useState("checklist");
  const { toast } = useToast();

  const patients = [
    {
      id: "P001",
      name: "John Doe",
      surgeryType: "Appendectomy",
      surgeryDate: "2024-01-20",
      surgeryTime: "09:00 AM",
      surgeon: "Dr. Smith",
      checklistProgress: 85,
      status: "In Progress",
      whoChecklist: {
        "Patient Identity": { completed: true, verifiedBy: "Nurse Johnson", time: "08:30" },
        "Procedure Verification": { completed: true, verifiedBy: "Dr. Smith", time: "08:35" },
        "Site Marking": { completed: true, verifiedBy: "Dr. Smith", time: "08:40" },
        "Anesthesia Check": { completed: false, verifiedBy: "", time: "" },
        "Equipment Check": { completed: false, verifiedBy: "", time: "" },
        "Team Brief": { completed: false, verifiedBy: "", time: "" }
      }
    },
    {
      id: "P002",
      name: "Jane Smith",
      surgeryType: "Cholecystectomy",
      surgeryDate: "2024-01-22", 
      surgeryTime: "02:30 PM",
      surgeon: "Dr. Johnson",
      checklistProgress: 60,
      status: "Pending",
      whoChecklist: {
        "Patient Identity": { completed: true, verifiedBy: "Nurse Williams", time: "14:00" },
        "Procedure Verification": { completed: true, verifiedBy: "Dr. Johnson", time: "14:05" },
        "Site Marking": { completed: false, verifiedBy: "", time: "" },
        "Anesthesia Check": { completed: false, verifiedBy: "", time: "" },
        "Equipment Check": { completed: false, verifiedBy: "", time: "" },
        "Team Brief": { completed: false, verifiedBy: "", time: "" }
      }
    }
  ];

  const whoStandards = [
    {
      category: "Before Induction of Anesthesia",
      items: [
        "Patient has confirmed identity, site, procedure, and consent",
        "Site marked/not applicable",
        "Anesthesia safety check completed",
        "Pulse oximeter functioning",
        "Patient has known allergy? If yes, displayed",
        "Difficult airway/aspiration risk? If yes, equipment available"
      ]
    },
    {
      category: "Before Skin Incision",
      items: [
        "Team members introduce themselves by name and role",
        "Surgeon, anesthesia professional, and nurse confirm patient identity, site, and procedure",
        "Surgeon reviews critical steps, operative duration, anticipated blood loss",
        "Anesthesia team reviews concerns for patient",
        "Nursing team reviews sterility, equipment issues",
        "Antibiotic prophylaxis given within 60 minutes? If yes, confirmed"
      ]
    },
    {
      category: "Before Patient Leaves OR",
      items: [
        "Nurse verbally confirms with team: procedure performed, counts correct, specimen labeled",
        "Surgeon, anesthesia professional, and nurse review key concerns for recovery",
        "Equipment problems addressed",
        "All team members sign checklist"
      ]
    }
  ];

  const handleCompleteChecklist = (patientId: string) => {
    toast({
      title: "Pre-operative checklist completed",
      description: `WHO safety checklist for patient ${patientId} has been completed.`,
    });
  };

  const handleMarkComplete = (patientId: string, checkItem: string) => {
    toast({
      title: "Checklist item completed",
      description: `${checkItem} marked as completed for patient ${patientId}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Pre-operative Procedures</h1>
        <p className="text-muted-foreground">
          WHO surgical safety checklist and pre-operative compliance
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="checklist">
            Patient Checklists ({patients.length})
          </TabsTrigger>
          <TabsTrigger value="standards">WHO Standards</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="checklist" className="space-y-6">
          <div className="grid gap-6">
            {patients.map((patient) => (
              <Card key={patient.id} className="bg-gradient-card shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-medical rounded-full flex items-center justify-center">
                        <CheckSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{patient.name}</CardTitle>
                        <CardDescription>
                          {patient.surgeryType} • {patient.surgeryDate} at {patient.surgeryTime}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge 
                        variant={patient.status === 'In Progress' ? 'default' : 'secondary'}
                      >
                        {patient.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Surgeon: {patient.surgeon}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress Overview */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">WHO Checklist Progress</h3>
                      <span className="text-sm font-medium">{patient.checklistProgress}% Complete</span>
                    </div>
                    <Progress value={patient.checklistProgress} className="h-3" />
                  </div>

                  <Separator />

                  {/* WHO Checklist Items */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold">WHO Surgical Safety Checklist</h3>
                    </div>
                    
                    <div className="grid gap-4">
                      {Object.entries(patient.whoChecklist).map(([item, details]) => (
                        <div key={item} className="flex items-center justify-between p-4 bg-background rounded-lg border">
                          <div className="flex items-start space-x-3">
                            <Checkbox 
                              checked={details.completed}
                              onChange={() => handleMarkComplete(patient.id, item)}
                            />
                            <div>
                              <Label className="font-medium">{item}</Label>
                              {details.completed && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  Verified by: {details.verifiedBy} at {details.time}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {details.completed ? (
                              <Badge variant="default" className="text-xs">
                                Complete
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Additional Checks */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Additional Pre-operative Checks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox checked />
                          <Label className="text-sm">Consent form signed and verified</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox checked />
                          <Label className="text-sm">NPO status confirmed (8+ hours)</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox checked />
                          <Label className="text-sm">Pre-operative medications administered</Label>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox />
                          <Label className="text-sm">IV access established</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox />
                          <Label className="text-sm">Laboratory results reviewed</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox />
                          <Label className="text-sm">Imaging studies available</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      className="bg-gradient-medical text-white"
                      onClick={() => handleCompleteChecklist(patient.id)}
                      disabled={patient.checklistProgress < 100}
                    >
                      <CheckSquare className="w-4 h-4 mr-2" />
                      Complete Checklist
                    </Button>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Print Checklist
                    </Button>
                    <Button variant="ghost">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Report Issue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="standards" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                WHO Surgical Safety Standards
              </CardTitle>
              <CardDescription>
                World Health Organization surgical safety checklist guidelines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {whoStandards.map((section, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-lg">{section.category}</h3>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm text-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {index < whoStandards.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Compliance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">100%</div>
                <p className="text-sm text-muted-foreground mt-1">
                  WHO checklist completion
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Average Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">12 min</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Checklist completion time
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Safety Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">A+</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Department safety rating
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Monthly Compliance Report</CardTitle>
              <CardDescription>
                Detailed compliance metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Compliance report will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Procedures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">847</div>
                <p className="text-xs text-muted-foreground mt-1">This year</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Checklist Adherence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">99.8%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-success">+0.2%</span> vs last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Time Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">15%</div>
                <p className="text-xs text-muted-foreground mt-1">Reduced delays</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Safety Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">0</div>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}