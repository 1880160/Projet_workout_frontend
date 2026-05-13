import { Component, computed, ElementRef, inject, OnInit, resource, signal, viewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';
import { firstValueFrom, Observable } from 'rxjs';
import { UserData } from '../data/user-data';
import { NotificationModal } from '../component/notification-components/notification-modal/notification-modal';
import { NotificationService } from '../services/notification/notification-service';
import { NotificationData } from '../data/notification/notification-data';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NotificationModal],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {



  private router = inject(Router);
  private auth = inject(AuthService);
  private user = inject(UserService);


  userData = resource<UserData, null>({
    loader: async () => firstValueFrom<UserData>(await this.user.userInfo())
  })

  navigatePage(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement
    this.router.navigate([el.getAttribute('value')])
  }
  logout() {
    this.auth.logout()
    this.router.navigate(['sign-in'])
  }


  //#region modal
  dialogueRef = viewChild<ElementRef>('notification_modal')
  async closeModal() {
    const dialog = this.dialogueRef()?.nativeElement as HTMLDialogElement
    dialog?.close();
  }
  async showModal() {
    const dialog = this.dialogueRef()?.nativeElement as HTMLDialogElement
    dialog?.showModal();
  }
  //#endregion


  //#region Notification
  notificationService = inject(NotificationService)
  notificationsData = resource<NotificationData[], null>({
    defaultValue: [],
    loader: async ({ params, abortSignal }) => {
      const value = (await firstValueFrom<NotificationData[]>(await this.notificationService.find()))
      return value
    }
  })

  async deleteNotification($event: NotificationData) {
    console.log("uwuw");
    (await this.notificationService.delete($event.notificationId))
      .subscribe();
  }


  async ngOnInit() {
    (await this.notificationService.listenForUpdates()).subscribe(
      (event) => {
        if (event.type === 'error') {
          const errorEvent = event as ErrorEvent;
          console.error(errorEvent.error, errorEvent.message);
        } else {
          const messageEvent = event as MessageEvent;
          console.info(`SSE request with type "${messageEvent.type}" and data "${messageEvent.data}"`);
          this.notificationsData.reload()
        }
      }
    )
  }
  //#endregion


}
