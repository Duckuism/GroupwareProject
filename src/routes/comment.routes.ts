import { Express, Request, Response } from 'express';
import Comment from "../models/domain/comment";
export function routes(app: Express){
  app.get('/api/comments',(req: Request,res: Response)=>{
    Comment.findAll().then(comment => res.status(200).send(comment));
  });
}