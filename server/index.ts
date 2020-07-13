import express, { Application, Response, Request } from 'express';
import cookieParser from 'cookie-parser';
import { connection } from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import DBConn from './helpers/DBConn';
import productRoute from './routes/product';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
const startServer = () => {
  const app: Application = express();
  const MongoStore = connectMongo(session);
  app.use(
    session({
      secret: process.env.COOKIE_SECRET || '',
      resave: false,
      saveUninitialized: false,
      name: process.env.SESSION_NAME,
      store: new MongoStore({
        mongooseConnection: connection,
        collection: 'sessions',
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      },
    }),
  );
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      healthy: true,
    });
  });

  app.use('/api/product', productRoute);

  const PORT: number | string = process.env.PORT || 5000;

  app.listen(PORT, () => {
    DBConn();
    console.log('Server started!');
  });
};

startServer();
