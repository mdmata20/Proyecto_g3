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
        this.router.delete('/alquilar/:id_alquiler',AlquilerController.deleteAlquiler);
        this.router.delete('/pelicula/:id_alquiler',AlquilerController.deletePelicula);
    }
}

const alquilerRoutes  = new   AlquilerRoutes();
export default alquilerRoutes.router;