import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Prescription {
  id: string;
  patient_id: string;
  diagnosis_id?: string;
  user_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  status: string;
  dispensed_date?: string;
  dispensed_by?: string;
  created_at: string;
  updated_at: string;
  patients?: {
    first_name: string;
    last_name: string;
    patient_id: string;
  };
}

export function usePrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPrescriptions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("prescriptions")
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
      setPrescriptions(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching prescriptions",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addPrescription = async (prescriptionData: Omit<Prescription, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'patients'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { data, error } = await supabase
        .from("prescriptions")
        .insert([{ ...prescriptionData, user_id: user.id } as any])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Prescription created",
        description: "Prescription has been created successfully.",
      });

      await fetchPrescriptions();
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating prescription",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updatePrescription = async (id: string, prescriptionData: Partial<Prescription>) => {
    try {
      const { error } = await supabase
        .from("prescriptions")
        .update(prescriptionData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Prescription updated",
        description: "Prescription has been updated successfully.",
      });

      await fetchPrescriptions();
    } catch (error: any) {
      toast({
        title: "Error updating prescription",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return {
    prescriptions,
    loading,
    addPrescription,
    updatePrescription,
    refreshPrescriptions: fetchPrescriptions,
  };
}
