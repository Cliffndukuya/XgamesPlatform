import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private subscriptions : Subscription[] = [];
  loginForm = new FormGroup({
    user_email: new FormControl(),
    password: new FormControl()
  });


  constructor(private authService: AuthService,private toastr:ToastrService,private router:Router,private jwt :JwtService,private spinner: NgxSpinnerService) { }
 

  ngOnInit(): void {

    this.spinner.show();
    if(localStorage.getItem('token')!= null && localStorage.getItem('account') == "Admin")
    {
      this.router.navigateByUrl('/admin');
    }else if(localStorage.getItem('token')!= null && localStorage.getItem('account') == "User"){

      this.router.navigateByUrl('/user');
    }
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

  onLogin(form : FormGroup)
  {
    
    this.spinner.show();
        setTimeout(() => {
      /** spinner ends after 5 seconds */
        this.spinner.hide();
        }, 2000);

    this.subscriptions.push(
      this.authService.login(form.value).subscribe((data: any)=>{
        this.authService.saveToken(data.token);
        

        const {user_email,user_name,user_lastname,account,user_id} = this.jwt.getData(data.token);
        localStorage.setItem('account', account);
        localStorage.setItem('user_email', user_email);
        localStorage.setItem('user_lastname',user_lastname);
        localStorage.setItem('user_name',user_name);
        localStorage.setItem('user_id',user_id);

        if(account =="Admin") //route to relevent page
        {
          this.toastr.success("Welcome Admin ");
          console.log("Welcome Admin");
          this.router.navigateByUrl('/admin');
        }else if(this.jwt.getData(data.token).account == "User") //route to relevent page
        {
          this.toastr.success("Welcome "+user_name);
          this.router.navigateByUrl('/user');
        } 

    },(error:HttpErrorResponse)=>{
      this.toastr.error(error.error.message);
    })
    )    
  }

}