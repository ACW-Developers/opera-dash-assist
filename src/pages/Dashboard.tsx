import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Calendar,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Heart,
  Stethoscope,
  FileText
} from "lucide-react";
import { usePatients } from "@/hooks/usePatients";
import { useProcedures } from "@/hooks/useProcedures";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { patients } = usePatients();
  const { procedures } = useProcedures();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const activeProcedures = procedures.filter(p => p.status === 'in_progress' || p.status === 'scheduled');
  const completedProcedures = procedures.filter(p => p.status === 'completed');
  const pendingConsents = procedures.filter(p => p.status === 'pending');
  const successRate = procedures.length > 0 ? 
    ((completedProcedures.length / procedures.length) * 100).toFixed(1) : '100';

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Surgery tracking system central hub
          </p>
        </div>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <Heart className="w-16 h-16 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Authentication Required</h3>
              <p className="text-muted-foreground">
                Please sign in to access the surgery tracking dashboard.
              </p>
              <Button onClick={() => window.location.href = '/auth'} className="bg-primary hover:bg-primary/90">
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  const stats = [
    {
      title: "Total Patients",
      value: patients.length.toString(),
      change: "+12%",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Procedures",
      value: activeProcedures.length.toString(),
      change: "+8%",
      icon: Activity,
      color: "text-success"
    },
    {
      title: "Pending Consents",
      value: pendingConsents.length.toString(),
      change: "-5%",
      icon: FileText,
      color: "text-warning"
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      change: "+0.5%",
      icon: CheckCircle,
      color: "text-success"
    }
  ];

  const upcomingSurgeries = procedures
    .filter(p => p.status === 'scheduled' && p.patients)
    .slice(0, 3)
    .map(p => ({
      patient: `${p.patients?.first_name} ${p.patients?.last_name}`,
      procedure: p.procedure_name,
      time: p.scheduled_date ? new Date(p.scheduled_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'TBD',
      date: p.scheduled_date ? new Date(p.scheduled_date).toDateString() : 'TBD',
      surgeon: p.surgeon_name || 'TBD',
      status: 'Scheduled'
    }));

  const recentActivity = procedures
    .filter(p => p.patients)
    .slice(0, 4)
    .map(p => {
      const statusMap = {
        'completed': 'Surgery completed',
        'scheduled': 'Surgery scheduled', 
        'in_progress': 'Surgery in progress',
        'pending': 'Assessment pending'
      };
      
      return {
        action: statusMap[p.status as keyof typeof statusMap] || 'Status updated',
        patient: `${p.patients?.first_name} ${p.patients?.last_name}`,
        time: new Date(p.updated_at).toLocaleString(),
        status: p.status === 'completed' ? 'success' : p.status === 'pending' ? 'warning' : 'info'
      };
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back, Dr. Johnson. Here's what's happening in your surgery department today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                  {stat.change}
                </span>
                {" "}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Surgeries */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming Surgeries
            </CardTitle>
            <CardDescription>
              Today's surgical schedule and upcoming procedures
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSurgeries.map((surgery, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg border">
                <div className="space-y-1">
                  <div className="font-medium text-foreground">{surgery.patient}</div>
                  <div className="text-sm text-muted-foreground">{surgery.procedure}</div>
                  <div className="text-xs text-muted-foreground">
                    {surgery.date} at {surgery.time} • Dr. {surgery.surgeon}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge 
                    variant={surgery.status === 'Confirmed' ? 'default' : 
                            surgery.status === 'Pre-op' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {surgery.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates and system activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-background rounded-lg border">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-success' :
                  activity.status === 'warning' ? 'bg-warning' : 'bg-primary'
                }`} />
                <div className="flex-1 space-y-1">
                  <div className="text-sm font-medium text-foreground">{activity.action}</div>
                  <div className="text-xs text-muted-foreground">Patient: {activity.patient}</div>
                </div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Department Performance
          </CardTitle>
          <CardDescription>
            Key performance indicators for the surgery department
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Surgery Success Rate</span>
                <span className="font-medium text-foreground">98.2%</span>
              </div>
              <Progress value={98.2} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Patient Satisfaction</span>
                <span className="font-medium text-foreground">96.8%</span>
              </div>
              <Progress value={96.8} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">WHO Compliance</span>
                <span className="font-medium text-foreground">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used actions and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Users className="w-6 h-6" />
              <span className="text-sm">Add Patient</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Schedule Surgery</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <FileText className="w-6 h-6" />
              <span className="text-sm">Generate Report</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Stethoscope className="w-6 h-6" />
              <span className="text-sm">Emergency Protocol</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}