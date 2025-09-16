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
  tour: string | Tour; 
  user: string | User; 
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
  topReviews: Review[]
  total:number
}
