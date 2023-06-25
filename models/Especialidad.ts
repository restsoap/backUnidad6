import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import CitaMedica from './CitaMedica';
import Doctor from './Doctor';

interface EspecialidadAttributes {
  id: number;
  nombreEspecialidad: string;
}

class Especialidad extends Model<EspecialidadAttributes> implements EspecialidadAttributes {
  public id!: number;
  public nombreEspecialidad!: string;

  // Otras propiedades del modelo

  // Define las asociaciones con otros modelos
  public static associate() {
    Especialidad.hasMany(CitaMedica, { foreignKey: 'idEspecialidad' });
    Especialidad.belongsToMany(Doctor, { through: 'DoctorEspecialidad', foreignKey: 'idEspecialidad' });
  }
}

Especialidad.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombreEspecialidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'especialidades',
    timestamps: false, // Desactivar createdAt y updatedAt
  }
);

export default Especialidad;

