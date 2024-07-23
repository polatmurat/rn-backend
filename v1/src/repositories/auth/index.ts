import { pool } from '../../db/MySql';
import { NotFound, ServerError } from '../../constants/errors';


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

export const registerRepo = async (username: string, email: string, password: String, name: string) => {
    try {
        const [data] = await pool.query('INSERT INTO users (username, email, password, name) VALUES (?,?,?,?)', [username, email, password, name]);
        if (Array.isArray(data) && data.length > 0) return { success: true, data };
    } catch (error) {
        console.error(error);
        throw new ServerError('repositories.auth.register', 'repos error !');
    }
};

export const checkRepo = async (username: string, email: string) => {
    try {
        const [datausername] = await pool.query('SELECT username FROM users WHERE username=?', [username]);
        if (Array.isArray(datausername) && datausername.length > 0) return { status: false, path: 'username' };

        const [dataemail] = await pool.query('SELECT email FROM users WHERE email=?', [email]);
        if (Array.isArray(dataemail) && dataemail.length > 0) return { status: false, path: 'email' };

        return { status: true };
    } catch (error) {
        console.error(error);
        throw new ServerError('repositories.auth.check', 'repos error !');
    }
};