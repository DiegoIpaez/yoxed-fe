import { type User } from "./user.model";

export interface Category {
  _id?: string;
  nombre?: string;
  user?: string | User;
}
