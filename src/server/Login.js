import DataJson from "../database/user.json";
const Fetch_User = (data) => {
  return new Promise((resolve, reject) => {
    const user = DataJson.content.find(
      (user) =>
        user.username === data.username && user.password === data.password
    );
    if (user) {
      resolve(user);
    } else {
      resolve(false);
    }
  });
};

export { Fetch_User };
