import { Router } from 'express';
import catalogoController from '../Controller/CatalogoController';

import CatalogoController from '../Controller/CatalogoController';

class CatalogoRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void{
        this.router.get('/',CatalogoController.list)
        //this.router.post('/', CatalogoController.create);
        this.router.put('/:id_Movie', CatalogoController.update);
        this.router.delete('/:id_Movie',CatalogoController.delete);
        this.router.post('/', catalogoController.HomeInicio);
    }
}

const catalogoRoutes  = new   CatalogoRoutes();
export default catalogoRoutes.router;