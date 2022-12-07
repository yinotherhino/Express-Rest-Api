const supertest = require('supertest');
const server = require("../lib/app");
const axios = require("axios");

const HOST = process.env.HOST;

const getAuth= ()=>{
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11aGFtbWVkYmF5ZXJvIiwiaXNBZG1pbiI6ZmFsc2UsImVtYWlsIjoibXVoYW1tZWQxMjM0QGdtYWlsLmNvbSIsImlkIjoiNjM5MDNkMGEwNTNmODEyMTM3MGRmOGUzIiwiaWF0IjoxNjcwNDIyMDEzLCJleHAiOjE2NzA4NTQwMTN9.8bjHygg6l331vgqF3hgoFA9RLeVrBXmGIkDSjF-__-Q"
     // return axios.post(`${HOST}/login`, {username: "yino", password:"123"})
    //     .then(apiRes => {
    //         return apiRes.data.token
    //     })
}

describe(" get /movies && /users authenticated Status Codes", ()=>{
    it('GET /users - Success 200 -', async ()=>{
        const auth = getAuth();
        const{ statusCode, body } = await supertest(server).get("/users")
        .set('Authorization', 'Bearer ' + auth);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({message: "Successful"}));
    })

    it('GET /movies - Success 200 -', async ()=>{
        const auth = getAuth();
        const{ statusCode, body } = await supertest(server).get("/movies")
        .set('Authorization', 'Bearer ' + auth);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({message: "Successful"}));
    })

    it('GET /movies/e5785e27-88c1-4ca8-98e2-84c335f2c81c - Success 200 -', async ()=>{
        const auth = getAuth();
        const{ statusCode, body } = await supertest(server).get("/movies/e5785e27-88c1-4ca8-98e2-84c335f2c81c")
        .set('Authorization', 'Bearer ' + auth);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({message: "Successful"}));
    })

    it('GET /users/638d2ee11ba112eb22fb188a- Success 200 -', async ()=>{
        const auth = getAuth();
        const{ statusCode, body } = await supertest(server).get("/users/638d2ee11ba112eb22fb188a")
        .set('Authorization', 'Bearer ' + auth);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({message: "Successful"}));
    })

})

describe(" POST /movies && /users authenticated Status Codes", ()=>{
    // it('POST /users - Success 200 -', async ()=>{
    //     const auth = getAuth();
    //     const{ statusCode, body } = await supertest(server).post("/users")
    //     .send({
    //         "username": "yino2022",
    //         "password": "123",
    //         "email": "yino@rhino.com",
    //         "fullname": "yino the rhino",
    //     })
    //     .set('Authorization', 'Bearer ' + auth);
    //     expect(statusCode).toEqual(201);
    //     expect(body).toEqual(expect.objectContaining({message: "signup successful"}));
        
    // })

    it('POST /movies - Success 200 -', async ()=>{
        const auth = getAuth();
        const{ statusCode, body } = await supertest(server).post("/movies")
        .send({
            "title": "The cow that killed the fish",
            "description": "If the sun does not go up at night, the fish may not catch the fisherman with a hook",
            "image": "https://media.istockphoto.com/id/1295114854/photo/empty-red-armchairs-of-a-theater-ready-for-a-show.jpg?s=1024x1024&w=is&k=20&c=cSI-8stXlD8mieP_sD7jCDdWwrSXEV1w7TbTZo2TSRs=",
            "price": "$34",
        })
        .set('Authorization', 'Bearer ' + auth);
        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({message: "Movie added successfully"}));
    })

})

describe(" PUT /movies && /users authenticated Status Codes", ()=>{
    it('PUT /users/email - Success 200 -', async ()=>{
        const auth = getAuth();
        const{ statusCode, body } = await supertest(server).put("/users/muhammed1234@gmail.com")
        .send({
            "username": "yino2022",
            "password": "123",
            "email": "yino@rhino.com",
            "fullname": "yino the rhino",
        })
        .set('Authorization', 'Bearer ' + auth);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({message: "User updated successfully"}));
        
    })

    it('PUT /movies/id - Success 200 -', async ()=>{
        const auth = getAuth();
        const{ statusCode, body } = await supertest(server).put("/movies/eb3ecfa8-1139-4c5e-9834-91a1b399640e")
        .send({
            "description": "The winter games",
        })
        .set('Authorization', 'Bearer ' + auth);
        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({message: "Movie updated successfully"}));
    })

    it('PUT /movies - Success 200 -', async ()=>{
        const auth = getAuth();
        const{ statusCode, body } = await supertest(server).put("/movies")
        .send({
            "description": "The winter games",
            "id":"eb3ecfa8-1139-4c5e-9834-91a1b399640e"
        })
        .set('Authorization', 'Bearer ' + auth);
        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({message: "Movie updated successfully"}));
    })

})




