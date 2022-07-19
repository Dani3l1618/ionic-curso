import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AlertController } from '@ionic/angular';
import { FeedbackService } from '../services/feedback.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  base64Image: string;

  constructor(private camera: Camera, private alert: AlertController) {

  }

  takePicture() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: 0
    };
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    },
    (err)=>{
      this.showAlert(err.error.error)
    })
  }

  async showAlert(msm: string, header: string ='Alert'){
    const alert = await this.alert.create({
      header,
      message: msm,
      buttons: ['Aceptar'],
    
  });
  await alert.present();
  }



}
