import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PreoperativeChecklist {
  id: string;
  procedure_id: string;
  patient_id: string;
  user_id: string;
  patient_confirmed: boolean;
  site_marked: boolean;
  anesthesia_safety_check: boolean;
  pulse_oximeter: boolean;
  known_allergies: boolean;
  difficult_airway: boolean;
  aspiration_risk: boolean;
  blood_loss_risk: boolean;
  team_introductions: boolean;
  surgeon_confirmed: boolean;
  anesthesia_confirmed: boolean;
  nursing_confirmed: boolean;
  antibiotics_given: boolean;
  imaging_displayed: boolean;
  equipment_concerns: boolean;
  completed_by?: string;
  completed_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export function usePreoperativeChecklists() {
  const [checklists, setChecklists] = useState<PreoperativeChecklist[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchChecklists = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("preoperative_checklists")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setChecklists(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching checklists",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addChecklist = async (checklistData: Omit<PreoperativeChecklist, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { data, error } = await supabase
        .from("preoperative_checklists")
        .insert([{ ...checklistData, user_id: user.id } as any])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Checklist created",
        description: "Preoperative checklist has been created.",
      });

      await fetchChecklists();
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating checklist",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateChecklist = async (id: string, checklistData: Partial<PreoperativeChecklist>) => {
    try {
      const { error } = await supabase
        .from("preoperative_checklists")
        .update(checklistData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Checklist updated",
        description: "Preoperative checklist has been updated.",
      });

      await fetchChecklists();
    } catch (error: any) {
      toast({
        title: "Error updating checklist",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchChecklists();
  }, []);

  return {
    checklists,
    loading,
    addChecklist,
    updateChecklist,
    refreshChecklists: fetchChecklists,
  };
}
