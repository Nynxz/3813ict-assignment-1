import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { PreferencesService } from '@services/preferences/preferences.service';
import { ChatService } from '@services/chat/chat.service';
import { environment } from '@environments/environment';
import { Group } from '@/group.type';
import { Channel } from '@/channel.type';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  groups = signal([] as Group[]);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private preferences: PreferencesService,
    private chatService: ChatService
  ) {}

  updateServers() {
    this.getGroups().subscribe((e) => {
      console.log(e);
      this.groups.set(e);
    });
  }

  getGroups() {
    return this.httpClient.post(
      environment.backend_base_URL + '/groups',
      JSON.stringify({ jwt: this.preferences.getItem('jwt') }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
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

  createGroup(group: { name: string }) {
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

  createChannel(channel: { name: string; group: string }) {
    try {
      const jwt = this.preferences.getItem('jwt');
      return this.httpClient
        .post(
          environment.backend_base_URL + '/channel/create',
          JSON.stringify({ channel, jwt }),
          { headers: { 'Content-Type': 'application/json' } }
        )
        .subscribe((e) => {
          console.log('COMPLETED');
          console.log(e);
          this.chatService.selectGroup(this.chatService.selectedGroup()!);
        });
    } catch (error) {}
    return;
  }

  deleteSelectedChannel() {
    try {
      const jwt = this.preferences.getItem('jwt');
      return this.httpClient
        .post(
          environment.backend_base_URL + '/channel/delete',
          JSON.stringify({ channel: this.chatService.selectedChannel(), jwt }),
          { headers: { 'Content-Type': 'application/json' } }
        )
        .subscribe((e) => {
          console.log('COMPLETED');
          console.log(e);
          this.chatService.selectGroup(this.chatService.selectedGroup()!);
        });
    } catch (error) {}
    return;
  }

  updateChannel(channel: Channel) {
    console.log(channel);
    try {
      const jwt = this.preferences.getItem('jwt');
      return this.httpClient
        .post(
          environment.backend_base_URL + '/channel/update',
          JSON.stringify({ channel: channel, jwt }),
          { headers: { 'Content-Type': 'application/json' } }
        )
        .pipe(
          catchError((res: HttpErrorResponse) => {
            // window.location.reload();
            return throwError(() => {
              return new Error(res.error.error);
            });
          })
        )
        .subscribe((e) => {
          console.log('COMPLETED');
          console.log(e);
          this.chatService.selectGroup(this.chatService.selectedGroup()!);
        });
    } catch (error) {}
    return;
  }
}
