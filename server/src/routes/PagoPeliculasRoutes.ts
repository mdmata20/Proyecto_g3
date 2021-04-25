import { Router } from 'express';

import PagoPelicula from '../Controller/PagoPeliculasController';

class Pago {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void{
        this.router.get('/', PagoPelicula.index);
        //Metodos para realizar 
        this.router.post('/pagar', PagoPelicula.RegistrarPago);
        this.router.get('/listapagos', PagoPelicula.GetPagos);
        this.router.get('/llenado', PagoPelicula.Llenado);
        this.router.post('/mostrarpagos', PagoPelicula.TotalAlquilado);
        this.router.get('/cambio', PagoPelicula.TipodeCambio);
        
    }
}
const pagoRoutes  = new   Pago();
export default pagoRoutes.router;