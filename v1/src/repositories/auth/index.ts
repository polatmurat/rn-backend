import { pool } from '../../db/MySql';
import { NotFound, ServerError } from '../../constants/errors';
import { ResultSetHeader } from 'mysql2';


export const loginRepo = async (email: string) => {
    try {
        const [data] = await pool.query('SELECT * FROM users WHERE email=? LIMIT 1', [email]);

        if (Array.isArray(data) && data.length > 0) return { success: true, data };
    } catch (error) {
        console.error(error);
        throw new ServerError('repositories.users.login', 'repos error !');
    }

    throw new NotFound('repositories.auth.login', 'user not found !');
};

export const registerRepo = async (email: string, password: String, name: string) => {
    try {
        const [data] = await pool.query<ResultSetHeader>('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, password]);
                
        if (data.insertId > 0) return { id: data.insertId };
    } catch (error) {
        console.error(error);
        throw new ServerError('repositories.auth.register', 'repos error !');
    }
};

export const checkRepo = async (email: string) => {
    try {
        const [dataemail] = await pool.query('SELECT email FROM users WHERE email=?', [email]);
        if (Array.isArray(dataemail) && dataemail.length > 0) return { status: false, path: 'email' };

        return { status: true };
    } catch (error) {
        console.error(error);
        throw new ServerError('repositories.auth.check', 'repos error !');
    }
};