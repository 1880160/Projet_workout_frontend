import { Component, computed, input, InputSignal, output } from '@angular/core';
import { NotificationData } from '../../../data/notification/notification-data';
import { DisplayMode } from '../../../data/display-mode/display-mode-enum';

@Component({
  selector: 'app-notification-display',
  imports: [],
  templateUrl: './notification-display.html',
  styleUrl: './notification-display.css',
})
export class NotificationDisplay {

  notification : InputSignal<NotificationData | undefined> = input()
  displayMode = input(DisplayMode.DEFAULT);

    onDeleteEvent = output<NotificationData>()

  dateDisplay = computed(()=> {
    const notifDate = this.notification()?.notifcationDate
    if (!notifDate){return "Unknown"}
    return new Date(notifDate).toLocaleString()
  })
    deleteNotification(){
      const deleteNotification = this.notification();
      if (!deleteNotification){return}
      this.onDeleteEvent.emit(deleteNotification)
    }
}
