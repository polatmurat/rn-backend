import { response as resp } from '../../constants/index';
import { checkRepo, loginRepo, registerRepo } from '../../repositories/auth';
import { MySql } from '../../db/MySql';
import { Request, Response } from 'express';
import { createToken, hashedPassword } from '../../helpers/jwt';


export const login = async (req: Request, res: Response) => {
    const response = resp();

    const { email, password } = req.body;
    try {
        const hashed = (await hashedPassword(password)).toString();
        const user = await loginRepo(email, hashed);
        if (user.success) {
            const token = createToken(user.data);
            response.httpStatus = 200;
            response.desc = 'Login Successful.';
            response.status = true;
            response.result = { token, user: user.data };
        } else {
            response.httpStatus = 400;
            response.desc = 'Login Failure.';
            response.status = false;
        }
    } catch (error) {
        console.error(error);
        response.status = false;
        response.httpStatus = error.httpStatus || 500;
        response.desc = error.message || 'Unkown Error';
    }
    return res.status(response.httpStatus).json(response);
};

export const register = async (req: Request, res: Response) => {
    const response = resp();

    try {
        const { username, email, password, name } = req.body;

        const check = await checkRepo(username, email);

        if (!check.status) {
            response.desc = `Register failure. This ${check.path} is already taken.`;
            response.httpStatus = 401;
            response.status = false;
            response.result = check;
            return res.status(response.httpStatus).json(response);
        }

        const hashed = (await hashedPassword(password)).toString();

        await registerRepo(username, email, hashed, name);

        const token = createToken({ username, name });
        response.result = { token, username, email, name };
        response.status = true;
        response.httpStatus = 201;
        response.desc = 'Successfully registered.'
    } catch (error) {
        console.error(error);
        response.status = false;
        response.httpStatus = error.httpStatus || 500;
        response.desc = error.message || 'Unkown Error';
    }




}