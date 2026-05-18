export type MobilityLevel = 'easy' | 'moderate' | 'active';
export type PlaceCategory =
  | 'temple'
  | 'nature'
  | 'cultural_event'
  | 'senior_group'
  | 'shopping'
  | 'healthcare'
  | 'restaurant';

export type PostType = 'seeking_companion' | 'tip' | 'question' | 'event';
export type ResourceCategory =
  | 'insurance'
  | 'healthcare'
  | 'emergency'
  | 'consulate'
  | 'checklist'
  | 'transportation'
  | 'flight_companion';

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  description?: string;
  address?: string;
  city: string;
  lat?: number;
  lng?: number;
  google_maps_url?: string;
  mobility_level: MobilityLevel;
  vegetarian_friendly: boolean;
  best_time?: string;
  accessibility_notes?: string;
  languages_spoken?: string[];
  source_url?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  type: PostType;
  title: string;
  content: string;
  city: string;
  upvotes: number;
  created_at: string;
  updated_at: string;
  profiles?: { display_name: string | null };
}

export interface Profile {
  id: string;
  display_name?: string;
  city?: string;
  parent_visiting_from?: string;
  parent_visiting_to?: string;
  avatar_url?: string;
  created_at: string;
}

export interface ResourceLink {
  label: string;
  url: string;
}

export interface Resource {
  id: string;
  category: ResourceCategory;
  title: string;
  content?: string;
  links: ResourceLink[];
  order_index: number;
  created_at: string;
}
