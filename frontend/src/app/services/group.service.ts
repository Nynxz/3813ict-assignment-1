import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

export type Group = {
  imageURL: string;
  serverName: string;
};

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  groups = signal([] as Group[]);

  constructor(private httpClient: HttpClient) {
    this.getServers().subscribe((e) => {
      console.log(e);
      this.groups.set(e);
    });
  }

  getServers() {
    return this.httpClient.get('http://localhost:3010/servers') as Observable<
      Group[]
    >;
  }
}
