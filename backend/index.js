import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes/userRoutes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 4000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

routes(app);

app.get('/', (req, res) => {
  res.send('Quiz app');
})

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
})
