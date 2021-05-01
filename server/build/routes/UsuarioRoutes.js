"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioController_1 = __importDefault(require("../Controller/UsuarioController"));
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', UsuarioController_1.default.index);
        this.router.post('/', UsuarioController_1.default.create);
        this.router.post('/login', UsuarioController_1.default.login);
        this.router.post('/getuser', UsuarioController_1.default.getuser);
        this.router.post('/getusers', UsuarioController_1.default.getusers);
        this.router.post('/updateuser', UsuarioController_1.default.updateuser);
        this.router.post('/updatemovie', UsuarioController_1.default.updatemovie);
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
