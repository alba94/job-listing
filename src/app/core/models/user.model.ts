import { JobPostingEntity } from './job.model';

export interface UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  role: Roles;
  profession?: string;
}

// export interface UserI {
//   uid: string;
//   email: string;
//   displayName: string;
//   photoURL: string;
//   emailVerified: boolean;
// }

// export interface Roles {
//   offer?: boolean;
//   seeker?: boolean;
// }


export interface Roles {
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface UserI {
  uid: string;
  email: string;
  roles: Roles;
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
    public email: string = '',
    public id: string = '',
    private _token: string = '',
    private _tokenExpirationDate: Date = new Date()
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return '';
    }
    return this._token;
  }
}
