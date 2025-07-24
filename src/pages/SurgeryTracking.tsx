import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Activity, 
  User, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Play,
  Pause,
  Square,
  Eye,
  FileText,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SurgeryTracking() {
  const [activeTab, setActiveTab] = useState("live");
  const { toast } = useToast();

  const liveSurgeries = [
    {
      id: "S001",
      patientName: "John Doe",
      patientId: "P001",
      procedure: "Laparoscopic Appendectomy",
      surgeon: "Dr. Smith",
      assistants: ["Dr. Johnson", "Nurse Williams"],
      startTime: "09:00 AM",
      estimatedDuration: "60 minutes",
      currentDuration: "45 minutes",
      progress: 75,
      status: "In Progress",
      room: "OR 1",
      phase: "Laparoscopic exploration",
      vitalSigns: {
        heartRate: "72 bpm",
        bloodPressure: "120/80 mmHg",
        oxygenSat: "98%",
        temperature: "98.6°F"
      }
    },
    {
      id: "S002", 
      patientName: "Jane Smith",
      patientId: "P002",
      procedure: "Cholecystectomy",
      surgeon: "Dr. Johnson",
      assistants: ["Dr. Brown", "Nurse Davis"],
      startTime: "02:30 PM",
      estimatedDuration: "90 minutes",
      currentDuration: "30 minutes", 
      progress: 33,
      status: "In Progress",
      room: "OR 2",
      phase: "Port placement",
      vitalSigns: {
        heartRate: "78 bpm",
        bloodPressure: "110/70 mmHg",
        oxygenSat: "99%",
        temperature: "98.4°F"
      }
    }
  ];

  const upcomingSurgeries = [
    {
      id: "S003",
      patientName: "Mike Wilson",
      procedure: "Hernia Repair",
      surgeon: "Dr. Brown",
      scheduledTime: "04:00 PM",
      room: "OR 3",
      status: "Scheduled"
    }
  ];

  const completedSurgeries = [
    {
      id: "S004",
      patientName: "Alice Johnson",
      procedure: "Gallbladder Surgery",
      surgeon: "Dr. Smith",
      duration: "85 minutes",
      outcome: "Successful",
      completedTime: "11:30 AM",
      complications: "None"
    }
  ];

  const handleStartSurgery = (surgeryId: string) => {
    toast({
      title: "Surgery started",
      description: `Surgery ${surgeryId} has been marked as started.`,
    });
  };

  const handleCompleteSurgery = (surgeryId: string) => {
    toast({
      title: "Surgery completed",
      description: `Surgery ${surgeryId} has been completed successfully.`,
    });
  };

  const handleEmergencyAlert = (surgeryId: string) => {
    toast({
      title: "Emergency alert sent",
      description: `Emergency assistance requested for surgery ${surgeryId}.`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Surgery Tracking</h1>
        <p className="text-muted-foreground">
          Real-time surgical procedure monitoring and management
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="live">
            Live Surgeries ({liveSurgeries.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingSurgeries.length})
          </TabsTrigger>
          <TabsTrigger value="completed">Completed Today</TabsTrigger>
          <TabsTrigger value="analytics">Surgery Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          <div className="grid gap-6">
            {liveSurgeries.map((surgery) => (
              <Card key={surgery.id} className="bg-gradient-card shadow-card border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-medical rounded-full flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white animate-pulse" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{surgery.procedure}</CardTitle>
                        <CardDescription>
                          {surgery.patientName} • {surgery.room} • Started: {surgery.startTime}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className="bg-success text-success-foreground">
                        LIVE
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {surgery.currentDuration} / {surgery.estimatedDuration}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Surgery Progress */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Surgery Progress</h3>
                      <span className="text-sm font-medium">{surgery.progress}% Complete</span>
                    </div>
                    <Progress value={surgery.progress} className="h-3" />
                    <div className="text-sm text-muted-foreground">
                      Current Phase: <span className="font-medium text-foreground">{surgery.phase}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Team Information */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold">Surgical Team</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">
                            Lead Surgeon
                          </Label>
                          <p className="text-foreground">{surgery.surgeon}</p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">
                            Assistants
                          </Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {surgery.assistants.map((assistant, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {assistant}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">
                            Operating Room
                          </Label>
                          <p className="text-foreground">{surgery.room}</p>
                        </div>
                      </div>
                    </div>

                    {/* Vital Signs */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Heart className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold">Patient Vitals</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-background p-3 rounded-lg border">
                          <div className="text-xs text-muted-foreground">Heart Rate</div>
                          <div className="text-lg font-bold text-foreground">{surgery.vitalSigns.heartRate}</div>
                        </div>
                        <div className="bg-background p-3 rounded-lg border">
                          <div className="text-xs text-muted-foreground">Blood Pressure</div>
                          <div className="text-lg font-bold text-foreground">{surgery.vitalSigns.bloodPressure}</div>
                        </div>
                        <div className="bg-background p-3 rounded-lg border">
                          <div className="text-xs text-muted-foreground">Oxygen Sat</div>
                          <div className="text-lg font-bold text-foreground">{surgery.vitalSigns.oxygenSat}</div>
                        </div>
                        <div className="bg-background p-3 rounded-lg border">
                          <div className="text-xs text-muted-foreground">Temperature</div>
                          <div className="text-lg font-bold text-foreground">{surgery.vitalSigns.temperature}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Surgery Notes */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Live Surgery Notes</h3>
                    <Textarea 
                      placeholder="Add real-time surgical notes..."
                      className="h-20"
                    />
                    <Button size="sm" variant="outline">
                      Add Note
                    </Button>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      className="bg-gradient-success text-white"
                      onClick={() => handleCompleteSurgery(surgery.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Surgery
                    </Button>
                    <Button variant="outline">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleEmergencyAlert(surgery.id)}
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Emergency Alert
                    </Button>
                    <Button variant="ghost">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Upcoming Surgeries
              </CardTitle>
              <CardDescription>
                Scheduled surgical procedures for today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSurgeries.map((surgery) => (
                <div key={surgery.id} className="flex items-center justify-between p-4 bg-background rounded-lg border">
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">{surgery.procedure}</div>
                    <div className="text-sm text-muted-foreground">
                      Patient: {surgery.patientName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {surgery.scheduledTime} • {surgery.room} • {surgery.surgeon}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{surgery.status}</Badge>
                    <Button 
                      size="sm"
                      onClick={() => handleStartSurgery(surgery.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Surgery
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Completed Surgeries
              </CardTitle>
              <CardDescription>
                Successfully completed procedures today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedSurgeries.map((surgery) => (
                <div key={surgery.id} className="flex items-center justify-between p-4 bg-background rounded-lg border">
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">{surgery.procedure}</div>
                    <div className="text-sm text-muted-foreground">
                      Patient: {surgery.patientName} • Duration: {surgery.duration}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Completed: {surgery.completedTime} • {surgery.surgeon}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-success text-success-foreground">
                      {surgery.outcome}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Report
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Today's Surgeries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">12</div>
                <p className="text-xs text-muted-foreground mt-1">3 in progress</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Average Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">78 min</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-success">-5 min</span> vs avg
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">100%</div>
                <p className="text-xs text-muted-foreground mt-1">Today</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">On-Time Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">94%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-success">+2%</span> improvement
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Surgery Performance Trends</CardTitle>
              <CardDescription>
                Monthly performance metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Performance charts will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}