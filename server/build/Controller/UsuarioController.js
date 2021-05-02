"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const ValidarRegistro_1 = __importDefault(require("../Validaciones/ValidarRegistro"));
//const validar=require('../Validaciones');
class UsuarioController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            //const login =  await pool.query('SELECT * FROM usuario where Correo=\''+username+'\' AND Contraseña= \'' + password + '\'');
            /*pool.query('SELECT * FROM usuario where Correo=\''+email+'\'', (err, res1) => {
                if (err) {
                    console.log("error: ", err);
                    res.status(200).json({text: 'Usuario no encontrado'});
                }
                console.log(res1)
                console.log(req.body)
                if(res1.length > 0){
                    pool.query('SELECT * FROM usuario where Correo=\''+email+'\' AND Contraseña= \'' + password + '\'', (err1, res2) => {
                        if (err1) {
                            console.log("error: ", err1);
                            res.status(200).json({text: 'Usuario no encontrado'});
                        }
    
                        if(res2.length>0)
                        {
                            res.status(200).json({text: 'Sesión Iniciada, Correctamente.', id_usuario: (res2[0]).id_usuario});
                        }else{
                            res.status(200).json({text: 'Contraseña Incorrecta.'});
                        }
                    });
                   
                }
                res.status(200).json({text: 'Usuario no encontrado'});
            });*/
            yield database_1.default.query('SELECT * FROM usuario where Correo=\'' + email + '\' AND Contraseña= \'' + password + '\'', (err1, res2) => {
                if (err1) {
                    console.log("error: ", err1);
                    res.status(200).json({ text: 'Usuario no encontrado' });
                }
                if (res2.length > 0) {
                    res.status(200).json({ text: 'Sesión Iniciada, Correctamente.', id_usuario: (res2[0]).id_usuario });
                }
                else {
                    res.status(200).json({ text: 'Usuario no encontrado' });
                }
            });
        });
    }
    getuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.body;
            //const login =  await pool.query('SELECT * FROM usuario where Correo=\''+username+'\' AND Contraseña= \'' + password + '\'');
            yield database_1.default.query("SELECT * FROM usuario where id_usuario=" + id_usuario + ";", (err1, res2) => {
                if (err1) {
                    console.log("error: ", err1);
                    res.status(200).json({ text: 'Usuario no encontrado' });
                }
                if (res2.length > 0) {
                    return res.status(200).json({ text: 'caracteristicas', usuario: res2 });
                }
                else {
                    return res.status(200).json('Usuario No Encontrado.');
                }
            });
        });
    }
    getusers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const login =  await pool.query('SELECT * FROM usuario where Correo=\''+username+'\' AND Contraseña= \'' + password + '\'');
            const get_user = yield database_1.default.query("SELECT id_usuario 'ID', Usuario 'USUARIO' FROM Usuario;", (err1, res2) => {
                if (err1) {
                    console.log("error: ", err1);
                    res.status(200).json({ text: 'Usuario no encontrado' });
                }
                if (res2.length > 0) {
                    return res.status(200).json({ usuarios: res2 });
                }
                else {
                    return res.status(200).json('Usuario No Encontrado.');
                }
            });
        });
    }
    updateuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario, iusuario, icorreo, ipassword, inombre, iapellido, idpi, iedad } = req.body;
            //const login =  await pool.query('SELECT * FROM usuario where Correo=\''+username+'\' AND Contraseña= \'' + password + '\'');
            const update_user = yield database_1.default.query(`UPDATE USUARIO
        SET Usuario = '${iusuario}', Correo = '${icorreo}', 
        Contraseña = '${ipassword}', Nombres = '${inombre}', Apellidos = '${iapellido}', 
        DPI = ${idpi}, Edad = ${iedad} WHERE (id_usuario = ${id_usuario});`, (err1, res2) => {
                if (err1) {
                    console.log("error: ", err1);
                    res.status(200).json({ text: 'Usuario no encontrado' });
                }
                if (res2.affectedRows == 1) {
                    return res.status(200).json('ok');
                }
                else {
                    return res.status(200).json('error');
                }
            });
        });
    }
    updatemovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { new_user, id_pelicula, current_user } = req.body;
            const update_user = yield database_1.default.query(`UPDATE Pelicula_Alquilada SET usuario_actual = ${new_user} WHERE movie = ${id_pelicula} AND usuario_actual=${current_user};`, (err1, res2) => {
                if (err1) {
                    console.log("error: ", err1);
                    res.status(200).json({ text: 'Error' });
                }
                if (res2.affectedRows == 1) {
                    return res.status(200).json('ok');
                }
                else {
                    return res.status(200).json('error');
                }
            });
        });
    }
    index(req, res) {
        database_1.default.query('DESCRIBE usuario');
        res.json('usuario');
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = ValidarRegistro_1.default(req.body);
                if (result !== "") {
                    res.status(400).json({
                        status: result,
                    });
                }
                else {
                    console.log(req.body);
                    yield database_1.default.query('INSERT INTO Usuario set ?', [req.body], (err1, res2) => {
                        if (err1) {
                            console.log("error: ", err1);
                            res.status(200).json({ text: 'Error' });
                        }
                        res.json({ message: 'Creando un usuario' });
                    });
                }
            }
            catch (e) {
                //console.log('ERROR EN REGISTRAR:',e)
                res.status(400).json({
                    status: "Bad",
                    message: "" + e,
                });
            }
        });
    }
}
const usuarioController = new UsuarioController();
exports.default = usuarioController;
