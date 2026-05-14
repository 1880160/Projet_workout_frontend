import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WorkoutData, WorkoutDataDto } from '../../data/workout/workout-data';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service';
import { environment } from '../../../environments/environment';
const route = 'workout';
const domain = environment.domain
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
  async findOne(id : number): Promise<Observable<WorkoutData>> {
    const token = await this.auth.getSession()
    return this.http.get<WorkoutData>(`http://${domain}:3000/${route}/my-workouts/${id}`,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
  async create(body: WorkoutDataDto) {
    const token = await this.auth.getSession()
    return this.http.post(`http://${domain}:3000/${route}/create-workout`, body,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
  async update(id: number, body: WorkoutDataDto) {
    const token = await this.auth.getSession();
    return this.http.patch(`http://${domain}:3000/${route}/update-workout/${id}`, body,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
  async delete(id: number) {
    const token = await this.auth.getSession();
    return this.http.delete(`http://${domain}:3000/${route}/delete-workout/${id}`,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }

}
