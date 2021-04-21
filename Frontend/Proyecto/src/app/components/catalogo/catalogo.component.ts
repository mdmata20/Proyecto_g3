import { Component, OnInit, HostBinding } from '@angular/core';

import { CatalogoService  } from '../../servicese/catalogo.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  catalogo: any = [];

  constructor(private catalogoServices: CatalogoService) {
    /*this.catalogoServices.getCatalogo1().subscribe(resp =>{
      console.log(resp)
    })*/
    this.catalogo = [];
   }

  ngOnInit(): void {
    this.catalogoServices.getCatalogo().subscribe(
      res => {
        let temp: any = res;
        
        //@ts-ignore
        temp.forEach(element => {
          let exist = false;
          //@ts-ignore
          this.catalogo.forEach(catTemp => {
             if(catTemp.name == element.name) exist = true;
            if(catTemp.name == element.name && !catTemp.languages.includes(element.descripcion))
            {
              catTemp.languages = catTemp.languages +", "+ element.descripcion;
              exist = true;
            }
            if(catTemp.name == element.name && !catTemp.availabilities.includes(element.Plan))
            {
              catTemp.availabilities = catTemp.availabilities +", "+ element.Plan;
              exist = true;
            }
          });
          if(!exist)
          {
            let temporalsito = {
              name: element.name,
              availabilities: element.Plan,
              languages: element.descripcion,
              Disponibilidad: true,
              Precio: element.ChargeRate,
              image: element.image == 'URL'? 'https://firebasestorage.googleapis.com/v0/b/wannan-1b398.appspot.com/o/halo-infinite-202072216173826_2.jpg?alt=media&token=ae41a99e-2fbf-4e38-8f61-e2d977a45d6f': element.image
            }
            this.catalogo.push(temporalsito)
          }
        });
        
      },  
      err => console.error(err)
    )
  }

}
