import { Component, input, InputSignal, output } from '@angular/core';
import { UserExerciseData } from '../../data/user-exercise/user-exercise-data';
import { ExerciseFilter } from '../exercise-filter/exercise-filter';

@Component({
  selector: 'app-user-exercise-display',
  imports: [],
  templateUrl: './user-exercise-display.html',
  styleUrl: './user-exercise-display.css',
})
export class UserExerciseDisplay {

    onEditEvent = output<UserExerciseData | undefined>()
    onDeleteEvent = output<UserExerciseData | undefined>()

    userExercise : InputSignal<UserExerciseData | undefined> = input()

    editUserExercise(){
      this.onEditEvent.emit(this.userExercise());
    }
    deleteUserExercise(){
      this.onDeleteEvent.emit(this.userExercise());
    }
}
