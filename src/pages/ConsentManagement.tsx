import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  FileCheck, 
  User, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Download,
  Send,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ConsentManagement() {
  const [activeTab, setActiveTab] = useState("pending");
  const [consents, setConsents] = useState([
    {
      id: "C001",
      patientId: "P001",
      patientName: "John Doe",
      surgeryType: "Appendectomy",
      surgeonName: "Dr. Smith",
      scheduledDate: "2024-01-20",
      scheduledTime: "09:00 AM",
      consentItems: [
        { id: 1, text: "I understand the nature of the surgical procedure", checked: false },
        { id: 2, text: "I understand the risks and benefits of the surgery", checked: false },
        { id: 3, text: "I understand alternative treatment options", checked: false },
        { id: 4, text: "I consent to anesthesia administration", checked: false },
        { id: 5, text: "I understand post-operative care requirements", checked: false }
      ],
      acknowledgmentItems: [
        { id: 1, text: "I acknowledge that I have read and understand this consent form", checked: false },
        { id: 2, text: "I have had the opportunity to ask questions about the procedure", checked: false },
        { id: 3, text: "I understand that no guarantee has been made regarding the outcome", checked: false }
      ],
      status: "pending",
      patientDecision: null as "agreed" | "declined" | null
    },
  ]);
  const { toast } = useToast();

  const handleCheckboxChange = (consentId: string, itemId: number, type: "consent" | "acknowledgment") => {
    setConsents(prev => prev.map(consent => {
      if (consent.id === consentId) {
        if (type === "consent") {
          return {
            ...consent,
            consentItems: consent.consentItems.map(item => 
              item.id === itemId ? { ...item, checked: !item.checked } : item
            )
          };
        } else {
          return {
            ...consent,
            acknowledgmentItems: consent.acknowledgmentItems.map(item => 
              item.id === itemId ? { ...item, checked: !item.checked } : item
            )
          };
        }
      }
      return consent;
    }));
  };

  const handlePatientDecision = (consentId: string, decision: "agreed" | "declined") => {
    setConsents(prev => prev.map(consent => 
      consent.id === consentId 
        ? { ...consent, patientDecision: decision, status: decision === "agreed" ? "approved" : "declined" }
        : consent
    ));

    toast({
      title: decision === "agreed" ? "Consent approved" : "Consent declined",
      description: `Patient has ${decision} the consent form.`,
      variant: decision === "agreed" ? "default" : "destructive"
    });
  };

  const handleSendConsent = (consentId: string) => {
    setConsents(prev => prev.map(consent => 
      consent.id === consentId ? { ...consent, status: "sent" } : consent
    ));

    toast({
      title: "Consent form sent",
      description: `Consent form ${consentId} has been sent to the patient for signature.`,
    });
  };

  const handleDownloadForm = (consentId: string) => {
    const consent = consents.find(c => c.id === consentId);
    if (!consent) return;

    // Create a printable form content
    const formContent = `
      SURGICAL CONSENT FORM
      =====================
      
      Patient Information:
      - Name: ${consent.patientName}
      - Patient ID: ${consent.patientId}
      - Surgery Type: ${consent.surgeryType}
      - Surgeon: ${consent.surgeonName}
      - Scheduled: ${consent.scheduledDate} at ${consent.scheduledTime}
      
      Consent Items:
      ${consent.consentItems.map(item => `[${item.checked ? '✓' : ' '}] ${item.text}`).join('\n')}
      
      Patient Acknowledgment:
      ${consent.acknowledgmentItems.map(item => `[${item.checked ? '✓' : ' '}] ${item.text}`).join('\n')}
      
      Patient Decision: ${consent.patientDecision ? consent.patientDecision.toUpperCase() : 'PENDING'}
      
      Generated on: ${new Date().toLocaleDateString()}
    `;

    // Create and download file
    const blob = new Blob([formContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consent-form-${consentId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Form downloaded",
      description: "Consent form has been downloaded successfully.",
    });
  };

  const resetConsent = (consentId: string) => {
    setConsents(prev => prev.map(consent => 
      consent.id === consentId 
        ? {
            ...consent,
            consentItems: consent.consentItems.map(item => ({ ...item, checked: false })),
            acknowledgmentItems: consent.acknowledgmentItems.map(item => ({ ...item, checked: false })),
            patientDecision: null,
            status: "pending"
          }
        : consent
    ));

    toast({
      title: "Form reset",
      description: "All selections have been cleared.",
    });
  };

  const isAllChecked = (consentId: string) => {
    const consent = consents.find(c => c.id === consentId);
    if (!consent) return false;
    
    const allConsentChecked = consent.consentItems.every(item => item.checked);
    const allAckChecked = consent.acknowledgmentItems.every(item => item.checked);
    
    return allConsentChecked && allAckChecked;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Consent Management</h1>
        <p className="text-muted-foreground">
          Interactive surgical consent process with patient decision capability
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">
            Pending ({consents.filter(c => c.status === "pending" || c.status === "sent").length})
          </TabsTrigger>
          <TabsTrigger value="approved">Approved ({consents.filter(c => c.status === "approved").length})</TabsTrigger>
          <TabsTrigger value="declined">Declined ({consents.filter(c => c.status === "declined").length})</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="grid gap-6">
            {consents.filter(consent => consent.status === "pending" || consent.status === "sent").map((consent) => (
              <Card key={consent.id} className="bg-gradient-card shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-medical rounded-full flex items-center justify-center">
                        <FileCheck className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          Consent Form - {consent.id}
                        </CardTitle>
                        <CardDescription>
                          {consent.patientName} • {consent.surgeryType}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={consent.status === "sent" ? "default" : "secondary"}>
                      {consent.status === "sent" ? "Sent to Patient" : "Ready to Send"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Surgery Details */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold">Surgery Details</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Patient
                            </Label>
                            <p className="text-foreground">{consent.patientName}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Patient ID
                            </Label>
                            <p className="text-foreground">{consent.patientId}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Surgery Type
                            </Label>
                            <p className="text-foreground">{consent.surgeryType}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Surgeon
                            </Label>
                            <p className="text-foreground">{consent.surgeonName}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Scheduled Date
                            </Label>
                            <p className="text-foreground">{consent.scheduledDate}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Scheduled Time
                            </Label>
                            <p className="text-foreground">{consent.scheduledTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Consent Items */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold">Consent Items</h3>
                      </div>
                      
                      <div className="space-y-3">
                        {consent.consentItems.map((item) => (
                          <div key={item.id} className="flex items-start space-x-3">
                            <Checkbox 
                              id={`consent-${consent.id}-${item.id}`}
                              checked={item.checked}
                              onCheckedChange={() => handleCheckboxChange(consent.id, item.id, "consent")}
                            />
                            <Label 
                              htmlFor={`consent-${consent.id}-${item.id}`}
                              className="text-sm leading-relaxed cursor-pointer"
                            >
                              {item.text}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Risk Disclosure */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <h3 className="font-semibold">Risk Disclosure</h3>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>General Surgical Risks:</strong> Bleeding, infection, adverse reaction to anesthesia, 
                        blood clots, pneumonia, and other complications that may require additional treatment or surgery.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong>Procedure-Specific Risks:</strong> {consent.surgeryType} may involve risks specific 
                        to this procedure, which have been discussed with the patient and surgeon.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Patient Acknowledgment */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Patient Acknowledgment</h3>
                    <div className="space-y-3">
                      {consent.acknowledgmentItems.map((item) => (
                        <div key={item.id} className="flex items-start space-x-3">
                          <Checkbox 
                            id={`ack-${consent.id}-${item.id}`}
                            checked={item.checked}
                            onCheckedChange={() => handleCheckboxChange(consent.id, item.id, "acknowledgment")}
                          />
                          <Label 
                            htmlFor={`ack-${consent.id}-${item.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {item.text}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Patient Decision */}
                  {consent.status === "sent" && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Patient Decision</h3>
                      <div className="flex gap-3">
                        <Button 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handlePatientDecision(consent.id, "agreed")}
                          disabled={!isAllChecked(consent.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          I Agree & Consent
                        </Button>
                        <Button 
                          variant="destructive"
                          onClick={() => handlePatientDecision(consent.id, "declined")}
                        >
                          <X className="w-4 h-4 mr-2" />
                          I Decline
                        </Button>
                      </div>
                      {!isAllChecked(consent.id) && (
                        <p className="text-sm text-muted-foreground">
                          Please check all consent and acknowledgment items before agreeing.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3 pt-4 border-t">
                    {consent.status === "pending" ? (
                      <>
                        <Button 
                          className="bg-gradient-medical text-white"
                          onClick={() => handleSendConsent(consent.id)}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send to Patient
                        </Button>
                        <Button variant="outline" onClick={() => handleDownloadForm(consent.id)}>
                          <Download className="w-4 h-4 mr-2" />
                          Download Form
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" onClick={() => resetConsent(consent.id)}>
                          Reset Form
                        </Button>
                        <Button variant="outline" onClick={() => handleDownloadForm(consent.id)}>
                          <Download className="w-4 h-4 mr-2" />
                          Download Current Form
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-6">
          {consents.filter(consent => consent.status === "approved").map((consent) => (
            <Card key={consent.id} className="bg-green-50 border-green-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-green-900">
                        Consent Form - {consent.id}
                      </CardTitle>
                      <CardDescription className="text-green-700">
                        {consent.patientName} • {consent.surgeryType} • Approved on {new Date().toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-500">
                    Approved
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleDownloadForm(consent.id)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Approved Form
                  </Button>
                  <Button variant="outline" onClick={() => resetConsent(consent.id)}>
                    Create New Consent
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {consents.filter(consent => consent.status === "approved").length === 0 && (
            <Card>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  No approved consents to display
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="declined" className="space-y-6">
          {consents.filter(consent => consent.status === "declined").map((consent) => (
            <Card key={consent.id} className="bg-red-50 border-red-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <X className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-red-900">
                        Consent Form - {consent.id}
                      </CardTitle>
                      <CardDescription className="text-red-700">
                        {consent.patientName} • {consent.surgeryType} • Declined on {new Date().toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="destructive">
                    Declined
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => handleDownloadForm(consent.id)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Declined Form
                  </Button>
                  <Button variant="outline" onClick={() => resetConsent(consent.id)}>
                    Create New Consent
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {consents.filter(consent => consent.status === "declined").length === 0 && (
            <Card>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  No declined consents to display
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
                Consent Form Templates
              </CardTitle>
              <CardDescription>
                Manage standardized consent form templates for different procedures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "General Surgery Consent", procedures: "All general procedures" },
                  { name: "Laparoscopic Surgery", procedures: "Minimally invasive procedures" },
                  { name: "Emergency Surgery", procedures: "Emergency procedures" },
                  { name: "Pediatric Surgery", procedures: "Procedures for patients under 18" },
                  { name: "Day Surgery", procedures: "Outpatient procedures" },
                  { name: "Complex Surgery", procedures: "High-risk procedures" }
                ].map((template, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{template.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {template.procedures}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          Use Template
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button className="mt-4">
                <FileCheck className="w-4 h-4 mr-2" />
                Create New Template
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}