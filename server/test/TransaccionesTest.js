
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = require('chai').expect;

chai.use(chaiHttp);


const url = 'http://localhost:3000/BlockBusted/';


/* Prueba para registrar un usuario*/
describe('Registro de Usuario ( POST )', () => {

  it("Deberia de registrar un usuario correctamente", (done) => {
      const usuario = {
        nombres:"fredy rafael",
        apellidos:"lemus diaz",
        usuario:"fredy2021",
        edad:21,
        dpi:186549,
        correo:"fredy@hotmail.com",
        contraseña:"fredy@123" 
      }

      chai.request(url+"usuario")
      .post('')
      .send(usuario)
      .timeout(10000)
      .end(function(err,res){
          expect(res).to.have.status(200)
          done()
      });
  });

  it("No deberia de registrar un usuario correctamente", (done) => {
    const usuario = {
      nombres:"fredy rafael",
      apellidos:"lemus diaz",
      usuario:"fredy2021",
      edad:21,
      dpi:186549,
      correo:"fredy@hotmail",
      contraseña:"fredy@123" 
    }

    chai.request(url+"usuario")
    .post('')
    .send(usuario)
    .timeout(10000)
    .end(function(err,res){
        expect(res).to.have.status(400)
        done()
    });
});


});


/* Pruebas para obtener las transacciones de todos los usuarios */
describe('Transacciones de todos los usuarios ( GET )', () => {

    it('Deberia de obtener los alquileres de todos los usuario', (done) =>{
        chai.request(url+"DetalleTransaccion/Alquiler")
            .get('')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
    });


    it('No deberia de obtener los alquileres de todos los usuario', (done) =>{
      chai.request(url+"DetalleTransaccion/Alquiler2")
          .get('')
          .end(function (err, res) {
              expect(res).to.have.status(404);
              done();
          })
  });

  /*------------------------------------PAGOS-----------------------------------------*/
  
  it('Deberia de obtener los pagos de todos los usuario', (done) =>{
    chai.request(url+"DetalleTransaccion/Pago")
        .get('')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        })
});


it('No deberia de obtener los pagos de todos los usuario', (done) =>{
  chai.request(url+"DetalleTransaccion/Pago2")
      .get('')
      .end(function (err, res) {
          expect(res).to.have.status(404);
          done();
      })
});


});



/* Pruebas para obtener las transacciones de un unico usuario */
describe('Historial de compras de un usuario ( GET )', () => {

  it('Deberia de obtener todos los alquileres de un usuario', (done) =>{
      
    const id_usuario = {
      Id_Usuario:2
    }

    chai.request(url+"MiDetalleTransaccion/MiAlquiler")
    .post('')
    .send(id_usuario)
    .timeout(10000)
    .end(function(err,res){
        expect(res).to.have.status(200)
        done()
    });

  });

  it('No deberia de obtener todos los alquileres de un usuario', (done) =>{
    
    const id_usuario = {
      Id_Usuario:4563
    }

    chai.request(url+"MiDetalleTransaccion/MiAlquiler")
    .post('')
    .send(id_usuario)
    .timeout(10000)
    .end(function(err,res){
        expect(res).to.have.status(200)
        done()
    });

  });

  /*------------------------------------PAGOS-----------------------------------------*/

  it('Deberia de obtener todas las compras de un usuario', (done) =>{
    
    const id_usuario = {
      Id_Usuario:2
    }

    chai.request(url+"MiDetalleTransaccion/MiPago")
    .post('')
    .send(id_usuario)
    .timeout(10000)
    .end(function(err,res){
        expect(res).to.have.status(200)
        done()
    });

});

it('No deberia de obtener todas las compras de un usuario', (done) =>{
  
  const id_usuario = {
    Id_Usuario:2654
  }

  chai.request(url+"MiDetalleTransaccion/MiPago")
  .post('')
  .send(id_usuario)
  .timeout(10000)
  .end(function(err,res){
      expect(res).to.have.status(200)
      done()
  });

});


});
