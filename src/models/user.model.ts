export interface User {
  id?: number;
  username?: string;
  email?: string;
  role?: string;
  uid?: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}