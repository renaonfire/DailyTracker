import { AlertController } from '@ionic/angular';

export class Helpers {

  alertCtrl = new AlertController();

        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        formatTime(time?: string) {
            const date = time ? new Date(time) : new Date();
            const hour = date.getHours();
            const minutes = date.getMinutes();
            return `${hour}:${minutes}`;
          }
    
        formatDate(date?) {
            const newDate = date ? new Date(date) : new Date();
            const month = newDate.getMonth();
            const day = newDate.getDate();
            const year = newDate.getFullYear();
            return `${day} ${this.months[month]} ${year}`;
        }

        showAlert(head: string, msg: string) {
          this.alertCtrl.create({
            header: head,
            message: msg,
            buttons: ['OK']
          }).then(alertEl => alertEl.present());
        }
    
}
