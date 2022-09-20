const { User } = require("./models");

async function main() {
  /* create */
  const cretedUser = await User.create({
    name: "joko",
    email: "joko@mail.com",
    password: "password123",
  });
  console.log(cretedUser);

  // /* find all */
  // const users = await User.findAll();
  // users.forEach((el) => {
  //   console.log(el.get());
  // });

  // /* find one */
  // const user = await User.findOne({
  //   where: {
  //     id: 1,
  //   },
  // });
  // console.log(user.get());

  // /* updated */
  // const updated = await User.update(
  //   {
  //     name: "tukiyem",
  //     email: "tukiyem@mail.com",
  //   },
  //   {
  //     where: {
  //       id: 1,
  //     },
  //   }
  // );
  // console.log(updated);

  // /* delete */
  // const deleted = await User.destroy({
  //   where: {
  //     id: 2,
  //   },
  // });
  // console.log(deleted);
}
main();
