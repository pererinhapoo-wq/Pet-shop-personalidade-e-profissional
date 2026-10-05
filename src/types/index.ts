export type PlanTier = 'profissional' | 'personalizado';

export type PetSpecies = 'dog' | 'cat';
export type PetLifeStage = 'puppy' | 'adult' | 'senior';

export interface ServiceItem {
  id: string;
  category: 'clinica' | 'cirurgia' | 'diagnostico' | 'spa' | 'prevencao';
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  durationEstimate?: string;
  preparationNote?: string;
  highlightBadge?: string;
  recommendedFor?: string;
}

export interface VetDoctor {
  id: string;
  name: string;
  role: string;
  crmv: string;
  specialties: string[];
  bio: string;
  avatarUrl: string;
  education: string;
}

export interface BoutiqueProduct {
  id: string;
  title: string;
  category: 'nutricao' | 'dermatologia' | 'farmacia' | 'enriquecimento';
  categoryLabel: string;
  shortDesc: string;
  fullDesc: string;
  priceFormatted: string;
  prescriptionRequired: boolean;
  tags: string[];
  imageUrl: string;
  compositionHighlight: string;
}

export interface PreventiveProtocol {
  species: PetSpecies;
  stage: PetLifeStage;
  stageName: string;
  ageRange: string;
  primaryFocus: string;
  vaccines: { name: string; frequency: string; importance: string }[];
  checkups: { exam: string; frequency: string; reason: string }[];
  nutritionTips: string[];
  behaviorNote: string;
}

export interface BookingSubmission {
  serviceId: string;
  serviceName: string;
  species: PetSpecies;
  petName: string;
  petAge: string;
  tutorName: string;
  tutorPhone: string;
  tutorEmail: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}
