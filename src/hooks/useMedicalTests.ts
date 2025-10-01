import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface MedicalTest {
  id: string;
  patient_id: string;
  user_id: string;
  test_type: string;
  test_name: string;
  ordered_by: string;
  ordered_date: string;
  status: string;
  results?: string;
  results_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  patients?: {
    first_name: string;
    last_name: string;
    patient_id: string;
  };
}

export function useMedicalTests() {
  const [tests, setTests] = useState<MedicalTest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTests = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("medical_tests")
        .select(`
          *,
          patients (
            first_name,
            last_name,
            patient_id
          )
        `)
        .eq("user_id", user.id)
        .order("ordered_date", { ascending: false });

      if (error) throw error;
      setTests(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching tests",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addTest = async (testData: Omit<MedicalTest, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'patients'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { data, error } = await supabase
        .from("medical_tests")
        .insert([{ ...testData, user_id: user.id } as any])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Test ordered",
        description: "Medical test has been ordered successfully.",
      });

      await fetchTests();
      return data;
    } catch (error: any) {
      toast({
        title: "Error ordering test",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateTest = async (id: string, testData: Partial<MedicalTest>) => {
    try {
      const { error } = await supabase
        .from("medical_tests")
        .update(testData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Test updated",
        description: "Medical test has been updated successfully.",
      });

      await fetchTests();
    } catch (error: any) {
      toast({
        title: "Error updating test",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return {
    tests,
    loading,
    addTest,
    updateTest,
    refreshTests: fetchTests,
  };
}
