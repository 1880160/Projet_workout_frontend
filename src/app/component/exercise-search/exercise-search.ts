import { Component, inject, input, InputSignal, output, resource, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { ExerciseData } from '../../data/exercise/exercise-data';
import { fieldsOptions } from '../../data/exercise/exercise-fields-options';
import { ExerciseParams } from '../../data/exercise/exercise-params';
import { ExerciseService } from '../../services/exercise-service';
import { ReactiveFormsModule } from '@angular/forms';
import { ExerciseDisplay } from '../exercise-display/exercise-display';
import { ExerciseFilter } from '../exercise-filter/exercise-filter';
import { DisplayMode } from '../../data/display-mode/display-mode-enum';

@Component({
  selector: 'app-exercise-search',
  imports: [ExerciseDisplay, ReactiveFormsModule, ExerciseFilter],
  templateUrl: './exercise-search.html',
  styleUrl: './exercise-search.css',
})
export class ExerciseSearch {

  exercises = inject(ExerciseService)
  exerciseFilterModel = signal<ExerciseParams>({
    name: '',
    category: '',
    muscle_group: '',
  });

  exerciseFilterForm = form(this.exerciseFilterModel);
  options = fieldsOptions;

  onExerciseSelectedEvent = output<ExerciseData>()

  exerciseDisplayMode = input(DisplayMode.DEFAULT)

  exercisesData = resource<ExerciseData[], ExerciseParams>({
    params: () => (this.exerciseFilterForm().value()),
    loader: async ({ params, abortSignal }) => {
      const value = await firstValueFrom<ExerciseData[]>(await this.exercises.find(params))
      return value
    }
  })
  onUpdatedfilter($event : ExerciseParams){
    this.exerciseFilterModel.update((exerciseParam) => $event);
  }

  onExerciseSelected($event : ExerciseData | undefined){
    if ($event){
      this.onExerciseSelectedEvent.emit($event)
    }
  }

}
