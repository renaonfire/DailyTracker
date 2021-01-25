import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {

  @Input() photos;
  @Input() selectedPhotoIndex;
  slideOpts: any;

  @ViewChild('slides', {static: true}) slides: IonSlides;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (typeof this.selectedPhotoIndex === 'number') {
      this.slideOpts = {
        initialSlide: this.selectedPhotoIndex
      }
      this.slides.update();
    }
  }

  onClosePage() {
    this.modalCtrl.dismiss();
  }

}
