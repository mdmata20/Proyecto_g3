import {Request, Response } from 'express';
import pool   from '../database';

class AlquilerController {

    public async createAlquiler (req: Request, res: Response): Promise<void> {

        try{

            console.log(req.body);
            await pool.query('INSERT INTO Alquiler set ?', [req.body]);
            res.json({message: 'Se creo un Alquiler'});

        }catch(e){
            //console.log('ERROR EN REGISTRAR:',e)
            res.status(400).json({
                status:"Bad",
                message:""+e,
            });
        }
    }

    public async createAlquilado (req: Request, res: Response): Promise<void> {

        try{

            console.log(req.body);
            await pool.query('INSERT INTO Pelicula_Alquilada set ?', [req.body]);
            res.json({message: 'Se alquilo una Pelicula'});

        }catch(e){
            //console.log('ERROR EN REGISTRAR:',e)
            res.status(400).json({
                status:"Bad",
                message:""+e,
            });
        }
    }
}

const alquilerController = new AlquilerController();
export default alquilerController;