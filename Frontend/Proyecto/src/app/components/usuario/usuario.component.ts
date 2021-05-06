import { Component, OnInit , ElementRef} from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UsersService} from '../../Servicios/login.services';
import { Router } from '@angular/router';
import swal from'sweetalert2';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})


export class UsuarioComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  id_user: any;

  /*CARACTERISTICAS USUARIO*/
  txtu:any;
  txtc:any;
  txtp:any;
  txtn:any;
  txta:any;
  txtd:any;
  txte:any;

  constructor(public UsersService: UsersService, public router: Router,public location: Location, private element : ElementRef) { 
    this.sidebarVisible = false;
  }

  ngOnInit(): void {
    this.checksessionStorage();
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

  }

  checksessionStorage(){
    if(sessionStorage.getItem('id_usuario') == null){ // dashboard atleta
      this.router.navigateByUrl('/login');
    }
    this.getuser();
  }

  guardar(){
    //id_usuario,iusuario, icorreo, ipassword, inombre, iapellido, idpi, iedad
    const caracteristicas = {id_usuario: sessionStorage.getItem('id_usuario'), iusuario:this.txtu, icorreo: this.txtc, ipassword: this.txtp, inombre: this.txtn, iapellido: this.txta, idpi: this.txtd, iedad: this.txte};
    this.UsersService.updateuser(caracteristicas).subscribe( data => {
      if(data=='ok'){
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cambios Guardados Correctamente.',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else{
        swal.fire({
            position: 'top-end',
            icon: 'error',
            title: data,
            showConfirmButton: false,
            timer: 1500
          })
      }
        
    });
  }
  
  getuser() {
    this.id_user=sessionStorage.getItem("id_usuario")
    this.UsersService.getuser({id_usuario:this.id_user}).subscribe( data => {
      if(data.text=='caracteristicas'){
        this.txtu= data.usuario[0].Usuario;
        this.txtc= data.usuario[0].Correo;
        this.txtp= data.usuario[0].Contraseña;
        this.txtn= data.usuario[0].Nombres;
        this.txta= data.usuario[0].Apellidos;
        this.txtd= data.usuario[0].DPI;
        this.txte= data.usuario[0].Edad;
      }
      else{
        swal.fire({
            position: 'top-end',
            icon: 'error',
            title: data,
            showConfirmButton: false,
            timer: 1500
          })
      }
        
    });
  }
/*
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    // console.log(toggleButton, 'toggle');

    setTimeout(function(){
        toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
};

sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
};

sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
        this.sidebarOpen();
    } else {
        this.sidebarClose();
    }
};

isHome() {
  var titlee = this.location.prepareExternalUrl(this.location.path());
  if(titlee.charAt(0) === '#'){
      titlee = titlee.slice( 1 );
  }
    if( titlee === '/home' ) {
        return true;
    }
    else {
        return false;
    }
}
isDocumentation() {
  var titlee = this.location.prepareExternalUrl(this.location.path());
  if(titlee.charAt(0) === '#'){
      titlee = titlee.slice( 1 );
  }
    if( titlee === '/documentation' ) {
        return true;
    }
    else {
        return false;
    }
}
*/

}
