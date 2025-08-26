// types/booking.ts
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

export interface Booking {
  _id: string;
  tour: Tour | string;       // populated tour object or just tour ID
  user: User | string;       // populated user object or just user ID
  date: string;              // ISO date string
  numOfPeople: number;
  totalPrice: number;
  status?: BookingStatus;
  isDeleted?: boolean;
  experience?: BookingExperience;
  createdAt?: string;
  updatedAt?: string;
}
