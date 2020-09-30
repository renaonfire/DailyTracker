import { AlertController } from '@ionic/angular';

export class Helpers {

  alertCtrl = new AlertController();

        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        formatTime(time?: string) {
            const date = time ? new Date(time) : new Date();
            const hour = date.getHours();
            const minutes = date.getMinutes();
            const newMinutes = minutes.toLocaleString().length === 1 ? `${0}${minutes}` : minutes;
            return `${hour}:${newMinutes}`;
          }
    
        formatDate(date?) {
            const newDate = date ? new Date(date) : new Date();
            const month = newDate.getMonth();
            const day = newDate.getDate();
            const year = newDate.getFullYear();
            return `${day} ${this.months[month]} ${year}`;
        }

        showAlert(header: string, message: string) {
          this.alertCtrl.create({
            header,
            message,
            buttons: ['OK']
          }).then(alertEl => alertEl.present());
        }
    
}
