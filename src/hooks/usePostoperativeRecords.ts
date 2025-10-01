import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PostoperativeRecord {
  id: string;
  procedure_id: string;
  patient_id: string;
  user_id: string;
  recovery_room_time?: string;
  vital_signs_stable: boolean;
  pain_level?: number;
  nausea_present: boolean;
  bleeding_controlled: boolean;
  wound_condition?: string;
  drainage_amount?: string;
  discharge_date?: string;
  discharge_instructions?: string;
  follow_up_scheduled: boolean;
  follow_up_date?: string;
  medications_prescribed?: string;
  activity_restrictions?: string;
  diet_instructions?: string;
  warning_signs?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export function usePostoperativeRecords() {
  const [records, setRecords] = useState<PostoperativeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRecords = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("postoperative_records")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching records",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addRecord = async (recordData: Omit<PostoperativeRecord, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { data, error } = await supabase
        .from("postoperative_records")
        .insert([{ ...recordData, user_id: user.id } as any])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Record created",
        description: "Postoperative record has been created.",
      });

      await fetchRecords();
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating record",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateRecord = async (id: string, recordData: Partial<PostoperativeRecord>) => {
    try {
      const { error } = await supabase
        .from("postoperative_records")
        .update(recordData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Record updated",
        description: "Postoperative record has been updated.",
      });

      await fetchRecords();
    } catch (error: any) {
      toast({
        title: "Error updating record",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return {
    records,
    loading,
    addRecord,
    updateRecord,
    refreshRecords: fetchRecords,
  };
}
