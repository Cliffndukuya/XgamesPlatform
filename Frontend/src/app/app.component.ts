import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'XGames';
  isLoggedIn : boolean = false;
  id:any
  constructor(){}

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


}