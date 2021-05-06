import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../Servicios/login.services';
import swal from'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  authError = false;
  authErrorMsg: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: UsersService
  ) {

  }

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  ngOnInit() {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(loginData) {

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    
    const userloginBody = {
      email: loginData.email,
      password: loginData.password
    };


    // Pending API call and logic handling
    this.loginService.login(userloginBody)
      .then((data) => {
        if(data.text=='Sesión Iniciada, Correctamente.'){
          /*swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.text,
            showConfirmButton: false,
            timer: 1500
          })*/
          sessionStorage.setItem("email",userloginBody.email);
          sessionStorage.setItem("password",userloginBody.password);
          sessionStorage.setItem("id_usuario", data.id_usuario)
          this.router.navigateByUrl('/Catalogo');

        }
        else{
          swal.fire({
              position: 'top-end',
              icon: 'error',
              title: data.text,
              showConfirmButton: false,
              timer: 1500
            })
        }
      })
      .catch((reason) => {
        // Failed login
        this.authError = true;
        this.authErrorMsg = reason;
      });

  
  }

  Registro(){
    this.router.navigateByUrl('/registro');
  }
  
}
