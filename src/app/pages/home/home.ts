import { Component, computed, inject, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserData } from '../../data/user-data';
import { UserService } from '../../services/user-service';
import { RouterLink } from '@angular/router';
import { WorkoutService } from '../../services/workout/workout-service';
import { WorkoutData } from '../../data/workout/workout-data';
import { WorkoutDisplay } from '../../component/workout-components/workout-display/workout-display';

@Component({
  selector: 'app-home',
  imports: [RouterLink, WorkoutDisplay],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private user = inject(UserService);
  private workouts = inject(WorkoutService);

  IncomingWorkouts = computed(() => {
    const now = (new Date());
    const today = now.getDay();
    return this.workoutsData.value()?.filter(
      (workout) => {
        const workoutDate = new Date(workout.weekDate);
        return workoutDate.getDay() == today || workoutDate.getDay() == (today + 1) % 7
      }).sort(
      (workoutA, workoutB) =>{
        const workoutDateA = new Date(workoutA.weekDate);
        const workoutDateB  = new Date(workoutB.weekDate);
        if (workoutDateA.getDay() == workoutDateB.getDay()){
          return workoutDateA.getHours() > workoutDateB.getHours() ? 1 : -1
        }
        //wish this was functional
        if((workoutDateA.getDate() == 0 && workoutDateB.getDate() == 6)|| (workoutDateB.getDate() == 0 && workoutDateA.getDate() == 6)){
          return workoutDateA.getDate() == 0 ? 1 : -1;
        }
        return workoutDateA > workoutDateB ? 1 : -1
      }
    )
  } );


  exerciseList = computed(() => {
    let exercises: string[] = []
    this.workoutsData.value()?.forEach(
      (workout) => { workout.userExercises.forEach((userExercise) => {
        exercises.push(...userExercise?.exercise?.primaryMuscles, ...userExercise?.exercise?.secondaryMuscles)
      }
      )
      }
    )
    return exercises = [...new Set(exercises)];
  })


  workoutsData = resource<WorkoutData[], null>(
    {
      loader: async () => {
        return await firstValueFrom<WorkoutData[]>(await this.workouts.find())
      }
    }
  )


  userData = resource<UserData, null>({
    loader: async () => firstValueFrom<UserData>(await this.user.userInfo())
  })
}
