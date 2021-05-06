import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogoService } from '../../servicese/catalogo.service';
import Swal from'sweetalert2';

import { UsersService} from '../../Servicios/login.services';
import { HttpClient  } from '@angular/common/http';


@Component({
  selector: 'app-inventario-pelicula',
  templateUrl: './inventario-pelicula.component.html',
  styleUrls: ['./inventario-pelicula.component.scss']
})
export class InventarioPeliculaComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  catalogo: any = [];
  

  constructor(public UsersService: UsersService, private catalogoServices: CatalogoService,  public router: Router) {
  } 
  ngOnInit(): void {
    
    this.catalogoServices.Inventario().subscribe(
      res => { 
          let exist = false;
          //@ts-ignore
          let temp: any = res;
          //@ts-ignore
          temp.forEach(element => {
            if(!exist)
              {
                let temporalsito = {
                  id: element.id_Movie,
                  name: element.name,
                  Precio: element.ChargeRate,
                  image: element.image == 'URL'? 'https://firebasestorage.googleapis.com/v0/b/wannan-1b398.appspot.com/o/halo-infinite-202072216173826_2.jpg?alt=media&token=ae41a99e-2fbf-4e38-8f61-e2d977a45d6f': element.image,
                  usuario_actual: element.usuario_actual
                }
                this.catalogo.push(temporalsito);
              }
              //console.log(res);
          });
        },     
      err => console.log(err)
    );
/*
    var prueba=this.catalogoServices.Inventario2()
    .then((data) => {
      let exist = false;
      //@ts-ignore
      let temp: any = data;
      //@ts-ignore
      temp.forEach(element => {
        if(!exist)
          {
            let temporalsito = {
              id: element.id_Movie,
              name: element.name,
              Precio: element.ChargeRate,
              image: element.image == 'URL'? 'https://firebasestorage.googleapis.com/v0/b/wannan-1b398.appspot.com/o/halo-infinite-202072216173826_2.jpg?alt=media&token=ae41a99e-2fbf-4e38-8f61-e2d977a45d6f': element.image,
              usuario_actual: element.usuario_actual
            }
            this.catalogo.push(temporalsito);
          }
          //console.log(data);
      });
    })
    .catch((reason) => {
      //console.log(reason)
    });*/
      this.checksessionStorage();
  }

  transferir(id_pelicula: any){
    let contenido;
    var users="{"; 
    var _this = this;
    this.UsersService.getusers().subscribe( data => {
        contenido=data.usuarios;
        //console.log(contenido);

        contenido.forEach(function (value:any) {
          users+=`"${value.ID}":"${value.USUARIO}",`;
        }); 
    users = users.substring(0, users.length - 1);
    users+=`}`
    users= JSON.parse(users);
    Swal.fire({
      title: 'Elegi un Usuario para la Transferencia',
      input: 'select',
      inputOptions: {
        users
      },
      inputPlaceholder: 'Seleccione un Usuario',
      showCancelButton: true,
      inputValidator: function (value) {
        return new Promise(function (resolve: any, reject) {
          if (value !== '') {
            resolve();
          } else {
            resolve('Debe seleccionar un Usuario.');
          }
        });
      }
    }).then(function (result) {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          html: 'Se transfirio la Pelicula al Usuario: ' + result.value
        });
        let contenedor = document.getElementById(id_pelicula);
        contenedor?.parentNode?.removeChild(contenedor);

        const new_alquiler = {new_user: `${result.value}`,id_pelicula: `${id_pelicula}`,current_user: `${sessionStorage.getItem('id_usuario')}`};
        _this.UsersService.updatemovie(new_alquiler).subscribe( data => {
          console.log(data);
        }); 
    
      }
    });
    });
  }
  
  checksessionStorage(){
    if(sessionStorage.getItem('id_usuario') == null){ // dashboard atleta
      this.router.navigateByUrl('/login');
    }
  }
}
