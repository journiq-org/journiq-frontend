export interface Availability {
  date: string;   // you’ll usually serialize Date as string (ISO) in API
  slots: number;
}

export interface TourType {
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
  };
  itinerary: string[];
  duration: number;
  highlights: string[];
  price: number;
  availability: Availability[];
  images: string[];
  included: string[];
  excluded: string[];
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
