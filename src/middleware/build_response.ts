import {NextFunction, Request, Response} from "express";

export function BuildResponse (): (req: Request, res:Response, next: NextFunction) => unknown{
  return (req: Request, res: Response, next: NextFunction) => {
    // response validation if needed
    if (res.locals['response_data']) {
      return res.json(res.locals['response_data'])
    }
    res.json({})
  }
}