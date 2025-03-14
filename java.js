class Deferred {
  constructor() {
    this.chain = [];
  }

  then(callback) {
    this.chain.push(callback);
    return this;
  }

  resolve(value) {
    let currentValue = value;
    // Using `forEach` to iterate over the chain of callbacks
    this._processChain(currentValue);
  }

  _processChain(value) {
    this.chain.forEach((callback) => {
      value = callback(value); // pass the value through each callback
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
