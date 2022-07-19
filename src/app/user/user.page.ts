import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../api/user.service';
import { User } from '../model/user.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  id: number;
  user:User;

  constructor(
    private route: ActivatedRoute,
    private feedback: FeedbackService,
    private userSvc: UserService
  ) { 
    this.route.params.subscribe({
      next:(p)=>{
        if(p.id){
          this.id = p.id;
          console.log('ID DE USUARIO ', p.id);
          this.loadUser();
        }
      },
      error: ()=>{
        this.feedback.showAlert('Ruta no encontrada');
      }
    })
  }

  async loadUser(){
    await this.feedback.showLoading();
    this.userSvc.getUser(this.id).subscribe({
      next: (userRes => {
        this.feedback.hideLoading();
        this.user = userRes;
      }),
      error:()=>{
        this.feedback.hideLoading();
        this.feedback.showAlert("Usuario no encontrado");
      }
    })
  }

  ngOnInit() {
  }

}
