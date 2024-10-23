import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
import indexRouter from './routes/indexRouter.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use('/', indexRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`====== server is running on port ${PORT}! ======`);
})