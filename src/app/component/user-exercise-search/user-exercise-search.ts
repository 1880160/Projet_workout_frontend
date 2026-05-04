import { Component, inject, input, InputSignal, output, resource, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { ExerciseParams } from '../../data/exercise/exercise-params';
import { ExerciseFilter } from '../exercise-filter/exercise-filter';
import { firstValueFrom } from 'rxjs';
import { ExerciseData } from '../../data/exercise/exercise-data';
import { UserExerciseService } from '../../services/user-exercise-service';
import { UserExerciseData } from '../../data/user-exercise/user-exercise-data';
import { UserExerciseDisplay } from '../user-exercise-display/user-exercise-display';
import { DisplayMode } from '../../data/display-mode/display-mode-enum';

@Component({
  selector: 'app-user-exercise-search',
  imports: [ExerciseFilter,UserExerciseDisplay],
  templateUrl: './user-exercise-search.html',
  styleUrl: './user-exercise-search.css',
})
export class UserExerciseSearch {

  userExercises = inject(UserExerciseService)
  Mode = DisplayMode
  exerciseFilterModel = signal<ExerciseParams>({
    name: '',
    category: '',
    muscle_group: '',
  });

  exerciseFilterForm = form(this.exerciseFilterModel);

  selectedUserExercises : InputSignal<number[] | undefined> = input();

  onUserExerciseAdd = output<UserExerciseData>();

  onUserExerciseRemove = output<UserExerciseData>();

    userExercisesData = resource<UserExerciseData[], ExerciseParams>({
    params: () => (this.exerciseFilterForm().value()),
    loader: async ({ params, abortSignal }) => {
      const value = await firstValueFrom<UserExerciseData[]>(await this.userExercises.find(params))
      return value
    }
  })

  selectUserExercise($event : UserExerciseData | undefined){
    if (!$event){return}
    this.onUserExerciseAdd.emit($event);
    
  }
  unSelectUserExercise($event : UserExerciseData | undefined){
    if (!$event){return}
      this.onUserExerciseRemove.emit($event);
    
    
  }


  onUpdatedfilter($event : ExerciseParams){
    this.exerciseFilterModel.update((exerciseParam) => $event);
  }
}
