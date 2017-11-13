import { Express, Request, Response } from 'express';
import CommentToComment from "../models/domain/commentToComment";

export function routes(app: Express){
  app.get('/api/commentToComments',(req: Request,res: Response)=>{
    CommentToComment.findAll().then(commentToComment => res.status(200).send(commentToComment));
  });
}