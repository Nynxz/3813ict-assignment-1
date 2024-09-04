import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { PreferencesService } from '@services/preferences/preferences.service';
import { ChatService } from '@services/chat/chat.service';
import { environment } from '@environments/environment';
import { Group } from '@/group.type';
import { Channel } from '@/channel.type';
import { UserService } from '@services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  groups = signal([] as Group[]);

  constructor(
    private httpClient: HttpClient,
    private preferences: PreferencesService,
    private chatService: ChatService
  ) {}

  refreshGroups() {
    this.preferences.getItem('jwt') != ''
      ? this.http_getGroups().subscribe((e) => {
          this.groups.set(e);
        })
      : this.groups.set([]);
  }

  updateGroup(group: any) {
    try {
      // return this.httpClient.get('http://localhost:3010/ping');
      return this.http_postUpdateGroup(group).pipe(
        catchError((error: HttpErrorResponse) => {
          // window.location.reload();
          // this.router.navigateByUrl('/login');
          this.preferences.setItem('jwt', '');
          return throwError(() => {
            // window.location.reload();
            return new Error('Something bad happened; please try again later.');
          });
        })
      );
    } catch (error) {}
    return;
  }

  createChannel(channel: Partial<Channel>) {
    try {
      return this.http_postCreateChannel(channel).subscribe((e) => {
        this.chatService.selectGroup(this.chatService.selectedGroup()!);
      });
    } catch (error) {}
    return;
  }

  deleteSelectedChannel() {
    try {
      this.http_postDeleteChannel(
        this.chatService.selectedChannel()!
      ).subscribe((e) => {
        this.chatService.selectGroup(this.chatService.selectedGroup()!);
      });
    } catch (error) {}
    return;
  }

  updateChannel(channel: Partial<Channel>) {
    console.log(channel);
    try {
      this.http_postUpdateChannel(channel)
        .pipe(
          catchError((res: HttpErrorResponse) => {
            // window.location.reload();
            return throwError(() => {
              return new Error(res.error.error);
            });
          })
        )
        .subscribe((e) => {
          this.chatService.selectGroup(this.chatService.selectedGroup()!);
        });
    } catch (error) {}
    return;
  }

  addUserToGroup(userName: string, groupID: string) {
    try {
      this.http_postAddUserToGroup(userName, groupID)
        .pipe(
          catchError((res: HttpErrorResponse) => {
            // window.location.reload();
            return throwError(() => {
              return new Error(res.error.error);
            });
          })
        )
        .subscribe((e) => {
          this.chatService.selectGroup(this.chatService.selectedGroup()!);
        });
    } catch (error) {}
    return;
  }

  /* HTTP */

  // POST /channel/create
  http_postCreateChannel(channel: Partial<Channel>) {
    return this.httpClient.post(
      environment.backend_base_URL + '/channel/create',
      JSON.stringify({ channel }),
      {
        headers: {
          Authorization: 'Bearer ' + this.preferences.getItem('jwt'),
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // POST /channel/delete
  http_postDeleteChannel(channel: Partial<Channel>) {
    return this.httpClient.post(
      environment.backend_base_URL + '/channel/delete',
      JSON.stringify({ channel }),
      {
        headers: {
          Authorization: 'Bearer ' + this.preferences.getItem('jwt'),
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // POST /channel/update
  http_postUpdateChannel(channel: Partial<Channel>) {
    return this.httpClient.post(
      environment.backend_base_URL + '/channel/update',
      JSON.stringify({ channel: channel }),
      {
        headers: {
          Authorization: 'Bearer ' + this.preferences.getItem('jwt'),
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // GET /groups
  http_getGroups() {
    return this.httpClient.get(environment.backend_base_URL + '/groups', {
      headers: {
        Authorization: 'Bearer ' + this.preferences.getItem('jwt'),
        'Content-Type': 'application/json',
      },
    }) as Observable<Group[]>;
  }

  // POST /groups/create
  http_postCreateGroup(group: Partial<Group>) {
    return this.httpClient.post(
      environment.backend_base_URL + '/groups/create',
      JSON.stringify({ group }),
      {
        headers: {
          Authorization: 'Bearer ' + this.preferences.getItem('jwt'),
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // POST /groups/update
  http_postUpdateGroup(group: Partial<Group>) {
    return this.httpClient.post(
      environment.backend_base_URL + '/groups/update',
      JSON.stringify({ group }),
      {
        headers: {
          Authorization: 'Bearer ' + this.preferences.getItem('jwt'),
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // POST /groups/adduser
  http_postAddUserToGroup(username: string, groupID: string) {
    return this.httpClient.post(
      environment.backend_base_URL + '/groups/adduser',
      JSON.stringify({
        group: { _id: groupID },
        user: { username },
      }),
      {
        headers: {
          Authorization: 'Bearer ' + this.preferences.getItem('jwt'),
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
