export interface User {
  _id: string;
  name: string;
  email: string;
  role: "traveller" | "guide";
  phone?: string;
  location?: string;
  bio?: string;
  profilePic?: string;
  createdAt: string
   isBlocked?: boolean;
   isVerified: boolean
}

export interface ProfileState {
  profile: User | null;
  loading: boolean;
  error: string | null;
}
