import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import routes from './routes';
import database from './database';
import authentication from './authentication';


const app = express();
const PORT = process.env.PORT || 4000;

database();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const whiteList = ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:4200']

app.use(cors({origin: function(origin, callback) {
  if(whiteList.includes(origin) || origin === undefined) {
    callback(null, true);
  } else {
    callback(new Error('CORS Error'));
  }
}, credentials: true, methods: "GET, PUT, POST, DELETE, OPTIONS"}));

authentication(app);

routes(app);

app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view-engine', 'ejs')
.get('/', (res, req) => res.render('pages/index'));

app.use((req, res, next) => {
  res.status(404).send('Something went wrong.');
})

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
})
