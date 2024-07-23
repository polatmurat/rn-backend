import { response as resp } from '../../constants/index';
import { checkRepo, loginRepo, registerRepo } from '../../repositories/auth';
import { Request, Response } from 'express';
import { comparePassword, createToken, hashedPassword } from '../../helpers/jwt';
import User from '../../models/User';

export const login = async (req: Request, res: Response) => {
    const response = resp();

    const { email, password } = req.body;
    try {
        const userResult = await loginRepo(email);

        const user = userResult.data as User[];
        if (user.length > 0) {
            if (await comparePassword(password, user[0].password)) {
                const token = createToken(user[0].id.toString(), user[0].username);
                response.desc = 'Login Successful.';
                response.result = { token, user };
            } else {
                response.httpStatus = 400;
                response.desc = 'Login Failure.';
                response.status = false;
            }
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

        const hashed = await hashedPassword(password);

        const userResult = await registerRepo(username, email, hashed, name);

        const user = userResult.data as User[];

        if (user.length > 0) {
            const token = createToken(user[0].id.toString(), user[0].username);
            response.result = { token, user };
            response.desc = 'Successfully registered.'
        }
    } catch (error) {
        console.error(error);
        response.status = false;
        response.httpStatus = error.httpStatus || 500;
        response.desc = error.message || 'Unkown Error';
    }
    return res.status(response.httpStatus).json(response);
};