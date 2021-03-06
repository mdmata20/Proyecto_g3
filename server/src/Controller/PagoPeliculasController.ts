import { Request, Response, request } from 'express';

import pool from '../database';

const request2 = require("request");

class PagoPeliculasController {

    index(req: Request, res: Response) {
        pool.query('DESCRIBE usuario');
        res.json('usuario');
    }

    // METODOS PARA LA BASE DE DATOS 
    public async RegistrarPago(req: Request, res: Response): Promise<void> {
        var body = (req.body)
        var Moneda_Pagar = body.alquiler;
        var Fk_Alquiler = body.Num_Tarjeta;
        var Num_Tarjeta = body.Fecha;
        var Fecha_Expiracion = body.Codigo;
        var Codigo_Verificacion = body.Apagar;
        var Monto_Pagar = body.Moneda;

        console.log(Fk_Alquiler);
        console.log(Num_Tarjeta);
        console.log(Fecha_Expiracion);
        console.log(Codigo_Verificacion);
        console.log(Monto_Pagar);
        console.log(Moneda_Pagar);

        const resp = await pool.query('insert into Pago_Pelicula (alquiler, Numero_tarjeta_credito, Fecha_expiracion , Codigo_verificacion, Monto_apagar, Modena_apagar) values (?,?,?,?,?,?)', [Fk_Alquiler,Num_Tarjeta, Fecha_Expiracion, Codigo_Verificacion, Monto_Pagar, Moneda_Pagar],
        (err1, res2) => {
            if (err1) {
                console.log("error: ", err1);
                res.status(400).json({
                    status:"Bad",
                    message:"Errorsito",
                });
            }
            res.json(res2);
        });
       
    }

    public async TotalAlquilado(req: Request, res: Response): Promise<any> {
        var body = (req.body);
        var Id_Usuario = body.Id_Usuario;
        var Id_Alquiler = body.Id_Alquiler;

        console.log(Id_Usuario);
        console.log(String(Id_Alquiler));
        const resp = await pool.query('select sum(ChargeRate) as suma from Movie as m join Pelicula_Alquilada as pa on pa.movie = m.id_Movie join Alquiler as al on al.id_alquiler = pa.alquiler and al.id_alquiler = ? join Usuario as u on u.id_usuario = ?', [Id_Alquiler, Id_Usuario],
        (err1, res2) => {
            if (err1) {
                console.log("error: ", err1);
                res.status(400).json({
                    status:"Bad",
                    message:"Errorsito",
                });
            }
            console.log(res2)
            res.json(res2[0].suma);
        });
        //const resp = await pool.query('select sum(ChargeRate) as suma from Movie as m join Pelicula_Alquilada as pa on pa.movie = m.id_Movie join Alquiler as al on al.id_alquiler = pa.alquiler and al.id_alquiler = ?', [Id_Alquiler]);
        //const resp = await pool.query('select sum(ChargeRate) as suma from Movie as m join Pelicula_Alquilada as pa on pa.movie = m.id_Movie join Usuario as u  on u.id_usuario = ?', [Id_Usuario]);
       
    }

    public async TipodeCambio(req: Request, res: Response): Promise<any> {
        const respuesta = await pool.query('select total from ExchangeRate',
        (err1, res2) => {
            if (err1) {
                console.log("error: ", err1);
                res.status(400).json({
                    status:"Bad",
                    message:"Errorsito",
                });
            }
            console.log(res2[0]);
            res.json(res2[0].total);
        }
        );
       
        
    }

}

const pagopeliculas = new PagoPeliculasController();
export default pagopeliculas;