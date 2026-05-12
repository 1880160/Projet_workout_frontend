import { Component, input, InputSignal, output } from '@angular/core';
import { UserExerciseData } from '../../../data/user-exercise/user-exercise-data';
import { ExerciseFilter } from '../../exercise-components/exercise-filter/exercise-filter';
import { UserExerciseDetails } from './user-exercise-details/user-exercise-details';
import { DisplayMode } from '../../../data/display-mode/display-mode-enum';

@Component({
  selector: 'app-user-exercise-display',
  imports: [UserExerciseDetails],
  templateUrl: './user-exercise-display.html',
  styleUrl: './user-exercise-display.css',
})
export class UserExerciseDisplay {


    isCollapsable = input(false)
    Mode = DisplayMode
    displayMode = input(DisplayMode.DEFAULT);

    //Edit Mode
    onEditEvent = output<UserExerciseData | undefined>()
    onDeleteEvent = output<UserExerciseData | undefined>()

    //Selectable Mode
    onSelectedEvent = output<UserExerciseData | undefined>()
    
    //DESELECTABLEMode
    onUnselectedEvent = output<UserExerciseData | undefined>()


    userExercise : InputSignal<UserExerciseData | undefined> = input()

    editUserExercise(){
      this.onEditEvent.emit(this.userExercise());
    }
    deleteUserExercise(){
      this.onDeleteEvent.emit(this.userExercise());
    }

    selectUserExercise(){
      this.onSelectedEvent.emit(this.userExercise());
    }
    unSelectUserExercise(){
      this.onUnselectedEvent.emit(this.userExercise());
    }

}
