import { Component, effect, inject, input, signal } from '@angular/core';
import { WorkoutProperties } from '../../../component/workout-components/workout-properties/workout-properties';
import { WorkoutData, WorkoutDataDto, WorkoutPropertiesDto } from '../../../data/workout/workout-data';
import { ActivatedRoute, Router } from '@angular/router';
import { WeekDays } from '../../../data/workout/weekdays-enum';
import { PropertiesMode } from '../../../data/properties-mode/properties-mode-enum';
import { WorkoutService } from '../../../services/workout/workout-service';

@Component({
  selector: 'app-update-workout',
  imports: [WorkoutProperties],
  templateUrl: './update-workout.html',
  styleUrl: './update-workout.css',
})
export class UpdateWorkout {
  errorMessage = signal('');
  router = inject(Router)
  private activatedRoute = inject(ActivatedRoute);
  workouts = inject(WorkoutService);
  propertiesModeUpdateMode = PropertiesMode.UPDATE;

  workout = input.required<WorkoutData>();

  workoutPropertiesDto = signal<WorkoutPropertiesDto>(
    {
      workoutName: '',
      workoutDayOfWeek: 'SUNDAY',
      workoutTimeOfDay: new Date(0),
      alertMinutesBefore: 0,
      userExercisesId: []
    }
  )
  async updateWorkout($event : WorkoutDataDto){
    console.log($event);
    
    (await this.workouts.update(this.workout().workoutId,$event)).subscribe(
      {
        next : () => this.router.navigate(['/my-workouts']),
        error : (error) => this.errorMessage.set(error.error?.message)
      }
    )
  }

  constructor(){
    
    effect(() => {
      const workoutValue = this.workout()
      const weekDate = new Date(workoutValue.weekDate)
      const alertDate = workoutValue.alertDate ? new Date(workoutValue.alertDate) : new Date(weekDate)
      let newUserExercisesIds : number[] = []
      workoutValue.userExercises.forEach((userExercise ) => newUserExercisesIds.push(userExercise.userExerciseId));
      const timeOfDay = new Date(0)
      timeOfDay.setUTCHours(weekDate.getHours(),weekDate.getMinutes())
      console.log(timeOfDay)
      this.workoutPropertiesDto.set({
      workoutName: workoutValue.workoutName,
      workoutDayOfWeek: WeekDays[weekDate.getDay()],
      workoutTimeOfDay: timeOfDay,
      alertMinutesBefore: (weekDate.getTime() -  (alertDate.getTime() ?? weekDate.getTime()) ) / 60000 ,
      userExercisesId: newUserExercisesIds
      })
    })
  }



}
