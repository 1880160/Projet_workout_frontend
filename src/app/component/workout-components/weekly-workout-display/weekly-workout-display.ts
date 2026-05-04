import { Component, input, InputSignal, output } from '@angular/core';
import { WorkoutData } from '../../../data/workout/workout-data';
import { WorkoutDisplay } from '../workout-display/workout-display';
import { WeekDays } from '../../../data/workout/weekdays-enum';
import { DisplayMode } from '../../../data/display-mode/display-mode-enum';

@Component({
  selector: 'app-weekly-workout-display',
  imports: [WorkoutDisplay],
  templateUrl: './weekly-workout-display.html',
  styleUrl: './weekly-workout-display.css',
})
export class WeeklyWorkoutDisplay 
{

  editDisplayMode = DisplayMode.EDIT

  onEditEvent = output<WorkoutData>();
  onDeleteEvent = output<WorkoutData>();

  workoutsWeeklyDatas : InputSignal<WorkoutData[] | undefined> = input()
  weekDay = input(WeekDays[0])

  editWorkout($event : WorkoutData){
  this.onEditEvent.emit($event);
  }
  deleteWorkout($event :  WorkoutData){
    this.onDeleteEvent.emit($event);
  }

}
