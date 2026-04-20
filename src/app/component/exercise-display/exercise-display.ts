import { Component, input, InputSignal } from '@angular/core';
import { ExerciseData } from '../../data/exercise/ExerciseData';

@Component({
  selector: 'app-exercise-display',
  imports: [],
  templateUrl: './exercise-display.html',
  styleUrl: './exercise-display.css',
})
export class ExerciseDisplay {
  exercise : InputSignal<ExerciseData | undefined> = input<ExerciseData>()
}
