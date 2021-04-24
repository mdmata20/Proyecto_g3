import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogoService } from '../../servicese/catalogo.service';

@Component({
  selector: 'app-inventario-pelicula',
  templateUrl: './inventario-pelicula.component.html',
  styleUrls: ['./inventario-pelicula.component.scss']
})
export class InventarioPeliculaComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  catalogo: any = [];

  

  constructor(private catalogoServices: CatalogoService,  public router: Router) {}

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
                  image: element.image == 'URL'? 'https://firebasestorage.googleapis.com/v0/b/wannan-1b398.appspot.com/o/halo-infinite-202072216173826_2.jpg?alt=media&token=ae41a99e-2fbf-4e38-8f61-e2d977a45d6f': element.image
                }
                this.catalogo.push(temporalsito)
              }
              console.log(res);
          });
        },     
      err => console.log(err)
    );
      this.checksessionStorage();
  }
  checksessionStorage(){
    if(sessionStorage.getItem('id_usuario') == null){ // dashboard atleta
      this.router.navigateByUrl('/login');
    }
  }


}
