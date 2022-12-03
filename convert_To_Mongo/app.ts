import createError from 'http-errors';
import express, { Request, Express, Response } from 'express';
import {config} from 'dotenv';
import cors from 'cors';

import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import moviesRouter from './routes/movies';
import loginRouter from './routes/login';
import logoutRouter from './routes/logout';

import reqErrorHandler from './services/reqErrorHandler';

const app: Express = express();

// view engine setup
app.set('views', path.join(process.cwd(), '././.', 'views'));
app.set('view engine', 'pug');

const secret = process.env.SESSION_SECRET || 'yinotherhinoInc@123@#$';
//middlewares
// heroku
app.use(cors({origin: process.env.HOST}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(secret));
app.use(express.static(path.join(process.cwd(),  './././','public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
// app.use('*', (req,res)=>{
//   res.status(404).send('page not found')
// })

app.use(reqErrorHandler);


// catch 404 and forward to error handler
app.use((req: Request, res: Response, next) => {
  next(createError(404));
});


// error handler
app.use((err:any, req:Request, res:Response ) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// const PORT = 4000;

app.listen( ()=>{
  console.log(`server started on port ${process.env.PORT}`)
})
// //not heroku
// app.listen(PORT, ()=>{
//   console.log(`server started on port ${PORT}`)
// })

module.exports = app;
