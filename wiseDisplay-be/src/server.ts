import express, { Application } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import * as dotenv from "dotenv";
import cors from 'cors';

import { router } from './routes';

dotenv.config();

const app: Application = express();

const port = process.env.PORT || 8080;

app.use(cors());

app.use(compression());
app.use(bodyParser());

const server = http.createServer(app);


server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});

app.use('/api', router);
