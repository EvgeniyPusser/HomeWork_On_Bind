function mobiusFunction(n) {
  if (n === 1) return 1;
  let factors = new Set();
  let x = n;

  for (let i = 2; i * i <= n; i++) {
    if (x % i === 0) {
      factors.add(i);
      x /= i;
      if (x % i === 0) return 0; // Квадратный делитель найден
    }
  }
  if (x > 1) factors.add(x); // Добавляем последний простой множитель, если есть

  return factors.size % 2 === 0 ? 1 : -1;
}

function sumCharCodes(str) {
  return str.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function delayedCalculation(input) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (typeof input === "number" && Number.isInteger(input) && input > 0) {
        resolve(mobiusFunction(input));
      } else if (typeof input === "string") {
        resolve(sumCharCodes(input));
      } else {
        resolve(null);
      }
    }, 1000);
  });
}

// Примеры использования
delayedCalculation(10).then(console.log); // -1 (µ(10) = -1)
delayedCalculation("Hello").then(console.log); // 500 (сумма кодов символов "Hello")
delayedCalculation(null).then(console.log); // null (неверный ввод)