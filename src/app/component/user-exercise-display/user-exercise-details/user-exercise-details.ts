import { Component, input, InputSignal } from '@angular/core';
import { UserExerciseData } from '../../../data/user-exercise/user-exercise-data';

@Component({
  selector: 'app-user-exercise-details',
  imports: [],
  templateUrl: './user-exercise-details.html',
  styleUrl: './user-exercise-details.css',
})
export class UserExerciseDetails {

  userExercise : InputSignal<UserExerciseData | undefined> = input()
  
  
}
