import { Component, computed, inject, input, InputSignal, signal } from '@angular/core';
import { WorkoutData } from '../../../data/workout/workout-data';
import { ExerciseData } from '../../../data/exercise/exercise-data';

@Component({
  selector: 'app-workout-display',
  imports: [],
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
