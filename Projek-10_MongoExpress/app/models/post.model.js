module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      body: String,
      publisher: String,
    },
    { timestamps: true }
  );

  const Post = mongoose.model("posts", schema);
  return Post;
};
