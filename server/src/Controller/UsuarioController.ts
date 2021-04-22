import {Request, Response } from 'express';

import pool   from '../database';

import validar from '../Validaciones/ValidarRegistro';

//const validar=require('../Validaciones');

class UsuarioController {
    
    public async login (req: Request, res: Response) {
        const {email, password} = req.body;
        //const login =  await pool.query('SELECT * FROM usuario where Correo=\''+username+'\' AND Contraseña= \'' + password + '\'');
        const login =  await pool.query('SELECT * FROM usuario where Correo=\''+email+'\'');
        console.log(req.body)
        if(login.length > 0){
            const contra = await pool.query('SELECT * FROM usuario where Correo=\''+email+'\' AND Contraseña= \'' + password + '\'');
            if(contra.length>0)
            {
                return res.status(200).json({text: 'Sesión Iniciada, Correctamente.', id_usuario: (contra[0]).id_usuario});
            }else{
                return res.status(200).json({text: 'Contraseña Incorrecta.'});
            }
        }

        res.status(200).json({text: 'Usuario no encontrado'});
    } 
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