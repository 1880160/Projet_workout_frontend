import { UserData } from "../user-data"
import { UserExerciseData } from "../user-exercise/user-exercise-data"
import { WeekDays } from "./weekdays-enum"

export interface WorkoutData {
    workoutId : number
    workoutName : string
    weekDate : Date
    alertDate : Date | null
    userExercises : UserExerciseData[]
    user : UserData
}

export interface WorkoutDataDto {
    workoutName : string
    weekDate? : string
    alertDate? : string
    userExercisesId : number[]
}
export interface WorkoutPropertiesDto {
    workoutName : string
    workoutDayOfWeek : string
    workoutTimeOfDay : Date
    alertMinutesBefore : number
    userExercisesId : number[]

}