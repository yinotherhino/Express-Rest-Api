const supertest = require('supertest');
const server = require("../build/app");

describe("index / Status Codes", ()=>{
    it('GET / - Success 200 -', async ()=>{
        const{ statusCode } = await supertest(server).get("/");
        expect(statusCode).toEqual(200);
    })
    it('GET /movies/2/3 - Failure 200 - wrong path', async ()=>{
        const{ statusCode } = await supertest(server).get("/2/3");
        expect(statusCode).toEqual(404);
    })
    it('POST / - failure 404 -', async ()=>{
        const{ statusCode } = await supertest(server).post("/");
        expect(statusCode).toEqual(404);
    })
    it('PUT / - failure 404 -', async ()=>{
        const{ statusCode } = await supertest(server).put("/");
        expect(statusCode).toEqual(404);
    })
    it('DELETE / - failure 404 -', async ()=>{
        const{ statusCode } = await supertest(server).delete("/");
        expect(statusCode).toEqual(404);
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

describe("movies / Status Codes", ()=>{
    it('GET /movies - Success 200 -', async ()=>{
        const{ statusCode } = await supertest(server).get("/movies");
        expect(statusCode).toEqual(200);
    })

    it('GET /movies/1 - Success 200 -', async ()=>{
        const{ statusCode } = await supertest(server).get("/movies/1");
        expect(statusCode).toEqual(200);
    })
    it('GET /movies/2/3 - Failure 404 -', async ()=>{
        const{ statusCode } = await supertest(server).get("/movies/1/3");
        expect(statusCode).toEqual(404);
    })
    it('POST / - failure 403 - Access Denied', async ()=>{
        const{ statusCode } = await supertest(server).post("/movies").send({   
            "title": "God's must be crazy",
            "description": "You know it's God's not God, because he cant be.",
            "image": "https://mymovieimage.com",
            "price": 8000,
           });
        expect(statusCode).toEqual(403);
    })
    it('PUT / - failure 403 -Access denied', async ()=>{
        const{ statusCode } = await supertest(server).put("/movies/6").send({   
            "title": "God's must be crazy",
            "description": "You know it's God's not God, because he cant be.",
            "image": "https://mymovieimage.com",
            "price": 8000,
           });
        expect(statusCode).toEqual(403);
    })
    it('DELETE / - failure 403 - Access denied', async ()=>{
        const{ statusCode } = await supertest(server).delete("/movies/6");
        expect(statusCode).toEqual(403);
    })

})

describe("users / Status Codes", ()=>{
    it('GET /users/2 - Success 200 -', async ()=>{
        const{ statusCode } = await supertest(server).get("/users/3");
        expect(statusCode).toEqual(200);
    })
    it('GET /users - Success 200 -', async ()=>{
        const{ statusCode } = await supertest(server).get("/users/");
        expect(statusCode).toEqual(200);
    })
    it('GET /users/2/3 - Failure 404 -', async ()=>{
        const{ statusCode } = await supertest(server).get("/users/2/3");
        expect(statusCode).toEqual(404);
    })
    it('POST /users - failure 403 - Access Denied', async ()=>{
        const{ statusCode } = await supertest(server).post("/users");
        expect(statusCode).toEqual(404);
    })
    it('PUT /users - failure 403 -Access denied', async ()=>{
        const{ statusCode } = await supertest(server).put("/users");
        expect(statusCode).toEqual(404);
    })
    it('DELETE /users - failure 403 - Access denied', async ()=>{
        const{ statusCode } = await supertest(server).delete("/users");
        expect(statusCode).toEqual(404);
    })

})