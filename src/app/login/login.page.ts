import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../api/login.service';
import { LoginRequest, LoginResponse } from '../model/login.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;


  constructor(
    private fb: FormBuilder, 
    private loginService:LoginService,
    private feedback: FeedbackService,
    private router:Router) {
    this.formLogin = this.fb.group({
      username: ['',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['',[Validators.required,Validators.minLength(4)]],
    });

   }

   async loginClick():Promise<void>{
    const data = this.formLogin.value as LoginRequest;
    await this.feedback.showLoading();

    this.loginService.login(data).subscribe({
      next: (response: LoginResponse) => {
        //Bloque que recibe la respuesta
        console.log(response.token);
        this.feedback.hideLoading();

        this.router.navigate(['menu']);
      },
      error: async (err) => {
        this.feedback.hideLoading();
        this.feedback.showAlert(err.error.error);
        

      }
    });
   }

  ngOnInit() {
  }

}
