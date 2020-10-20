import "reflect-metadata";
import { createExpressServer, useContainer, Action, UnauthorizedError } from "routing-controllers";
import { Container } from "typedi";
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import handle from "./handlers/handle.promises";

dotenv.config();

useContainer(Container);

const app = createExpressServer({
  authorizationChecker: async (action: Action) => {
    const authHeader: string = action.request.headers["authorization"];
    if (!authHeader) throw new UnauthorizedError('Not authorized');
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, 'somesupersecretsecret');
    if (!decodedToken) throw new UnauthorizedError('Not authorized');
    if (!decodedToken || !authHeader) {
      return false;
    }
    return true;
  },
  cors: true,
  controllers: [__dirname + "/controllers/*.js"],
  classTransformer: false
});

const connectToDB = async () => {
  const [err, db] = await handle(mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URI}`, { useNewUrlParser: true }));
  if (err) throw new Error(err.message);
  console.log('connected to database and starting server!');
  const port = process.env.PORT || 3000;
  app.listen(port);
}

connectToDB();