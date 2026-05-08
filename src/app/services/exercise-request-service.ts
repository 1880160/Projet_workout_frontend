import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseData, ExerciseRequestData, PostExerciseData } from '../data/exercise/exercise-data';
import { ExerciseParams } from '../data/exercise/exercise-params';
import { AuthService } from './auth-service';
const route = 'exercises-request';
const domain = 'localhost'
@Injectable({
  providedIn: 'root',
})
export class ExerciseRequestService {

  constructor(private http: HttpClient) { }
  private auth = inject(AuthService);

  async create(exercise: PostExerciseData) {
    const token = await this.auth.getSession();
    return this.http.post(`http://${domain}:3000/${route}/create-exercise`, exercise,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
  async approve(id: number) {
    const token = await this.auth.getSession();
    return this.http.post(`http://${domain}:3000/${route}/approve`, { id: id },
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
  async find(params: ExerciseParams): Promise<Observable<ExerciseRequestData[]>> {
    const token = await this.auth.getSession()
    return this.http.get<ExerciseRequestData[]>(`http://${domain}:3000/${route}/`,
      {
        params: { ...params },
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
  async count(): Promise<Observable<number>> {
    const token = await this.auth.getSession()
    return this.http.get<number>(`http://${domain}:3000/${route}/count/`,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }


  async findOne(id: number) {
    const token = await this.auth.getSession()
    return this.http.get<ExerciseRequestData>(`http://${domain}:3000/${route}/${id}`,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
  async delete(id: number) {
    const token = await this.auth.getSession();
    return this.http.delete(`http://${domain}:3000/${route}/delete-exercise/${id}`,
      {
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
}
