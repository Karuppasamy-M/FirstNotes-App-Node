import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'notes_app_node', 
  'root',
  '12345678Mm', {
  dialect: 'mysql',
  host: 'localhost',
});

export default sequelize;