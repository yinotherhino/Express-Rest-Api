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
import signinRouter from './routes/signin';
import signupRouter from './routes/signup';
import signoutRouter from './routes/signout';

import reqErrorHandler from './services/reqErrorHandler';
import connectDb from './config/connectDb';
import { authToken } from './middleware/authToken';
import usersModel from './models/usersSchema';
import { genSalt } from 'bcrypt';
import { generatePassword } from './services/joiValidation';

const app: Express = express();


config();
connectDb().then(async()=>{
  // const salt= await genSalt()
  // await usersModel.create({email:"admintest23@gmail.com", password: await generatePassword("1234", salt), fullname:"Admin 1234", username:"admin1234", salt, isAdmin:'true'})
});
// view engine setup
app.set('views', path.join(process.cwd(), '././.', 'views'));
app.set('view engine', 'pug');

const secret = process.env.SESSION_SECRET || 'yinotherhinoInc@123@#$';

app.use(logger('dev'));

app.use(cors({origin: process.env.HOST}))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(secret));
app.use(express.static(path.join(process.cwd(),  './././','public')));

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signin', signinRouter)
app.use('/signup', signupRouter)
app.use('/signout', signoutRouter)
app.use('/users', usersRouter);
app.use('/movies', authToken, moviesRouter);
// app.use('/', frontendAuthToken, indexRouter);
app.use('/', indexRouter);

app.use('*', (req,res)=>{
  res.status(404).json({Error:'page not found'})
})

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

app.listen( ()=>{
  console.log(`server started on port ${process.env.PORT}`)
})
// //not heroku
// app.listen( ()=>{
//   console.log(`server started on port ${process.env.PORT}`)
// })

module.exports = app;
