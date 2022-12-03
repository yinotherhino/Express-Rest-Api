import { Request } from "express";

export interface UserObj {
    fullname?:string;
    email:string;
    username:string;
    password:string;
    id:number;
    isAdmin?: boolean
};

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Type>;

export type UserResObj= MakeOptional<UserObj, 'password'>

export interface moviesObj{
    title?: string;
    description? : string;
    image?: "string";
    price?: 3000;
    id: number;
    addedBy?: string
}

export type LoginObj = Omit<UserObj, 'fullname' | 'email' | 'id'>

export interface TypesRequestBody<T> extends Request{
body: T
}