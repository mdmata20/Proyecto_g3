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
        'where M.active = true;');
        res.json(CatalogoPeliculas).status(200);
    }

    

    public async create (req: Request, res: Response): Promise<void> {
        console.log(req.body);
        await pool.query('INSERT INTO Movie set ?', [req.body]);
        res.json({message: 'Creando un usuario'});
    }



    public async HomeInicio(req: Request, res: Response): Promise<void>{

        let users = [];
        let users1 = [];
        let users2 = [];
        

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
                        pool.query('INSERT INTO Availabitity set ?', [Datos_Availability]);

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
                        pool.query('INSERT INTO Lenguage set ?', [Datos_Language]);

                    } catch (error) {
                        
                    }

                })
            }
        });


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
                    pool.query('INSERT INTO Movie set ?', [Datos]);

                  
    
                    valor.languages.forEach(lan=>{
                        let LenguajesPeliculas = {
                            Lenguaje: lan,
                            id_Movie: valor.id,
                        }

                        pool.query('INSERT INTO LenguajesPeliculas SET ?', [LenguajesPeliculas]);
                    })
    
                    valor.availabilities.forEach(lan=>{
                        let LenguajesAvailabilities = {
                            languages: lan,
                            id_Movie: valor.id,
                        }
                        pool.query('INSERT INTO DisponiblesPeliculas SET ?', [LenguajesAvailabilities]);
                    })
                } catch (error) {
                    
                }
            });         
        }
        });
        
        const CatalogoPeliculas = 
        await pool.query('select distinct M.id_Movie, M.name, M.image, M.ChargeRate, A.name as Plan, L.descripcion '+
        'from Movie M '+
        'inner join LenguajesPeliculas LP on LP.id_Movie = M.id_Movie '+
        'inner join DisponiblesPeliculas DP on DP.id_Movie = M.id_Movie '+
        'inner join Availabitity A on A.id_availabitity = DP.languages '+
        'inner join Lenguage L on L.id_lenguage = LP.Lenguaje '+
        'where M.active = true;');
        res.json(CatalogoPeliculas).status(200);

    }

    async update (req: Request, res: Response): Promise<void>{
        const {id_Movie} = req.params;
        await pool.query('UPDATE Movie set ? where id_Movie = ?', [req.body, id_Movie]);
        res.json({text: 'Update Catalogo de Pelicula'});
    }

    async delete (req: Request, res: Response): Promise<void>{
        const {id_Movie} = req.params;
        await pool.query('DELETE From Movie where id_Movie = ?',[id_Movie]);
        res.json({text: 'Delete Catalogo de Pelicula'});
    }    
}

const catalogoController = new CatalogoController();
export default catalogoController;