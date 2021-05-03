let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = require('chai').expect;

chai.use(chaiHttp);

const url = 'http://localhost:3000/BlockBusted/Alquiler/';

const Alquiler_Prueba = {
    "id_alquiler": "4eBZecq2",
    "usuario": 1
};

const Pelicula_Prueba = {
    "alquiler": "4eBZecq2",
    "movie": 1,
    "usuario_actual": 1
};

/* Metods para insertar alquileres en la db*/
describe('POST /BlockBusted/Alquiler/', () => {
    it("alquilar, inserta un valor en Alquiler", (done) => {
        chai.request(url)
        .post('alquilar')
        .send(Alquiler_Prueba)
        .timeout(10000)
        .end(function(err,res){
            expect(res).to.have.status(200)
            done()
        });
    });

    it("pelicula, inserta un valor en Pelicula_Alquilada", (done) => {
        chai.request(url)
        .post('pelicula')
        .send(Pelicula_Prueba)
        .timeout(10000)
        .end(function(err,res){
            expect(res).to.have.status(200)
            done()
        });
    });
    
});

describe('DELETE /BlockBusted/Alquiler/', () => {
    it('pelicula, se debe eliminar la ultima pelicula alquilada', (done) => {
        chai.request(url)
            .del('/pelicula/4eBZecq2')
            .timeout(10000)
            .end(function (err, res){
                expect(res).to.have.status(200);
                done();
            })
    })
    
    it('alquilar, se debe eliminar el ultimo alquiler', (done) => {
        chai.request(url)
            .del('/alquilar/4eBZecq2')
            .timeout(10000)
            .end(function (err, res){
                expect(res).to.have.status(200);
                done();
            })
    })
});