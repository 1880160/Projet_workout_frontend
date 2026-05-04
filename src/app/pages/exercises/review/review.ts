import { Component, inject, signal } from '@angular/core';
import { ExerciseDisplay } from '../../../component/exercise-display/exercise-display';
import { ExerciseData } from '../../../data/exercise/exercise-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  imports: [ExerciseDisplay],
  templateUrl: './review.html',
  styleUrl: './review.css',
})
export class Review {

  router = inject(Router);

  testExercise = signal<ExerciseData>(
    {
      "exerciseId": 1,
      "name": "Alternate Hammer Curl",
      "force": "pull",
      "level": "beginner",
      "mechanic": "isolation",
      "equipment": "dumbbell",
      "primaryMuscles": [
        "biceps"
      ],
      "secondaryMuscles": [
        "forearms"
      ],
      "instructions": [
        "Stand up with your torso upright and a dumbbell in each hand being held at arms length. The elbows should be close to the torso.",
        "The palms of the hands should be facing your torso. This will be your starting position.",
        "While holding the upper arm stationary, curl the right weight forward while contracting the biceps as you breathe out. Continue the movement until your biceps is fully contracted and the dumbbells are at shoulder level. Hold the contracted position for a second as you squeeze the biceps. Tip: Only the forearms should move.",
        "Slowly begin to bring the dumbbells back to starting position as your breathe in.",
        "Repeat the movement with the left hand. This equals one repetition.",
        "Continue alternating in this manner for the recommended amount of repetitions."
      ],
      "category": "strength"
    }
  )


  navigateExercise(){
    this.router.navigate(["/exercises"])
  }

}
