export interface Availability {
  date: string;  
  slots: number;
}

export interface Tour {
  _id: string;
  title: string;
  description: string;
  destination: {
    _id: string;
    name: string;
  };
  guide: {
    _id: string;
    name: string;
    email?: string;
    phone: number
    profilePic: string
  };
  itinerary: string[];
  duration: number;
  highlights: string[];
  price: number;
  availability: Availability[];
  images: string[];
  included: string[];
  excluded: string[];
  reviewCount?: number;
  meetingPoint: string;
  category:
    | "Adventure"
    | "Cultural"
    | "Nature"
    | "Food & Drink"
    | "Wildlife"
    | "Historical"
    | "Beach"
    | "Urban"
    | "Religious"
    | "Others";
  rating: number;
  is_deleted: boolean;
  isActive: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

// define a type for the filters
export interface TourFilters {
  title?: string;
  category?: string;
  destination?: string;
  priceMin?: string;
  priceMax?: string;
  ratingMin?: string;
  popular?: string;
}