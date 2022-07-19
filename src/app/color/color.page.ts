import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ColorsService } from '../api/colors.service';
import { Color } from '../model/color.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.page.html',
  styleUrls: ['./color.page.scss'],
})
export class ColorPage implements OnInit {

  id: number;
  color: Color;
  constructor(
    private route: ActivatedRoute,
    private feedback: FeedbackService,
    private Colorsrvc: ColorsService
  ) {

    this.route.params.subscribe({
      next:(p)=>{
        if(p.id){
          this.id = p.id;
          this.loadColor();
        }
      },
      error:()=>{
        this.feedback.showAlert("Ruta no registrada");
      }
    })
   }


   async loadColor(){
    await this.feedback.showLoading();
    this.Colorsrvc.getColor(this.id).subscribe({
      next:(ColorRes =>{
        this.feedback.hideLoading();
        this.color = ColorRes;
      }),
      error:()=>{
        this.feedback.hideLoading();
        this.feedback.showAlert(`Color con id ${this.id} no encontrado`);
      }
    })
   }
  ngOnInit() {
  }

}
