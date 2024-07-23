import MySQL from 'mysql2/promise';
import 'colors';
import { ServerError } from '../constants/errors';

let pool: MySQL.Pool;
let tryed = 0;

async function connector(): Promise<void> {
    console.log('Trying to connect MySQL'.blue.italic);
    pool = MySQL.createPool({
        connectionLimit: 20,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    try {
        await pool.getConnection();
        console.log(`Connected to MySQL`.blue.inverse);
        tryed = 0;
    } catch (error) {
        console.error(error);
        if (tryed <= 3) {
            console.log(tryed + ' MySQL will trying to connect again.');
            await new Promise(r => setTimeout(r, 30000));
            tryed++;
            connector();
        } else {
            console.log('Can\'t connect to the MySQL, no more won\'t be trying to connect.'.red.bold);
        }
    }
}

export const MySql = { connector };
export {pool}