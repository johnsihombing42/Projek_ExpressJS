const base = require("../controllers/baseController.js");
const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

// endpoint GET /
describe("base.index function", () => {
  // case success
  test("res.json called with { status: true, message: hello world! }", (done) => {
    const req = mockRequest();
    const res = mockResponse();

    base.index(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: true,
      message: "hello world!",
    });

    done();
  });
});

// endpoint POST /sum
describe("base.sum function", () => {
  test("res.json return summary of x + y", (done) => {
    const req = mockRequest({ x: 13, y: 76 });
    const res = mockResponse();

    base.sum(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: true,
      message: "parameters summarized!",
      data: {
        x: req.body.x,
        y: req.body.y,
        result: req.body.x + req.body.y,
      },
    });

    done();
  });
});
