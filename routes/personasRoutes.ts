import express, { Request, Response } from "express";
import Personas from "../models/Personas";

const router = express.Router();

// Ruta para obtener todas las personas
router.get("/", async (req: Request, res: Response) => {
  try {
    const personas = await Personas.findAll();

    if (personas.length === 0) {
      return res.status(404).json({ message: "No hay personas registradas." });
    }

    res.json(personas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las personas" });
  }
});


router.post("/", async (req: Request, res: Response) => {
  const { nombre, cedula, apellido, edad, telefono } = req.body;

  try {
    // Verificar si ya existe una persona con la misma cédula
    const personaExistente = await Personas.findOne({ where: { cedula } });

    if (personaExistente) {
      return res.status(400).json({ error: "La cédula ya está registrada." });
    }

    // Si no existe una persona con la misma cédula, crear una nueva
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
