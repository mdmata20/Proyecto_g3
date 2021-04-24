import {Request, Response } from 'express';
import pool   from '../database';

class UsuarioAdmin {


  public async GetAlquileres (req: Request, res: Response){

    try {
      
      const CatalogoPeliculas = 
        await pool.query(
          "select \"Alquiler\" as Transaccion,usu.Nombres,usu.Apellidos,usu.DPI,usu.Correo,mov.name,\
          mov.ChargeRate\
          from Alquiler al,Pelicula_Alquilada pa,Movie mov,usuario usu\
          where al.usuario=usu.id_usuario and pa.movie=mov.id_movie and pa.alquiler=al.id_alquiler ;");
        res.json(CatalogoPeliculas).status(200);

    } catch (e) {
      
      res.status(400).json({
        status:"Bad",
        message:""+e,
    });

    }


  }



  public async GetPagos (req: Request, res: Response){

    try {
      
      const CatalogoPeliculas = 
        await pool.query(
          "select \"Pago\" as Transaccion,usu.Nombres,usu.Apellidos,usu.DPI,usu.Correo,mov.name,\
          pp.Fecha_expiracion,pp.Monto_apagar,pp.Modena_apagar\
          from usuario usu,Pago_Pelicula pp,Movie mov,Alquiler al,Pelicula_Alquilada pa\
          where pp.alquiler=al.id_alquiler and al.usuario=usu.id_usuario and pa.movie=mov.id_movie and\ pa.alquiler=al.id_alquiler ;");
        res.json(CatalogoPeliculas).status(200);

    } catch (e) {
      
      res.status(400).json({
        status:"Bad",
        message:""+e,
    });

    }


  }


}


const usuarioAdmin = new UsuarioAdmin();
export default usuarioAdmin;