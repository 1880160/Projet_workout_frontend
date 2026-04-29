import { Component, input, InputSignal } from '@angular/core';
import { WorkoutData } from '../../../data/workout/workout-data';
import { WorkoutDisplay } from '../workout-display/workout-display';
import { WeekDays } from '../../../data/workout/weekdays-enum';

@Component({
  selector: 'app-weekly-workout-display',
  imports: [WorkoutDisplay],
  templateUrl: './weekly-workout-display.html',
  styleUrl: './weekly-workout-display.css',
})
export class WeeklyWorkoutDisplay 
{
  workoutsWeeklyDatas : InputSignal<WorkoutData[] | undefined> = input()
  weekDay = input(WeekDays[0])
}
