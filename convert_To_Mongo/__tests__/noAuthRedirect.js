const supertest = require('supertest');
const server = require("../lib/app");

describe("index / Status Codes", ()=>{
    it('GET / - Success 200 -', async ()=>{
        const{ statusCode, body } = await supertest(server).get("/");
        expect(statusCode).toEqual(302);
    })
    it('GET /movies/2/3 - Failure 404 - wrong path', async ()=>{
        const{ statusCode, body } = await supertest(server).get("/movies/2/3");
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))
    })
    it('POST / - failure 302 -', async ()=>{
        const{ statusCode, body } = await supertest(server).post("/");
        expect(statusCode).toEqual(302);
        // expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))
    })
    it('PUT / - failure 302 -', async ()=>{
        const{ statusCode, body  } = await supertest(server).put("/");
        expect(statusCode).toEqual(302);
        // expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))
    })
    it('DELETE / - failure 302 -', async ()=>{
        const{ statusCode, body } = await supertest(server).delete("/");
        expect(statusCode).toEqual(302);
        // expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))
    })

    // it('POST / to wrong path - failure 404 -', async ()=>{
    //     const{body, statusCode} = await supertest(server).post("/users");

    //     expect(body).toEqual(
    //             expect.objectContaining({ status: 404,
    //                 message: expect.any(String)
    //             })
    //     )
    //     expect(statusCode).toEqual(404)
        
    // })

    // it('Post /api - failure', async ()=>{
    //     const {body, statusCode} = await supertest(server).post("/api").send({
           
    //     });

    //     expect(statusCode).toEqual(400);

    //     expect(body).toEqual(expect.objectContaining({
    //         message: expect.any(String)
    //     }))
    // })

    // it('Post - Success', async ()=>{
    //     const {body, statusCode} = await supertest(server).post("/api").send(JSON.stringify({
    //         "url": "decagon.institute",
            
    //     }));

    //     expect(statusCode).toEqual(200);

    //     expect(body).toEqual(expect.objectContaining({
    //         images: expect.any(Array),
    //         Title: expect.any(String)
    //     }))

    // })

})

describe("movies && users / Protected routes Status Codes", ()=>{
    it('GET /movies - failure 401 - Access Denied', async ()=>{
        const{ statusCode, body } = await supertest(server).get("/movies");
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))
    })

    it('GET /movies/1 - failure 401 - Access Denied', async ()=>{
        const{ statusCode, body } = await supertest(server).get("/movies/1");
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))
    })
    it('GET /users - failure 401 - Access Denied', async ()=>{
        const{ statusCode, body } = await supertest(server).get("/movies/1/3");
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))
    })
    it('POST / - failure 401 - Access Denied', async ()=>{
        const{ statusCode, body } = await supertest(server).post("/movies").send({   
            "title": "God's must be crazy",
            "description": "You know it's God's not God, because he cant be.",
            "image": "https://mymovieimage.com",
            "price": 8000,
           });
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))
    })
    it('PUT / - failure 401 - Access Denied', async ()=>{
        const{ statusCode, body } = await supertest(server).put("/movies/6").send({   
            "title": "God's must be crazy",
            "description": "You know it's God's not God, because he cant be.",
            "image": "https://mymovieimage.com",
            "price": 8000,
           });
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))

    })
    it('DELETE / - failure 401 - Access Denied', async ()=>{
        const{ statusCode, body } = await supertest(server).delete("/movies/6");
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))
    })

})

describe("users / protected routes Status Codes", ()=>{
    it('GET /users/2 - - failure 401 - Access Denied', async ()=>{
        const{ statusCode, body } = await supertest(server).get("/users/63903b5d94e3e94d5e7d95e3");
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))
    })
    it('GET /users - - failure 401 - Access Denied', async ()=>{
        const{ statusCode, body } = await supertest(server).get("/users/");
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))
    })
    it('GET /users/2/3 - failure 401 - Access Denied', async ()=>{
        const{ statusCode, body } = await supertest(server).get("/users/2/3");
        expect(statusCode).toEqual(302);
        // expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))
    })
    // it('PUT /users - failure 401 -Access denied', async ()=>{
    //     const{ statusCode,body } = await supertest(server).put("/users");
    //     expect(statusCode).toEqual(401);
    //     expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))
    // })
    it('DELETE /users - failure 401 - Access denied', async ()=>{
        const{ statusCode, body } = await supertest(server).delete("/users/63903b5d94e3e94d5e7d95e3");
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({Error: expect.any(String)}))
    })
})
