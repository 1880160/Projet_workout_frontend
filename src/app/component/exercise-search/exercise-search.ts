import { Component, inject, resource, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { ExerciseData } from '../../data/exercise/ExerciseData';
import { fieldsOptions } from '../../data/exercise/ExerciseFieldsOptions';
import { ExerciseParams } from '../../data/exercise/ExerciseParams';
import { ExerciseService } from '../../services/exercise-service';
import { ReactiveFormsModule } from '@angular/forms';
import { ExerciseDisplay } from '../exercise-display/exercise-display';

@Component({
  selector: 'app-exercise-search',
  imports: [ExerciseDisplay, FormField, ReactiveFormsModule],
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
  options = fieldsOptions;


  exerciseFilterForm = form(this.exerciseFilterModel);
  exercisesData = resource<ExerciseData[], ExerciseParams>({
    params: () => (this.exerciseFilterForm().value()),
    loader: async ({ params, abortSignal }) => {
      const value = await firstValueFrom<ExerciseData[]>(await this.exercises.find(params))
      return value
    }
  })
}
