import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import router from "./chats/v1";
import { connectDB } from "./database";

const app = express();
// Configuracion
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
connectDB();

// Routes
app.use('/api', router);
export default app;