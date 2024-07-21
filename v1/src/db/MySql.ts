import MySQL from 'mysql2/promise';
import 'colors';
import { ServerError } from '../constants/errors';

let sql: MySQL.Connection | null = null;
let tryed = 0;

async function connector(): Promise<void> {
    console.log('Trying to connect MySQL');
    let connectionString = {
        connectionLimit: 20,
        host: '127.0.0.1',
        port: 3306,
        database: 'rn-backend',
        user: 'root',
        password: '123123xxw'
    }

    try {
        sql = await MySQL.createConnection(connectionString);
        console.log(`Connected to MySQL`.magenta.italic);
        tryed = 0;
    } catch (error) {
        console.error(error);
        if (tryed <= 3) {
            console.log(tryed + ' MySQL will trying to connect again.');
            await new Promise(r => setTimeout(r, 30000));
            tryed++;
            connector();
        } else {
            console.log('Can\'t connect to the MySQL, no more won\'t be trying to connect.');
        }
    }
}

/**
 * 
 * sql execute
 * 
 * @param {string} sql 
 * @param {array} values 
 */

const execute = async (command: string, values: Array<any>) => {
    if (sql === null) {
        connector();
        throw new ServerError('db.MySql', 'mysql is not ready !');
    }
    try {
        const [rows] = await sql.execute(`${command}`, [values]);
        if (Array.isArray(rows)) {
            if (rows.length > 0) return rows;
            return [];
        }
        if (typeof rows.insertId !== 'undefined' && rows.insertId > 0) return { id: rows.insertId };
        if (typeof rows.affectedRows  !== 'undefined' && rows.affectedRows  > 0) return true;
        return false;
    } catch (error) {
        console.error(error);
        if (error.message.includes('connection')) {
            tryed = 0;
            connector();
            return false;
        }
        throw error;
    }
};

module.exports.mysql = sql;
module.exports.connector = connector;