import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './components/header/header';
import { SignIn } from './modals/auth/sign-in/sign-in';
import { SignUp } from './modals/auth/sign-up/sign-up';
import { Home } from './pages/home/home';
import { Settings } from './pages/settings/settings';
import { ExerciseLibrary } from './pages/exercise-library/exercise-library';
import { AddExercise } from './pages/add-exercise/add-exercise';
import { MyWorkouts } from './pages/my-workouts/my-workouts';
import { CreateWorkout } from './pages/create-workout/create-workout';
import { TrainingSession } from './pages/training-session/training-session';

@NgModule({
  declarations: [
    App,
    Header,
    SignIn,
    SignUp,
    Home,
    Settings,
    ExerciseLibrary,
    AddExercise,
    MyWorkouts,
    CreateWorkout,
    TrainingSession,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration(withEventReplay())],
  bootstrap: [App],
})
export class AppModule {}
