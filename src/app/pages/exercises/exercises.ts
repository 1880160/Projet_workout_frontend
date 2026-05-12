import { Component, ElementRef, inject, input, output, resource, signal, viewChild } from '@angular/core';
import { ExerciseDisplay } from '../../component/exercise-components/exercise-display/exercise-display';
import { ExerciseData, PostExerciseData } from '../../data/exercise/exercise-data';
import { ExerciseService } from '../../services/exercise-service';
import { firstValueFrom } from 'rxjs';
import { ExerciseParams } from '../../data/exercise/exercise-params';
import { form, FormField } from '@angular/forms/signals';
import { ReactiveFormsModule } from '@angular/forms';
import { fieldsOptions } from '../../data/exercise/exercise-fields-options';
import { ExerciseSearch } from '../../component/exercise-components/exercise-search/exercise-search';
import { ExerciseProperties } from '../../component/exercise-components/exercise-properties/exercise-properties';
import { ExerciseRequestService } from '../../services/exercise-request-service';
import { Router } from '@angular/router';
import { UserData } from '../../data/user-data';
import { UserService } from '../../services/user-service';


// about : select formfield in angular : https://stackoverflow.com/questions/52371278/cant-bind-to-formcontrol-since-it-isnt-a-known-property-of-select
@Component({
  selector: 'app-exercises',
  imports: [ExerciseSearch, ExerciseProperties],
  templateUrl: './exercises.html',
  styleUrl: './exercises.css',
})
export class Exercises {

  dialogueRef = viewChild<ElementRef>('properties_modal')

  router = inject(Router)

  exercises = inject(ExerciseService)

  exerciseRequest = inject(ExerciseRequestService);

  user = inject(UserService);


  userData = resource<UserData, null>({
    loader: async () => firstValueFrom<UserData>(await this.user.userInfo())
  })

  requestCount = resource<number,null>(
    {
      loader : async () => firstValueFrom<number>(await this.exerciseRequest.count())
    }
  )



  exerciseRequestError = signal('')

  exerciseFilterModel = signal<ExerciseParams>({
    name: '',
    category: '',
    muscle_group: '',
  });
  options = fieldsOptions;


  exerciseFilterForm = form(this.exerciseFilterModel);
  exercisesData = resource<ExerciseData[], ExerciseParams>({
    params: () => (this.exerciseFilterForm().value()),
    loader: async ({ params, abortSignal }) => {
      const value = await firstValueFrom<ExerciseData[]>(await this.exercises.find(params))
      return value
    }
  })

  async onNewExerciseRequest($event: PostExerciseData) {
    (await this.exerciseRequest.create($event)).subscribe(
      {
        next: () => {
          this.closeModal();
          this.requestCount.reload();
        },
        error: (error) => this.exerciseRequestError.set(error.error?.message)
      }
    )
  }

  async closeModal() {
    const dialog = this.dialogueRef()?.nativeElement as HTMLDialogElement
    dialog?.close();
    this.exerciseRequestError.set('')
  }
  async showModal() {
    const dialog = this.dialogueRef()?.nativeElement as HTMLDialogElement
    dialog?.showModal();
  }

  navigateSubmissions() {
    this.router.navigate(['/exercises/review'])
  }
}
