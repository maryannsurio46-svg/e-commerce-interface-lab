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
      return "object"; // includes null
    default:
      return "unknown";
  }
}
function generateIDs(count) {
  const ids = [];

  for (let i = 0; i < count; i++) {
    if (i === 5) {
      continue;
    }
    ids.push(`ID-${i}`);
  }

  return ids;
}
function calculateTotal(...numbers) {
  if (!numbers.every(n => typeof n === "number")) {
    throw new TypeError("Invalid input: All arguments must be numbers");
  }

  return numbers.reduce((sum, num) => sum + num, 0);
}
function getTopScorers(playerList) {
  return playerList
    .slice(0, 10)
    .filter(player => player.score > 8)
    .map(player => player.name)
    .join(", ");
}
class Item {
  #discount = 0.1;

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  get finalPrice() {
    return this.price - (this.price * this.#discount);
  }
}

// Test
const item1 = new Item("Laptop", 1000);
console.log(item1.finalPrice); // 900
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