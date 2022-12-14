import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  posts: any;
  id:any;
  postId : any;
  postTitle:any;
  postDesc:any;
  postPrice:any;
  postimg:any;
  leftgm:any;

  constructor(private userService : UserService, private auth :AuthService,private toastr: ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.id = setInterval(() => {
      this.refresh(); 
    }, 100);
  }

  refresh()
  {
    this.userService.getPosts().subscribe((data: any) => {
      this.posts = data;
      console.log(this.posts)
    },(err : HttpErrorResponse) =>{

    })
    
    
  }
  setDetails(id:any,post_title:any,post_desc:any,post_price:any){
    this.postId = id;
    this.postTitle = post_title;
    this.postDesc = post_desc;
    this.postPrice = post_price;
  }
  viewPost(){
    this.postId=localStorage.getItem('post_id');
    this.postTitle = localStorage.getItem('post_title');
    this.postDesc = localStorage.getItem('post_desc');
    this.postPrice =localStorage.getItem('post_price');
  }
  getPosts(postTitle:any,   postId : any, postPrice:any,  postimg:any, leftgm:any){

    localStorage.setItem('post_title', postTitle),
    localStorage.setItem('post_price', postPrice),
    localStorage.setItem('post_image', postimg),
    localStorage.setItem('post_id', postId),
    localStorage.setItem('post_quantity',leftgm)
  }

  buyForm=new FormGroup({
    num:new FormControl(),
  });

  onSubmit(form: FormGroup){
    this.userService.createPost(form.value).subscribe((data:any) =>{
      
      
      this.toastr.success(data.message);

    },(err: HttpErrorResponse)=>{

      this.toastr.error(err.error.message);


    })
    this.buyForm.reset();
  }


}
