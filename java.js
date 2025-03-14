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

class Deferred {
  constructor() {
    this.chain = [];
  }

  then(callback) {
    this.chain.push(callback);
    return this; // Allow chaining
  }

  resolve(value) {
    let currentValue = value; // Initialize with the input value
    this.chain.forEach(function (callback) {
      currentValue = callback(currentValue); // Update value through the chain
    });
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
