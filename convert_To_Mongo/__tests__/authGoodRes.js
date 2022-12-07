const supertest = require('supertest');
const server = require("../lib/app");
const axios = require("axios");

const HOST = process.env.HOST;

const getAuth= ()=>{
    return axios.post(`${HOST}/login`, {username: "yino", password:"123"})
        .then(apiRes => {
            return apiRes.data.token
        })
}

describe("/movies && /users authenticated Status Codes", ()=>{


    it('GET /users - Success 200 -', async ()=>{
        const auth = await getAuth();
        const{ statusCode, body } = await supertest(server).get("/users")
        .set('Authorization', 'Bearer ' + auth);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({message: "Successful"}));
    })

    it('GET /movies - Success 200 -', async ()=>{
        const auth = await getAuth();
        const{ statusCode, body } = await supertest(server).get("/movies")
        .set('Authorization', 'Bearer ' + auth);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({message: "Successful"}));
    })

    it('GET /movies/e5785e27-88c1-4ca8-98e2-84c335f2c81c - Success 200 -', async ()=>{
        const auth = await getAuth();
        const{ statusCode, body } = await supertest(server).get("/movies/e5785e27-88c1-4ca8-98e2-84c335f2c81c")
        .set('Authorization', 'Bearer ' + auth);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({message: "Successful"}));
    })

    it('GET /users/e5785e27-88c1-4ca8-98e2-84c335f2c81c - Success 200 -', async ()=>{
        const auth = await getAuth();
        const{ statusCode, body } = await supertest(server).get("/movies/e5785e27-88c1-4ca8-98e2-84c335f2c81c")
        .set('Authorization', 'Bearer ' + auth);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({message: "Successful"}));
    })




    

    // var auth = {};
    // before(loginUser(auth));

})

