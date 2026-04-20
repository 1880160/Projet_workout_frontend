import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../data/UserData';
import { AuthService } from './auth-service';
import { ExerciseData } from '../data/exercise/ExerciseData';
import { ExerciseParams } from '../data/exercise/ExerciseParams';
const route = 'exercises';
const domain = 'localhost'
@Injectable({
  providedIn: 'root',
})

export class ExerciseService {


  constructor(private http: HttpClient) { }
  private auth = inject(AuthService);
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
