import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { PreferencesService } from '@services/preferences/preferences.service';

@Injectable({
  providedIn: 'root',
})
export class SuperUserService {
  constructor(
    private httpClient: HttpClient,
    private preferencesService: PreferencesService
  ) {}

  updateUser(user: any) {
    this._backendUpdateUser(user).subscribe(e => {
      console.log(e)
    })
  }

  _backendUpdateUser(user: any) {
    return this.httpClient.post(
      environment.backend_base_URL + '/super/updateuser',
      JSON.stringify({
        user: user,
        jwt: this.preferencesService.getItem('jwt'),
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
