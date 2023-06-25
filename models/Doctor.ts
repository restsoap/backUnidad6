import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Especialidad from './Especialidad';

/*
interface DoctorAttributes {
  id: number;
  nombre: string;
  apellido: string;
  idespecialidad: number;
  consultorio: string;
  correo: string;
}
*/

class Doctor extends Model {
  public id!: number;
  public nombre!: string;
  public apellido!: string;
  public idespecialidad!: number;
  public consultorio!: string;
  public correo!: string;

  // Otras propiedades del modelo

  // Define las asociaciones con otros modelos
  public static associate() {
    Doctor.belongsTo(Especialidad, { foreignKey: 'idespecialidad' });
  }
}

Doctor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idespecialidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    consultorio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'doctores',
    timestamps: false, // Desactivar createdAt y updatedAt
  }
);

export default Doctor;
