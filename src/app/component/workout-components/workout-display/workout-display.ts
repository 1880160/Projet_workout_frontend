import { Component, computed, input, InputSignal } from '@angular/core';
import { WorkoutData } from '../../../data/workout/workout-data';
import { UserExerciseDisplay } from '../../user-exercise-display/user-exercise-display';

@Component({
  selector: 'app-workout-display',
  imports: [UserExerciseDisplay],
  templateUrl: './workout-display.html',
  styleUrl: './workout-display.css',
})
export class WorkoutDisplay {

  workout : InputSignal<WorkoutData | undefined> = input()
  
  exerciseList = computed(() => 
  {
    let exercises : string[] = []
    this.workout()?.userExercises.forEach( (userExercise) =>
    {
      exercises.push(...userExercise?.exercise?.primaryMuscles ,...userExercise?.exercise?.secondaryMuscles )
    }
    )
    return exercises = [...new Set(exercises)];
  })

}
