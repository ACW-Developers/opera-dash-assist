import { useState, useEffect } from "react";
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
  Heart,
  Scissors,
  Thermometer,
  Droplets,
  Brain,
  Stethoscope,
  Pill,
  Shield,
  Menu,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SurgeryTracking() {
  const [activeTab, setActiveTab] = useState("live");
  const [surgeryNotes, setSurgeryNotes] = useState("");
  const [currentPhase, setCurrentPhase] = useState("anesthesia");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Sample data for John Doe's appendectomy
  const johnDoeSurgery = {
    id: "SUR001",
    patientName: "John Doe",
    patientId: "P001",
    age: 45,
    weight: "82 kg",
    height: "178 cm",
    bloodType: "O+",
    allergies: "Penicillin, Latex",
    procedure: "Laparoscopic Appendectomy",
    surgeon: "Dr. Sarah Chen",
    assistantSurgeon: "Dr. Michael Rodriguez",
    anesthesiologist: "Dr. James Wilson",
    circulatingNurse: "Nurse Emily Parker",
    scrubNurse: "Nurse David Kim",
    scheduledTime: "09:00 AM",
    actualStartTime: "09:15 AM",
    orNumber: "OR 3",
    anesthesiaType: "General Endotracheal",
    estimatedDuration: 45,
    urgency: "Emergency",
    diagnosis: "Acute Appendicitis",
    medicalHistory: "Hypertension, controlled with medication",
    currentMeds: "Lisinopril 10mg daily",
    labResults: {
      wbc: "14.2 K/μL (High)",
      crp: "28 mg/L (High)",
      temp: "38.2°C"
    },
    vitalSigns: {
      heartRate: 88,
      bloodPressure: "142/88",
      oxygenSaturation: 98,
      respiratoryRate: 16,
      temperature: 37.8
    },
    surgeryPhases: [
      { name: "Anesthesia Induction", startTime: "09:15", endTime: "09:25", status: "completed" },
      { name: "Patient Positioning", startTime: "09:25", endTime: "09:30", status: "completed" },
      { name: "Incision & Access", startTime: "09:30", endTime: "09:40", status: "completed" },
      { name: "Appendix Identification", startTime: "09:40", endTime: null, status: "in-progress" },
      { name: "Appendix Removal", startTime: null, endTime: null, status: "pending" },
      { name: "Closure", startTime: null, endTime: null, status: "pending" },
      { name: "Recovery", startTime: null, endTime: null, status: "pending" }
    ],
    equipment: [
      "Laparoscope 10mm",
      "Trocar Set",
      "Grasping Forceps",
      "Clip Applier",
      "Suction/Irrigation"
    ],
    medications: [
      "Propofol 200mg",
      "Fentanyl 100mcg",
      "Rocuronium 50mg",
      "Cefazolin 2g",
      "Ketorolac 30mg"
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddNote = () => {
    if (surgeryNotes.trim()) {
      toast({
        title: "Note added",
        description: "Surgical note has been recorded.",
      });
      setSurgeryNotes("");
    }
  };

  const handleCompletePhase = (phaseIndex: number) => {
    toast({
      title: "Phase completed",
      description: `${johnDoeSurgery.surgeryPhases[phaseIndex].name} marked as completed.`,
    });
  };

  const handleEmergencyAlert = () => {
    toast({
      title: "Emergency alert sent",
      description: "Emergency assistance requested for OR 3.",
      variant: "destructive"
    });
  };

  const handleCompleteSurgery = () => {
    toast({
      title: "Surgery completed",
      description: "Appendectomy successfully completed.",
    });
  };

  const getProgressPercentage = () => {
    const completedPhases = johnDoeSurgery.surgeryPhases.filter(phase => phase.status === "completed").length;
    return (completedPhases / johnDoeSurgery.surgeryPhases.length) * 100;
  };

  // Mobile responsive progress dots
  const ProgressDots = () => (
    <div className={`grid gap-1 text-xs ${
      isMobile 
        ? "grid-cols-4 gap-1" 
        : "grid-cols-7 gap-2"
    }`}>
      {johnDoeSurgery.surgeryPhases.map((phase, index) => (
        <div key={index} className="text-center">
          <div className={`mx-auto mb-1 ${
            phase.status === "completed" ? "bg-green-500" :
            phase.status === "in-progress" ? "bg-blue-500 animate-pulse" :
            "bg-gray-300"
          } ${isMobile ? "w-2 h-2" : "w-3 h-3"} rounded-full`} />
          <div className={`truncate ${isMobile ? "text-[10px]" : "text-xs"}`}>
            {isMobile ? phase.name.split(' ')[0] : phase.name.split(' ')[0]}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-0">
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between md:hidden">
          <div>
            <h1 className="text-xl font-bold text-foreground">Surgery Tracking</h1>
            <p className="text-xs text-muted-foreground">
              John Doe's Appendectomy
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Surgery Tracking - Live Monitoring</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Real-time surgical procedure monitoring for John Doe's Appendectomy
          </p>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile Tabs */}
        {isMobile ? (
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden space-y-2`}>
            <Button
              variant={activeTab === "live" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("live");
                setMobileMenuOpen(false);
              }}
            >
              <Activity className="w-4 h-4 mr-2" />
              Live Surgery
            </Button>
            <Button
              variant={activeTab === "patient" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("patient");
                setMobileMenuOpen(false);
              }}
            >
              <User className="w-4 h-4 mr-2" />
              Patient Info
            </Button>
            <Button
              variant={activeTab === "team" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("team");
                setMobileMenuOpen(false);
              }}
            >
              <Shield className="w-4 h-4 mr-2" />
              Surgical Team
            </Button>
          </div>
        ) : (
          // Desktop Tabs
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="live" className="text-sm md:text-base">
              <Activity className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Live Surgery</span>
              <span className="sm:hidden">Live</span>
            </TabsTrigger>
            <TabsTrigger value="patient" className="text-sm md:text-base">
              <User className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Patient Info</span>
              <span className="sm:hidden">Patient</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="text-sm md:text-base">
              <Shield className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Surgical Team</span>
              <span className="sm:hidden">Team</span>
            </TabsTrigger>
          </TabsList>
        )}

        <TabsContent value="live" className="space-y-4 md:space-y-6">
          {/* Surgery Overview Card */}
          <Card className="bg-gradient-card shadow-card border-l-4 border-l-blue-500">
            <CardHeader className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`${isMobile ? "w-8 h-8" : "w-12 h-12"} bg-blue-500 rounded-full flex items-center justify-center`}>
                    <Scissors className={isMobile ? "w-4 h-4" : "w-6 h-6"} />
                  </div>
                  <div>
                    <CardTitle className={isMobile ? "text-lg" : "text-2xl"}>
                      {johnDoeSurgery.procedure}
                    </CardTitle>
                    <CardDescription className={isMobile ? "text-xs" : "text-lg"}>
                      {johnDoeSurgery.patientName} • {johnDoeSurgery.patientId} • OR {johnDoeSurgery.orNumber}
                    </CardDescription>
                  </div>
                </div>
                <div className="text-left md:text-right space-y-1">
                  <Badge className="bg-red-500 text-white animate-pulse text-sm md:text-lg">
                    LIVE - {formatTime(elapsedTime)}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    Started: {johnDoeSurgery.actualStartTime}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
              {/* Surgery Progress */}
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <h3 className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>Surgery Progress</h3>
                  <span className="text-xs md:text-sm font-medium">
                    Phase: {johnDoeSurgery.surgeryPhases.find(p => p.status === "in-progress")?.name || "Completed"}
                  </span>
                </div>
                <Progress value={getProgressPercentage()} className="h-2 md:h-4" />
                <ProgressDots />
              </div>

              <Separator />

              {/* Real-time Monitoring Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Vital Signs Monitor */}
                <Card>
                  <CardHeader className="pb-3 p-4 md:p-6">
                    <CardTitle className={`flex items-center gap-2 ${isMobile ? "text-base" : "text-lg"}`}>
                      <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                      Real-time Vital Signs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6">
                    <div className={`grid gap-3 ${isMobile ? "grid-cols-2" : "grid-cols-2"}`}>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className={`font-bold text-red-600 ${isMobile ? "text-xl" : "text-2xl"}`}>
                          {johnDoeSurgery.vitalSigns.heartRate}
                        </div>
                        <div className="text-xs text-muted-foreground">Heart Rate</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className={`font-bold text-blue-600 ${isMobile ? "text-xl" : "text-2xl"}`}>
                          {johnDoeSurgery.vitalSigns.bloodPressure}
                        </div>
                        <div className="text-xs text-muted-foreground">Blood Pressure</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className={`font-bold text-green-600 ${isMobile ? "text-xl" : "text-2xl"}`}>
                          {johnDoeSurgery.vitalSigns.oxygenSaturation}%
                        </div>
                        <div className="text-xs text-muted-foreground">SpO₂</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className={`font-bold text-orange-600 ${isMobile ? "text-xl" : "text-2xl"}`}>
                          {johnDoeSurgery.vitalSigns.temperature}°C
                        </div>
                        <div className="text-xs text-muted-foreground">Temperature</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Phase Details */}
                <Card>
                  <CardHeader className="pb-3 p-4 md:p-6">
                    <CardTitle className={`flex items-center gap-2 ${isMobile ? "text-base" : "text-lg"}`}>
                      <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                      Current Phase
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-2 md:space-y-3">
                      {johnDoeSurgery.surgeryPhases.map((phase, index) => (
                        <div key={index} className={`flex items-center justify-between p-2 md:p-3 rounded-lg ${
                          phase.status === "in-progress" ? "bg-blue-50 border border-blue-200" :
                          phase.status === "completed" ? "bg-green-50" : "bg-gray-50"
                        }`}>
                          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                            <div className={`flex-shrink-0 ${
                              phase.status === "completed" ? "bg-green-500" :
                              phase.status === "in-progress" ? "bg-blue-500 animate-pulse" :
                              "bg-gray-300"
                            } ${isMobile ? "w-2 h-2" : "w-3 h-3"} rounded-full`} />
                            <span className={`truncate ${isMobile ? "text-sm" : ""} ${
                              phase.status === "in-progress" ? "font-semibold text-blue-700" : ""
                            }`}>
                              {phase.name}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                            {phase.startTime && `${phase.startTime}${phase.endTime ? ` - ${phase.endTime}` : ''}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Surgery Notes and Medications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <Card>
                  <CardHeader className="pb-3 p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
                      Surgical Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4 md:p-6">
                    <Textarea 
                      placeholder="Add real-time surgical notes, observations, or complications..."
                      value={surgeryNotes}
                      onChange={(e) => setSurgeryNotes(e.target.value)}
                      className={isMobile ? "h-20" : "h-24"}
                    />
                    <Button onClick={handleAddNote} className="w-full text-sm md:text-base">
                      Add Surgical Note
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3 p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                      Medications Administered
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-2">
                      {johnDoeSurgery.medications.map((med, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="text-xs md:text-sm font-medium truncate flex-1 mr-2">{med}</span>
                          <Badge variant="outline" className="bg-white text-xs flex-shrink-0">Given</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className={`flex gap-2 md:gap-3 pt-4 border-t ${
                isMobile ? "flex-col" : ""
              }`}>
                <Button 
                  className={`bg-green-600 hover:bg-green-700 text-white ${
                    isMobile ? "w-full" : "flex-1"
                  }`}
                  onClick={handleCompleteSurgery}
                  size={isMobile ? "sm" : "default"}
                >
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Complete Surgery
                </Button>
                <Button 
                  variant="outline" 
                  size={isMobile ? "sm" : "default"}
                  className={isMobile ? "w-full" : ""}
                >
                  <Pause className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Pause Timer
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleEmergencyAlert}
                  size={isMobile ? "sm" : "default"}
                  className={isMobile ? "w-full" : ""}
                >
                  <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Emergency
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patient" className="space-y-4 md:space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className={`flex items-center gap-2 ${isMobile ? "text-lg" : "text-xl"}`}>
                <User className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                Patient Information - John Doe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Demographics */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>Demographics</h3>
                  <div className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
                    <div>
                      <Label className="text-sm">Age</Label>
                      <p className="font-medium text-sm md:text-base">{johnDoeSurgery.age} years</p>
                    </div>
                    <div>
                      <Label className="text-sm">Weight</Label>
                      <p className="font-medium text-sm md:text-base">{johnDoeSurgery.weight}</p>
                    </div>
                    <div>
                      <Label className="text-sm">Height</Label>
                      <p className="font-medium text-sm md:text-base">{johnDoeSurgery.height}</p>
                    </div>
                    <div>
                      <Label className="text-sm">Blood Type</Label>
                      <p className="font-medium text-sm md:text-base">{johnDoeSurgery.bloodType}</p>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>Medical Information</h3>
                  <div className="space-y-2 md:space-y-3">
                    <div>
                      <Label className="text-sm">Allergies</Label>
                      <p className="font-medium text-red-600 text-sm md:text-base">{johnDoeSurgery.allergies}</p>
                    </div>
                    <div>
                      <Label className="text-sm">Medical History</Label>
                      <p className="font-medium text-sm md:text-base">{johnDoeSurgery.medicalHistory}</p>
                    </div>
                    <div>
                      <Label className="text-sm">Current Medications</Label>
                      <p className="font-medium text-sm md:text-base">{johnDoeSurgery.currentMeds}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Lab Results */}
              <div className="space-y-3 md:space-y-4">
                <h3 className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>Pre-operative Lab Results</h3>
                <div className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
                  <Card className="bg-orange-50">
                    <CardContent className="p-3 md:p-4 text-center">
                      <Thermometer className={`text-orange-500 mx-auto mb-2 ${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
                      <div className={`font-bold text-orange-600 ${isMobile ? "text-base" : "text-lg"}`}>
                        {johnDoeSurgery.labResults.wbc}
                      </div>
                      <div className="text-xs text-muted-foreground">White Blood Cells</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50">
                    <CardContent className="p-3 md:p-4 text-center">
                      <Droplets className={`text-red-500 mx-auto mb-2 ${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
                      <div className={`font-bold text-red-600 ${isMobile ? "text-base" : "text-lg"}`}>
                        {johnDoeSurgery.labResults.crp}
                      </div>
                      <div className="text-xs text-muted-foreground">CRP Level</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-50">
                    <CardContent className="p-3 md:p-4 text-center">
                      <Stethoscope className={`text-yellow-500 mx-auto mb-2 ${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
                      <div className={`font-bold text-yellow-600 ${isMobile ? "text-base" : "text-lg"}`}>
                        {johnDoeSurgery.labResults.temp}
                      </div>
                      <div className="text-xs text-muted-foreground">Temperature</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* Diagnosis & Procedure Details */}
              <div className="space-y-3 md:space-y-4">
                <h3 className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>Surgical Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2 md:space-y-3">
                    <div>
                      <Label className="text-sm">Primary Diagnosis</Label>
                      <p className="font-medium text-sm md:text-base">{johnDoeSurgery.diagnosis}</p>
                    </div>
                    <div>
                      <Label className="text-sm">Procedure</Label>
                      <p className="font-medium text-sm md:text-base">{johnDoeSurgery.procedure}</p>
                    </div>
                    <div>
                      <Label className="text-sm">Anesthesia Type</Label>
                      <p className="font-medium text-sm md:text-base">{johnDoeSurgery.anesthesiaType}</p>
                    </div>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <div>
                      <Label className="text-sm">Estimated Duration</Label>
                      <p className="font-medium text-sm md:text-base">{johnDoeSurgery.estimatedDuration} minutes</p>
                    </div>
                    <div>
                      <Label className="text-sm">Urgency Level</Label>
                      <Badge variant="destructive" className="text-xs md:text-sm">
                        {johnDoeSurgery.urgency}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm">Operating Room</Label>
                      <p className="font-medium text-sm md:text-base">{johnDoeSurgery.orNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4 md:space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className={`flex items-center gap-2 ${isMobile ? "text-lg" : "text-xl"}`}>
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
                Surgical Team
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Surgical Team */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>Surgical Team Members</h3>
                  <div className="space-y-2 md:space-y-3">
                    <Card className="bg-blue-50">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <User className={`text-blue-500 ${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
                          <div>
                            <div className={`font-semibold ${isMobile ? "text-sm" : ""}`}>{johnDoeSurgery.surgeon}</div>
                            <div className="text-xs text-muted-foreground">Lead Surgeon</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <User className={`text-green-500 ${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
                          <div>
                            <div className={`font-semibold ${isMobile ? "text-sm" : ""}`}>{johnDoeSurgery.assistantSurgeon}</div>
                            <div className="text-xs text-muted-foreground">Assistant Surgeon</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Brain className={`text-purple-500 ${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
                          <div>
                            <div className={`font-semibold ${isMobile ? "text-sm" : ""}`}>{johnDoeSurgery.anesthesiologist}</div>
                            <div className="text-xs text-muted-foreground">Anesthesiologist</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Nursing Team */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>Nursing Team</h3>
                  <div className="space-y-2 md:space-y-3">
                    <Card className="bg-orange-50">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <User className={`text-orange-500 ${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
                          <div>
                            <div className={`font-semibold ${isMobile ? "text-sm" : ""}`}>{johnDoeSurgery.circulatingNurse}</div>
                            <div className="text-xs text-muted-foreground">Circulating Nurse</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-teal-50">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <User className={`text-teal-500 ${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
                          <div>
                            <div className={`font-semibold ${isMobile ? "text-sm" : ""}`}>{johnDoeSurgery.scrubNurse}</div>
                            <div className="text-xs text-muted-foreground">Scrub Nurse</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Equipment and Supplies */}
              <div className="space-y-3 md:space-y-4">
                <h3 className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>Surgical Equipment & Instruments</h3>
                <div className={`grid gap-2 ${isMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"}`}>
                  {johnDoeSurgery.equipment.map((item, index) => (
                    <Badge key={index} variant="secondary" className={`text-center ${isMobile ? "text-xs py-1" : "py-2"}`}>
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}