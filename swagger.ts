import swaggerUi from 'swagger-ui-express';
import * as swaggerJsdoc from 'swagger-jsdoc';
import express, { Request, Response } from 'express';
import Doctor from './models/Doctor';
import Especialidad from './models/Especialidad';
import router from './routes/especialidadRoutes';

const app = express();

// Define las rutas de tu aplicación Express

// Ruta obtener Doctores
router.get('/', async (req: Request, res: Response) => {
  try {
    const doctores = await Doctor.findAll();
    if (doctores.length > 0) {
      res.json(doctores);
    } else {
      res.status(404).json({ message: 'Doctores no encontrados' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener los doctores' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findByPk(id, {
      include: Especialidad, // Incluir los datos de la especialidad asociada
    });

    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ error: 'Doctor no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el doctor.' });
  }
});

// Configuración de Swagger
const swaggerOptions: swaggerJsdoc.Options = {
  swaggerDefinition: {
    info: {
      title: 'API de Mi Aplicación',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'], // Ruta de los archivos que contienen las rutas de tu API
};

const swaggerSpec = swaggerJsdoc.default(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta para mostrar la documentación de Swagger
app.get('/api-docs.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Resto de la configuración de tu aplicación Express...

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
