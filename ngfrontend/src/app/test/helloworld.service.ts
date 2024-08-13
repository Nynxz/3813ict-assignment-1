import { HttpClient } from '@angular/common/http';
import { Text } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelloworldService {
  constructor(private httpClient: HttpClient) {}

  getHelloWorld() {
    return this.httpClient.get('http://localhost:3010', {
      responseType: 'text',
    });
  }
}
