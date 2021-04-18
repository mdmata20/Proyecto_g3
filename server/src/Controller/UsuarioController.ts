import {Request, Response } from 'express';

import pool   from '../database';

class UsuarioController {
    
    index (req: Request, res: Response) {
        pool.query('DESCRIBE usuario');
        res.json('usuario');
    }

    public async create (req: Request, res: Response): Promise<void> {
        console.log(req.body);
        await pool.query('INSERT INTO Usuario set ?', [req.body]);
        res.json({message: 'Creando un usuario'});
    }

    
}

const usuarioController = new UsuarioController();
export default usuarioController;