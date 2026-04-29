import { Component, input, InputSignal, output } from '@angular/core';
import { ExerciseData } from '../../data/exercise/ExerciseData';

@Component({
  selector: 'app-exercise-display',
  imports: [],
  templateUrl: './exercise-display.html',
  styleUrl: './exercise-display.css',
})
export class ExerciseDisplay {
  exercise : InputSignal<ExerciseData | undefined> = input<ExerciseData>()
  isSelectable : InputSignal<boolean> = input<boolean>(false);
  onClickEvent = output<ExerciseData | undefined>()


  execiseClick(){
    this.onClickEvent.emit(this.exercise());
  }

}
