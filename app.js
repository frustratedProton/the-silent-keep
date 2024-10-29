import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import indexRouter from './routes/indexRouter.js';
import dotenv from 'dotenv';
import passport from './config/passport.js';
import CustomError, { CustomNotFoundError, CustomConflictError } from './middleware/customErrorMiddleware.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// session initialization
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use('/', indexRouter);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`====== server is running on port ${PORT}! ======`);
});
