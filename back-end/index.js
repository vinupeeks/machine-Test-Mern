import express from 'express';
import { PORT } from './config.js';
import cors from 'cors';
import connectDB from './DBconnection/db.js';
import userRoutes from './Routes/Routes.js'

const app = express();
app.use(express.json());

app.use(cors());

connectDB();

//defualt router sets http://localhost:1001/test/
app.use('/test', userRoutes);

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});