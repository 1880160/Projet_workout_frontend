import { Routes } from '@angular/router';
import { SignIn } from './pages/sign-in/sign-in';
import { SignUp } from './pages/sign-up/sign-up';
import { Home } from './pages/home/home';
import { Exercises } from './pages/exercises/exercises';
import { MyExercises } from './pages/my-exercises/my-exercises';
import { MyWorkouts } from './pages/my-workouts/my-workouts';
import { authGuard } from './guards/auth-guard';
import { Review } from './pages/exercises/review/review';
import { NewWorkout } from './pages/my-workouts/new-workout/new-workout';
import { UpdateWorkout } from './pages/my-workouts/update-workout/update-workout';
import { workoutResolver } from './resolvers/workout-resolver';

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
        path: 'exercises/review',
        component: Review,
        canActivate: [authGuard]
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
        path: 'my-workouts/update/:id',
        component: UpdateWorkout,
        canActivate: [authGuard],
        resolve :  {
            workout : workoutResolver,
        }
    },
    {
        path: 'my-workouts/new',
        component: NewWorkout,
        canActivate: [authGuard]
    },
    {
        path: 'my-workouts',
        component: MyWorkouts,
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: '/sign-in' },

];
