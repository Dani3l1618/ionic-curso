import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private loading : LoadingController,
    private alert: AlertController
  ) { }

  async showLoading(){
     // loading
     const loadngView = await this.loading.create({
      message: 'Cargando...',
      
    })
     await loadngView.present();
    //
  }

  async hideLoading(){
    await this.loading.dismiss();
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
