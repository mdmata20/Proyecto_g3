let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = require('chai').expect;

chai.use(chaiHttp);

const url = 'http://localhost:3000/BlockBusted/Catalogo/';

/* Verificar si si devuelve todos los valores */
describe('List de Catalogo Completo', () => {
    it('deberiamos de obtener el listado de catalogo', (done) =>{
        chai.request(url)
            .get('')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
    });
});

/* Metodo de inserccion de datos de la Api a nuestra bd */
describe('POST /BlockBusted/Catalogo/', () => {
    it("Deberia de insertar los datos del plan de la pelicula", (done) => {
        const availability = {
            id_availabitity: "4",
            name: "Plan 4",
            ServiceDays: 10,
            BonusDays: 4,
            fine: "0.1"
        }

        chai.request(url)
        .post('')
        .send(availability)
        .timeout(10000)
        .end(function(err,res){
            expect(res).to.have.status(200)
            done()
        });
    });

    it("Deberia de insertar los datos del Lenguaje de Pelicula", (done) => {
        const Lenguaje ={
            id_lenguage: 8,
            code: "POR",
            descripcion: "Portugues"
        }
        chai.request(url)
        .post('')
        .send(Lenguaje)
        .timeout(10000)
        .end(function(err,res){
            expect(res).to.have.status(200)
            done()
        });
    });

    it("Deberia de insertar los datos del Lenguaje de Pelicula", (done) => {
        const Movie ={
            id_Movie: "10",
            name: "Pelicula 10",
            image: "URL",
            ChargeRate: 15.75,
            active: true
        }
        chai.request(url)
        .post('')
        .send(Movie)
        .timeout(10000)
        .end(function(err,res){
            expect(res).to.have.status(200)
            done()
        });
    });

    it('Insertar bien porque si existen esas peliculas', (done) =>{
        const LenguajePeliculas ={
            Lenguaje: 1,
            id_Movie: 2,
        }
        chai.request(url)
        .post('')
        .send(LenguajePeliculas)
        .timeout(10000)
        .end(function(err,res){
            expect(res).to.have.status(200)
            done()
        });
    });

    it('No deberia de insertar un plan ala pelicula porque no existe ese plan', (done) =>{
        const PlanPeliculas ={
            languages: 1,
            id_Movie: 1,
        }
        chai.request(url)
        .post('')
        .send(PlanPeliculas)
        .timeout(10000)
        .end(function(err,res){
            expect(res).to.have.status(200)
            done()
        });
    });
});


/* Actualizacion de Catalogo, por alquiler de Pelicula */
const Actualizar_Catalogo = {
    "id_Movie": 1,
    "name": "Prueba1",
    "image": "https://i.blogs.es/4a9cb1/titanic/450_1000.jpeg",
    "chargeRate": 25,
    "active": true
};

describe('UPDATE /BlockBusted/Catalogo/:id_usuario', () => {
    it('Deberia recibir una solicitud de actualizacion', (done) => {
        chai.request(url)
            .put('1')
            .send(Actualizar_Catalogo)
            .end(function (err, res) {
               // expect(res.body).to.have.property('message').to.be.equal('Catalogo Actualizado');
                expect(res).to.have.status(200);
                done();
            })
    })
})



/* Devolucion de inventario de Alquiler de pelicula */
describe('GET /BlockBusted/Catalogo/:id_usuario', () => {
    it('Deberia de obtener el catalago de las peliculas alquiladas por el usuario', (done) => {
        const id_user = 1;
        chai.request(url)
            .get("" + id_user)
            .end((err,res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('No Deberia de obtener el catalago de las peliculas alquiladas por el usuario', (done) => {
        const id_user = 100;
        chai.request(url)
            .get("" + id_user)
            .end((err,res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    
});

/* Verificar si se eliminan todos el valor indicado */
describe('Delete a user', () => {
    it('deberia de recibir un error por que no encuntra el catalgo', (done) => {
        chai.request(url)
            .del('10')
            .timeout(10000)
            .end(function (err, res){
                expect(res).to.have.status(200);
                done();
            })
    })
});


