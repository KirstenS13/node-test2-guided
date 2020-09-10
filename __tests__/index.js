// import supertest
const supertest = require("supertest")
// import our server without starting the server
// make sure you export the server from index.js
const server = require("../server")

// test("a placeholder test", () => {
//     expect(2 + 2).toBe(4)
// })

// one convention is to name the test as the method and path
test("GET /", async () => {
    // use supertest by calling it as a function
    // passing in an instance of the server
    const res = await supertest(server).get("/")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Welcome to our API")
})
// We just automated some integration testing