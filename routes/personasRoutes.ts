import express, { Request, Response } from "express";
import Personas from "../models/Personas";

const router = express.Router();

// Ruta para obtener todas las personas
router.get("/", async (req: Request, res: Response) => {
  try {
    const personas = await Personas.findAll();
    res.json(personas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las personas" });
  }
});

// Ruta para crear una nueva persona
router.post("/", async (req: Request, res: Response) => {
  const { nombre, cedula, apellido, edad, telefono } = req.body;

  try {
    const persona = await Personas.create({
      nombre,
      cedula,
      apellido,
      edad,
      telefono,
    });
    res.json(persona);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la persona" });
  }
});

export default router;
