import { Component, OnInit } from '@angular/core';
import { UsersService} from '../../Servicios/login.services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  test : Date = new Date();
  focus: any;
  focus1: any ;

  email: string="";
  password: string="";
  constructor(public UsersService: UsersService,  public router: Router) { }

  ngOnInit(): void {
    this.checksessionStorage();  
  }
  
  checksessionStorage(){
    if(sessionStorage.getItem('email')){ // dashboard atleta
      this.router.navigateByUrl('/login');
    }else if(sessionStorage.getItem('email')){ // dashboard couch
      this.router.navigateByUrl('/login');
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  login() {
    const user = {email: this.email, password: this.password};
    this.UsersService.login(user).subscribe( data => {
      if(data.text=='Sesión Iniciada, Correctamente.'){
        sessionStorage.setItem("email",this.email);
        sessionStorage.setItem("password",this.password);
        sessionStorage.setItem("id_usuario", data.id_usuario)
        alert(data.text);
        this.router.navigateByUrl('/Catalogo');
      }
      else{
        alert(data.text);
      }
        
    });
  }
  


}
