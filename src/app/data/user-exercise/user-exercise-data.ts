import { ExerciseData } from "../exercise/exercise-data"
import { UserData } from "../user-data"

export  interface UserExerciseData {

    userExerciseId : number

    name : string

    weight : number

    repetition : number

    sets : number

    restTime : number

    executionTime : number

    user : UserData

    exercise : ExerciseData
} 

export interface UserExerciseDataDto {

    name : string

    weight : number

    repetition : number

    sets : number

    restTime : number

    executionTime : number
    exerciseId : number
    
}
