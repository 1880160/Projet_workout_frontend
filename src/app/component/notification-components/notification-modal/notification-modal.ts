import { Component, input, output } from '@angular/core';
import { NotificationData } from '../../../data/notification/notification-data';
import { NotificationDisplay } from '../notification-display/notification-display';

@Component({
  selector: 'app-notification-modal',
  imports: [NotificationDisplay],
  templateUrl: './notification-modal.html',
  styleUrl: './notification-modal.css',
})
export class NotificationModal {

  notifications = input<NotificationData[]>([]);
  onDeleteEvent = output<NotificationData>();
  onCloseEvent = output();
  deleteNotification($event : NotificationData){
    this.onDeleteEvent.emit($event);
  }

  closeDialog(){
    this.onCloseEvent.emit();
  }
}
