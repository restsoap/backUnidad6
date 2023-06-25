import express from 'express';
import sequelize from './config/database';
import personasRoutes from './routes/personasRoutes';
import doctoresRoutes from './routes/doctoresRoutes';
// import citasRoutes from './routes/citasRoutes';
import Doctor from './models/Doctor';
import CitaMedica from './models/CitaMedica';
import Especialidad from './models/Especialidad';
import cors from 'cors';
import especialidadRoutes from './routes/especialidadRoutes';
import citaMedicaRoutes from './routes/citaMedicaRoutes';

const app = express();
const port = 3000;

// Establecer el middleware para procesar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Configurar la CSP con una directiva 'font-src'
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'none'; font-src 'self' http://localhost:3000;");
  next();
});

// Habilitar el CORS
app.use(cors());

// Asociar las rutas a las respectivas URL base
app.use('/personas', personasRoutes);
app.use('/api/doctores', doctoresRoutes);
app.use('/api/especialidades', especialidadRoutes);
app.use('/api/citas', citaMedicaRoutes); 

// Asociar los modelos si es necesario
Doctor.associate();
Especialidad.associate();

// Realiza la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');

    // Sincroniza los modelos con la base de datos
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Tablas creadas correctamente.');

    // Inicia el servidor
    app.listen(port, () => {
      console.log(`Servidor iniciado en http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error:', error);
  });
