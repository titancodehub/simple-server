import {NextFunction, Request, Response} from "express";
import {Middleware} from "src/middleware/interface";

export function RequestHandler(requestHandler: (req: Request, res: Response) => unknown): Middleware {
  return async (req: Request, res: Response, next: NextFunction) =>  {
    try {
      // inject context
      res.locals['response_data'] = await requestHandler(req, res);
      return next()
    } catch (e) {
      res.locals['error'] = e;
      return next(e)
    }
  }
}