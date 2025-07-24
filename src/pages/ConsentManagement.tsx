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
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Download,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ConsentManagement() {
  const [activeTab, setActiveTab] = useState("pending");
  const { toast } = useToast();

  const pendingConsents = [
    {
      id: "C001",
      patientId: "P001",
      patientName: "John Doe",
      surgeryType: "Appendectomy",
      surgeonName: "Dr. Smith",
      scheduledDate: "2024-01-20",
      scheduledTime: "09:00 AM",
      consentItems: [
        "I understand the nature of the surgical procedure",
        "I understand the risks and benefits of the surgery",
        "I understand alternative treatment options",
        "I consent to anesthesia administration",
        "I understand post-operative care requirements"
      ],
      status: "Pending Patient Signature"
    },
    {
      id: "C002", 
      patientId: "P002",
      patientName: "Jane Smith",
      surgeryType: "Cholecystectomy",
      surgeonName: "Dr. Johnson",
      scheduledDate: "2024-01-22",
      scheduledTime: "02:30 PM",
      consentItems: [
        "I understand the laparoscopic cholecystectomy procedure",
        "I understand potential complications and risks",
        "I consent to possible conversion to open surgery if needed",
        "I understand dietary restrictions post-surgery",
        "I consent to blood transfusion if necessary"
      ],
      status: "Ready for Review"
    }
  ];

  const handleSendConsent = (consentId: string) => {
    toast({
      title: "Consent form sent",
      description: `Consent form ${consentId} has been sent to the patient for signature.`,
    });
  };

  const handleApproveConsent = (consentId: string) => {
    toast({
      title: "Consent approved",
      description: `Consent form ${consentId} has been approved and patient can proceed to surgery.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Consent Management</h1>
        <p className="text-muted-foreground">
          Automated surgical consent process and documentation
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">
            Pending ({pendingConsents.length})
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="templates">Consent Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="grid gap-6">
            {pendingConsents.map((consent) => (
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
                    <Badge 
                      variant={consent.status === 'Ready for Review' ? 'default' : 'secondary'}
                    >
                      {consent.status}
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
                        {consent.consentItems.map((item, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <Checkbox 
                              id={`consent-${consent.id}-${index}`}
                              disabled
                              checked
                            />
                            <Label 
                              htmlFor={`consent-${consent.id}-${index}`}
                              className="text-sm leading-relaxed"
                            >
                              {item}
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
                      <AlertTriangle className="w-4 h-4 text-warning" />
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
                      <div className="flex items-start space-x-3">
                        <Checkbox disabled checked />
                        <Label className="text-sm">
                          I acknowledge that I have read and understand this consent form
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox disabled checked />
                        <Label className="text-sm">
                          I have had the opportunity to ask questions about the procedure
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox disabled checked />
                        <Label className="text-sm">
                          I understand that no guarantee has been made regarding the outcome
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    {consent.status === 'Ready for Review' ? (
                      <>
                        <Button 
                          className="bg-gradient-medical text-white"
                          onClick={() => handleSendConsent(consent.id)}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send to Patient
                        </Button>
                        <Button variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview Form
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          className="bg-gradient-success text-white"
                          onClick={() => handleApproveConsent(consent.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve Consent
                        </Button>
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </>
                    )}
                    <Button variant="ghost">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Request Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Approved Consents
              </CardTitle>
              <CardDescription>
                Completed and approved surgical consent forms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                No approved consents to display
              </div>
            </CardContent>
          </Card>
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
                          Edit
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

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Consent Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">94.2%</div>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="text-success">+2.1%</span> from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Average Processing Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">2.3 days</div>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="text-success">-0.5 days</span> improvement
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Digital Signatures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">89%</div>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="text-success">+15%</span> adoption rate
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}