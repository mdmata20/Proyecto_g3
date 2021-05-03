import {Request, Response } from 'express';
import pool   from '../database';

class AlquilerController {

    public async createAlquiler (req: Request, res: Response): Promise<void> {
        

        try{

            console.log(req.body);
            await pool.query('INSERT INTO Alquiler set ?', [req.body],
            (err1, res2) => {
                if (err1) {
                    console.log("error: ", err1);
                    res.status(400).json({
                        status:"Bad",
                        message:"Errorsito",
                    });
                }
                res.json({message: 'Se creo un Alquiler'});
            });
           

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
            await pool.query('INSERT INTO Pelicula_Alquilada set ?', [req.body],
            (err1, res2) => {
                if (err1) {
                    console.log("error: ", err1);
                    res.status(400).json({
                        status:"Bad",
                        message:"Errorsito",
                    });
                }
                res.json({message: 'Se alquilo una Pelicula'});
            });
            

        }catch(e){
            //console.log('ERROR EN REGISTRAR:',e)
            res.status(400).json({
                status:"Bad",
                message:""+e,
            });
        }
    }

    public async deleteAlquiler (req: Request, res: Response): Promise<void>{
        const {id_alquiler} = req.params;
        await pool.query('DELETE From Alquiler where id_alquiler = ?',[id_alquiler]);
        res.json({text: 'Delete Alquiler'});
    }    

    public async deletePelicula (req: Request, res: Response): Promise<void>{
        const {id_alquiler} = req.params;
        await pool.query('DELETE From Pelicula_Alquilada where alquiler = ?',[id_alquiler]);
        res.json({text: 'Delete Pelicula'});
    }    
}

const alquilerController = new AlquilerController();
export default alquilerController;