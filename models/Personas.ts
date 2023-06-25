import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Personas extends Model {
  public id!: number;
  public nombre!: string;
  public cedula!: string;
  public apellido!: string;
  public edad!: number;
  public telefono!: string;
}

Personas.init(
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
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Personas',
    timestamps: false, // Desactivar createdAt y updatedAt
  }
);

export default Personas;

