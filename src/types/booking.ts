import { User } from "./user";
import { Tour } from "./tour";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "accepted"
  | "rejected"
  | "completed"
  | "cancelled";

export interface BookingExperience {
  serviceQuality?: number;   // 1-5
  punctuality?: number;      // 1-5
  satisfactionSurvey?: number; // 1-5
}
export interface Review {
  _id: string;
  tour: string;
  user: { _id: string; name: string; profilePic?: string };
  experience: {
    serviceQuality: number;
    punctuality: number;
    satisfactionSurvey: number;
  };
  comment: string;
  createdAt: string;
  isDeleted: boolean;
}

export interface Booking {
  _id: string;
  user: { name: string; email: string };
  tour: { _id: string; title: string; description: string };
  status: string;
  createdAt: string;
  date?: string;
  numOfPeople?: number;
  totalPrice?: number;
  review?: Review | null; 
}
