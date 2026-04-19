import { Routes } from '@angular/router';
import { SignIn } from './pages/sign-in/sign-in';
import { SignUp } from './pages/sign-up/sign-up';
import { Home } from './pages/home/home';
import { Exercises } from './pages/exercises/exercises';
import { MyExercises } from './pages/my-exercises/my-exercises';
import { MyWorkouts } from './pages/my-workouts/my-workouts';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

    {
        path: 'sign-in',
        component: SignIn,
    },
    {
        path: 'sign-up',
        component: SignUp
    },
    {
        path: 'home',
        component: Home,
        canActivate: [authGuard],
    },
    {
        path: 'exercises',
        component: Exercises,
        canActivate: [authGuard]
    },
    {
        path: 'my-exercises',
        component: MyExercises,
        canActivate: [authGuard]
    },
    {
        path: 'my-workouts',
        component: MyWorkouts,
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: '/sign-in' },

];
