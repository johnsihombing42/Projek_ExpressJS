module.exports = {
  index: (req, res) => {
    return res.status(200).json({
      status: true,
      message: "hello world!",
    });
  },
  sum: (req, res) => {
    const { x, y } = req.body;
    const result = x + y;

    return res.status(200).json({
      status: true,
      message: "parameters summarized!",
      data: {
        x,
        y,
        result,
      },
    });
  },
};
