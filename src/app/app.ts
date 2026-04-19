import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet, Event } from '@angular/router';
import { Header } from './header/header';
import { AuthService } from './services/auth-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private auth = inject(AuthService);
  private router = inject(Router)
  protected readonly title = signal('Projet_workout_frontend');
  isLogged = signal(this.auth.isLoggedIn());
  constructor(){
    this.router.events.pipe(takeUntilDestroyed()).subscribe(
      (event: Event) => {
      if (event instanceof NavigationStart) {
        // Navigation starting
        this.isLogged.set(this.auth.isLoggedIn());
        console.log('Navigation starting:', event.url);
      }
      if (event instanceof NavigationEnd) {
        // Navigation completed
        console.log('Navigation completed:', event.url);
      }
    });

  }

}
