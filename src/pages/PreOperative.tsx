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
  Heart,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PreOperative() {
  const [activeTab, setActiveTab] = useState("checklist");
  const { toast } = useToast();

  const [patients, setPatients] = useState([
    {
      id: "P001",
      name: "John Doe",
      surgeryType: "Appendectomy",
      surgeryDate: "2024-01-20",
      surgeryTime: "09:00 AM",
      surgeon: "Dr. Smith",
      status: "In Progress",
      whoChecklist: {
        "Patient Identity": { completed: false, verifiedBy: "", time: "" },
        "Procedure Verification": { completed: false, verifiedBy: "", time: "" },
        "Site Marking": { completed: false, verifiedBy: "", time: "" },
        "Anesthesia Check": { completed: false, verifiedBy: "", time: "" },
        "Equipment Check": { completed: false, verifiedBy: "", time: "" },
        "Team Brief": { completed: false, verifiedBy: "", time: "" }
      },
      additionalChecks: {
        "Consent form signed and verified": false,
        "NPO status confirmed (8+ hours)": false,
        "Pre-operative medications administered": false,
        "IV access established": false,
        "Laboratory results reviewed": false,
        "Imaging studies available": false
      }
    },
  ]);

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

  const calculateProgress = (patient: any) => {
    const totalItems = Object.keys(patient.whoChecklist).length + Object.keys(patient.additionalChecks).length;
    const completedItems = 
      Object.values(patient.whoChecklist).filter((item: any) => item.completed).length +
      Object.values(patient.additionalChecks).filter((completed: any) => completed).length;
    
    return Math.round((completedItems / totalItems) * 100);
  };

  const isAllCompleted = (patient: any) => {
    return calculateProgress(patient) === 100;
  };

  const handleChecklistChange = (patientId: string, checklistItem: string) => {
    setPatients(prev => prev.map(patient => {
      if (patient.id === patientId) {
        const currentStatus = patient.whoChecklist[checklistItem as keyof typeof patient.whoChecklist].completed;
        return {
          ...patient,
          whoChecklist: {
            ...patient.whoChecklist,
            [checklistItem]: {
              completed: !currentStatus,
              verifiedBy: !currentStatus ? "Current User" : "",
              time: !currentStatus ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""
            }
          }
        };
      }
      return patient;
    }));
  };

  const handleAdditionalCheckChange = (patientId: string, checkItem: string) => {
    setPatients(prev => prev.map(patient => {
      if (patient.id === patientId) {
        return {
          ...patient,
          additionalChecks: {
            ...patient.additionalChecks,
            [checkItem]: !patient.additionalChecks[checkItem as keyof typeof patient.additionalChecks]
          }
        };
      }
      return patient;
    }));
  };

  const handleCompleteChecklist = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient && isAllCompleted(patient)) {
      toast({
        title: "Pre-operative checklist completed",
        description: `WHO safety checklist for patient ${patientId} has been completed.`,
      });
    } else {
      toast({
        title: "Checklist incomplete",
        description: "Please complete all checklist items before finalizing.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadChecklist = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    if (!isAllCompleted(patient)) {
      toast({
        title: "Checklist incomplete",
        description: "Please complete all checklist items before downloading.",
        variant: "destructive"
      });
      return;
    }

    // Create downloadable content
    const checklistContent = `
PRE-OPERATIVE CHECKLIST REPORT
==============================

Patient Information:
- Name: ${patient.name}
- Patient ID: ${patient.id}
- Surgery: ${patient.surgeryType}
- Date: ${patient.surgeryDate}
- Time: ${patient.surgeryTime}
- Surgeon: ${patient.surgeon}

WHO SURGICAL SAFETY CHECKLIST:
${Object.entries(patient.whoChecklist).map(([item, details]) => 
  `[${details.completed ? '✓' : ' '}] ${item}${details.completed ? ` - Verified by: ${details.verifiedBy} at ${details.time}` : ''}`
).join('\n')}

ADDITIONAL PRE-OPERATIVE CHECKS:
${Object.entries(patient.additionalChecks).map(([item, completed]) => 
  `[${completed ? '✓' : ' '}] ${item}`
).join('\n')}

CHECKLIST COMPLETION STATUS: ${isAllCompleted(patient) ? 'COMPLETE' : 'INCOMPLETE'}
COMPLETION PERCENTAGE: ${calculateProgress(patient)}%
GENERATED ON: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}

--- END OF REPORT ---
    `.trim();

    // Create and download file
    const blob = new Blob([checklistContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pre-op-checklist-${patient.id}-${patient.surgeryDate}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Checklist downloaded",
      description: "Pre-operative checklist has been downloaded successfully.",
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
            {patients.map((patient) => {
              const progress = calculateProgress(patient);
              const allCompleted = isAllCompleted(patient);
              
              return (
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
                          variant={allCompleted ? 'default' : patient.status === 'In Progress' ? 'default' : 'secondary'}
                          className={allCompleted ? 'bg-green-500' : ''}
                        >
                          {allCompleted ? 'Ready for Surgery' : patient.status}
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
                        <span className="text-sm font-medium">{progress}% Complete</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                      {allCompleted && (
                        <div className="text-sm text-green-600 font-medium text-center">
                          ✓ All checks completed! Ready for surgery.
                        </div>
                      )}
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
                            <div className="flex items-start space-x-3 flex-1">
                              <Checkbox 
                                checked={details.completed}
                                onCheckedChange={() => handleChecklistChange(patient.id, item)}
                                id={`who-${patient.id}-${item}`}
                              />
                              <div className="flex-1">
                                <Label 
                                  htmlFor={`who-${patient.id}-${item}`}
                                  className="font-medium cursor-pointer"
                                >
                                  {item}
                                </Label>
                                {details.completed && (
                                  <div className="text-xs text-muted-foreground mt-1">
                                    Verified by: {details.verifiedBy} at {details.time}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {details.completed ? (
                                <Badge variant="default" className="text-xs bg-green-500">
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
                          {Object.entries(patient.additionalChecks).slice(0, 3).map(([item, completed]) => (
                            <div key={item} className="flex items-center space-x-3">
                              <Checkbox 
                                checked={completed}
                                onCheckedChange={() => handleAdditionalCheckChange(patient.id, item)}
                                id={`add-${patient.id}-${item}`}
                              />
                              <Label 
                                htmlFor={`add-${patient.id}-${item}`}
                                className="text-sm cursor-pointer"
                              >
                                {item}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-3">
                          {Object.entries(patient.additionalChecks).slice(3).map(([item, completed]) => (
                            <div key={item} className="flex items-center space-x-3">
                              <Checkbox 
                                checked={completed}
                                onCheckedChange={() => handleAdditionalCheckChange(patient.id, item)}
                                id={`add-${patient.id}-${item}`}
                              />
                              <Label 
                                htmlFor={`add-${patient.id}-${item}`}
                                className="text-sm cursor-pointer"
                              >
                                {item}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                      <Button 
                        className="bg-gradient-medical text-white"
                        onClick={() => handleCompleteChecklist(patient.id)}
                        disabled={!allCompleted}
                      >
                        <CheckSquare className="w-4 h-4 mr-2" />
                        Complete Checklist
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleDownloadChecklist(patient.id)}
                        disabled={!allCompleted}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Checklist
                      </Button>
                      <Button variant="ghost">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Report Issue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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