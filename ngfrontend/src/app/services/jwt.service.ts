import { Injectable } from '@angular/core';
import { PreferencesService } from '../storage/preferences.service';
import { jwtDecode } from 'jwt-decode';

const STRICT_EXP = true;

type JWTStorageType = {
  username: string;
  iat: number;
  exp: number;
};

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private storage: PreferencesService) {}

  getJWT(): JWTStorageType | null {
    let jwt = this.storage.getItem('jwt');
    // Is retrieved value empty?, if so set as null
    // As it can exist but be empty (''), or not exist at all (null)
    jwt = jwt == '' ? null : jwt;
    if (jwt != null) {
      const decoded_JWT = jwtDecode(jwt) as JWTStorageType;
      if (STRICT_EXP && this._validateEXP(decoded_JWT)) {
        return decoded_JWT;
      }
    }
    return null;
  }

  _validateEXP(jwt: JWTStorageType) {
    const isValid = Date.now() <= jwt.exp * 1000;
    return isValid;
  }
}
