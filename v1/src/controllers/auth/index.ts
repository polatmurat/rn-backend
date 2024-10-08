import { NextFunction, Request, Response } from 'express';
import { response as resp } from '../../constants';
import { MissingField, WrongParam } from '../../constants/errors';
import { validateEmail } from '../../helpers/general';

export const loginControl = async (req: Request, res: Response, next: NextFunction) => {
    const response = resp();

    try {
        if (
            typeof req.body.email !== 'string' ||
            typeof req.body.password !== 'string'
        ) {
            throw new MissingField('controller.auth.login', 'missing field !');
        }

        if (!validateEmail(req.body.email)) throw new WrongParam('controller.auth.login', 'invalid email type');

        return next();
    } catch (error) {
        console.error(error);
        response.status = false;
        response.desc = error.message || 'Unkown Error';
        response.httpStatus = error.httpStatus || 500;
        return res.status(response.httpStatus).json(response);
    }
};

export const registerControl = async (req: Request, res: Response, next: NextFunction) => {
    const response = resp();

    try {
        if (
            typeof req.body.email !== 'string' ||
            typeof req.body.password !== 'string' ||
            typeof req.body.name !== 'string'
        ) {
            throw new MissingField('controller.auth.register', 'missing field !');
        }

        if (!validateEmail(req.body.email)) throw new WrongParam('controller.auth.register', 'wrong param, invalid email type detected.');
        if (req.body.password.length < 6) throw new WrongParam('controller.auth.register', 'wrong param, the length of password mus be at least 6 characters.');
        if (req.body.name.length < 1) throw new MissingField('controller.auth.register', 'wrong param, the name field must be filled.');

        return next();
    } catch (error) {
        console.error(error);
        response.status = false;
        response.desc = error.message || 'Unkown Error';
        response.httpStatus = error.httpStatus || 500;
        return res.status(response.httpStatus).json(response);
    }
};