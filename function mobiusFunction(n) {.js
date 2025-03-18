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
    let attempts = 3; // Limit to 3 attempts
    let validInput = false;

    while (attempts > 0 && !validInput) {
        let input = prompt(`Enter a positive integer (Remaining attempts: ${attempts}):`);
        
        if (input === null) {
            alert("You have cancelled the input. Exiting.");
            return; // Exit if the user presses "Cancel"
        }

        let number = parseInt(input, 10); // Convert to number

        if (isNaN(number) || number <= 0) {
            alert("Invalid input. Please enter a positive integer.");
            attempts--; // Decrease remaining attempts
        } else {
            // If input is valid, proceed with calculation
            validInput = true;
            delayedCalculation(number)
                .then(result => alert(`Möbius function result: ${result}`))
                .catch(error => {
                    alert(error);
                    attempts--; // Decrease remaining attempts if there's an error
                });
        }
    }

    if (attempts === 0) {
        alert("You have exceeded the maximum number of attempts.");
    }
}

// Start the process
askForNumber();
