import { Component, OnInit } from '@angular/core';
import { SerciviosPagoService } from "../../ServicioP/sercivios-pago.service";
import { Router } from "@angular/router";
import { AquilerService } from "../../Servicios/aquiler.service";

@Component({
  selector: 'app-pago-peliculas',
  templateUrl: './pago-peliculas.component.html',
  styleUrls: ['./pago-peliculas.component.scss']
})
export class PagoPeliculasComponent implements OnInit {

  constructor(private Servicios: SerciviosPagoService, private router: Router,
    private Alquiler: AquilerService) { }

  ngOnInit(): void {
    this.checksessionStorage();
    this.GetTotalDolares();

  }

  Id_Usuario: number = 0;
  Num_Tarjeta: string = "";
  FechaVencimiento: string = "";
  CodigoVerficacion: string = "";
  Nombre_Tarjeta: string = "";
  Moneda1: string = "";
  Moneda2: string = "";
  Id_Alquiler: string = "";
  Total: string = "";
  TotalQuezal: string = "";
  TipoCambio: string = "";
  TotalEnvio: string = "";
  MostrarTarjeta: string = "";
  tarjeta: string = "";
  isOn = false;

  Var_Verficador: boolean = false;
  Var_GetDatos: boolean = false;
  Var_CapturarMoneda: boolean = false;
  Var_Dolares: boolean = false;
  Var_Salida: boolean = false;
  ID_Movies: number[] = [];

  CapturarMoneda() {
    this.Moneda1 = this.Moneda2;
    if (this.Moneda1 == "1") {
      this.Total = "Q." + this.TotalQuezal;
      this.TotalEnvio = this.TotalQuezal;
      this.Var_CapturarMoneda = true;
    } else {
      var Temp_total = parseInt(this.TotalQuezal);
      var temp_Cambio = parseInt(this.TipoCambio);
      var resultado = temp_Cambio * Temp_total;
      this.Total = "$." + resultado.toString();
      this.TotalEnvio = resultado.toString();
      this.Var_CapturarMoneda = true;
    }
    console.log(this.Moneda1)
    return this.Var_CapturarMoneda;
  }


  Verificardor() {
    this.Servicios.InsertarPago(this.Id_Alquiler, this.tarjeta, this.FechaVencimiento,
      this.CodigoVerficacion, this.TotalEnvio, this.Moneda1).subscribe((res: any) => {
        if (res != null) {
          alert("Compra Realizada correctamente ");
          this.Var_Verficador = true;
        } else {
          alert("Transaccion Incorrecta");
        }

      })


    this.router.navigateByUrl("/Catalogo");
    return this.Var_Verficador;
  }

  GetTotal() {
    this.MostrarTarjeta = this.Num_Tarjeta.substring(5, 13);
    this.tarjeta = "XXXX" + this.MostrarTarjeta + "XXXX";

    this.Id_Alquiler = this.Alquiler.Temp_Id_Alquier;
    this.ID_Movies = this.Alquiler.ID_Movies;

    if (this.tarjeta.length == 16 && this.FechaVencimiento.length == 5 && this.CodigoVerficacion.length == 3) {
      this.Servicios.MostrarPagos(this.Id_Alquiler, String(sessionStorage.getItem('id_usuario')))
        .subscribe((res: any) => {
          if (res != null) {
            this.Total = "Q." + res;
            this.TotalQuezal = res;
            alert("Si tiene Dinero Disponible en la Tarjeta");
            this.Var_GetDatos = true;
          } else {
            alert("No tiene Dinero Disponible en la Tarjeta");
          }

        })
    } else {
      alert("Ingrese los datos Correctos");
    }
    return this.Var_GetDatos;
  }

  GetTotalDolares() {
    this.Servicios.getCambio().subscribe((res: any) => {
      this.TipoCambio = res;
    })
    return true;
  }


  checksessionStorage() {
    if (sessionStorage.getItem('id_usuario') == null) { // dashboard atleta
      this.router.navigateByUrl('/login');
    }
  }

  Salir() {

    this.Alquiler.eliminar_alquiler(this.Id_Alquiler).subscribe((res: any) => {
    });
    this.Alquiler.eliminar_pelicula(this.Id_Alquiler).subscribe((res: any) => {
    });

    for (var i = 0; i <= this.ID_Movies.length; i++) {
      var temp = this.ID_Movies[i];
      this.Alquiler.desabilitar_pelicula(temp, true);
    }

    this.router.navigateByUrl('/Catalogo');
  }


}
