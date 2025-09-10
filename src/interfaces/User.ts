import type { BaseModel } from "./Base";
import type { Profile } from "./Profile";

export enum ROLES {
  DEV = 'dev',
  OWNER = 'owner',
  GUEST = 'guest'
}

export interface User extends BaseModel {
  email: string;
  password: string;
  role: ROLES;
  profile?: Profile;
}