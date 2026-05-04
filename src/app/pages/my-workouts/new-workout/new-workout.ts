import { Component, inject, signal } from '@angular/core';
import { WorkoutProperties } from '../../../component/workout-components/workout-properties/workout-properties';
import { WorkoutService } from '../../../services/workout/workout-service';
import { WorkoutDataDto } from '../../../data/workout/workout-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-workout',
  imports: [WorkoutProperties],
  templateUrl: './new-workout.html',
  styleUrl: './new-workout.css',
})
export class NewWorkout {
  router = inject(Router)
  errorMessage = signal('');
  workouts = inject(WorkoutService);

  async CreateWorkout($event : WorkoutDataDto){
    (await this.workouts.create($event)).subscribe(
      {
        next : () => this.router.navigate(['/my-workouts']),
        error : (error) => this.errorMessage.set(error.error?.message)
      }
    )
  }
}
