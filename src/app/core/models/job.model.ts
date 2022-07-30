import { UserEntity } from "./user.model";

export interface JobPostingEntity {
    id: string;
    title: string;
    description: string;
    assignedTo: UserEntity | undefined;
    status: 'To Do' | 'In progress' |'Completed';
  }