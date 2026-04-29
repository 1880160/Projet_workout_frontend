import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WorkoutData } from '../../data/workout/workout-data';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service';
const route = 'workout';
const domain = 'localhost'
@Injectable({
  providedIn: 'root',
})
export class WorkoutService {

  constructor(private http: HttpClient) { }
  private auth = inject(AuthService);
  async find(): Promise<Observable<WorkoutData[]>> {
    const token = await this.auth.getSession()
    return this.http.get<WorkoutData[]>(`http://${domain}:3000/${route}/my-workouts/`,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }


}
