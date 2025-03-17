function getUserPassword(probCorrectPass) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const passwords = ["correct", "wrong"];
      const index = Math.random() < probCorrectPass ? 0 : 1;
      resolve(passwords[index]);
    }, 1000);
  });
}

function login(password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === "correct") {
        resolve("Login successful");
      } else {
        reject(new Error("Login failed: Incorrect password"));
      }
    }, 2000);
  });
}

function getUserData(username) {
  const users = {
    Vasya: { name: "Vasya", age: 30 },
    Petya: { name: "Petya", age: 40 },
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users[username]) {
        resolve(users[username]);
      } else {
        reject(new Error(`User ${username} not found`));
      }
    }, 1000);
  });
}

function funStackExample(username) {
  getUserPassword(0.8)
    .then((password) => {
      console.log(`Generated password: ${password}`);
      return login(password);
    })
    .then(() => getUserData(username))
    .then((userData) => {
      console.log("User Data:", userData);
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    });
}

funStackExample("Vasya");
