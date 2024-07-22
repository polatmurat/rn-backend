import { Request, Response, NextFunction } from 'express';
import { response as resp } from '../constants/index';
import { verify } from '../helpers/jwt'
import { ServerError, Forbidden, UnAuth } from '../constants/errors';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const response = resp();
    try {
        if (!req.headers.authorization) throw new UnAuth('middlewares.auth', 'Auth. missing !');

        const verified = verify(req.headers.authorization.split(' ')[1]);
        
        if (verified) return next();
        
        throw new Forbidden('middlewares.auth', 'Token status false !');
    } catch (error) {
        console.error(error);
        response.status = false;
        response.httpStatus = error.httpStatus || 500;
        response.desc = error.message || 'Unkown Error';
        return res.status(error.httpStatus).json(response);
    }
};