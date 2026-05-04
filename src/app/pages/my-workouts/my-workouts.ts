import { Component, computed, inject, resource } from '@angular/core';
import { WeeklyWorkoutDisplay } from '../../component/workout-components/weekly-workout-display/weekly-workout-display';
import { WorkoutData } from '../../data/workout/workout-data';
import { WorkoutService } from '../../services/workout/workout-service';
import { firstValueFrom } from 'rxjs';
import { WeekDays } from '../../data/workout/weekdays-enum';
import { Router, RouterLink } from "@angular/router";
@Component({
  selector: 'app-my-workouts',
  imports: [WeeklyWorkoutDisplay, RouterLink],
  templateUrl: './my-workouts.html',
  styleUrl: './my-workouts.css',
})
export class MyWorkouts {

  weekDays = WeekDays
  router = inject(Router)
  workoutWeeklyData = computed(() => {
    let workoutList = []
    const workouts = this.workoutsData.value()
    console.log(workouts);
    for (let j = 0; j <= 6; j++) {
      workoutList.push({ weekNumber: j, workouts: workouts?.filter((workout) => new Date(workout.weekDate).getDay() == j) })
    }
    return workoutList;
  }
  )

  workouts = inject(WorkoutService);

  workoutsData = resource<WorkoutData[], null>(
    {
      loader: async () => {
        return await firstValueFrom<WorkoutData[]>(await this.workouts.find())
      }
    }
  )

  async deleteWorkout($event: WorkoutData) {
    (await this.workouts.delete($event.workoutId)).subscribe(
      {
        next: () => this.workoutsData.reload()
      }
    )


  }

  async editWorkout($event: WorkoutData) {
    this.router.navigate([`/my-workouts/update/${$event.workoutId}`])
  }
}
