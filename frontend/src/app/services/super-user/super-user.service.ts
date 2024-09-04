import { User } from '@/user.type';
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
    private preferenceService: PreferencesService
  ) {}

  updateUser(user: any) {
    this.http_postUpdateUser(user).subscribe((e) => {
      console.log(e);
    });
  }

  /* HTTP */

  // POST /super/updateuser
  http_postUpdateUser(user: Partial<User>) {
    return this.httpClient.post(
      environment.backend_base_URL + '/super/updateuser',
      JSON.stringify({
        user: user,
      }),
      {
        headers: {
          Authorization: 'Bearer ' + this.preferenceService.preferences().jwt,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // POST /super/updateuser
  http_postDeleteUser(user: Partial<User>) {
    return this.httpClient.post(
      environment.backend_base_URL + '/super/deleteuser',
      JSON.stringify({
        user: user,
      }),
      {
        headers: {
          Authorization: 'Bearer ' + this.preferenceService.preferences().jwt,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
