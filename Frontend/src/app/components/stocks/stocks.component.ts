import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  constructor(private userService : UserService, private auth :AuthService,private toastr: ToastrService, private router:Router) { }

  posts: any;
  id : any;
  postId : any;
  postTitle:any;
  postDesc:any;
  postPrice:any;
  
  isLoggedIn : boolean = false;
  ngOnInit(): void {
    this.id = setInterval(() => {
      this.refresh(); 
    }, 100);
  }

  refresh()
  {
    if(localStorage.getItem('token')!=null)
    {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn','yes');
    }
    
  }
  
  addForm= new FormGroup({
    title: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    image: new FormControl(),
  });

  onSubmit(form: FormGroup) {

    //console.log(localStorage.getItem('user_id'));
    this.userService.createPost(form.value).subscribe((data:any) =>{
      
      this.toastr.success(data.message);

    },(err: HttpErrorResponse)=>{

      this.toastr.error(err.error.message);


    })
    this.addForm.reset();
  }



}
