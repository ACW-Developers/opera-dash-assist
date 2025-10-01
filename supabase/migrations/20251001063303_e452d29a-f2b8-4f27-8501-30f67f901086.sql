-- Create medical tests table
CREATE TABLE IF NOT EXISTS public.medical_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  test_type VARCHAR NOT NULL,
  test_name VARCHAR NOT NULL,
  ordered_by VARCHAR NOT NULL,
  ordered_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status VARCHAR NOT NULL DEFAULT 'pending',
  results TEXT,
  results_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create diagnoses table
CREATE TABLE IF NOT EXISTS public.diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  diagnosis TEXT NOT NULL,
  symptoms TEXT,
  test_results TEXT,
  recommendation_type VARCHAR NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create prescriptions table
CREATE TABLE IF NOT EXISTS public.prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  diagnosis_id UUID REFERENCES public.diagnoses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  medication_name VARCHAR NOT NULL,
  dosage VARCHAR NOT NULL,
  frequency VARCHAR NOT NULL,
  duration VARCHAR NOT NULL,
  instructions TEXT,
  status VARCHAR NOT NULL DEFAULT 'pending',
  dispensed_date TIMESTAMP WITH TIME ZONE,
  dispensed_by VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create consent records table
CREATE TABLE IF NOT EXISTS public.consent_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  procedure_id UUID REFERENCES public.surgical_procedures(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  consent_date TIMESTAMP WITH TIME ZONE,
  procedure_explained BOOLEAN NOT NULL DEFAULT false,
  risks_explained BOOLEAN NOT NULL DEFAULT false,
  alternatives_explained BOOLEAN NOT NULL DEFAULT false,
  patient_questions_answered BOOLEAN NOT NULL DEFAULT false,
  witness_name VARCHAR,
  witness_signature VARCHAR,
  patient_signature VARCHAR,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create preoperative checklist table
CREATE TABLE IF NOT EXISTS public.preoperative_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  procedure_id UUID REFERENCES public.surgical_procedures(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  
  -- WHO Surgical Safety Checklist items
  patient_confirmed BOOLEAN NOT NULL DEFAULT false,
  site_marked BOOLEAN NOT NULL DEFAULT false,
  anesthesia_safety_check BOOLEAN NOT NULL DEFAULT false,
  pulse_oximeter BOOLEAN NOT NULL DEFAULT false,
  known_allergies BOOLEAN NOT NULL DEFAULT false,
  difficult_airway BOOLEAN NOT NULL DEFAULT false,
  aspiration_risk BOOLEAN NOT NULL DEFAULT false,
  blood_loss_risk BOOLEAN NOT NULL DEFAULT false,
  
  team_introductions BOOLEAN NOT NULL DEFAULT false,
  surgeon_confirmed BOOLEAN NOT NULL DEFAULT false,
  anesthesia_confirmed BOOLEAN NOT NULL DEFAULT false,
  nursing_confirmed BOOLEAN NOT NULL DEFAULT false,
  
  antibiotics_given BOOLEAN NOT NULL DEFAULT false,
  imaging_displayed BOOLEAN NOT NULL DEFAULT false,
  equipment_concerns BOOLEAN NOT NULL DEFAULT false,
  
  completed_by VARCHAR,
  completed_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create postoperative records table
CREATE TABLE IF NOT EXISTS public.postoperative_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  procedure_id UUID REFERENCES public.surgical_procedures(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  
  recovery_room_time TIMESTAMP WITH TIME ZONE,
  vital_signs_stable BOOLEAN NOT NULL DEFAULT false,
  pain_level INTEGER,
  nausea_present BOOLEAN NOT NULL DEFAULT false,
  bleeding_controlled BOOLEAN NOT NULL DEFAULT false,
  wound_condition VARCHAR,
  drainage_amount VARCHAR,
  
  discharge_date TIMESTAMP WITH TIME ZONE,
  discharge_instructions TEXT,
  follow_up_scheduled BOOLEAN NOT NULL DEFAULT false,
  follow_up_date TIMESTAMP WITH TIME ZONE,
  
  medications_prescribed TEXT,
  activity_restrictions TEXT,
  diet_instructions TEXT,
  warning_signs TEXT,
  
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add diagnosis_id to surgical_procedures
ALTER TABLE public.surgical_procedures 
ADD COLUMN IF NOT EXISTS diagnosis_id UUID REFERENCES public.diagnoses(id) ON DELETE SET NULL;

-- Enable RLS on all new tables
ALTER TABLE public.medical_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preoperative_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.postoperative_records ENABLE ROW LEVEL SECURITY;

-- RLS policies for medical_tests
CREATE POLICY "Users can view their own tests" ON public.medical_tests
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own tests" ON public.medical_tests
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own tests" ON public.medical_tests
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own tests" ON public.medical_tests
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for diagnoses
CREATE POLICY "Users can view their own diagnoses" ON public.diagnoses
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own diagnoses" ON public.diagnoses
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own diagnoses" ON public.diagnoses
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own diagnoses" ON public.diagnoses
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for prescriptions
CREATE POLICY "Users can view their own prescriptions" ON public.prescriptions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own prescriptions" ON public.prescriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own prescriptions" ON public.prescriptions
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own prescriptions" ON public.prescriptions
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for consent_records
CREATE POLICY "Users can view their own consent records" ON public.consent_records
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own consent records" ON public.consent_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own consent records" ON public.consent_records
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own consent records" ON public.consent_records
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for preoperative_checklists
CREATE POLICY "Users can view their own checklists" ON public.preoperative_checklists
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own checklists" ON public.preoperative_checklists
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own checklists" ON public.preoperative_checklists
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own checklists" ON public.preoperative_checklists
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for postoperative_records
CREATE POLICY "Users can view their own postop records" ON public.postoperative_records
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own postop records" ON public.postoperative_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own postop records" ON public.postoperative_records
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own postop records" ON public.postoperative_records
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_medical_tests_patient_id ON public.medical_tests(patient_id);
CREATE INDEX IF NOT EXISTS idx_medical_tests_user_id ON public.medical_tests(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnoses_patient_id ON public.diagnoses(patient_id);
CREATE INDEX IF NOT EXISTS idx_diagnoses_user_id ON public.diagnoses(user_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON public.prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_user_id ON public.prescriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_consent_records_patient_id ON public.consent_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_consent_records_procedure_id ON public.consent_records(procedure_id);
CREATE INDEX IF NOT EXISTS idx_preoperative_checklists_procedure_id ON public.preoperative_checklists(procedure_id);
CREATE INDEX IF NOT EXISTS idx_postoperative_records_procedure_id ON public.postoperative_records(procedure_id);

-- Add triggers for updated_at
CREATE TRIGGER update_medical_tests_updated_at
  BEFORE UPDATE ON public.medical_tests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_diagnoses_updated_at
  BEFORE UPDATE ON public.diagnoses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_prescriptions_updated_at
  BEFORE UPDATE ON public.prescriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_consent_records_updated_at
  BEFORE UPDATE ON public.consent_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_preoperative_checklists_updated_at
  BEFORE UPDATE ON public.preoperative_checklists
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_postoperative_records_updated_at
  BEFORE UPDATE ON public.postoperative_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();