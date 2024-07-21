import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
config();
let port = 3000;
import expressJSDocSwagger from 'express-jsdoc-swagger';
import swagger from './middlewares/swagger'
import { MySql as db } from './db/MySql';
const app = express();

if (['development', 'local'].includes(process.env.NODE_ENV)) {
    port = 3001;
}

async function connector() {
    await db.connector();
}

connector();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
expressJSDocSwagger(app)(swagger);



