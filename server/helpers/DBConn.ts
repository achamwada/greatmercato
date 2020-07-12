import { connect, connection } from 'mongoose';
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
export default async () => {
  const { MONGO_USER, MONGO_PASSWORD, DB_NAME } = process.env;
  console.log('MONGO_PASSWORD', MONGO_PASSWORD);
  try {
    await connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.2zbj9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      },
    );
    console.log('connected to ', connection.host);
  } catch ({ message }) {
    console.log('Failed to connect to DB', message);
  }
};
