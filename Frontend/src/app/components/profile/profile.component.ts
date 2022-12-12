import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

}
