import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RequestHandler } from 'express';


export const validationMiddleware = (dtoClass: any): RequestHandler => {
return async (req, res, next) => {
const output = plainToInstance(dtoClass, req.body);
const errors = await validate(output, { whitelist: true, forbidNonWhitelisted: true });
if (errors.length > 0) {
const formatted = errors.map(e => ({ property: e.property, constraints: e.constraints }));
return res.status(400).json({ message: 'Validation failed', errors: formatted });
}
req.body = output;
next();
};
};