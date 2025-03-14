// class Deferred {
//   constructor() {
//     this.chain = [];
//     this.value = undefined;
//   }

//   then(callback) {
//     this.chain.push(callback);
//     return this; // Allow chaining
//   }

//   resolve(value) {
//     this.value = value; // Store initial value
//     this.chain.forEach(this.executeCallback, this);
//   }

//   executeCallback(callback) {
//     this.value = callback(this.value); // Update value with each callback result
//   }
// }

// class Deferred {
//   constructor() {
//     this.chain = [];
//   }

//   then(callback) {
//     this.chain.push(callback);
//     return this; // Allow chaining
//   }

//   resolve(value) {
//     let currentValue = value; // Initialize with the input value
//     this.chain.forEach((callback) => {
//       currentValue = callback(currentValue); // Update value through the chain
//     });
//   }
// }

class Deferred {
  constructor() {
    this.chain = [];
    this.value = undefined;
  }

  then(callback) {
    this.chain.push(callback);
    return this; // Allow chaining
  }

  resolve(value) {
    this.value = value; // Set initial value

    // Mediate variable storing the correctly bound function
    const methodRef = this.runCallbackName.bind(this);

    this.chain.forEach(methodRef); // Passing only the function name
  }

  runCallbackName(callback) {
    this.value = callback(this.value); // Update value with each callback result
  }
}


const d = new Deferred();
d.then(function (res) {
  console.log("1 ", res);
  return "a";
});
d.then(function (res) {
  console.log("2 ", res);
  return "b";
});
d.then(function (res) {
  console.log("3 ", res);
  return "c";
});
d.resolve("hello");

Function.prototype.myBind = function (context, ...args) {
  return (...newArgs) => this.apply(context, [...args, ...newArgs]);
};

const person = {
  name: "Alice",
};

function greet(age, country) {
  console.log(
    `Hello, my name is ${this.name}. I'm ${age} years old and live in ${country}.`
  );
}

const greetAlice = greet.myBind(person, 25);

greetAlice("USA");

const first = (callback) => {
  // Как будто бы запрос к API
  setTimeout(() => {
    console.log(1);
    callback();
  }, 500);
};

const second = () => {
  console.log(2);
};

first(second);

// T.get("search/tweets", params, (err, data, response) => {
//   if (!err) {
//     // Происходит какая-то магия
//   } else {
//     console.log(err);
//   }
// });

// const params = {
//   q: "JavaScript", // Search query
//   count: 10, // Number of tweets to return
//   lang: "en", // Language filter
// };

// if (!err) {
//   console.log(data); // Logs the response object
// }
// if (!err) {
//   data.statuses.forEach((tweet) => {
//     console.log(tweet.text);
//   });
// }

// const { TwitterApi } = require("twitter-api-v2");

// const client = new TwitterApi({
//   appKey: "YOUR_API_KEY",
//   appSecret: "YOUR_API_SECRET",
//   accessToken: "YOUR_ACCESS_TOKEN",
//   accessSecret: "YOUR_ACCESS_SECRET",
// });

// async function fetchTweets() {
//   try {
//     const tweets = await client.v2.search("JavaScript", { max_results: 5 });
//     tweets.data.forEach((tweet, index) =>
//       console.log(`${index + 1}: ${tweet.text}\n`)
//     );
//   } catch (error) {
//     console.error("Error fetching tweets:", error);
//   }
// }

// fetchTweets();


