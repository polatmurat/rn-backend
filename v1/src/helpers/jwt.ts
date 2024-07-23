import jwt from 'jsonwebtoken';
import { ServerError, Forbidden } from '../constants/errors';
import bcrypt from 'bcrypt';


/**
 * jwt token verify and decode
 * 
 * @param {String} token 
 * @returns 
 */

export const createToken = (user) => {
    return jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error(error);
        if (error instanceof jwt.TokenExpiredError) throw new Forbidden('helpers.jwt.verify', 'token expired!');
        if (error instanceof jwt.JsonWebTokenError) throw new Forbidden('helpers.jwt.verify', 'token error !');
        throw new ServerError('helpers.jwt.verify', 'server error !');
    }
};

export const hashedPassword = async (password: string): Promise<String> => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};


export const comparePassword = async (password: string, dbPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, dbPassword);
};