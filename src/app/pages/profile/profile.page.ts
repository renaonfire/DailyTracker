import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Plugins, CameraResultType } from '@capacitor/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail;
  userImage = '../../../assets/avatar.png';
  userName;
  userSurname;
  userDetailsSub: Subscription;
  hasChanges: boolean;
  invalidEmail: boolean;
  invalidName: boolean;
  invalidSurname: boolean;

  constructor(private modalCtrl: ModalController,
              private actionCtrl: ActionSheetController,
              private userSrv: UserService,
              private authSrv: AuthService,
              private alertCtrl: AlertController,
              private router: Router) { }

  ngOnInit() {
    this.userDetailsSub = this.userSrv.userDetailsChanged.subscribe(user => {
      this.userName = user.name;
      this.userSurname = user.surname;
      this.userEmail = user.email || window.localStorage.getItem('currentUser');
      this.userImage = user.image;
    });
    this.userSrv.retrieveUserDetails();
  }

  validateFields() {
    if (this.userEmail) {
      this.invalidEmail = false;
    } else {
      this.invalidEmail = true;
    }
    if (this.userName) {
      this.invalidName = false;
    } else {
      this.invalidName = true;
    }
    if (this.userSurname) {
      this.invalidSurname = false;
    } else {
      this.invalidSurname = true;
    }
  }

  onClose() {
    if (this.hasChanges) {
      const alert = {
        header: 'You made changes',
        message: 'Are you sure you want to discard changes?',
        handler: () => {
          this.modalCtrl.dismiss();
        }
      };
      this.onPresentAlert(alert.header, alert.message, alert.handler);
    } else {
      this.modalCtrl.dismiss();
    }
  }

  onChange() {
    this.hasChanges = true;
  }

  onSaveChanges() {
    this.validateFields();
    if (this.userEmail && this.userName && this.userSurname) {
      this.userSrv.updateUserDetails(this.userEmail, this.userName, this.userSurname, this.userImage);
      this.modalCtrl.dismiss();
    }
  }

  onLogOut() {
    const alert = {
      header: 'Log Out',
      message: 'Are you sure you want to log out',
      handler: () => {
        this.router.navigateByUrl('/login');
        this.modalCtrl.dismiss();
        window.localStorage.clear();
        this.authSrv.logOut();
      }
    };
    this.onPresentAlert(alert.header, alert.message, alert.handler);
  }

  async onUploadImageClick() {
    const actionSheet = await this.actionCtrl.create({
      buttons: [{
        text: 'Upload an Image',
        icon: 'camera',
        handler: () => { this.onUploadImage(); }
      }]
    });
    return await actionSheet.present();
  }

  async onPresentAlert(header: string, message: string, handler: () => void) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [{text: 'No', role: 'cancel'}, {text: 'Yes', handler }]
    });
    return await alert.present();
  }

  async onUploadImage() {
    const { Camera } = Plugins;
    await Camera.getPhoto({
      resultType: CameraResultType.DataUrl
    }).then((img) => {
      this.userImage = img.dataUrl;
      this.hasChanges = true;
    });
  }

  ngOnDestroy() {
    if (this.userDetailsSub) {
      this.userDetailsSub.unsubscribe();
    }
  }
}
