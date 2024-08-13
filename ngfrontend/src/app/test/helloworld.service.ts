/** Service: Helloworld
 * Used for debugging communication between backend<>frontend
 */

import { HttpClient } from '@angular/common/http';
import { Text } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelloworldService {
  constructor(private httpClient: HttpClient) {}
  /**
   * Sends GET Request to backend '/'
   * @returns {Observable<string>}{Observable<string>}: Response from backend
   */
  getHelloWorld(): Observable<string> {
    return this.httpClient.get('http://localhost:3010', {
      responseType: 'text',
    });
  }
}
