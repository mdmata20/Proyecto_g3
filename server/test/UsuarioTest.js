let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = require('chai').expect;
chai.use(chaiHttp);
const url = 'http://localhost:3000/api';
const nock = require('nock');
const get_users = {
    "usuarios": [
        {
            "ID": 1,
            "USUARIO": "mdmata"
        },
        {
            "ID": 2,
            "USUARIO": "tomuch2"
        },
        {
            "ID": 3,
            "USUARIO": "tomuch2"
        }
    ]
};
const get_user={
    "text": "caracteristicas",
    "usuario": [
        {
            "id_usuario": 2,
            "Usuario": "tomuch2",
            "Correo": "eoguamuch94@gmail.com",
            "Contraseña": "123",
            "Nombres": "Edgar",
            "Apellidos": "Guamuch",
            "DPI": 12345,
            "Edad": 26
        }
    ]
}

const cred_user = {
    "username":"tomuch94",
    "password":"123"
};
const response = {status : "ok"};
describe('LOGIN REGISTRO', () => {
    // ---------------------------------------- PRUEBA NUMERO 1 
    /*
        describe('PRUEBA UTILIZANDO MOCK: ', () => {
            before(() => {
                nock(url)
                .post('/registro')
                .reply(200, response);
            });
            it('Registrar un usuario', async () => {

                let res = await chai
                .request(url)
                .post('/registro')
                .send(new_user);
                expect(res.status).to.equal(200);
            });
        });
        */

        describe('LOGIN: ', () => {
            before(() => {
                nock(url)
                .post('/login')
                .reply(200, response);
            });
            it('Deberia Iniciar Sesión', async () => {

                let res = await chai
                .request(url)
                .post('/login')
                .send(cred_user);
                expect(res.status).to.equal(200);
            });
        });

        
        describe('USUARIO INCORRECTO', () => {
            before(() => {
                nock(url)
                .post('/login')
                .reply(404, {msg : "Usuario no encontrado"});
            });
            it('la prueba debe fallar exitosamente', (done) => {
                chai.request(url)
                .post('/login').send({username:"tomuch94",password:"123"})
                .end(function (err, res) {
                    expect(res).status(404)
                    expect(res.body.msg).to.deep.equals('Usuario no encontrado')
                    done()
                });
             });
        });
        
        describe('Prueba para Obtención: ', () => {
            before(() => {
                nock(url)
                .post('/getuser')
                .reply(200, get_user);
            });
            it('Obtener usuarios', async () => {
                let res = await chai
                .request(url)
                .post('/getuser')
                .send({id_usuario:"2"})
                expect(res.body).that.includes.all.keys(['text','usuario']);
                expect(res.body).to.be.an.instanceof(Object)
            });
            before(() => {
                nock(url)
                .post('/getusers')
                .reply(200, get_users);
            });
            it('Lista de los usuarios', async () => {
                let res = await chai
                .request(url)
                .post('/getusers')
                .send({})
                expect(res.body).that.includes.all.keys(['usuarios']);
                expect(res.body).to.be.an.instanceof(Object)
            });
        });

});
