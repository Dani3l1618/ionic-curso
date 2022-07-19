import { Component } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorsService } from '../api/colors.service';
import { Color } from '../model/color.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  data: Color[] = [];

  constructor(
    private Colorsrv: ColorsService,
    private feedback: FeedbackService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.feedback.showLoading().then(()=>{
      this.Colorsrv.getColors().subscribe({
        next: (list)=>{
          this.feedback.hideLoading();
          this.data = list.data;
        },
        error: async(err) =>{
          this.feedback.hideLoading();
          this.feedback.showAlert("Ocurrio un error al cargar las listas");
        }
      });
    });



  }

  goToColor(color:Color){
    console.log(color.id);
    this.router.navigate(['color',color.id],{relativeTo: this.route});
  }


}
