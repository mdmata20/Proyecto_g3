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
        
    }
}

const usuarioRoutes  = new   UsuarioRoutes();
export default usuarioRoutes.router;