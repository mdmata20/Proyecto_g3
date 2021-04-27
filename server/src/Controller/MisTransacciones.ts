
import {Request, Response } from 'express';
import pool   from '../database';

class MisTransacciones {


  public async GetAlquileres (req: Request, res: Response){

    try {
      var body = (req.body);
      var Id_Usuario = body.Id_Usuario;

      const CatalogoPeliculas = 
        await pool.query(
          "select \"Alquiler\" as Transaccion,usu.Nombres,usu.Apellidos,usu.DPI,usu.Correo,mov.name,\
          mov.ChargeRate\
          from Alquiler al,Pelicula_Alquilada pa,Movie mov,usuario usu\
          where usu.id_usuario= ? and al.usuario=usu.id_usuario and pa.movie=mov.id_movie and pa.alquiler=al.id_alquiler ;",[Id_Usuario]);
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
      
      var body = (req.body);
      var Id_Usuario = body.Id_Usuario;

      const CatalogoPeliculas = 
        await pool.query(
          "select \"Pago\" as Transaccion,usu.Nombres,usu.Apellidos,usu.DPI,usu.Correo,mov.name,\
          pp.Fecha_expiracion,pp.Monto_apagar,pp.Modena_apagar\
          from usuario usu,Pago_Pelicula pp,Movie mov,Alquiler al,Pelicula_Alquilada pa\
          where usu.id_usuario= ? and pp.alquiler=al.id_alquiler and al.usuario=usu.id_usuario and\
           pa.movie=mov.id_movie and pa.alquiler=al.id_alquiler ;",[Id_Usuario]);
        res.json(CatalogoPeliculas).status(200);

    } catch (e) {
      
      res.status(400).json({
        status:"Bad",
        message:""+e,
    });

    }


  }


}


const misTransacciones = new MisTransacciones();
export default misTransacciones;