import { Component, ElementRef, inject, input, model, output, resource, viewChild } from '@angular/core';
import { PropertiesMode } from '../../../data/properties-mode/properties-mode-enum';
import { WeekDays } from '../../../data/workout/weekdays-enum';
import { WorkoutDataDto, WorkoutPropertiesDto } from '../../../data/workout/workout-data';
import { form, FormField } from '@angular/forms/signals';
import { UserExerciseSearch } from '../../user-exercise-components/user-exercise-search/user-exercise-search';
import { UserExerciseData } from '../../../data/user-exercise/user-exercise-data';
import { UserExerciseService } from '../../../services/user-exercise-service';
import { firstValueFrom } from 'rxjs';
import { UserExerciseDisplay } from '../../user-exercise-components/user-exercise-display/user-exercise-display';
import { DisplayMode } from '../../../data/display-mode/display-mode-enum';
import { RouterLink } from "@angular/router";
import { Location } from '@angular/common';
@Component({
  selector: 'app-workout-properties',
  imports: [FormField, UserExerciseSearch, UserExerciseDisplay],
  templateUrl: './workout-properties.html',
  styleUrl: './workout-properties.css',
})
export class WorkoutProperties {

  dialogueRef = viewChild<ElementRef>('user_exercise_selector');

  async closeModal() {
    const dialog = this.dialogueRef()?.nativeElement as HTMLDialogElement
    dialog?.close();
  }
  async showModal() {
    const dialog = this.dialogueRef()?.nativeElement as HTMLDialogElement
    dialog?.showModal();
  }

  Mode = DisplayMode
  weekDays = WeekDays;

  propertiesModeClass = PropertiesMode;
  errorMessage = input<string>('')
  workoutModel = model<WorkoutPropertiesDto>(
    {
      workoutName: '',
      workoutDayOfWeek: 'SUNDAY',
      workoutTimeOfDay: new Date(0),
      alertMinutesBefore: 0,
      userExercisesId: []
    }
  );

  workoutForm = form(this.workoutModel);

  resultWorkout = output<WorkoutDataDto>()


  userExercises = inject(UserExerciseService)
  userExercisesData = resource<UserExerciseData[], number[]>({
    params: () => (this.workoutForm.userExercisesId().value()),
    loader: async ({ params, abortSignal }) => {
      const value = await firstValueFrom<UserExerciseData[]>(await this.userExercises.findMultiple(params))
      return value
    }
  })


  async submitWorkout() {
    const properties = this.workoutForm().value()
    const dayOfWeek = Object.values(WeekDays).indexOf(properties.workoutDayOfWeek)
    const workoutDate = new Date("2026-05-03 00:00")
    workoutDate.setDate(workoutDate.getDate() + dayOfWeek)
    const workoutTime = properties.workoutTimeOfDay
    workoutDate.setTime(workoutDate.getTime() + workoutTime.getTime());
    const alertTime = new Date(workoutDate)
    alertTime.setMinutes(alertTime.getMinutes() - properties.alertMinutesBefore);

    const resultWorkoutData: WorkoutDataDto = {
      workoutName: properties.workoutName,
      weekDate:  workoutDate.toISOString(),
      alertDate: alertTime.toISOString(),
      userExercisesId: properties.userExercisesId
    }
    this.resultWorkout.emit(resultWorkoutData);
  }
  addUserExerciseId($event: UserExerciseData) {
    this.workoutModel().userExercisesId.push($event.userExerciseId)
    this.userExercisesData.reload()
    console.log(this.workoutModel().userExercisesId)
  }
  removeUserExerciseid($event: UserExerciseData | undefined) {
    if (!$event) { return }
    this.workoutModel().userExercisesId.splice(
      this.workoutModel().userExercisesId.indexOf($event.userExerciseId), 1
    );
    this.userExercisesData.reload()
    console.log(this.workoutModel().userExercisesId)
  }

  workoutPropertiesMode = input(PropertiesMode.CREATE);

  location = inject(Location)
  navigateBack(){
    this.location.back()
  }
}
