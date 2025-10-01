import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Stethoscope, 
  FileText, 
  CheckCircle,
  Eye,
  Pill,
  User,
  ClipboardList
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Pharmacy() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedMedication, setSelectedMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isIssued, setIsIssued] = useState(false);
  const { toast } = useToast();

  // Sample patients data
  const patients = [
    { id: "P001", name: "John Doe", age: 45, condition: "Acute Appendicitis" },
  ];

  // Available medications
  const medications = [
  { id: "panadol", name: "Panadol", type: "Pain Relief" },
  { id: "brufen", name: "Brufen", type: "Anti-inflammatory" },
  { id: "lonart", name: "Lonart", type: "Antimalarial" },

  { id: "atorvastatin", name: "Atorvastatin (Lipitor)", type: "Cholesterol / Statin" },
  { id: "metoprolol", name: "Metoprolol (Lopressor)", type: "Beta Blocker" },
  { id: "lisinopril", name: "Lisinopril (Prinivil)", type: "ACE Inhibitor" },
  { id: "amlodipine", name: "Amlodipine (Norvasc)", type: "Calcium Channel Blocker" },
  { id: "warfarin", name: "Warfarin (Coumadin)", type: "Anticoagulant" },
  { id: "clopidogrel", name: "Clopidogrel (Plavix)", type: "Antiplatelet" },
  { id: "aspirin", name: "Aspirin", type: "Analgesic / Antiplatelet" },
  { id: "furosemide", name: "Furosemide (Lasix)", type: "Diuretic" },
  { id: "digoxin", name: "Digoxin (Lanoxin)", type: "Cardiac Glycoside" },
  { id: "carvedilol", name: "Carvedilol (Coreg)", type: "Beta Blocker" }
];


  const selectedPatientData = patients.find(p => p.id === selectedPatient);

  const handleIssueMedication = () => {
    if (!selectedPatient || !selectedMedication || !dosage || !frequency || !duration) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsIssued(true);
    
    toast({
      title: "Medication issued successfully!",
      description: "Wishing the patient a quick recovery. Please observe proper dosage instructions.",
      className: "bg-green-50 border-green-200 text-green-800"
    });
  };

  const handleReset = () => {
    setSelectedPatient("");
    setSelectedMedication("");
    setDosage("");
    setFrequency("");
    setDuration("");
    setInstructions("");
    setIsIssued(false);
  };

  const getSelectedMedicationData = () => {
    return medications.find(m => m.id === selectedMedication);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Pharmacy - Medication Dispensing</h1>
        <p className="text-muted-foreground">
          Issue prescribed medications to patients with proper dosage instructions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medication Form */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-medical rounded-full flex items-center justify-center">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Medication Dispensing</CardTitle>
                <CardDescription>
                  Select patient and prescribe appropriate medication
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Patient Selection */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient-select">Choose a Patient *</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {patient.name} (Age: {patient.age})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedPatient && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-900">
                      Selected: {selectedPatientData?.name}
                    </span>
                  </div>
                  <div className="text-sm text-blue-700">
                    Condition: {selectedPatientData?.condition} • Age: {selectedPatientData?.age}
                  </div>
                </div>
              )}
            </div>

            {/* Medication Selection */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medication-select">Select Medication *</Label>
                <Select value={selectedMedication} onValueChange={setSelectedMedication}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose medication" />
                  </SelectTrigger>
                  <SelectContent>
                    {medications.map((medication) => (
                      <SelectItem key={medication.id} value={medication.id}>
                        <div className="flex items-center gap-2">
                          <Pill className="w-4 h-4" />
                          {medication.name} - {medication.type}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedMedication && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-900">
                    Selected: {getSelectedMedicationData()?.name}
                  </div>
                  <div className="text-xs text-green-700">
                    Type: {getSelectedMedicationData()?.type}
                  </div>
                </div>
              )}
            </div>

            {/* Dosage Information */}
            <div className="space-y-4">
              <h3 className="font-semibold">Dosage Instructions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage *</Label>
                  <Input 
                    id="dosage"
                    placeholder="e.g., 500mg"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency *</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once-daily">Once Daily</SelectItem>
                      <SelectItem value="twice-daily">Twice Daily</SelectItem>
                      <SelectItem value="thrice-daily">Thrice Daily</SelectItem>
                      <SelectItem value="every-6-hours">Every 6 Hours</SelectItem>
                      <SelectItem value="every-8-hours">Every 8 Hours</SelectItem>
                      <SelectItem value="as-needed">As Needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Input 
                    id="duration"
                    placeholder="e.g., 7 days"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Additional Instructions</Label>
                <Textarea 
                  id="instructions"
                  placeholder="Special instructions, precautions, or notes..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="h-20"
                />
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-medical text-white"
              onClick={handleIssueMedication}
              disabled={!selectedPatient || !selectedMedication || !dosage || !frequency || !duration}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Issue Medication
            </Button>
          </CardContent>
        </Card>

        {/* Summary Section */}
        <div className="space-y-6">
          {/* Prescription Summary */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-primary" />
                Prescription Summary
              </CardTitle>
              <CardDescription>
                Review medication details before issuing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedPatient ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">Patient:</span>
                      <p className="font-semibold">{selectedPatientData?.name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Condition:</span>
                      <p className="font-semibold">{selectedPatientData?.condition}</p>
                    </div>
                  </div>

                  {selectedMedication && (
                    <>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-muted-foreground">Medication:</span>
                          <Badge variant="default" className="bg-blue-100 text-blue-800">
                            {getSelectedMedicationData()?.name}
                          </Badge>
                        </div>
                        
                        {dosage && (
                          <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Dosage:</span>
                            <span className="font-semibold">{dosage}</span>
                          </div>
                        )}
                        
                        {frequency && (
                          <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Frequency:</span>
                            <span className="font-semibold capitalize">{frequency.replace('-', ' ')}</span>
                          </div>
                        )}
                        
                        {duration && (
                          <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Duration:</span>
                            <span className="font-semibold">{duration}</span>
                          </div>
                        )}
                        
                        {instructions && (
                          <>
                            <div>
                              <span className="font-medium text-muted-foreground">Instructions:</span>
                              <p className="text-sm mt-1 text-foreground">{instructions}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )}

                  {!selectedMedication && (
                    <div className="text-center text-muted-foreground py-8">
                      <Pill className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Select a medication to see prescription summary</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Select a patient to begin</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Recovery Message */}
          {isIssued && (
            <Card className="bg-green-50 border-green-200 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Medication Issued Successfully!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 text-lg mb-2">
                      Wishing you a quick recovery! 🎉
                    </h4>
                    <p className="text-green-700 text-sm">
                      Your medication has been issued. Please follow the dosage instructions carefully 
                      and complete the full course of treatment as prescribed.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h5 className="font-semibold text-yellow-800 text-sm mb-1">
                      ⚠️ Important Reminder
                    </h5>
                    <p className="text-yellow-700 text-xs">
                      Please observe proper dosage instructions and do not exceed the recommended amount. 
                      Contact your healthcare provider if symptoms persist or worsen.
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-100"
                >
                  Issue Another Medication
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}