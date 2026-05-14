import { inject, Injectable } from '@angular/core';
import { UserExerciseData, UserExerciseDataDto } from '../data/user-exercise/user-exercise-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';
import { ExerciseParams } from '../data/exercise/exercise-params';
import { environment } from '../../environments/environment';
const route = 'user-exercises';
const domain = environment.domain
@Injectable({
  providedIn: 'root',
})
export class UserExerciseService {

  constructor(private http: HttpClient) { }
  private auth = inject(AuthService);

  async find(params: ExerciseParams): Promise<Observable<UserExerciseData[]>> {
    const token = await this.auth.getSession()
    return this.http.get<UserExerciseData[]>(`http://${domain}:3000/${route}/my-exercises`,
      {
        params: { ...params },
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
  async findMultiple(param : number[]){
    const token = await this.auth.getSession()

    return this.http.get<UserExerciseData[]>(`http://${domain}:3000/${route}/my-exercises-by-ids`,
      {
        params: { ids : param.join(",") },
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }


  async create(body : UserExerciseDataDto){
    const token = await this.auth.getSession()
    return this.http.post(`http://${domain}:3000/${route}/create-user-exercise`,body,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
  async update(id: number,body : UserExerciseDataDto){
    const token = await this.auth.getSession();
        return this.http.patch(`http://${domain}:3000/${route}/update-user-exercise/${id}`,body,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
  async delete(id: number){
    const token = await this.auth.getSession();
        return this.http.delete(`http://${domain}:3000/${route}/delete-user-exercise/${id}`,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
}
