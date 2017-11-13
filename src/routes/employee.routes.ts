import { Express, Request, Response } from 'express';
import Employee from "../models/domain/employee";

export function routes(app: Express) {
	app.get('/api/employees', (req: Request, res: Response) => {
		Employee.findAll().then(employee => res.status(200).send(employee));
	});
}