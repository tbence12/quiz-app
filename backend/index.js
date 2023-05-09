import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';
import database from './database';
import authentication from './authentication';


const app = express();
const PORT = process.env.PORT || 4000;

database();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const whiteList = ['http://localhost:4200']

app.use(cors({origin: function(origin, callback) {
  if(whiteList.includes(origin) || origin === undefined) {
    callback(null, true);
  } else {
    callback(new Error('CORS Error'));
  }
}, credentials: true, methods: "GET, PUT, POST, DELETE, OPTIONS"}));

authentication(app);

routes(app);

app.get('/', (req, res) => {
  res.send('Quiz app');
})

app.use((req, res, next) => {
  res.status(404).send('Something went wrong.');
})

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
})
