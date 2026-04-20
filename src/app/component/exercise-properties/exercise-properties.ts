import { Component, computed, ElementRef, input, output, signal, ViewChild, viewChild } from '@angular/core';
import { fieldsOptions } from '../../data/exercise/ExerciseFieldsOptions';
import { ExerciseData, PostExerciseData } from '../../data/exercise/ExerciseData';
import { form, FormField } from '@angular/forms/signals';
import { ReactiveFormsModule } from '@angular/forms';
import { ArrayField } from '../array-field/array-field';
import { single } from 'rxjs';

@Component({
  selector: 'app-exercise-properties',
  imports: [FormField, ReactiveFormsModule, ArrayField],
  templateUrl: './exercise-properties.html',
  styleUrl: './exercise-properties.css',
})
export class ExerciseProperties {

  onPostData = output<PostExerciseData>()
  onClose = output();

  errorMessage = input('')

    options = fieldsOptions;
    exerciseModel = signal<PostExerciseData>({
    name : '',
    force : '',
    level : '',
    mechanic : '',
    equipment : '',
    primaryMuscles : [],
    secondaryMuscles : [],
    instructions : [],
    category : '',
  });

  textAreaModel = signal(
   { value : ''}
  )
  textAreaField = form(this.textAreaModel);


  textAreaComputed = computed(() => this.textAreaField.value().value().split(';'))


  exerciseForm = form(this.exerciseModel);

  onPrimaryMusclesUpdated($event : string[]){
    this.exerciseForm.primaryMuscles().value.set($event);
  }
  onSecondaryMusclesUpdated($event : string[]){
    this.exerciseForm.secondaryMuscles().value.set($event);
  }
  descriptionChanged($event : Event){
    this.exerciseForm.instructions().value.set(this.textAreaComputed());
  }
  SubmitInfo(){
    this.onPostData.emit(this.exerciseForm().value())
  }
  CloseDialog(){
    this.onClose.emit();
  }
}
