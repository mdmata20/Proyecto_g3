import {Request, Response } from 'express';

import pool   from '../database';

import validar from '../Validaciones/ValidarRegistro';

//const validar=require('../Validaciones');

class UsuarioController {
    
    
    index (req: Request, res: Response) {
        pool.query('DESCRIBE usuario');
        res.json('usuario');
    }

    public async create (req: Request, res: Response): Promise<void> {

        try{

        let result=validar(req.body);
    
        if ( result !== ""){
           res.status(400).json({
            status:result,
            });
        }else{

        console.log(req.body);
        await pool.query('INSERT INTO Usuario set ?', [req.body]);
        res.json({message: 'Creando un usuario'});

        }


    }catch(e){
        //console.log('ERROR EN REGISTRAR:',e)
        res.status(400).json({
            status:"Bad",
            message:""+e,
        });
    }


    }

    
}

const usuarioController = new UsuarioController();
export default usuarioController;