const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")

beforeEach(async () => {
    // run the seeds programmatically before each test to start fresh
    await db.seed.run()
})

// this is a jest hook
afterAll(async () => {
    // close the database connection so the test process doesn't hang or give a warning
    await db.destroy()
})

// "test" format

test("GET /hobbits", async () => {
    const res = await supertest(server).get("/hobbits")
    expect(res.statusCode).toBe(200)
    // if you check content type this way, specify the charset
    //expect(res.headers["content-type"]).toBe("application/json")
    expect(res.type).toBe("application/json")
    expect(res.body).toHaveLength(4)
    expect(res.body[0].name).toBe("sam")
})

test("GET /hobbits/:id", async () => {
    const res = await supertest(server).get("/hobbits/2")
    console.log(res)
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.name).toBe("frodo")
})

test("GET /hobbits/:id - not found", async () => {
    const res = await supertest(server).get("/hobbits/50")
    console.log(res)
    expect(res.statusCode).toBe(404)
})

test("POST /hobbits", async () => {
    const res = await supertest(server)
        .post("/hobbits")
        .send({ name: "bilbo" })
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.name).toBe("bilbo")
})

// "describe it" format

// describe("hobbits integration tests", () => {
//     it("GET /hobbits", async () => {
//         const res = await supertest(server).get("/hobbits")
//         expect(res.statusCode).toBe(200)
//         // if you check content type this way, specify the charset
//         //expect(res.headers["content-type"]).toBe("application/json")
//         expect(res.type).toBe("application/json")
//         expect(res.body).toHaveLength(4)
//         expect(res.body[0].name).toBe("sam")
//     })

//     it("GET /hobbits/:id", async () => {
//         const res = await supertest(server).get("/hobbits/1")
//         expect(res.statusCode).toBe(200)
//         expect(res.type).toBe("application/json")
//         console.log(res.body)
//     })
// })

// can use either 'describe it' or 'test' format