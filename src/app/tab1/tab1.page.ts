import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { UserService } from '../api/user.service';
import { User } from '../model/user.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  data: User[] = [];


  constructor(private UserSvc: UserService,        
              private feedback: FeedbackService,
              private router: Router,
              private route: ActivatedRoute) 
{
    this.feedback.showLoading().then(()=>{
      this.UserSvc.getUsers().subscribe({
        next: (list) => {
          this.feedback.hideLoading();
          this.data = list.data;
        },
        error: async (err) => {
          this.feedback.hideLoading();
          this.feedback.showAlert("Lo sentimos, ocurrio un error");
  
        },
      });
  
    });

    
  }


  goToUser(user: User) {
    this.router.navigate(['user', user.id], { relativeTo: this.route });
  }
}
