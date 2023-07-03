import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Especialidad from './Especialidad';
import Doctor from './Doctor';

interface CitaMedicaAttributes {
  cedulaPaciente: string;
  idEspecialidad: number;
  idDoctor: number;
  // idDoctor
  // Otros campos de CitaMedica
}

class CitaMedica extends Model<CitaMedicaAttributes> implements CitaMedicaAttributes {
  public cedulaPaciente!: string;
  public idEspecialidad!: number;
  public idDoctor!: number; 

  // Otras propiedades del modelo

  // Define las asociaciones con otros modelos
  public static associate() {
    CitaMedica.belongsTo(Especialidad, { foreignKey: 'idEspecialidad' });
    CitaMedica.belongsTo(Doctor, { foreignKey: 'idDoctor' });
  }

}

CitaMedica.init(
  {
    cedulaPaciente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idEspecialidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'especialidades', // Nombre de la tabla asociada en la base de datos
        key: 'id', // Clave primaria de la tabla asociada
      },
    },
    idDoctor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'doctores', // Nombre de la tabla asociada en la base de datos
        key: 'id', // Clave primaria de la tabla asociada
      },
    },
    // Otros campos de CitaMedica
  },
  {
    sequelize,
    tableName: 'citas_medicas',
    timestamps: false, // Desactivar createdAt y updatedAt
  }
);

export default CitaMedica;
