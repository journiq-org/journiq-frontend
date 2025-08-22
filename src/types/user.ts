export interface User {
  _id: string;
  name: string;
  email: string;
  role: "traveller" | "guide";
  phone?: string;
  location?: string;
  bio?: string;
  profilePic?: string;
}

export interface ProfileState {
  profile: User | null;
  loading: boolean;
  error: string | null;
}
