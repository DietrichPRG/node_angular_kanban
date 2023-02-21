require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express'
import routes from './routes';
import config from 'config';
import connectDB from './utils/connectDB';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import moment from 'moment';

moment.locale('pt-br');

const app = express();
app.use(express.json());

app.use(cookieParser());

//if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const methodToActionName = (method: string) => {
  switch (method) {
    case 'GET':
      return 'Selecionar';
    case 'POST':
      return 'Incluir';
    case 'PUT':
      return 'Alterar';
    case 'DELETE':
      return 'Remover';
    default:
      return 'unknown';
  }
};

app.use((req, res, next) => {
  // verify if the request is a options request
  if (req.method !== 'OPTIONS') {
    // split req.originalUrl by '/' and get the last element
    const id = req.originalUrl.split('/').pop();

    console.log(`> ${moment().format('L')} ${moment().format('LTS')} - card ${req?.body?.id ?? req?.params?.id ?? id} - ${req?.body?.titulo} - ${methodToActionName(req.method)}`);
  }
  next();
});

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(routes.rotaLogin);

app.use(routes.rotaCard);

app.use(routes.rotaTeste);

// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

const port = config.get<number>('port');

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);

  connectDB();
});
