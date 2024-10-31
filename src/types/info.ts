export interface InfoSection {
  id: string;
  link: string;
  label: string;
  description?: string;
  image?: string;
  formFields?: FormField[];
  formProps?: Record<string, any>;
}

export interface FormField {
  id: string;
  type: 'select' | 'text' | 'number';
  label: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

export interface MedicationInfo {
  name: string;
  type: string;
  description: string;
  dosage: string;
  sideEffects: string[];
  precautions: string[];
  image?: string;
}