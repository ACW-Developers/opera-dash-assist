import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  Stethoscope, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DoctorAnalysis() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState("pending");
  const { toast } = useToast();

  const pendingPatients = [
    {
      id: "P001",
      name: "John Doe",
      age: 45,
      condition: "Acute Appendicitis",
      priority: "High",
      registeredDate: "2024-01-15",
      symptoms: "Severe abdominal pain, fever, nausea",
      vitalSigns: "BP: 140/90, HR: 95, Temp: 101.2°F"
    },
    {
      id: "P002",
      name: "Jane Smith", 
      age: 32,
      condition: "Cholecystitis",
      priority: "Medium",
      registeredDate: "2024-01-14",
      symptoms: "Right upper quadrant pain, bloating",
      vitalSigns: "BP: 120/80, HR: 78, Temp: 99.5°F"
    },
    {
      id: "P003",
      name: "Mike Wilson",
      age: 58,
      condition: "Inguinal Hernia",
      priority: "Low",
      registeredDate: "2024-01-13",
      symptoms: "Bulge in groin area, mild discomfort",
      vitalSigns: "BP: 130/85, HR: 72, Temp: 98.6°F"
    }
  ];

  const handleAnalysisSubmit = (patientId: string) => {
    toast({
      title: "Analysis completed",
      description: `Medical assessment for patient ${patientId} has been saved.`,
    });
  };

  const handleScheduleSurgery = (patientId: string) => {
    toast({
      title: "Surgery scheduled",
      description: `Surgery has been scheduled for patient ${patientId}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Doctor Analysis & Scheduling</h1>
        <p className="text-muted-foreground">
          Medical assessment, diagnosis, and surgery scheduling
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pending Analysis ({pendingPatients.length})
          </TabsTrigger>
          <TabsTrigger value="schedule">Surgery Scheduling</TabsTrigger>
          <TabsTrigger value="completed">Completed Assessments</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="grid gap-6">
            {pendingPatients.map((patient) => (
              <Card key={patient.id} className="bg-gradient-card shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-medical rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{patient.name}</CardTitle>
                        <CardDescription>
                          Age: {patient.age} • Patient ID: {patient.id}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant={patient.priority === 'High' ? 'destructive' : 
                              patient.priority === 'Medium' ? 'default' : 'secondary'}
                    >
                      {patient.priority} Priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Patient Information */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Stethoscope className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold">Medical Information</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">
                            Primary Condition
                          </Label>
                          <p className="text-foreground">{patient.condition}</p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">
                            Symptoms
                          </Label>
                          <p className="text-foreground">{patient.symptoms}</p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">
                            Vital Signs
                          </Label>
                          <p className="text-foreground">{patient.vitalSigns}</p>
                        </div>
                      </div>
                    </div>

                    {/* Analysis Form */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold">Medical Analysis</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`diagnosis-${patient.id}`}>Diagnosis *</Label>
                          <Input 
                            id={`diagnosis-${patient.id}`}
                            placeholder="Enter primary diagnosis"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`surgery-type-${patient.id}`}>Recommended Surgery</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select surgery type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="appendectomy">Appendectomy</SelectItem>
                              <SelectItem value="cholecystectomy">Cholecystectomy</SelectItem>
                              <SelectItem value="hernia-repair">Hernia Repair</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`urgency-${patient.id}`}>Surgery Urgency</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select urgency level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="emergency">Emergency (0-6 hours)</SelectItem>
                              <SelectItem value="urgent">Urgent (24-48 hours)</SelectItem>
                              <SelectItem value="routine">Routine (1-2 weeks)</SelectItem>
                              <SelectItem value="elective">Elective (1+ months)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`notes-${patient.id}`}>Clinical Notes</Label>
                          <Textarea 
                            id={`notes-${patient.id}`}
                            placeholder="Additional observations, recommendations..."
                            className="h-20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      className="bg-gradient-medical text-white"
                      onClick={() => handleAnalysisSubmit(patient.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Analysis
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleScheduleSurgery(patient.id)}
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Schedule Surgery
                    </Button>
                    <Button variant="ghost">
                      <Eye className="w-4 h-4 mr-2" />
                      View History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                Surgery Scheduling
              </CardTitle>
              <CardDescription>
                Schedule surgical procedures for analyzed patients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Patient</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient for surgery" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="P001">John Doe - Appendectomy</SelectItem>
                        <SelectItem value="P002">Jane Smith - Cholecystectomy</SelectItem>
                        <SelectItem value="P003">Mike Wilson - Hernia Repair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Surgeon</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign surgeon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                        <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                        <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Operating Room</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select OR" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="or1">OR 1 - General Surgery</SelectItem>
                        <SelectItem value="or2">OR 2 - Minimally Invasive</SelectItem>
                        <SelectItem value="or3">OR 3 - Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Surgery Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="08:00">08:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="14:00">02:00 PM</SelectItem>
                        <SelectItem value="16:00">04:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Estimated Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="180">3 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Special Instructions</Label>
                <Textarea 
                  placeholder="Any special requirements or instructions for the surgery..."
                  className="h-20"
                />
              </div>

              <div className="flex gap-3">
                <Button className="bg-gradient-medical text-white">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule Surgery
                </Button>
                <Button variant="outline">
                  Check Availability
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Completed Assessments
              </CardTitle>
              <CardDescription>
                Recently completed medical analyses and scheduled surgeries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                No completed assessments to display
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}