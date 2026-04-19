import { Component, computed, inject, resource, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';
import { firstValueFrom } from 'rxjs';
import { UserData } from '../data/UserData';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  private router = inject(Router);
  private auth = inject(AuthService);
  private user = inject(UserService);

  userData = resource<UserData,null>({
    loader : async () => firstValueFrom<UserData>(await this.user.userInfo())
  })

  navigatePage(event : MouseEvent){
    const el = event.currentTarget as HTMLElement
    this.router.navigate([el.getAttribute('value')])
    console.log(this.userData.value())
  }
  logout(){
    this.auth.logout()
    this.router.navigate(['sign-in'])
  }



}
