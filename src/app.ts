import express, {NextFunction, Request, Response} from 'express';
import {RequestHandler} from "src/middleware/request_handler";
import {BuildResponse} from "src/middleware/build_response";
import logger from 'pino-http';

const app = express();

app.use(express.json())
app.use(logger())
app.use('/success-requests',RequestHandler(async (req: Request, res:Response) => {
  return {
    headers: req.headers,
    body: req.body,
    query: req.query,
  }
}),BuildResponse())
app.use('/error-requests', RequestHandler(async (req: Request, res: Response) =>{
  const message = req.body.message;
  throw new Error(message || 'Error hit')
}))


app.use((err:Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    error: err.message
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening to port ${process.env.PORT || 3000}`);
})
