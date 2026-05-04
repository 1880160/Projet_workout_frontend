import { Component, computed, input, InputSignal, output } from '@angular/core';
import { WorkoutData } from '../../../data/workout/workout-data';
import { UserExerciseDisplay } from '../../user-exercise-display/user-exercise-display';
import { DisplayMode } from '../../../data/display-mode/display-mode-enum';

@Component({
  selector: 'app-workout-display',
  imports: [UserExerciseDisplay],
  templateUrl: './workout-display.html',
  styleUrl: './workout-display.css',
})
export class WorkoutDisplay {

  workout : InputSignal<WorkoutData | undefined> = input()

  displayMode = input(DisplayMode.DEFAULT);
  Mode = DisplayMode
  //Edit Mode
  onEditEvent = output<WorkoutData>()
  onDeleteEvent = output<WorkoutData>()

  
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

  editWorkout(){
    const workoutNotNull = this.workout();
    if (!workoutNotNull) {return;}
    this.onEditEvent.emit(workoutNotNull);
  }
  deleteWorkout(){
    const workoutNotNull = this.workout();
    if (!workoutNotNull) {return;}
    this.onDeleteEvent.emit(workoutNotNull)
  }




}





