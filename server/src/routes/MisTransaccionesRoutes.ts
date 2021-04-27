
import { Router } from 'express';
import usuario from '../Controller/MisTransacciones';




class AdminRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void{
        this.router.post('/MiAlquiler', usuario.GetAlquileres);
        this.router.post('/MiPago', usuario.GetPagos);
        
    }
}

const usuarioRoutes  = new   AdminRoutes();
export default usuarioRoutes.router;