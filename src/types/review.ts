// types/review.ts

export interface User {
  _id: string;
  name: string;
  profilePic?: string;
}

export interface Tour {
  _id: string;
  title: string;
}

export interface Review {
  _id: string;
  tour: string | Tour; // sometimes populated
  user: string | User; // sometimes populated
  rating: number;
  comment: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  message: string | null;
  total:number
}
