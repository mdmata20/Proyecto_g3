import { Component, OnInit } from '@angular/core';
import { DetalleAlquilerInterface,DetallePagoInterface } from '../../models/Catalogo';
import { RegistroUsuarioService } from '../../Servicios/registro-usuario.service';

@Component({
  selector: 'app-usuario-admin',
  templateUrl: './usuario-admin.component.html',
  styleUrls: ['./usuario-admin.component.scss']
})
export class UsuarioAdminComponent implements OnInit {

  AlquileresPeli: any=[];
  PagosPeli: any=[];

  constructor(private Transaccion:RegistroUsuarioService) { }

  ngOnInit(): void {

    this.Transaccion.Get_DetalleAlquilerPeli().subscribe(
      res => {
        this.AlquileresPeli = res;
      },
      err => console.error(err)
    );
    
    
    this.Transaccion.Get_DetallePagoPeli().subscribe(
      res => {
        this.PagosPeli = res;
      },
      err => console.error(err)
    );
    
  }

  

}
