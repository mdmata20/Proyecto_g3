import {query, request, Request, Response } from 'express';

const request2 = require("request");
const request3 = require("request");
const request4 = require("request");

import pool   from '../database';

class CatalogoController {
    
    
    
    async list (req: Request, res: Response){
        const CatalogoPeliculas = 
        await pool.query('select distinct M.id_Movie, M.name, M.image, M.ChargeRate, A.name as Plan, L.descripcion '+
        'from Movie M '+
        'inner join LenguajesPeliculas LP on LP.id_Movie = M.id_Movie '+
        'inner join DisponiblesPeliculas DP on DP.id_Movie = M.id_Movie '+
        'inner join Availabitity A on A.id_availabitity = DP.languages '+
        'inner join Lenguage L on L.id_lenguage = LP.Lenguaje '+
        'where M.active = true;',
        (err1, res2) => {
            if (err1) {
                console.log("error: ", err1);
                res.status(200).json({text: 'Error'});
            }
            res.json(res2).status(200);
        });
        
    }

    public async HomeInicio(req: Request, res: Response): Promise<void>{

        let users = [];
        let users1 = [];
        let users2 = [];
        var CambioMoneda;
    
        request3("https://my-json-server.typicode.com/CoffeePaw/AyD1API/Availability",(err, res1,body)=>{
            if(!err){
                users1 = JSON.parse(body);
                users1.forEach(valor1=>{
                    console.log(valor1.id);


                    try {
                        let Datos_Availability = {
                            id_availabitity: valor1.id,
                            name: valor1.name,
                            ServiceDays: valor1.serviceDays,
                            BonusDays: valor1.bonusDays,
                            fine: valor1.fine
                        }
                        pool.query('INSERT INTO Availabitity set ?', [Datos_Availability],
                        (err1, res2) => {
                            if (err1) {
                                console.log("error: ", err1);
                                res.status(200).json({text: 'Error'});
                            }
                        });

                    } catch (error) {
                        
                    }

                })
            }
        });

        
        request3("https://my-json-server.typicode.com/CoffeePaw/AyD1API/Language",(err, res1,body)=>{
            if(!err){
                users2 = JSON.parse(body);
                users2.forEach(valor2=>{
                    console.log(valor2.id);


                    try {
                        let Datos_Language = {
                            id_lenguage: valor2.id,
                            code: valor2.Code,
                            descripcion: valor2.Description
                        }
                        pool.query('INSERT INTO Lenguage set ?', [Datos_Language],
                        (err1, res2) => {
                            if (err1) {
                                console.log("error: ", err1);
                                res.status(200).json({text: 'Error'});
                            }
                        });

                    } catch (error) {
                        
                    }

                })
            }
        });

        console.log('2');

        request2("https://my-json-server.typicode.com/CoffeePaw/AyD1API/Movie",(err,res1,body)=>{
        if (!err){
            users = JSON.parse(body);
            users.forEach(valor=>{
                console.log(valor.id);
                
                try {
                    let Datos = {
                        id_Movie: valor.id,
                        name: valor.name,
                        image: valor.image,
                        ChargeRate:valor.chargeRate,
                        active: valor.active
                    }
                    pool.query('INSERT INTO Movie set ?', [Datos],
                    (err1, res2) => {
                        if (err1) {
                            console.log("error: ", err1);
                            res.status(200).json({text: 'Error'});
                        }

                        valor.languages.forEach(lan=>{
                            let LenguajesPeliculas = {
                                Lenguaje: lan,
                                id_Movie: valor.id,
                            }
    
                           // console.log(LenguajesPeliculas);
                            pool.query('INSERT INTO LenguajesPeliculas SET ?', [LenguajesPeliculas],
                            (err1, res3) => {
                                if (err1) {
                                    console.log("error: ", err1);
                                    res.status(200).json({text: 'Error'});
                                }
                            });
                        })
        
                        valor.availabilities.forEach(lan=>{
                            let LenguajesAvailabilities = {
                                languages: lan,
                                id_Movie: valor.id,
                            }
                            //console.log(LenguajesAvailabilities);
                            pool.query('INSERT INTO DisponiblesPeliculas SET ?', [LenguajesAvailabilities],
                            (err1, res3) => {
                                if (err1) {
                                    console.log("error: ", err1);
                                    res.status(200).json({text: 'Error'});
                                }
                            });
                        })

                    });

                  
    
                    
                } catch (error) {
                    
                }
            });         
        }
        });
        
        console.log('1')
        
        await pool.query('select distinct M.id_Movie, M.name, M.image, M.ChargeRate, A.name as Plan, L.descripcion '+
        'from Movie M '+
        'inner join LenguajesPeliculas LP on LP.id_Movie = M.id_Movie '+
        'inner join DisponiblesPeliculas DP on DP.id_Movie = M.id_Movie '+
        'inner join Availabitity A on A.id_availabitity = DP.languages '+
        'inner join Lenguage L on L.id_lenguage = LP.Lenguaje '+
        'where M.active = true;',
        (err1, res2) => {
            if (err1) {
                console.log("error: ", err1);
                res.status(200).json({text: 'Error'});
            }

            request2('https://my-json-server.typicode.com/CoffeePaw/AyD1API/ExchangeRate', function (error:any, response:any, body: any) {
                let cambio = JSON.parse(body);
                let cambio2 ={
                    "total": cambio[0].total
                }
                
                console.log(cambio2);
                pool.query('INSERT INTO ExchangeRate SET ?', [cambio2],
                (err1, res3) => {
                    if (err1) {
                        console.log("error: ", err1);
                        res.status(200).json({text: 'Error'});
                    }
                });
            });
        res.status(200).json(res2);
        });
    
        
        res.status(200);
        

    }


    async update (req: Request, res: Response): Promise<void>{
        const {id_Movie} = req.params;
        await pool.query('UPDATE Movie set ? where id_Movie = ?', [req.body, id_Movie],
        (err1, res2) => {
            if (err1) {
                console.log("error: ", err1);
                res.status(200).json({text: 'Error'});
            }
            res.json({text: 'Update Catalogo de Pelicula'});
        });
       
    }

    public async Inventario(req: Request, res: Response): Promise<any>{
        const {id_usuario} = req.params;
        const inventario = await pool.query('select distinct M.id_Movie, M.name, M.image, M.ChargeRate, P.usuario_actual '+
        'from Pelicula_Alquilada P '+
        'inner join Movie M on M.id_Movie = P.movie '+
        'inner join Alquiler A on A.id_alquiler = P.alquiler '+
        'inner join Usuario U on U.id_usuario = A.usuario '+
        'where P.usuario_actual=?',[id_usuario],
        (err1, res2) => {
            if (err1) {
                console.log("error: ", err1);
                res.status(200).json({text: 'Error'});
            }

            if(res2.length > 0){
                return res.json(res2);
            }
            res.status(404).json({text: "No se encuentra nada en su inventario"});
        });
        
    }

    async delete (req: Request, res: Response): Promise<void>{
        const {id_Movie} = req.params;
        await pool.query('DELETE From Movie where id_Movie = ?',[id_Movie],
        (err1, res2) => {
            if (err1) {
                console.log("error: ", err1);
                res.status(200).json({text: 'Error'});
            }
            res.json({text: 'Delete Catalogo de Pelicula'});
        });
       
    }    
}

const catalogoController = new CatalogoController();
export default catalogoController;