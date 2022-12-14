import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

 name :string | undefined;
  lastname :string | undefined;
  password ?:string;
  account ?:string;
  user_id ?:string;
  constructor(private userService:UserService,private authService: AuthService, private router: Router,private toastr: ToastrService ,private jwt:JwtService,private spinner:NgxSpinnerService, private http:HttpClient) { }
  isUpdating: boolean = false;

  ngOnInit(): void {

    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    this.user_id=this.jwt.getData(JSON.stringify(localStorage.getItem('user_id')));
    this.name=this.jwt.getData(JSON.stringify(localStorage.getItem('user_name')));
    this.lastname=this.jwt.getData(JSON.stringify(localStorage.getItem('user_lastname')));
    this.password=this.jwt.getData(JSON.stringify(localStorage.getItem('password')));

  }

  pInfoForm = new FormGroup({
    user_name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    user_lastname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    password: new FormControl(),
    confimPassword: new FormControl(),
  });

  shipInfoForm = new FormGroup({
    address1: new FormControl(''),
    address2: new FormControl(''),
    city: new FormControl(''),
    zipCode: new FormControl(),
  });

  toggleUpdate() {
    if(this.isUpdating)
    {
      this.isUpdating = false;
    }else{
      this.isUpdating = true;
    }

  }

  onUpdate(form: FormGroup)
  {
    if(form.valid){
      if(form.value.confirmPassword == form.value.password)
      {
        this.userService.updateProfile(this.user_id, form.value).subscribe((data:any)=>{
          this.toastr.success(data.message);
          if(this.account == 'Admin')
          {
            this.router.navigateByUrl('/admin');
          }else
          {
            this.router.navigateByUrl('/user');
    
          }
        },(err:HttpErrorResponse)=>{
          this.toastr.error(err.error.message);
          
        })

      }else{
        this.toastr.warning('Passwords do not match');
      }

    }
    
    
  }
    
    
   
  

}
