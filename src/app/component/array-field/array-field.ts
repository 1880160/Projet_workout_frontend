import { Component, input, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { single } from 'rxjs';
import { OptionSelection } from './option-selection';

@Component({
  selector: 'app-array-field',
  imports: [FormField, ReactiveFormsModule],
  templateUrl: './array-field.html',
  styleUrl: './array-field.css',
})
export class ArrayField {

  options = input<string[]>([])

  itemsUpdatedEvent = output<string[]>()

  optionsSelectionModel = signal<OptionSelection>(
  {  
    selection : '',
    selectedOptions : []
  }
  )
  optionsSelectionForm = form(this.optionsSelectionModel);


  addArray(){
    const selection = this.optionsSelectionForm().value().selection
    if (selection.length < 1){
      return;
    }
    this.optionsSelectionForm().value().selectedOptions.push(selection)
    console.log(this.optionsSelectionForm().value())
        this.onItemUpdated()
  }
  removeArray($event : number){
    this.optionsSelectionForm().value().selectedOptions.splice($event,1)
    this.onItemUpdated()
  }
  onItemUpdated(){
    this.itemsUpdatedEvent.emit(this.optionsSelectionForm().value().selectedOptions)
  }
}
