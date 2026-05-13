import { UserData } from "../user-data";

export interface NotificationData {
    notificationId : number,
    title : string,
    message : string,
    context? : string,
    notifcationDate : string //string date format
    user : UserData
}