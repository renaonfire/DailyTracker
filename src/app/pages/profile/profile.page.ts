import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail = window.localStorage.getItem('currentUser');
  userImage = '../../../assets/avatar.png';
  userName;
  userSurname;
  userDetailsSub: Subscription;

  constructor( private modalCtrl: ModalController, private actionCtrl: ActionSheetController, private userSrv: UserService) { }

  ngOnInit() {
    this.userDetailsSub = this.userSrv.userDetailsChanged.subscribe(user => {
      this.userName = user.name;
      this.userSurname = user.surname;
      this.userEmail = user.email;
    });
    this.userSrv.retrieveUserDetails();
  }

  onClose() {
    this.modalCtrl.dismiss();
  }

  async onUploadImageClick() {
    const actionSheet = await this.actionCtrl.create({
      buttons: [{
        text: 'Upload an Image',
        icon: 'camera',
        handler: () => {console.log('upload clicked')}
      }]
    });
    return await actionSheet.present();
  }

  onSaveChanges() {
    this.userSrv.updateUserDetails(this.userEmail, this.userName, this.userSurname);
  }
}
