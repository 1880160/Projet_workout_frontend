import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot, RedirectCommand, Router } from "@angular/router";
import { WorkoutData } from "../data/workout/workout-data";
import { WorkoutService } from "../services/workout/workout-service";
import { firstValueFrom } from "rxjs";

export const workoutResolver: ResolveFn<WorkoutData | RedirectCommand> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) =>  {
  const workouts = inject(WorkoutService);
  const router = inject(Router);
  const workoutId = route.paramMap.get('id');
  if(workoutId == null){return new RedirectCommand(router.parseUrl('/my-workouts'));}
  const numberWorkoutId = parseInt(workoutId)
  return firstValueFrom(await workouts.findOne(numberWorkoutId))
};