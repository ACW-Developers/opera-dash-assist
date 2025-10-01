export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      consent_records: {
        Row: {
          alternatives_explained: boolean
          consent_date: string | null
          consent_given: boolean
          created_at: string
          id: string
          notes: string | null
          patient_id: string
          patient_questions_answered: boolean
          patient_signature: string | null
          procedure_explained: boolean
          procedure_id: string | null
          risks_explained: boolean
          updated_at: string
          user_id: string
          witness_name: string | null
          witness_signature: string | null
        }
        Insert: {
          alternatives_explained?: boolean
          consent_date?: string | null
          consent_given?: boolean
          created_at?: string
          id?: string
          notes?: string | null
          patient_id: string
          patient_questions_answered?: boolean
          patient_signature?: string | null
          procedure_explained?: boolean
          procedure_id?: string | null
          risks_explained?: boolean
          updated_at?: string
          user_id: string
          witness_name?: string | null
          witness_signature?: string | null
        }
        Update: {
          alternatives_explained?: boolean
          consent_date?: string | null
          consent_given?: boolean
          created_at?: string
          id?: string
          notes?: string | null
          patient_id?: string
          patient_questions_answered?: boolean
          patient_signature?: string | null
          procedure_explained?: boolean
          procedure_id?: string | null
          risks_explained?: boolean
          updated_at?: string
          user_id?: string
          witness_name?: string | null
          witness_signature?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consent_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_records_procedure_id_fkey"
            columns: ["procedure_id"]
            isOneToOne: false
            referencedRelation: "surgical_procedures"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnoses: {
        Row: {
          created_at: string
          diagnosis: string
          id: string
          notes: string | null
          patient_id: string
          recommendation_type: string
          symptoms: string | null
          test_results: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          diagnosis: string
          id?: string
          notes?: string | null
          patient_id: string
          recommendation_type: string
          symptoms?: string | null
          test_results?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          diagnosis?: string
          id?: string
          notes?: string | null
          patient_id?: string
          recommendation_type?: string
          symptoms?: string | null
          test_results?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnoses_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_tests: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          ordered_by: string
          ordered_date: string
          patient_id: string
          results: string | null
          results_date: string | null
          status: string
          test_name: string
          test_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          ordered_by: string
          ordered_date?: string
          patient_id: string
          results?: string | null
          results_date?: string | null
          status?: string
          test_name: string
          test_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          ordered_by?: string
          ordered_date?: string
          patient_id?: string
          results?: string | null
          results_date?: string | null
          status?: string
          test_name?: string
          test_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_tests_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          allergies: string | null
          created_at: string
          current_medications: string | null
          date_of_birth: string
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          first_name: string
          gender: string | null
          id: string
          last_name: string
          medical_history: string | null
          patient_id: string
          phone: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          allergies?: string | null
          created_at?: string
          current_medications?: string | null
          date_of_birth: string
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name: string
          gender?: string | null
          id?: string
          last_name: string
          medical_history?: string | null
          patient_id: string
          phone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          allergies?: string | null
          created_at?: string
          current_medications?: string | null
          date_of_birth?: string
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string
          medical_history?: string | null
          patient_id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      postoperative_records: {
        Row: {
          activity_restrictions: string | null
          bleeding_controlled: boolean
          created_at: string
          diet_instructions: string | null
          discharge_date: string | null
          discharge_instructions: string | null
          drainage_amount: string | null
          follow_up_date: string | null
          follow_up_scheduled: boolean
          id: string
          medications_prescribed: string | null
          nausea_present: boolean
          notes: string | null
          pain_level: number | null
          patient_id: string
          procedure_id: string
          recovery_room_time: string | null
          updated_at: string
          user_id: string
          vital_signs_stable: boolean
          warning_signs: string | null
          wound_condition: string | null
        }
        Insert: {
          activity_restrictions?: string | null
          bleeding_controlled?: boolean
          created_at?: string
          diet_instructions?: string | null
          discharge_date?: string | null
          discharge_instructions?: string | null
          drainage_amount?: string | null
          follow_up_date?: string | null
          follow_up_scheduled?: boolean
          id?: string
          medications_prescribed?: string | null
          nausea_present?: boolean
          notes?: string | null
          pain_level?: number | null
          patient_id: string
          procedure_id: string
          recovery_room_time?: string | null
          updated_at?: string
          user_id: string
          vital_signs_stable?: boolean
          warning_signs?: string | null
          wound_condition?: string | null
        }
        Update: {
          activity_restrictions?: string | null
          bleeding_controlled?: boolean
          created_at?: string
          diet_instructions?: string | null
          discharge_date?: string | null
          discharge_instructions?: string | null
          drainage_amount?: string | null
          follow_up_date?: string | null
          follow_up_scheduled?: boolean
          id?: string
          medications_prescribed?: string | null
          nausea_present?: boolean
          notes?: string | null
          pain_level?: number | null
          patient_id?: string
          procedure_id?: string
          recovery_room_time?: string | null
          updated_at?: string
          user_id?: string
          vital_signs_stable?: boolean
          warning_signs?: string | null
          wound_condition?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "postoperative_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postoperative_records_procedure_id_fkey"
            columns: ["procedure_id"]
            isOneToOne: false
            referencedRelation: "surgical_procedures"
            referencedColumns: ["id"]
          },
        ]
      }
      preoperative_checklists: {
        Row: {
          anesthesia_confirmed: boolean
          anesthesia_safety_check: boolean
          antibiotics_given: boolean
          aspiration_risk: boolean
          blood_loss_risk: boolean
          completed_by: string | null
          completed_date: string | null
          created_at: string
          difficult_airway: boolean
          equipment_concerns: boolean
          id: string
          imaging_displayed: boolean
          known_allergies: boolean
          notes: string | null
          nursing_confirmed: boolean
          patient_confirmed: boolean
          patient_id: string
          procedure_id: string
          pulse_oximeter: boolean
          site_marked: boolean
          surgeon_confirmed: boolean
          team_introductions: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          anesthesia_confirmed?: boolean
          anesthesia_safety_check?: boolean
          antibiotics_given?: boolean
          aspiration_risk?: boolean
          blood_loss_risk?: boolean
          completed_by?: string | null
          completed_date?: string | null
          created_at?: string
          difficult_airway?: boolean
          equipment_concerns?: boolean
          id?: string
          imaging_displayed?: boolean
          known_allergies?: boolean
          notes?: string | null
          nursing_confirmed?: boolean
          patient_confirmed?: boolean
          patient_id: string
          procedure_id: string
          pulse_oximeter?: boolean
          site_marked?: boolean
          surgeon_confirmed?: boolean
          team_introductions?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          anesthesia_confirmed?: boolean
          anesthesia_safety_check?: boolean
          antibiotics_given?: boolean
          aspiration_risk?: boolean
          blood_loss_risk?: boolean
          completed_by?: string | null
          completed_date?: string | null
          created_at?: string
          difficult_airway?: boolean
          equipment_concerns?: boolean
          id?: string
          imaging_displayed?: boolean
          known_allergies?: boolean
          notes?: string | null
          nursing_confirmed?: boolean
          patient_confirmed?: boolean
          patient_id?: string
          procedure_id?: string
          pulse_oximeter?: boolean
          site_marked?: boolean
          surgeon_confirmed?: boolean
          team_introductions?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "preoperative_checklists_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "preoperative_checklists_procedure_id_fkey"
            columns: ["procedure_id"]
            isOneToOne: false
            referencedRelation: "surgical_procedures"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          created_at: string
          diagnosis_id: string | null
          dispensed_by: string | null
          dispensed_date: string | null
          dosage: string
          duration: string
          frequency: string
          id: string
          instructions: string | null
          medication_name: string
          patient_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          diagnosis_id?: string | null
          dispensed_by?: string | null
          dispensed_date?: string | null
          dosage: string
          duration: string
          frequency: string
          id?: string
          instructions?: string | null
          medication_name: string
          patient_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          diagnosis_id?: string | null
          dispensed_by?: string | null
          dispensed_date?: string | null
          dosage?: string
          duration?: string
          frequency?: string
          id?: string
          instructions?: string | null
          medication_name?: string
          patient_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_diagnosis_id_fkey"
            columns: ["diagnosis_id"]
            isOneToOne: false
            referencedRelation: "diagnoses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      procedure_outcomes: {
        Row: {
          created_at: string
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: string
          outcome_description: string | null
          outcome_type: string | null
          patient_satisfaction_score: number | null
          procedure_id: string | null
          recovery_status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          outcome_description?: string | null
          outcome_type?: string | null
          patient_satisfaction_score?: number | null
          procedure_id?: string | null
          recovery_status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          outcome_description?: string | null
          outcome_type?: string | null
          patient_satisfaction_score?: number | null
          procedure_id?: string | null
          recovery_status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "procedure_outcomes_procedure_id_fkey"
            columns: ["procedure_id"]
            isOneToOne: false
            referencedRelation: "surgical_procedures"
            referencedColumns: ["id"]
          },
        ]
      }
      surgical_procedures: {
        Row: {
          actual_date: string | null
          anesthesia_type: string | null
          assistant_surgeon: string | null
          complications: string | null
          created_at: string
          diagnosis_id: string | null
          duration_minutes: number | null
          id: string
          operative_notes: string | null
          patient_id: string | null
          post_operative_notes: string | null
          pre_operative_notes: string | null
          procedure_name: string
          procedure_type: string | null
          scheduled_date: string | null
          status: string | null
          surgeon_name: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          actual_date?: string | null
          anesthesia_type?: string | null
          assistant_surgeon?: string | null
          complications?: string | null
          created_at?: string
          diagnosis_id?: string | null
          duration_minutes?: number | null
          id?: string
          operative_notes?: string | null
          patient_id?: string | null
          post_operative_notes?: string | null
          pre_operative_notes?: string | null
          procedure_name: string
          procedure_type?: string | null
          scheduled_date?: string | null
          status?: string | null
          surgeon_name?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          actual_date?: string | null
          anesthesia_type?: string | null
          assistant_surgeon?: string | null
          complications?: string | null
          created_at?: string
          diagnosis_id?: string | null
          duration_minutes?: number | null
          id?: string
          operative_notes?: string | null
          patient_id?: string | null
          post_operative_notes?: string | null
          pre_operative_notes?: string | null
          procedure_name?: string
          procedure_type?: string | null
          scheduled_date?: string | null
          status?: string | null
          surgeon_name?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "surgical_procedures_diagnosis_id_fkey"
            columns: ["diagnosis_id"]
            isOneToOne: false
            referencedRelation: "diagnoses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "surgical_procedures_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
