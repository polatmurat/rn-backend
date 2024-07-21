import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
// const helpers = require('./src/helpers');
let port = 8080;
const app = express();
import db from './src/db';

console.log(process.env.DEV_MODE);


