import { Component, computed, effect, input, output, signal } from '@angular/core';
import { FieldTree, form, FormField } from '@angular/forms/signals';
import { fieldsOptions } from '../../data/exercise/ExerciseFieldsOptions';
import { ExerciseParams } from '../../data/exercise/ExerciseParams';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-filter',
  imports: [FormField, ReactiveFormsModule],
  templateUrl: './exercise-filter.html',
  styleUrl: './exercise-filter.css',
})
export class ExerciseFilter {

  onFiltersUpdated = output<ExerciseParams>();

  exerciseFilterModel = signal<ExerciseParams>({
    name: '',
    category: '',
    muscle_group: '',
  });
  options = fieldsOptions;


  exerciseFilterForm = form(this.exerciseFilterModel);


  constructor() {

    effect(() => {
      this.onFiltersUpdated.emit(this.exerciseFilterForm().value())
    })

  }


}
