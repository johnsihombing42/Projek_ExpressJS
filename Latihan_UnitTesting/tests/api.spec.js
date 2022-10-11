const request = require("supertest");
const app = require("../app");

// endpoint GET /
describe("base.index function", () => {
  // case success
  test("res.json called with { status: true, message: hello world! }", async () => {
    try {
      const res = await request(app).get("/");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("hello world!");
    } catch (err) {
      console.log(err);
    }
  });
});

describe("base.sum function", () => {
  test("res.json return summary of x + y", async () => {
    try {
      const x = 13;
      const y = 31;
      const result = x + y;
      const res = await request(app).post("/sum").send({ x, y });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("parameters summarized!");
      expect(res.body.data).toStrictEqual({ x, y, result });
    } catch (err) {
      console.log(err);
    }
  });
});
