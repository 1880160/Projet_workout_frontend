import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseData, PostExerciseData } from '../data/exercise/exercise-data';
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

  async find(params: ExerciseParams): Promise<Observable<ExerciseData[]>> {
    const token = await this.auth.getSession()
    return this.http.get<ExerciseData[]>(`http://${domain}:3000/${route}/`,
      {
        params: { ...params },
        headers: {
          'Authorization': 'Bearer ' + `${token}`,
        },
      }
    )
  }
}
