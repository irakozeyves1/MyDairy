
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import userRoutes from "./userRoutes/user";
import entryRoutes from "./entryRoutes/entry";
import swaggerDoc from '../../swagger.json';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/v1', userRoutes);
app.use('/api/v1', entryRoutes);
// Index of MyDiary
app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome to MyDiary, MyDiary is an online journal where users can pen down their thoughts and feelings.',
}));
app.use((req, res) => (res.status(404).json({ status: 404, message: 'Route not found' })));

export default app;
