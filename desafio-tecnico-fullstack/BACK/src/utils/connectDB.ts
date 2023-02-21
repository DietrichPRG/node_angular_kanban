import mongoose from 'mongoose';
import config from 'config';

const dbUrl = `mongodb://${config.get('dbName')}:${config.get(
  'dbPass'
)}@mongo:27017/jwtAuth?authSource=admin`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Database connected...');
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;

