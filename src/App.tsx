import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import Index from "./pages/Index";
import PatientOnboarding from "./pages/PatientOnboarding";
import DoctorAnalysis from "./pages/DoctorAnalysis";
import ConsentManagement from "./pages/ConsentManagement";
import PreOperative from "./pages/PreOperative";
import SurgeryTracking from "./pages/SurgeryTracking";
import PostOperative from "./pages/PostOperative";
import FeedbackPlatform from "./pages/FeedbackPlatform";
import RecordsManagement from "./pages/RecordsManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/patients" element={<DashboardLayout title="Patient Onboarding" subtitle="Register and manage patient information"><PatientOnboarding /></DashboardLayout>} />
          <Route path="/analysis" element={<DashboardLayout title="Doctor Analysis" subtitle="Medical assessment and surgery scheduling"><DoctorAnalysis /></DashboardLayout>} />
          <Route path="/consent" element={<DashboardLayout title="Consent Management" subtitle="Automated surgical consent process"><ConsentManagement /></DashboardLayout>} />
          <Route path="/preoperative" element={<DashboardLayout title="Pre-operative Procedures" subtitle="WHO surgical safety checklist"><PreOperative /></DashboardLayout>} />
          <Route path="/surgery" element={<DashboardLayout title="Surgery Tracking" subtitle="Live surgical procedure monitoring"><SurgeryTracking /></DashboardLayout>} />
          <Route path="/postoperative" element={<DashboardLayout title="Post-operative Care" subtitle="Recovery monitoring and follow-up"><PostOperative /></DashboardLayout>} />
          <Route path="/feedback" element={<DashboardLayout title="Feedback Platform" subtitle="Patient and specialist feedback system"><FeedbackPlatform /></DashboardLayout>} />
          <Route path="/records" element={<DashboardLayout title="Records Management" subtitle="Patient data and surgical history"><RecordsManagement /></DashboardLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
