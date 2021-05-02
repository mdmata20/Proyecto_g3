import {Request, Response } from 'express';

import pool   from '../database';

//import validar from '../Validaciones/ValidarRegistro';

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

    public async getuser (req: Request, res: Response) {
        const {id_usuario} = req.body;
        //const login =  await pool.query('SELECT * FROM usuario where Correo=\''+username+'\' AND Contraseña= \'' + password + '\'');
        const get_user =  await pool.query("SELECT * FROM usuario where id_usuario="+id_usuario+";");
        if(get_user.length>0)
        {
            
            return res.status(200).json({text: 'caracteristicas', usuario: get_user});
        }else{
            return res.status(200).json('Usuario No Encontrado.');
        }
    } 

    public async getusers (req: Request, res: Response) {
        //const login =  await pool.query('SELECT * FROM usuario where Correo=\''+username+'\' AND Contraseña= \'' + password + '\'');
        const get_user =  await pool.query("SELECT id_usuario 'ID', Usuario 'USUARIO' FROM Usuario;");
        if(get_user.length>0)
        {
            
            return res.status(200).json({usuarios: get_user});
        }else{
            return res.status(200).json('Usuario No Encontrado.');
        }
    } 

    
    public async updateuser (req: Request, res: Response) {
        const {id_usuario,iusuario, icorreo, ipassword, inombre, iapellido, idpi, iedad} = req.body;
        //const login =  await pool.query('SELECT * FROM usuario where Correo=\''+username+'\' AND Contraseña= \'' + password + '\'');
        const update_user =  await pool.query(`UPDATE USUARIO
        SET Usuario = '${iusuario}', Correo = '${icorreo}', 
        Contraseña = '${ipassword}', Nombres = '${inombre}', Apellidos = '${iapellido}', 
        DPI = ${idpi}, Edad = ${iedad} WHERE (id_usuario = ${id_usuario});`);
        if(update_user.affectedRows==1)
        {
            return res.status(200).json('ok');
        }else{
            return res.status(200).json('error');
        }
    } 

    public async updatemovie (req: Request, res: Response) {
        const {new_user,id_pelicula,current_user} = req.body;
        const update_user =  await pool.query(`UPDATE Pelicula_Alquilada SET usuario_actual = ${new_user} WHERE movie = ${id_pelicula} AND usuario_actual=${current_user};`);
        if(update_user.affectedRows==1)
        {
            return res.status(200).json('ok');
        }else{
            return res.status(200).json('error');
        }
    } 
    index (req: Request, res: Response) {
        pool.query('DESCRIBE usuario');
        res.json('usuario');
    }

    public async create (req: Request, res: Response): Promise<void> {

        try{

       // let result=validar(req.body);
    
        /*if ( result !== ""){
           res.status(400).json({
            status:result,
            });
        }else{*/

        console.log(req.body);
        await pool.query('INSERT INTO Usuario set ?', [req.body]);
        res.json({message: 'Creando un usuario'});

        


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