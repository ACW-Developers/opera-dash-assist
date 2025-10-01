import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Diagnosis {
  id: string;
  patient_id: string;
  user_id: string;
  diagnosis: string;
  symptoms?: string;
  test_results?: string;
  recommendation_type: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  patients?: {
    first_name: string;
    last_name: string;
    patient_id: string;
  };
}

export function useDiagnoses() {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDiagnoses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("diagnoses")
        .select(`
          *,
          patients (
            first_name,
            last_name,
            patient_id
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDiagnoses(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching diagnoses",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addDiagnosis = async (diagnosisData: Omit<Diagnosis, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'patients'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { data, error } = await supabase
        .from("diagnoses")
        .insert([{ ...diagnosisData, user_id: user.id } as any])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Diagnosis saved",
        description: "Diagnosis has been saved successfully.",
      });

      await fetchDiagnoses();
      return data;
    } catch (error: any) {
      toast({
        title: "Error saving diagnosis",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDiagnoses();
  }, []);

  return {
    diagnoses,
    loading,
    addDiagnosis,
    refreshDiagnoses: fetchDiagnoses,
  };
}
