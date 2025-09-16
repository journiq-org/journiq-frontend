export interface DestinationType {
  _id: string;
  name: string;
  country: string;
  city?: string;
  description: string;
  images: string[];
  popularAttractions: string[];
  bestSeason?: string;
  tags: string[];
  location?: {
    lat?: number;
    lng?: number;
  };
  is_deleted: boolean;
  is_active: boolean;
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
}
