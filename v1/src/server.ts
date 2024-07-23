import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
config();
let port = Number(process.env.PORT);
import expressJSDocSwagger from 'express-jsdoc-swagger';
import swagger from './middlewares/swagger'
import { MySql as db } from './db/MySql';
import routes from './routes/index';
const app = express();

if (['development', 'local'].includes(process.env.NODE_ENV)) {
    port = 5556;
}

async function connector(): Promise<void> {
    await db.connector();
}

connector();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
expressJSDocSwagger(app)(swagger);

// def
app.get('/', (req: Request, res: Response) => {
    return res.json(
        { status: true, desc: `RNCource v1 api service - ${process.env.NODE_ENV}` }
    );
});

app.use('/api', routes);

/**
 * 404
 */
app.use(function (req, res) {
    return res.status(404).json(
        {
            status: false,
            desc: 'No endpoint!',
            result: []
        }
    );
});

app.listen(port, () => {
    console.log(`rn-course v1 - PORT: ${port}`);
});




