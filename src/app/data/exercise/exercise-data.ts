import { UserData } from "../user-data"

export interface ExerciseData extends PostExerciseData {
    exerciseId : number
}
export interface ExerciseRequestData extends ExerciseData {
    user : UserData
}


export interface PostExerciseData {
    name : string
    force : string
    level : string
    mechanic : string
    equipment : string
    primaryMuscles : string[]
    secondaryMuscles : string[]
    instructions : string[]
    category : string
}