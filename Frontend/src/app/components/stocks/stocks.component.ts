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
  id:any;
  postId : any;
  postTitle:any;
  postDesc:any;
  postPrice:any;
  postimg:any;
  leftgm:any;
  
  isLoggedIn : boolean = false;
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
  
  addForm= new FormGroup({
    title: new FormControl(),
    price: new FormControl(),
    desc: new FormControl(),
    image: new FormControl(),
    quantity: new FormControl(),
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


  setDetails(id:any,post_title:any,post_desc:any,post_price:any){
    this.postId = id;
    this.postTitle = post_title;
    this.postDesc = post_desc;
    this.postPrice = post_price;
  }



data ={
status: '',
post_id: ''
}


  getPosts(postTitle:any,   postId : any, postPrice:any,  postimg:any, leftgm:any){

    localStorage.setItem('post_title', postTitle),
    localStorage.setItem('post_price', postPrice),
    localStorage.setItem('post_image', postimg),
    localStorage.setItem('post_id', postId),
    localStorage.setItem('post_quantity',leftgm)
  }


}
