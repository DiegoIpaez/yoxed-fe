import { Yox, User } from "./index";

export interface Commentary {
  estado?: boolean;
  _id?: string;
  yox?: Yox;
  usuario?: User;
  comentario?: string
}
