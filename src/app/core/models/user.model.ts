import { JobPostingEntity } from './task.model';

export interface UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  // get token() {
  //   if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
  //     return this._token;
  //   }
  // }
}
