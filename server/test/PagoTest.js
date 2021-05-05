let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = require('chai').expect;

chai.use(chaiHttp);

const url = 'http://localhost:3000/BlockBusted/pago/cambio';
const url2 = 'http://localhost:3000/BlockBusted/pago/mostrarpagos';
const url3 = 'http://localhost:3000/BlockBusted/pago/pagar';


/* Prueba a Tipo de Cambio */
describe('Get BlockBusted/pago/cambio', () => {
    it('Mandar a traer a la base de datos el Tipo de Cambio', (done) =>{
        chai.request(url)
            .get('')

            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
    });
});

/* Prueba a Tipo de Cambio */
describe('POST BlockBusted/pago/mostrarpagos', () => {
    it('Mostrar el precio total de peliculas', (done) =>{
        const PruebaPelicula = {
            Id_Usuario: 1,
            Id_Alquiler: "cQZWjAfs"
        }
        chai.request(url2)
            .post('')
            .send(PruebaPelicula)
            .timeout(10000)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
    });
});

const PruebaPago = {
    alquiler: "c8ZWjAfs",
    Num_Tarjeta: "XXXX67880123XXXX",
    Fecha: "08/25",
    Codigo:123,
    Apagar:"700.00",
    Moneda:1
}

describe('POST BlockBusted/pago/pagar', () => {
    it('Registro de Pago ', (done) =>{
        chai.request(url3)
        .post('')
        .send(PruebaPago)
        .end(function (err, res) {
           expect(res).to.have.status(400);
            done();
        })
    });
});