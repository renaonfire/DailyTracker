import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {

  @Input() photos;
  @Input() selectedPhotoIndex;
  slideOpts = {
    initialSlide: 0
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (this.selectedPhotoIndex) {
      this.slideOpts.initialSlide = this.selectedPhotoIndex;
      console.log(this.slideOpts.initialSlide);
    }
  }

  onClosePage() {
    this.modalCtrl.dismiss();
  }

}
