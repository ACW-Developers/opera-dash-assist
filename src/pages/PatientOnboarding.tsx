import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, User, FileText, Heart, AlertTriangle, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PatientOnboarding() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState("new");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Patient registered successfully",
      description: "Patient information has been saved to the system.",
    });
  };

  const recentPatients = [
    {
      id: "P001",
      name: "John Doe",
      age: 45,
      condition: "Appendicitis",
      status: "Pending Analysis",
      registeredDate: "2024-01-15"
    },
    {
      id: "P002", 
      name: "Jane Smith",
      age: 32,
      condition: "Gallstones",
      status: "Surgery Scheduled",
      registeredDate: "2024-01-14"
    },
    {
      id: "P003",
      name: "Mike Wilson", 
      age: 58,
      condition: "Hernia",
      status: "Consent Pending",
      registeredDate: "2024-01-13"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Patient Onboarding</h1>
        <p className="text-muted-foreground">
          Register new patients and manage existing patient information
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new">New Patient</TabsTrigger>
          <TabsTrigger value="search">Search Patients</TabsTrigger>
          <TabsTrigger value="recent">Recent Registrations</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Patient Registration Form
              </CardTitle>
              <CardDescription>
                Complete patient information for surgical assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-4 h-4 text-primary" />
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="Enter first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Enter last name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientId">Patient ID</Label>
                      <Input id="patientId" placeholder="Auto-generated" disabled />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Date of Birth *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
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
                      <Label htmlFor="gender">Gender *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a+">A+</SelectItem>
                          <SelectItem value="a-">A-</SelectItem>
                          <SelectItem value="b+">B+</SelectItem>
                          <SelectItem value="b-">B-</SelectItem>
                          <SelectItem value="ab+">AB+</SelectItem>
                          <SelectItem value="ab-">AB-</SelectItem>
                          <SelectItem value="o+">O+</SelectItem>
                          <SelectItem value="o-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" placeholder="Enter phone number" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter email address" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea id="address" placeholder="Enter complete address" required />
                  </div>
                </div>

                <Separator />

                {/* Medical Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-4 h-4 text-primary" />
                    <h3 className="text-lg font-semibold">Medical Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryCondition">Primary Condition *</Label>
                      <Input id="primaryCondition" placeholder="Enter primary medical condition" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgency Level *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency">Emergency</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="routine">Routine</SelectItem>
                          <SelectItem value="elective">Elective</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea 
                      id="medicalHistory" 
                      placeholder="Previous surgeries, chronic conditions, medications..."
                      className="h-24"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies & Reactions</Label>
                    <Textarea 
                      id="allergies" 
                      placeholder="Drug allergies, food allergies, environmental allergies..."
                      className="h-20"
                    />
                  </div>
                </div>

                <Separator />

                {/* Emergency Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyName">Contact Name *</Label>
                      <Input id="emergencyName" placeholder="Emergency contact name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyRelation">Relationship *</Label>
                      <Input id="emergencyRelation" placeholder="Relationship to patient" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Phone Number *</Label>
                      <Input id="emergencyPhone" type="tel" placeholder="Emergency contact phone" required />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="bg-gradient-medical text-white">
                    Register Patient
                  </Button>
                  <Button type="button" variant="outline">
                    Save as Draft
                  </Button>
                  <Button type="button" variant="ghost">
                    Clear Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Search Patients
              </CardTitle>
              <CardDescription>
                Find existing patients in the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input placeholder="Search by name, ID, or phone number..." />
                </div>
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
              
              <div className="text-center text-muted-foreground py-8">
                Enter search criteria to find patients
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Recent Registrations
              </CardTitle>
              <CardDescription>
                Recently registered patients awaiting assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 bg-background rounded-lg border">
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{patient.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Age: {patient.age} • Condition: {patient.condition}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Registered: {patient.registeredDate}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={patient.status === 'Surgery Scheduled' ? 'default' : 'secondary'}
                      >
                        {patient.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}