import { Component, inject, resource, signal } from '@angular/core';
import { ExerciseDisplay } from '../../../component/exercise-display/exercise-display';
import { ExerciseData, ExerciseRequestData } from '../../../data/exercise/exercise-data';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ExerciseParams } from '../../../data/exercise/exercise-params';
import { ExerciseRequestService } from '../../../services/exercise-request-service';
import { form } from '@angular/forms/signals';
import { DisplayMode } from '../../../data/display-mode/display-mode-enum';

@Component({
  selector: 'app-review',
  imports: [ExerciseDisplay],
  templateUrl: './review.html',
  styleUrl: './review.css',
})
export class Review {

  router = inject(Router);
  exerciseFilterModel = signal<ExerciseParams>({
    name: '',
    category: '',
    muscle_group: '',
  });
  displayModeApprouvable = DisplayMode.APPROVABLE
  exerciseRequest = inject(ExerciseRequestService);
  exerciseFilterForm = form(this.exerciseFilterModel);
  exercisesRequestData = resource<ExerciseRequestData[], ExerciseParams>({
    params: () => (this.exerciseFilterForm().value()),
    loader: async ({ params, abortSignal }) => {
      const value = await firstValueFrom<ExerciseRequestData[]>(await this.exerciseRequest.find(params))
      return value
    }
  })

  async deleteExerciseRequest($event: ExerciseRequestData) {
    (await this.exerciseRequest.delete($event.exerciseId)).subscribe(
      {
        next: () => this.exercisesRequestData.reload(),
        error: (error) => alert(error.error?.message)
      }
    )
  }
  async approveExerciseRequest($event: ExerciseRequestData) {
    (await this.exerciseRequest.approve($event.exerciseId)).subscribe(
      {
        next: () => this.exercisesRequestData.reload(),
        error: (error) => alert(error.error?.message)
      }
    )
  }


  navigateExercise() {
    this.router.navigate(["/exercises"])
  }

}
