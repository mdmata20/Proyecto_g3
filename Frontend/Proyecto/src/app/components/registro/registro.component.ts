import { Component, OnInit } from '@angular/core';

import { RegistroUsuarioService } from '../../Servicios/registro-usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  focus: any;
  focus1: any ;

  usuario={//es un objeto
    nombres:"",
    apellidos:"",
    usuario:"",
    edad:0,
    dpi:0,
    correo:"",
    contrasena:""    
    
  }

  constructor(private registrarservice: RegistroUsuarioService) { }

  ngOnInit(): void {
  }

  RegistroUsuario(){

    this.registrarservice.registrar_usuario(this.usuario.nombres,this.usuario.apellidos,
      this.usuario.usuario,this.usuario.edad,this.usuario.dpi,this.usuario.correo,this.usuario.contrasena)
      
      .subscribe(
        res=>{
          alert(" \"MENSAJE\": \n"+" El usuario se registro con exito.")
          console.log(res);
        },
        err =>{
          alert(" \"DATOS INCORRECTOS\": \n"+" "+err.error.status)
          console.log("ERROR: ",err.error.status);
        }
      )

  }

}
