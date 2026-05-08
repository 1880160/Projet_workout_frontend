export interface UserData{
    userId : number
    email : string
    username : string
    userType : UserRole
}

export enum UserRole{
    USER,
    ADMIN
}