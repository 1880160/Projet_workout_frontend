import { Component, ElementRef, inject, resource, signal, viewChild } from '@angular/core';
import { UserExerciseDisplay } from '../../component/user-exercise-display/user-exercise-display';
import { ExerciseFilter } from '../../component/exercise-filter/exercise-filter';
import { UpdateUserExerciseDataDto, UserExerciseData, UserExerciseDataDto } from '../../data/user-exercise/user-exercise-data';
import { form } from '@angular/forms/signals';
import { firstValueFrom, Observable } from 'rxjs';
import { fieldsOptions } from '../../data/exercise/exercise-fields-options';
import { ExerciseParams } from '../../data/exercise/exercise-params';
import { ExerciseService } from '../../services/exercise-service';
import { UserExerciseService } from '../../services/user-exercise-service';
import { UserExerciseProperties } from '../../component/user-exercise-properties/user-exercise-properties';
import { PropertiesMode } from '../../data/properties-mode/properties-mode-enum';
import { Router } from '@angular/router';
import { DisplayMode } from '../../data/display-mode/display-mode-enum';

@Component({
  selector: 'app-my-exercises',
  imports: [UserExerciseDisplay, ExerciseFilter, UserExerciseProperties],
  templateUrl: './my-exercises.html',
  styleUrl: './my-exercises.css',
})
export class MyExercises {


  dialogueRef = viewChild<ElementRef>('properties_modal')

  userExercises = inject(UserExerciseService)
  router = inject(Router);
  exerciseFilterModel = signal<ExerciseParams>({
    name: '',
    category: '',
    muscle_group: '',
  });
  options = fieldsOptions;

  exerciseFilterForm = form(this.exerciseFilterModel);


  userExerciseRequestError = signal('')

  userExerciseEditId = signal(-1);

  userExerciseMode = signal<PropertiesMode>(PropertiesMode.CREATE)

  userExerciseDisplayMode = DisplayMode.EDIT

  userExercisesData = resource<UserExerciseData[], ExerciseParams>({
    params: () => (this.exerciseFilterForm().value()),
    loader: async ({ params, abortSignal }) => {
      const value = await firstValueFrom<UserExerciseData[]>(await this.userExercises.find(params))
      return value
    }
  })



  onUpdatedfilter($event: ExerciseParams) {
    this.exerciseFilterModel.update((exerciseParam) => $event);
    console.log(this.exerciseFilterForm().value())
  }

  userExercisePopup = signal<UserExerciseDataDto>({

    name: "",

    weight: 0,

    repetition: 12,

    sets: 3,

    restTime: 0,

    executionTime: 0,

    exerciseId: -1
  });

  

  async createUserExerciseProperties() {
    this.userExerciseMode.set(PropertiesMode.CREATE);
    this.showModal();
  }
  async editUserExerciseProperties($event: UserExerciseData | undefined) {
    this.userExerciseMode.set(PropertiesMode.UPDATE);
    this.userExercisePopup.set({
      name: $event?.name ?? "",
      weight: $event?.weight ?? 0,
      repetition: $event?.repetition ?? 12,
      sets: $event?.sets ?? 3,
      restTime: $event?.restTime ?? 0,
      executionTime: $event?.executionTime ?? 0,
      exerciseId: $event?.exercise?.exerciseId ?? -1,
    })
    this.userExerciseEditId.set($event?.userExerciseId ?? -1)
    this.showModal();
  }

  async deleteUserProperties($event: UserExerciseData | undefined){
    (await this.userExercises.delete($event?.userExerciseId ?? -1)).subscribe(
      {
        next : () => {
        this.closeModal();
        this.userExercisesData.reload();
      },
      error : (error) => alert(error.error?.message)
      }
    )

  }

  async closeModal() {
    const dialog = this.dialogueRef()?.nativeElement as HTMLDialogElement
    dialog?.close();
    console.log(this.userExercisePopup())
    this.userExerciseRequestError.set('')
  }
  async showModal() {
    const dialog = this.dialogueRef()?.nativeElement as HTMLDialogElement
    dialog?.showModal();
  }

  async SubmitProperties($event: PropertiesMode) {
    switch ($event) {
      case PropertiesMode.CREATE: {
        this.handleResult((await this.userExercises.create(this.userExercisePopup())))
        break;
      }
      case PropertiesMode.UPDATE: {
       this.handleResult((await this.userExercises.update(this.userExerciseEditId(),this.userExercisePopup())))
       break;
      }

    }
  }
  async handleResult(resultSubmit : Observable<object>){
    resultSubmit.subscribe({
      next: () => {
        this.closeModal();
        this.userExercisesData.reload();
      },
      error: (error) => this.userExerciseRequestError.set(error.error?.message)
    })
  }
}
