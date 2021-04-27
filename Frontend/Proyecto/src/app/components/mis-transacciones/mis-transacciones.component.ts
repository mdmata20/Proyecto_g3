import { Component, OnInit } from '@angular/core';
import { RegistroUsuarioService } from '../../Servicios/registro-usuario.service';

@Component({
  selector: 'app-mis-transacciones',
  templateUrl: './mis-transacciones.component.html',
  styleUrls: ['./mis-transacciones.component.scss']
})
export class MisTransaccionesComponent implements OnInit {

  AlquileresPeli: any=[];
  PagosPeli: any=[];
  id :number=0;
  
  constructor(
    private Transaccion:RegistroUsuarioService
  ) { }

  ngOnInit(): void {

    const Id_User = sessionStorage.getItem("id_usuario");
console.log("ID--> ",Id_User)
    this.Transaccion.Get_MiDetalleAlquilerPeli(Id_User).subscribe(
      res => {
        this.AlquileresPeli = res;
        console.log("Todo-->",this.AlquileresPeli)
      },
      err => console.error(err)
    );
    
    
    this.Transaccion.Get_MiDetallePagoPeli(Id_User).subscribe(
      res => {
        this.PagosPeli = res;
      },
      err => console.error(err)
    );
    
  }

  }


