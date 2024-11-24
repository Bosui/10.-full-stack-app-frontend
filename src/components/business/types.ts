import { ReactNode } from "react";

export interface Business {
  location: ReactNode;
  _id: string;
  name: string;
  about: string;
  address: string;
  category: string;
  contactPerson: string;
  email: string;
  imageUrls: string[];
}
