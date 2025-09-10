import type { BaseModel } from "./Base";
import type { User } from "./User";

export interface Profile extends BaseModel {
  name: string;
  last_name: string;
  birth_date: Date;
  picture?: string;
  user: User;
}