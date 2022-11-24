import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,private toastr: ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }
  private subscriptions : Subscription[] = [];
  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confimPassword: new FormControl(''),
  });
 

  onRegister(form : FormGroup)
  {
    if(form.valid)
    {
      if(form.value.confirmPassword == form.value.password)
      {
        this.subscriptions.push(
          this.authService.register(form.value).subscribe((response:any)=>{
            this.router.navigateByUrl('/login');
            this.toastr.success("Welcometo Dev.com "+form.value.name+"!");
          },(error:HttpErrorResponse)=>{
            this.toastr.error(JSON.stringify(error.error.message));
            console.log(error)
          })
        )
      }else{
        this.toastr.warning("Passwords do not match");
      }
    }
  }


}
