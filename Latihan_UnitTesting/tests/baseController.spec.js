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
