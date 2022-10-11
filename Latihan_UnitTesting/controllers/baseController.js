module.exports = {
  index: (req, res) => {
    return res.status(200).json({
      status: true,
      message: "hello world!",
    });
  },
};
