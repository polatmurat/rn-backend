import jwt from 'jsonwebtoken';
import { response as resp } from '../constants/index';
import { ServerError, Forbidden } from '../constants/errors';
import { NextFunction } from 'express';

export const create = (data, options) => {
    try {
        return jwt.sign(data, process.env.JWT_SECRET, options);
    } catch (error) {
        console.error(error);
    }
    return false;
};

/**
 * jwt token verify and decode
 * 
 * @param {String} token 
 * @returns 
 */

export const verify = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error(error);
        if (error instanceof jwt.TokenExpiredError) throw new Forbidden('helpers.jwt.verify', 'token expired!');
        if (error instanceof jwt.JsonWebTokenError) throw new Forbidden('helpers.jwt.verify', 'token error !');
        throw new ServerError('helpers.jwt.verify', 'server error !');
    }
};