function mobiusFunction(n) {
  if (n === 1) return 1;
  let factors = new Set();
  let x = n;

  for (let i = 2; i * i <= n; i++) {
    if (x % i === 0) {
      factors.add(i);
      x /= i;
      if (x % i === 0) return 0;
    }
  }
  if (x > 1) factors.add(x);

  return factors.size % 2 === 0 ? 1 : -1;
}

function delayedCalculation(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof n === "number" && Number.isInteger(n) && n > 0) {
        resolve(mobiusFunction(n));
      } else {
        reject("Invalid input. Please enter a positive integer.");
      }
    }, 1000);
  });
}

function askForNumber() {
  let input = prompt("Enter a positive integer:");
  let number = parseInt(input, 10); // Convert input to integer

  if (isNaN(number) || number <= 0) {
    alert("Invalid input. Please enter a positive integer.");
    askForNumber(); // Retry input
  } else {
    delayedCalculation(number)
      .then((result) => alert(`Möbius function result: ${result}`))
      .catch((error) => {
        alert(error);
        askForNumber(); // Retry input on failure
      });
  }
}

// Start the input loop
askForNumber();
