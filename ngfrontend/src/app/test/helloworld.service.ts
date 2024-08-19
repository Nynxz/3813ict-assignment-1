/** Service: Helloworld
 * Used for debugging communication between backend<>frontend
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Text } from '@angular/compiler';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { PreferencesService } from '../storage/preferences.service';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HelloworldService {
  debug = new Subject();
  testSignal = signal(0);

  constructor(
    private httpClient: HttpClient,
    private preferencesService: PreferencesService,
    private router: Router
  ) {
    this.debug.next('DEBUG: NO');
  }

  updateTestSignal(value: number) {
    this.testSignal.update((old) => old + value);
  }

  /**
   * Sends GET Request to backend '/'
   * @returns {Observable<string>}{Observable<string>}: Response from backend
   */
  getHelloWorld(): Observable<string> {
    return this.httpClient.get('http://localhost:3010', {
      responseType: 'text',
    });
  }

  getServers(): Observable<Object[]> {
    return this.httpClient.get('http://localhost:3010/servers') as Observable<
      Object[]
    >;
  }

  updateServer(server: any) {
    try {
      console.log('Trying ping?');
      // return this.httpClient.get('http://localhost:3010/ping');
      const jwt = this.preferencesService.getItem('jwt');
      return this.httpClient
        .post(
          'http://localhost:3010/server/update',
          JSON.stringify({ ...server, jwt }),
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
            this.preferencesService.setItem('jwt', '');
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
}
