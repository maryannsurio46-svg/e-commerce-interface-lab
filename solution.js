/* ======================================
   Coffee Shop System - JavaScript Tasks
====================================== */

/* ======================================
Problem 1: The Strict Type Checker
Function: checkVariable(input)
====================================== */

function checkVariable(input) {
    switch (typeof input) {
        case "string":
            return "string";
        case "number":
            return "number";
        case "boolean":
            return "boolean";
        case "bigint":
            return "bigint";
        case "undefined":
            return "undefined";
        case "object":
            return "object"; // covers objects and null
        default:
            return "unknown";
    }
}

/* Test */
console.log("Type Check:");
console.log(checkVariable("Coffee"));
console.log(checkVariable(25));
console.log(checkVariable(true));
console.log(checkVariable(null));
console.log("----------------------");



/* ======================================
Problem 2: Secure ID Generator
Function: generateIDs(count)
====================================== */

function generateIDs(count) {

    const ids = [];

    for (let i = 0; i < count; i++) {

        if (i === 5) {
            continue; // skip 5
        }

        ids.push(`ID-${i}`);
    }

    return ids;
}

/* Test */
console.log("Generated IDs:");
console.log(generateIDs(7));
console.log("----------------------");



/* ======================================
Problem 3: The Functional Sum
Function: calculateTotal(...numbers)
====================================== */

function calculateTotal(...numbers) {

    numbers.forEach(num => {
        if (typeof num !== "number") {
            throw new TypeError(
                "Invalid input: All arguments must be numbers"
            );
        }
    });

    return numbers.reduce((total, num) => total + num, 0);
}

/* Test */
console.log("Total Price:");
console.log(calculateTotal(10, 20, 5));
console.log("----------------------");



/* ======================================
Problem 4: Leaderboard Filter
Function: getTopScorers(playerList)
====================================== */

function getTopScorers(playerList) {

    const topPlayers = playerList
        .filter(player => player.score > 8)
        .map(player => player.name)
        .join(", ");

    return topPlayers;
}

/* Coffee Shop Barista Leaderboard */
const players = [
    { name: "Alice", score: 10 },
    { name: "Bob", score: 5 },
    { name: "Carlos", score: 9 },
    { name: "Diana", score: 12 },
    { name: "Ethan", score: 7 },
    { name: "Fiona", score: 11 },
    { name: "George", score: 4 },
    { name: "Hannah", score: 9 },
    { name: "Ivan", score: 6 },
    { name: "Julia", score: 10 }
];

console.log("Top Scorers:");
console.log(getTopScorers(players));
console.log("----------------------");



/* ======================================
Problem 5: The Private Inventory
Class: Item
====================================== */

class Item {

    #discount = 0.1; // private property

    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    get finalPrice() {
        return this.price - (this.price * this.#discount);
    }
}

/* Test */
const coffee = new Item("Latte", 120);

console.log("Coffee Item:");
console.log(coffee.name);
console.log("Final Price:", coffee.finalPrice);
console.log("----------------------");



/* ======================================
Problem 6: Robust Division
Function: safeDivide(a, b)
====================================== */

function safeDivide(a, b) {

    try {

        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }

        return a / b;

    } catch (error) {

        return error.message;

    } finally {

        console.log("Operation attempted");

    }
}

/* Test */
console.log("Division Test:");
console.log(safeDivide(10, 2));
console.log(safeDivide(10, 0));