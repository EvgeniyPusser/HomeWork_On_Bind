class Deferred {
  constructor() {
    this.promise = Promise.resolve();
    this.chain = [];
  }

  then(callback) {
    this.chain.push(callback);
    return this;
  }

  resolve(value) {
    let currentValue = value;
    for (const callback of this.chain) {
      currentValue = callback(currentValue);
    }
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
 
  const originalFunction = this;

 
  return function (...newArgs) {
    
    if (this instanceof originalFunction) {
      return new originalFunction(...args, ...newArgs);
    }
    
    return originalFunction.apply(context, [...args, ...newArgs]);
  };
};


const person = {
  name: 'Alice',
};

function greet(age, country) {
  console.log(`Hello, my name is ${this.name}. I'm ${age} years old and live in ${country}.`);
}

const greetAlice = greet.myBind(person, 25);

greetAlice('USA');  
