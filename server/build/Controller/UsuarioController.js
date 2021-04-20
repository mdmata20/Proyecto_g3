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
                    yield database_1.default.query('INSERT INTO Usuario set ?', [req.body]);
                    res.json({ message: 'Creando un usuario' });
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
