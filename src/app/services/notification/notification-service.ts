import { inject, Injectable } from '@angular/core';
import { NotificationData } from '../../data/notification/notification-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service';
import { SseClient } from 'ngx-sse-client';

const route = 'notification';
const domain = 'localhost'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {


  constructor(private http: HttpClient,
    private sseClient : SseClient
  ) { }
  private auth = inject(AuthService);

  async find(): Promise<Observable<NotificationData[]>> {
    const token = await this.auth.getSession()
    return this.http.get<NotificationData[]>(`http://${domain}:3000/${route}/my-notifications`,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
  async findOne(id: number) {
    const token = await this.auth.getSession()
    return this.http.get<NotificationData>(`http://${domain}:3000/${route}/my-notification/${id}`,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }

  async delete(id: number) {
    const token = await this.auth.getSession();
    return this.http.delete(`http://${domain}:3000/${route}/delete-notification/${id}`,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
  async listenForUpdates(){
    const token = await this.auth.getSession();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + `${token}`);
    return this.sseClient.stream(`http://${domain}:3000/${route}/sse`, { keepAlive: true, reconnectionDelay: 1_000, responseType: 'event' },{headers})
  }


}
