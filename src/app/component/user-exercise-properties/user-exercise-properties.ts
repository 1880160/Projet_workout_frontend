import { Component, ElementRef, inject, input, model, output, resource, signal, viewChild } from '@angular/core';
import { ExerciseSearch } from '../exercise-search/exercise-search';
import { UserExerciseData, UserExerciseDataDto } from '../../data/user-exercise/user-exercise-data';
import { form, FormField } from '@angular/forms/signals';
import { ReactiveFormsModule } from '@angular/forms';
import { ExerciseData } from '../../data/exercise/exercise-data';
import { firstValueFrom, identity, single } from 'rxjs';
import { PropertiesMode } from '../../data/properties-mode/properties-mode-enum';
import { ExerciseService } from '../../services/exercise-service';
import { DisplayMode } from '../../data/display-mode/display-mode-enum';

@Component({
  selector: 'app-user-exercise-properties',
  imports: [ExerciseSearch, FormField, ReactiveFormsModule],
  templateUrl: './user-exercise-properties.html',
  styleUrl: './user-exercise-properties.css',
})
export class UserExerciseProperties {

  mode = input<PropertiesMode>(PropertiesMode.CREATE);

  exerciseDisplayMode = DisplayMode.SELECTABLE

  errorMessage = input<string>('')

  onCloseEvent = output();
  onSubmitEvent = output<PropertiesMode>();

  exercises = inject(ExerciseService);


  dialogueRef = viewChild<ElementRef>('exercise_selector');
  userExerciseModel = model<UserExerciseDataDto>({
    name: "",

    weight: 0,

    repetition: 12,

    sets: 3,

    restTime: 0,

    executionTime: 0,

    exerciseId: -1
  });

  userExerciseForm = form(this.userExerciseModel);

  exerciseName = resource<string,number>({
    params: () => this.userExerciseForm.exerciseId().value(),
    loader: async ({ params, abortSignal }) => {
      if(params == -1){
        return "Click here to choose an exercise..."
      }
      const value = (await firstValueFrom<ExerciseData>(await this.exercises.findOne(params))).name
      return value
    }
  })

  async exerciseSelected($event : ExerciseData){
    this.userExerciseForm.exerciseId().value.set($event.exerciseId);
    this.exerciseName.set($event.name);
    this.closeModal()
  }

  async closeModal() {
    const dialog = this.dialogueRef()?.nativeElement as HTMLDialogElement
    dialog?.close();
  }
  async showModal() {
    const dialog = this.dialogueRef()?.nativeElement as HTMLDialogElement
    dialog?.showModal();
  }
  async closeDialog(){
    this.onCloseEvent.emit()
  }
  async submitDialog(){
    this.onSubmitEvent.emit(this.mode())
  }

}
