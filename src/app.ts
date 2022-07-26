import express from "express";
import { graphqlHTTP} from "express-graphql";

import cors from "cors";
import { schema } from "./schema";
import { APP_KEY } from "./config";

const app = express();

app.use(cors());
app.use(express.json());

const loggingMiddleware = (req, res, next) => {
  if(req.method == 'POST'){
    if(req.headers['app-key'] != APP_KEY){
      res.json({'success':false,'message':'Invalid Access'});
      return;
    }
  }
  next();
}

var root = {
  ip: function (args, request) {
    return request.ip;
  }
};

app.use(loggingMiddleware);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: { headerEditorEnabled : true},
  })
);

export default app;
