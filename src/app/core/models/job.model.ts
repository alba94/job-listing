import { UserEntity } from "./user.model";

export interface JobPostingEntity {
    id: string;
    title: string;
    description: string;
    offer: UserEntity;
    wage?: number;
    seekers?: UserEntity[];
    favoritedBy?: UserEntity[];
  }