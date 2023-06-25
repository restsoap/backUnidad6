import express, { Request, Response } from 'express';
import Especialidad from '../models/Especialidad';

const router = express.Router();

//Obtener especialidades
router.get("/", async (req: Request, res: Response) => {
    try{
        const especialidades = await Especialidad.findAll();
        if(especialidades.length > 0){
            res.json(especialidades);
        }else{
            res.status(404).json({message: "No hay especialidades"})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error al obtener esp"});
    }
});


export default router;