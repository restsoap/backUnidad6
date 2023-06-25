import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nodeb', 'root', 'Admin123', {
  host: 'localhost',
  port: 33060,
  dialect: 'mysql',
});

export default sequelize;
