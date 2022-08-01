
import {  JobPostingEntity } from './job.model';

export interface SignUpModel {
  email: string;
  password: string;
  role: string;
}
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  displayName: string;
  profilePicture: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
export interface UserEntity {
  id: string;
  email: string;
  displayName: string;
  favoriteJobs: JobPostingEntity[];
  appliedJobs: JobPostingEntity[];
}

export class UserClass implements UserEntity{
  id = '';
  email= '';
  displayName= '';
  favoriteJobs= [];
  appliedJobs= [];
}

