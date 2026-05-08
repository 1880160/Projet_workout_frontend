import { Component, computed, input, InputSignal, output } from '@angular/core';
import { ExerciseData, ExerciseRequestData } from '../../data/exercise/exercise-data';
import { DisplayMode } from '../../data/display-mode/display-mode-enum';

@Component({
  selector: 'app-exercise-display',
  imports: [],
  templateUrl: './exercise-display.html',
  styleUrl: './exercise-display.css',
})
export class ExerciseDisplay {
  exercise: InputSignal<ExerciseData | ExerciseRequestData | undefined> = input<ExerciseData>()
  Mode = DisplayMode
  displayMode = input(DisplayMode.DEFAULT);

  onClickEvent = output<ExerciseData | ExerciseRequestData | undefined>()
  onRejectEvent = output<ExerciseRequestData>()
  onApproveEvent = output<ExerciseRequestData>()

  userData = computed(()=> (this.exercise() as ExerciseRequestData).user ?? null)


  execiseClick() {
    this.onClickEvent.emit(this.exercise());
  }
  approveExercise(){
    if (this.exercise()){
      const exerciseRequestData = this.exercise() as ExerciseRequestData
      this.onApproveEvent.emit(exerciseRequestData)
    }
  }
  rejectExercise(){
    if (this.exercise()){
      const exerciseRequestData = this.exercise() as ExerciseRequestData
      this.onRejectEvent.emit(exerciseRequestData)
    }
  }

}
