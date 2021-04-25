import { Component, OnInit } from '@angular/core';
import { SerciviosPagoService } from "../../ServicioP/sercivios-pago.service";
import { Router } from "@angular/router";
import { AquilerService } from "../../Servicios/aquiler.service";
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-pago-peliculas',
  templateUrl: './pago-peliculas.component.html',
  styleUrls: ['./pago-peliculas.component.scss']
})
export class PagoPeliculasComponent implements OnInit {

  constructor(public Servicios: SerciviosPagoService, public router: Router,
    public Alquiler:AquilerService) { }

  ngOnInit(): void {
    //this.Id_Alquiler = this.Alquiler.Id_Alquier;
    //console.log("---->" +this.Id_Alquiler);
    
    this.GetTotalDolares();
    //this.GetTotal();
  }

  Id_Usuario:number = 0;
  Num_Tarjeta:string = "";
  Num_Num:number=0;
  Nombre_Tarjeta: string = "";
  FechaVencimiento: string = "";
  CodigoVerficacion: string = "";
  Monto:string ="";
  Moneda1:string ="";
  Moneda2:string ="";
  Id_Alquiler:string ="";
  Monedita:string ="";
  Total:string ="";
  TotalQuezal:string  ="";
  TipoCambio:string  ="";
  TotalEnvio:string ="";
  MostrarTarjeta:string ="";
  tarjeta:string ="";

  CapturarMoneda(){
    this.Moneda1 = this.Moneda2;

    if(this.Moneda1 == "1"){
      this.Total = "Q." +this.TotalQuezal;
      this.TotalEnvio = this.TotalQuezal;
    }else{
     var Temp_total = parseInt(this.TotalQuezal);
     var temp_Cambio = parseInt(this.TipoCambio);
     var resultado = temp_Cambio * Temp_total;
     this.Total = "$." +resultado.toString();
     this.TotalEnvio = resultado.toString();
     console.log(resultado);
    }
    console.log(this.Moneda1)
  }

  Verificardor(){
    console.log(this.tarjeta.length);
    console.log(this.FechaVencimiento.length);
    console.log(this.CodigoVerficacion.length);

    if(this.tarjeta.length == 16 && this.FechaVencimiento.length ==5 && this.CodigoVerficacion.length == 3){
      this.Servicios.InsertarPago(this.Id_Alquiler,this.tarjeta, this.FechaVencimiento, 
        this.CodigoVerficacion, this.TotalEnvio, this.Moneda1).subscribe((res:any)=>{
          console.log(res);
          if (res!= null){
            alert("Compra Realizada correctamente ");
          }else{
            alert("Transaccion Incorrecta");
          }
          
      })
    } 
    
  }

  GetTotal(){
    this.MostrarTarjeta = this.Num_Tarjeta.substring(5, 13);
    this.tarjeta = "XXXX"+this.MostrarTarjeta+"XXXX";
    console.log(this.tarjeta);

    this.Id_Alquiler = this.Alquiler.Temp_Id_Alquier;
    
    this.Servicios.MostrarPagos(this.Id_Alquiler, String(sessionStorage.getItem('id_usuario')))
    .subscribe((res:any)=>{
      console.log(res);
      if (res != null){
        this.Total = "Q." + res;
        this.TotalQuezal = res;
        alert("Si tiene Dinero Disponible en la Tarjeta");
      }else{
        alert("No tiene Dinero Disponible en la Tarjeta");
      }
      
    })
  
  }

  GetTotalDolares(){
    this.Servicios.getCambio().subscribe((res:any)=>{
      console.log(res);
      this.TipoCambio = res;
    })
  }

}
