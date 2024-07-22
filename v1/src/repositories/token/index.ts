import { ServerError, Forbidden } from '../../constants/errors';
import { MySql } from '../../db/MySql'

const save = async (user_id: string, token_id: string, token: string, refresh_token: string, expire_at: string, type: string) => {
    try {
        const expire_in = helpers.moment.moment().add(expire_at, 'seconds').format('X');
        await MySql.execute('INSERT INTO user_tokens (type, user_id, token_id, token, refresh_token, expire_at, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [type, user_id, token_id, token, refresh_token, expire_in, true]
        );
        return true;
    } catch (error) {
        console.error(error);
        throw new ServerError('repositories.token.save', 'repos error !');
    }
};

const get = async (token_id: string) => {
    try {
        const query = await MySql.execute('SELECT * FROM user_tokens WHERE token_id=? LIMIT 10', [token_id]);
        if (Array.isArray(query) && query.length > 0) {
            return query[0];
        }
    } catch (error) {
        console.error(error);
        throw new ServerError('repostories.token.get', 'repos error !');
    }
    throw new Forbidden('repositories.token.get', 'token not found !');
};

