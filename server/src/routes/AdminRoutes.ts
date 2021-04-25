
import { Router } from 'express';
import usuarioAdmin from '../Controller/UsuarioAdmin';




class AdminRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void{
        this.router.get('/Alquiler', usuarioAdmin.GetAlquileres);
        this.router.get('/Pago', usuarioAdmin.GetPagos);
        
    }
}

const usuarioRoutes  = new   AdminRoutes();
export default usuarioRoutes.router;