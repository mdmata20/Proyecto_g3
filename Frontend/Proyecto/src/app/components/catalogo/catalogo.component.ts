import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogoService } from '../../servicese/catalogo.service';
import { AquilerService } from '../../Servicios/aquiler.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  catalogo: any = [];
  alphaString: string = "";

  alquileres:number[] = [];

  ID_ALQUILER:string ="";

  constructor(private registraralquiler: AquilerService, private catalogoServices: CatalogoService,  public router: Router) {
    /*this.catalogoServices.getCatalogo1().subscribe(resp =>{
      console.log(resp)
    })*/
    this.catalogo = [];
    this.alquileres = [];
    this.alphaString = this.randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
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
              id: element.id_Movie,
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
     
    )

    this.checksessionStorage();
  }

  checksessionStorage(){
    if(sessionStorage.getItem('id_usuario') == null){ // dashboard atleta
      this.router.navigateByUrl('/login');
    }
  }

  alquilarMovie(id: string,event: any) {
    this.ID_ALQUILER = this.alphaString;
    if(event){
      event.target.hidden = true;
      //event.explicitOriginalTarget.nextSibling.hidden = false;
      event.target.nextSibling.hidden = false;
    }
    this.alquileres.push(Number(id));

  }

  noAlquilarMovie(id: string,event: any) {
    if(event){
      event.target.hidden = true;
      //event.explicitOriginalTarget.previousSibling.hidden = false;
      event.target.previousSibling.hidden = false;
    }
    
    for( var i = 0; i < this.alquileres.length; i++){ 
                                   
      if ( this.alquileres[i].toString() === id) { 
          this.alquileres.splice(i, 1); 
          i--; 
      }
    }
  }

  randomString(length:number, chars: string) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  almacenarDatos(){

    this.registraralquiler.registrar_alquiler(this.alphaString, Number(sessionStorage.getItem('id_usuario')))
    .subscribe(
     
      res=>{
        console.log("->aa"+res);
      }
    )

    for (let index = 0; index < this.alquileres.length; index++) {
      const element = this.alquileres[index];
      this.registraralquiler.registrar_pelicula(this.alphaString, element, Number(sessionStorage.getItem('id_usuario')))
      .subscribe(
      
        res=>{
          console.log(res);
        }
      )

      this.registraralquiler.desabilitar_pelicula(element, false)
      .subscribe(
        
        res=>{
          console.log(res);
        }
      )
    }

    this.router.navigateByUrl('/pagopeliculas');
  }
}
