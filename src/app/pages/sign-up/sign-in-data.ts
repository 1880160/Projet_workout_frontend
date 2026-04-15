import { LoginData } from "../sign-in/login-data";
import { SignIn } from "../sign-in/sign-in";

export interface SignInData extends LoginData{
    email : string
}