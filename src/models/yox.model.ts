import { type Category } from "./category.model";
import { type User } from "./user.model";

export interface Yox {
  estado?: boolean;
  _id?: string;
  titulo?: string;
  descripcion?: string;
  url?: string;
  categoria?: string | Category;
  usuario?: string | User;
}
