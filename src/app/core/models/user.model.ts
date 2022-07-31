import { UserRole } from '../common/enums';
import { JobPostingEntity } from './job.model';

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

// export class User {
//   constructor(
//     public email: string = '',
//     public id: string = '',
//     private _token: string = '',
//     private _tokenExpirationDate: Date = new Date()
//   ) {}

//   get token() {
//     if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
//       return '';
//     }
//     return this._token;
//   }
// }
