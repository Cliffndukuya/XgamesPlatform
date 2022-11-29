import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navba',
  templateUrl: './navba.component.html',
  styleUrls: ['./navba.component.scss']
})
export class NavbaComponent implements OnInit {

  constructor(private router : Router) { }

  name : any = 'Hello World'
  isLoggedIn : boolean = false;
  id : any;
  dashboardRoute : string = '';
  image :any;

  ngOnInit(): void {
  }

  logout()
  {
    localStorage.clear();
    this.isLoggedIn = false;
    clearInterval(this.id);
    localStorage.setItem('isLoggedIn','no');
    this.router.navigateByUrl('/homepage');
  }

}
