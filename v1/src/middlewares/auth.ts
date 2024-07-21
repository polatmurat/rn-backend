import { NextFunction } from "express";
import { response as resp } from '../constants/index';
import { verify } from '../helpers/jwt'
import { ServerError, Forbidden, UnAuth } from '../constants/errors';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const response = resp();

    try {
        if (!req.headers.authorization) throw new UnAuth('middlewares.auth', 'Auth. missing !');

        const user = verify(req.headers.authorization);
        const token = await repositories.token.get(user.token_id);


    } catch (error) {

    }
};