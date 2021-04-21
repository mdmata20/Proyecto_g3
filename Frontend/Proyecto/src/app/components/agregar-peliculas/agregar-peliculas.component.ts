import { Component, OnInit, HostBinding } from '@angular/core';
import { Catalogo } from 'src/app/models/Catalogo';
import { CatalogoService } from 'src/app/servicese/catalogo.service';


@Component({
  selector: 'app-agregar-peliculas',
  templateUrl: './agregar-peliculas.component.html',
  styleUrls: ['./agregar-peliculas.component.scss']
})
export class AgregarPeliculasComponent implements OnInit {

  @HostBinding('class') classes = 'row'; 

  catalo: Catalogo = {
    id_Movie: 0,
    name: '',
    image: '',
    ChargeRate: 0,
    active: '',
    availabilities: 0,
    languages: 0
  };

  constructor(private calatalogServices: CatalogoService) { }

  ngOnInit(): void {
  }

  saveCatalogoNew(){
    this.calatalogServices.saveCatalogo(this.catalo)
    .subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )
  }

}
