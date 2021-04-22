import { Router } from 'express';

import AlquilerController from '../Controller/AlquilerController';


class AlquilerRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void{
        this.router.post('/alquilar', AlquilerController.createAlquiler);
        this.router.post('/pelicula', AlquilerController.createAlquilado);

    }
}

const alquilerRoutes  = new   AlquilerRoutes();
export default alquilerRoutes.router;