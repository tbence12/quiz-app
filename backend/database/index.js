import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected')
  })
  
  mongoose.connection.on('error', (error) => {
    console.log('Error happened: ', error)
  })
}
