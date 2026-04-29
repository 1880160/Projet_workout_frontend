import { ExerciseData } from "../exercise/ExerciseData"
import { UserData } from "../UserData"

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

export interface UpdateUserExerciseDataDto extends UserExerciseDataDto{
    userExerciseId : number
}