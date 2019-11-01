import express from 'express';
import index from './routes/index';

const app = express();
app.use('/', index);

export default app;
