import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { PreferencesService } from '@services/preferences/preferences.service';
import { environment } from '../../../environments/environment';

export type Group = {
  _id: string;
  imageURL: string;
  groupName: string;
};

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  groups = signal([] as Group[]);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private preferences: PreferencesService
  ) {
    // this.updateServers();
  }

  updateServers() {
    this.getGroups().subscribe((e) => {
      console.log(e);
      this.groups.set(e);
    });
  }

  getGroups() {
    return this.httpClient.get(
      environment.backend_base_URL + '/groups'
    ) as Observable<Group[]>;
  }

  updateServer(group: any) {
    try {
      console.log('Trying ping?');
      // return this.httpClient.get('http://localhost:3010/ping');
      const jwt = this.preferences.getItem('jwt');
      return this.httpClient
        .post(
          environment.backend_base_URL + '/groups/update',
          JSON.stringify({ group, jwt }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .pipe(
          catchError((error: HttpErrorResponse) => {
            // window.location.reload();
            this.router.navigateByUrl('/login');
            this.preferences.setItem('jwt', '');
            return throwError(() => {
              window.location.reload();
              return new Error(
                'Something bad happened; please try again later.'
              );
            });
          })
        );
    } catch (error) {}
    return;
  }

  createGroup(group: { groupName: string }) {
    try {
      const jwt = this.preferences.getItem('jwt');
      return this.httpClient.post(
        environment.backend_base_URL + '/groups/create',
        JSON.stringify({ group, jwt }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {}
    return;
  }
}
