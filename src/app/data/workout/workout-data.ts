import { UserData } from "../user-data"
import { UserExerciseData } from "../user-exercise/user-exercise-data"

export interface WorkoutData {
    workoutId : number
    workoutName : string
    weekDate : Date
    alertDate : Date | null
    userExercises : UserExerciseData[]
    user : UserData
}