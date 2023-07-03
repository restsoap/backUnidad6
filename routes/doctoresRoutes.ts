import express, { Request, Response } from "express";
import Doctor from "../models/Doctor";
import Especialidad from "../models/Especialidad";

const router = express.Router();

//Ruta obtener Doctores
router.get("/", async (req: Request, res: Response) => {
  try {
    const doctores = await Doctor.findAll();
    if (doctores.length > 0) {
      res.json(doctores);
    } else {
      res.status(404).json({ message: "Doctores no encontrados" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los doctores" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findByPk(id, {
      include: Especialidad, // Incluir los datos de la especialidad asociada
    });

    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ error: "Doctor no encontrado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener el doctor." });
  }
});

// Ruta para crear un nuevo doctor
router.post('/', async (req: Request, res: Response) => {
  const { nombre, apellido, idespecialidad, consultorio, correo } = req.body;

  try {
    // Verificar si ya existe un doctor con el mismo correo
    const doctorExistente = await Doctor.findOne({ where: { correo } });

    if (doctorExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    // Si no existe un doctor con el mismo correo, crear uno nuevo
    const doctor = await Doctor.create({
      nombre,
      apellido,
      idespecialidad,
      consultorio,
      correo,
    });

    res.status(201).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al crear el doctor.' });
  }
});



router.get("/especialidad/:idEspecialidad", async (req: Request, res: Response) => {
  const { idEspecialidad } = req.params;
  try {
    const doctores = await Doctor.findAll({
      where: {
        idespecialidad: idEspecialidad,
      },
      include: Especialidad, // Incluir los datos de la especialidad asociada
    });

    if (doctores.length > 0) {
      res.json(doctores);
    } else {
      res.status(404).json({ message: "Doctores no encontrados para la especialidad especificada." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los doctores por especialidad." });
  }
});

export default router;