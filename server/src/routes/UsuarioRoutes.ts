import { Router } from 'express';

import UsuarioController from '../Controller/UsuarioController';


class UsuarioRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void{
        this.router.get('/', UsuarioController.index);
        this.router.post('/', UsuarioController.create);
        this.router.post('/login', UsuarioController.login);
        this.router.post('/getuser', UsuarioController.getuser);
        this.router.post('/getusers', UsuarioController.getusers);
        this.router.post('/updateuser', UsuarioController.updateuser);
        this.router.post('/updatemovie', UsuarioController.updatemovie);
    }
}

const usuarioRoutes  = new   UsuarioRoutes();
export default usuarioRoutes.router;