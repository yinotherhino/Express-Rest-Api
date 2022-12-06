import express, { Request, Response } from "express";

import { UserObj, UserResObj } from "../interfaces/typings";

import addUser from '../controller/users/addUser';
import updateUser from "../controller/users/updateUser";
import deleteUser from "../controller/users/deleteUser";
import reqbodycheck from '../services/reqbodycheck';
import { option, RegisterSchema } from "../services/joiValidation";
import usersModel from "../models/usersSchema";

const router = express.Router();

