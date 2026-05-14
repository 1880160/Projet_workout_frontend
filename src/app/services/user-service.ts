import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { Observable } from 'rxjs';
import { UserData } from '../data/user-data';
import { environment } from '../../environments/environment';
const route = 'users';
const domain = environment.domain
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }
  private auth = inject(AuthService);

  
  async userInfo() : Promise<Observable<UserData>> {
    const token = await this.auth.getSession()
    return this.http.get<UserData>(`http://${domain}:3000/${route}/my-info`,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }


}
