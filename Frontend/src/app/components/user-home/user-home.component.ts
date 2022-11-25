import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {


  constructor(private spinner:NgxSpinnerService,private userService : UserService,private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(['path/to'])
     .then(() => {
       window.location.reload();
     });

    this.spinner.show();
     setTimeout(() => {
       /** spinner ends after 5 seconds */
      
      this.router.navigate(['path/to'])
       .then(() => {
         window.location.reload();
       });
       this.spinner.hide();
     }, 1000);

  }

}
