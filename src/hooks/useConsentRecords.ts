import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ConsentRecord {
  id: string;
  patient_id: string;
  procedure_id?: string;
  user_id: string;
  consent_given: boolean;
  consent_date?: string;
  procedure_explained: boolean;
  risks_explained: boolean;
  alternatives_explained: boolean;
  patient_questions_answered: boolean;
  witness_name?: string;
  witness_signature?: string;
  patient_signature?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  patients?: {
    first_name: string;
    last_name: string;
    patient_id: string;
  };
  surgical_procedures?: {
    procedure_name: string;
    scheduled_date: string;
  };
}

export function useConsentRecords() {
  const [consents, setConsents] = useState<ConsentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchConsents = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("consent_records")
        .select(`
          *,
          patients (
            first_name,
            last_name,
            patient_id
          ),
          surgical_procedures (
            procedure_name,
            scheduled_date
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setConsents(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching consent records",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addConsent = async (consentData: Omit<ConsentRecord, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'patients' | 'surgical_procedures'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { data, error } = await supabase
        .from("consent_records")
        .insert([{ ...consentData, user_id: user.id } as any])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Consent recorded",
        description: "Consent has been recorded successfully.",
      });

      await fetchConsents();
      return data;
    } catch (error: any) {
      toast({
        title: "Error recording consent",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateConsent = async (id: string, consentData: Partial<ConsentRecord>) => {
    try {
      const { error } = await supabase
        .from("consent_records")
        .update(consentData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Consent updated",
        description: "Consent has been updated successfully.",
      });

      await fetchConsents();
    } catch (error: any) {
      toast({
        title: "Error updating consent",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchConsents();
  }, []);

  return {
    consents,
    loading,
    addConsent,
    updateConsent,
    refreshConsents: fetchConsents,
  };
}
