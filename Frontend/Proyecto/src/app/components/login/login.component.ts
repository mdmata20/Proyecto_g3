import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  test : Date = new Date();
  focus: any;
  focus1: any ;


  constructor() { }

  ngOnInit(): void {
  }

}
