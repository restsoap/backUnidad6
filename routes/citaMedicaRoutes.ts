import express, { Request, Response } from "express";
import CitaMedica from "../models/CitaMedica";
import Personas from "../models/Personas";

const router = express.Router();

// Endpoint para obtener todas las citas médicas
router.get("/", async (req: Request, res: Response) => {
  try {
    const citas = await CitaMedica.findAll();
    if (citas.length > 0) {
      res.json(citas);
      res.status(200);
    } else {
      res.status(404).json({ error: "Citas no encontradas" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las citas médicas" });
  }
});

// Endpoint para obtener una cita médica por ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cita = await CitaMedica.findByPk(id);
    if (cita) {
      res.json(cita);
    } else {
      res.status(404).json({ error: "Cita médica no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la cita médica" });
  }
});

// Endpoint para crear una nueva cita médica
router.post("/", async (req: Request, res: Response) => {
  const { cedulaPaciente, idEspecialidad, idDoctor } = req.body;
  try {
    // Verificar si la cédula existe en el modelo Persona
    const persona = await Personas.findOne({
      where: { cedula: cedulaPaciente },
    });
    if (!persona) {
      return res.status(400).json({ error: "La cédula no existe" });
    }

    // La cédula existe, crear la cita médica
    const cita = await CitaMedica.create({
      cedulaPaciente,
      idEspecialidad,
      idDoctor
    });
    res.status(201).json(cita);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la cita médica" });
  }
});

/*
// Endpoint para actualizar una cita médica
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cedulaPaciente, idEspecialidad } = req.body;
  try {
    const cita = await CitaMedica.findByPk(id);
    if (cita) {
      cita.cedulaPaciente = cedulaPaciente;
      cita.idEspecialidad = idEspecialidad;
      await cita.save();
      res.json(cita);
    } else {
      res.status(404).json({ error: "Cita médica no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la cita médica" });
  }
});

// Endpoint para eliminar una cita médica
router.delete("/citas/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cita = await CitaMedica.findByPk(id);
    if (cita) {
      await cita.destroy();
      res.json({ message: "Cita médica eliminada correctamente" });
    } else {
      res.status(404).json({ error: "Cita médica no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la cita médica" });
  }
});
*/

export default router;
