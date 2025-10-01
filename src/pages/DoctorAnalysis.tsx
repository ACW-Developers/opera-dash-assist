import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Stethoscope, 
  FileText, 
  CheckCircle,
  Eye,
  Pill,
  User,
  TestTube,
  Scan,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function DoctorAnalysis() {
  const [activeTab, setActiveTab] = useState("examination");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [recommendedTests, setRecommendedTests] = useState<string[]>([]);
  const [testResults, setTestResults] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentType, setTreatmentType] = useState<"prescription" | "surgery" | "">("");
  const [prescription, setPrescription] = useState("");
  const [surgeryType, setSurgeryType] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Sample patients data
  const patients = [
    { id: "P001", name: "John Doe", age: 45, gender: "Male" },
    { id: "P002", name: "Jane Smith", age: 32, gender: "Female" },
  ];

  const commonSymptoms = [
    "Fever", "Headache", "Nausea", "Vomiting", "Abdominal pain", "Chest pain",
    "Shortness of breath", "Fatigue", "Dizziness", "Cough", "Back pain", "Joint pain"
  ];

  const testTypes = [
    { id: "lab", name: "Laboratory Tests", icon: TestTube },
    { id: "ct", name: "CT Scan", icon: Scan },
    { id: "xray", name: "X-Ray", icon: X },
    { id: "mri", name: "MRI", icon: Scan },
    { id: "ultrasound", name: "Ultrasound", icon: Scan }
  ];

  const selectedPatientData = patients.find(p => p.id === selectedPatient);

  const handleSymptomToggle = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter(s => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const handleAddCustomSymptom = () => {
    if (customSymptom.trim() && !symptoms.includes(customSymptom)) {
      setSymptoms([...symptoms, customSymptom]);
      setCustomSymptom("");
    }
  };

  const handleTestToggle = (testId: string) => {
    if (recommendedTests.includes(testId)) {
      setRecommendedTests(recommendedTests.filter(t => t !== testId));
    } else {
      setRecommendedTests([...recommendedTests, testId]);
    }
  };

  const handleOrderTests = () => {
    if (!selectedPatient) {
      toast({
        title: "Patient required",
        description: "Please select a patient first",
        variant: "destructive"
      });
      return;
    }

    if (symptoms.length === 0) {
      toast({
        title: "Symptoms required",
        description: "Please select at least one symptom",
        variant: "destructive"
      });
      return;
    }

    if (recommendedTests.length === 0) {
      toast({
        title: "Tests required",
        description: "Please select at least one test type",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Tests ordered",
      description: `Tests have been ordered for ${selectedPatientData?.name}. Awaiting results.`,
    });

    // Simulate test results based on symptoms
    const testFindings = generateTestResults(symptoms, recommendedTests);
    setTestResults(testFindings);
    
    setActiveTab("results");
  };

  const generateTestResults = (symptoms: string[], tests: string[]) => {
    let findings = "";
    
    if (symptoms.includes("Abdominal pain") && symptoms.includes("Fever") && symptoms.includes("Nausea")) {
      findings = "CT Scan Findings: Appendiceal wall thickening with surrounding inflammatory changes and fat stranding. Findings consistent with acute appendicitis.\n";
      findings += "Lab Results: WBC 14.2 K/μL (elevated), CRP 28 mg/L (elevated)\n";
      setDiagnosis("Acute Appendicitis");
    } else if (symptoms.includes("Chest pain") && symptoms.includes("Shortness of breath")) {
      findings = "X-Ray Findings: Clear lung fields, normal cardiac silhouette.\n";
      findings += "Lab Results: Troponin within normal limits, ECG normal sinus rhythm.\n";
      setDiagnosis("Musculoskeletal Chest Pain");
    } else if (symptoms.includes("Headache") && symptoms.includes("Dizziness")) {
      findings = "MRI Findings: No acute intracranial abnormalities.\n";
      findings += "Lab Results: Blood pressure 150/95 mmHg, otherwise normal.\n";
      setDiagnosis("Hypertension with Headache");
    } else {
      findings = "All tests within normal limits. No acute abnormalities detected.\n";
      setDiagnosis("Malaria - Follow up as needed");
    }

    return findings;
  };

  const handleSubmitAnalysis = () => {
    if (!diagnosis || !treatmentType) {
      toast({
        title: "Incomplete analysis",
        description: "Please provide diagnosis and select treatment type",
        variant: "destructive"
      });
      return;
    }

    if (treatmentType === "prescription" && !prescription) {
      toast({
        title: "Prescription required",
        description: "Please write a prescription for medication",
        variant: "destructive"
      });
      return;
    }

    if (treatmentType === "surgery" && !surgeryType) {
      toast({
        title: "Surgery type required",
        description: "Please select the type of surgery",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Analysis completed",
      description: `Medical assessment for ${selectedPatientData?.name} has been saved.`,
    });

    // Navigate based on treatment type
    if (treatmentType === "prescription") {
      navigate("/pharmacy");
    } else if (treatmentType === "surgery") {
      navigate("/consent");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Doctor Analysis & Treatment Plan</h1>
        <p className="text-muted-foreground">
          Patient examination, test ordering, diagnosis, and treatment planning
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="examination">Patient Examination</TabsTrigger>
          <TabsTrigger value="results">Test Results Review</TabsTrigger>
          <TabsTrigger value="treatment">Treatment Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="examination" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-medical rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Patient Selection & Symptoms</CardTitle>
                  <CardDescription>
                    Select patient and document presenting symptoms
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Patient Selection */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-select">Select Patient *</Label>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {patient.name} (Age: {patient.age}, {patient.gender})
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
                      Age: {selectedPatientData?.age} • Gender: {selectedPatientData?.gender} • ID: {selectedPatientData?.id}
                    </div>
                  </div>
                )}
              </div>

              {/* Symptoms Selection */}
              <div className="space-y-4">
                <Label>Symptoms Presentation *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {commonSymptoms.map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`symptom-${symptom}`}
                        checked={symptoms.includes(symptom)}
                        onCheckedChange={() => handleSymptomToggle(symptom)}
                      />
                      <Label htmlFor={`symptom-${symptom}`} className="text-sm cursor-pointer">
                        {symptom}
                      </Label>
                    </div>
                  ))}
                </div>

                {/* Custom Symptom Input */}
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add custom symptom..."
                    value={customSymptom}
                    onChange={(e) => setCustomSymptom(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAddCustomSymptom} variant="outline">
                    Add
                  </Button>
                </div>

                {symptoms.length > 0 && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium mb-2">Selected Symptoms:</div>
                    <div className="flex flex-wrap gap-2">
                      {symptoms.map((symptom) => (
                        <Badge key={symptom} variant="secondary" className="cursor-pointer" onClick={() => handleSymptomToggle(symptom)}>
                          {symptom} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Test Recommendations */}
              <div className="space-y-4">
                <Label>Recommended Tests *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {testTypes.map((test) => {
                    const IconComponent = test.icon;
                    return (
                      <Card 
                        key={test.id}
                        className={`cursor-pointer transition-all ${
                          recommendedTests.includes(test.id) 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border'
                        }`}
                        onClick={() => handleTestToggle(test.id)}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <Checkbox 
                            checked={recommendedTests.includes(test.id)}
                            onCheckedChange={() => handleTestToggle(test.id)}
                          />
                          <IconComponent className="w-5 h-5 text-muted-foreground" />
                          <span className="text-sm font-medium">{test.name}</span>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {recommendedTests.length > 0 && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm font-medium text-green-900 mb-2">Tests to be ordered:</div>
                    <div className="flex flex-wrap gap-2">
                      {recommendedTests.map(testId => {
                        const test = testTypes.find(t => t.id === testId);
                        return (
                          <Badge key={testId} variant="default" className="bg-green-100 text-green-800">
                            {test?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Button 
                className="w-full bg-gradient-medical text-white"
                onClick={handleOrderTests}
                disabled={!selectedPatient || symptoms.length === 0 || recommendedTests.length === 0}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Order Tests & Await Results
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-medical rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      {selectedPatientData?.name} - Test Results
                    </CardTitle>
                    <CardDescription>
                      Review test findings and provide diagnosis
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="destructive">
                  Results Ready
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold">Patient Information</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Symptoms Reported
                      </Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {symptoms.map((symptom) => (
                          <Badge key={symptom} variant="secondary" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Tests Performed
                      </Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {recommendedTests.map(testId => {
                          const test = testTypes.find(t => t.id === testId);
                          return (
                            <Badge key={testId} variant="outline" className="text-xs">
                              {test?.name}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Test Results */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold">Test Findings</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="test-results">Results Summary</Label>
                      <Textarea 
                        id="test-results"
                        value={testResults}
                        readOnly
                        className="h-32 bg-muted/50 font-mono text-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="doctor-diagnosis">Preliminary Diagnosis</Label>
                      <Input 
                        id="doctor-diagnosis"
                        placeholder="Enter diagnosis based on test results..."
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-medical text-white"
                onClick={() => setActiveTab("treatment")}
                disabled={!diagnosis}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Proceed to Treatment Plan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatment" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-primary" />
                Treatment Plan & Recommendations
              </CardTitle>
              <CardDescription>
                Final diagnosis and treatment recommendations for {selectedPatientData?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Treatment Section */}
                <div className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="final-diagnosis">Final Diagnosis *</Label>
                      <Input 
                        id="final-diagnosis"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="treatment-type">Recommended Treatment *</Label>
                      <Select value={treatmentType} onValueChange={(value: "prescription" | "surgery") => setTreatmentType(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select treatment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prescription">
                            <div className="flex items-center gap-2">
                              <Pill className="w-4 h-4" />
                              Medication & Prescription
                            </div>
                          </SelectItem>
                          <SelectItem value="surgery">
                            <div className="flex items-center gap-2">
                              <Pill className="w-4 h-4" />
                              Surgical Intervention
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Conditionally render based on treatment type */}
                    {treatmentType === "prescription" && (
                      <div className="space-y-2">
                        <Label htmlFor="prescription">Prescription Details *</Label>
                        <Textarea 
                          id="prescription"
                          placeholder="Prescribe medications, dosage, frequency, and duration..."
                          className="h-32"
                          value={prescription}
                          onChange={(e) => setPrescription(e.target.value)}
                        />
                      </div>
                    )}

                    {treatmentType === "surgery" && (
                      <div className="space-y-2">
                        <Label htmlFor="surgery-type">Recommended Surgery *</Label>
                        <Select value={surgeryType} onValueChange={setSurgeryType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select surgery type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="appendectomy">Appendectomy</SelectItem>
                            <SelectItem value="cholecystectomy">Cholecystectomy</SelectItem>
                            <SelectItem value="hernia-repair">Hernia Repair</SelectItem>
                            <SelectItem value="biopsy">Biopsy</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Patient Summary */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold">Case Summary</h3>
                  </div>
                  
                  <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Patient:</span>
                      <span className="font-medium">{selectedPatientData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age:</span>
                      <span className="font-medium">{selectedPatientData?.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Presenting Symptoms:</span>
                      <span className="font-medium text-right">{symptoms.join(", ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tests Completed:</span>
                      <span className="font-medium">
                        {recommendedTests.map(id => testTypes.find(t => t.id === id)?.name).join(", ")}
                      </span>
                    </div>
                  </div>

                  {/* Next Steps Information */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Next Steps:</h4>
                    {treatmentType === "prescription" && (
                      <p className="text-blue-800 text-sm">
                        After submitting, patient will be directed to pharmacy to collect prescribed medications.
                      </p>
                    )}
                    {treatmentType === "surgery" && (
                      <p className="text-blue-800 text-sm">
                        After submitting, patient will be directed to consent form for surgical procedure.
                      </p>
                    )}
                    {!treatmentType && (
                      <p className="text-blue-800 text-sm">
                        Select treatment type to see next steps for the patient.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  className="bg-gradient-medical text-white flex-1"
                  onClick={handleSubmitAnalysis}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Analysis & Proceed
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setActiveTab("results")}
                >
                  Back to Test Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}