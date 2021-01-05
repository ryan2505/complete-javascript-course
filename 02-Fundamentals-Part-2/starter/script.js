"use strict";
/*

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDrigersLicense) console.log("I can drive :D");


function logger() {
  console.log("My name is jonas");
}

logger();

function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

function adder(x, y) {
  return x + y;
}

console.log(adder(2, 3) + 3);


//function declaration
function calcAge1(birthYear) {
  return 2037 - birthYear;
}

console.log(calcAge1(2020));

//function expression
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

console.log(calcAge2(2023));


// arrow function

const calcAge3 = (birthYear) => 2037 - birthYear;

console.log(calcAge3(2020));

const yearsUntilRetirement = (birthYear, firstname) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  //return retirement;
  return `${firstname} retires in ${retirement} years`;
};

console.log(yearsUntilRetirement(1997, "ryan"));


function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} apples and ${orangePieces} oranges.`;
  return juice;
}

console.log(fruitProcessor(2, 3));


const calcAge = function (birthYear) {
  return 2037 - birthYear;
};

const yearsUntilRetirement = function (birthYear, firstname) {
  const retirement = 65 - calcAge(birthYear);
  if (retirement > 0) {
    return retirement;
  } else {
    return -1;
  }
};

console.log(yearsUntilRetirement(1991, "jonas"));
console.log(yearsUntilRetirement(1950, "Mike"));


const friends = ["Michael", "Steven", "Peter"];
console.log(friends);

//const years = new Array(1991, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = "Jay";
console.log(friends);

const jonas = ["Jonas", "Schmedtmann", 2037 - 1991, "teacher", friends];
console.log(jonas);

//exercise
function calcAge(birthYear) {
  return 2037 - birthYear;
}

const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[3]);

console.log(age1, age2, age3);

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);


const friends = ["Michael", "Steven", "Peter"];
const newLength = friends.push("jay");

console.log(friends);
console.log(newLength);

friends.unshift("John");
console.log(friends);

// Remove elements

friends.pop(); // last
const popped = friends.pop();
console.log(friends);
console.log(popped);

friends.shift(); // first
console.log(friends);

console.log(friends.indexOf("Steven"));

console.log(friends.includes("Steven"));
console.log(friends.includes("Bob"));

if (friends.includes("Steven")) {
  console.log("you have a friend named steven");
}


//normal array
const jonasArray = ["Jonas", "Schmedtmann", 2037 - 1991, "teacher", ["Michael", "Peter", "Steven"]];

// the same array but in an object
const jonas = {
  firstName: "jonas",
  lastName: "Schmedtmann",
  age: 2037 - 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
};
console.log(jonas);

console.log(jonas.lastName);
console.log(jonas["lastName"]);

const nameKey = "Name";

console.log(jonas[`last${nameKey}`]);

// const interesterdIn = prompt(
//   "What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends"
// );

// if (jonas[interesterdIn]) {
//   console.log(jonas[interesterdIn]);
// } else {
//   console.log("wrong request,  Choose between firstName, lastName, age, job, and friends");
// }

jonas.location = "Portugal";
jonas["twitter"] = "@jonasschmedtman";
console.log(jonas);

// challenge
// jonas has 3 friends, and his best friend is called Michael"

console.log(
  `${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`
);


const jonas = {
  firstName: "jonas",
  lastName: "Schmedtmann",
  birthYear: 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
  hasDriversLicense: true,
  // calcAge: function () {
  //   return 2037 - this.birthYear;
  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  },
  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${
      this.hasDriversLicense ? "a" : "no"
    } driver license`;
  },
};

jonas.calcAge();
console.log(jonas.age);

//Challenge
//'jonas is a 46-year old teacher, and he has a/no driver License'
//if false should say "and he has no driver license"

console.log(
  `${jonas.firstName} is a ${jonas.age}-year old ${jonas.job}, and he has ${
    jonas.hasDriversLicense ? "a" : "no"
  } driver license`
);

console.log(jonas.getSummary());


// for loop keeps running while condition is TRUE
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep}`);
}



const jonasArray = ["Jonas", "Schmedtmann", 2037 - 1991, "teacher", ["Michael", "Peter", "Steven"], true];

const types = [];

for (let i = 0; i < jonasArray.length; i++) {
  //reading from jonas array
  console.log(jonasArray[i]);
  // filling types array
  //types[i] = typeof jonasArray[i];
  types.push(typeof jonasArray[i]);
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}

console.log(ages);

// continue and break

console.log("--- ONLY STRINGS---");
for (let i = 0; i < jonasArray.length; i++) {
  if (typeof jonasArray[i] !== "string") continue;
  console.log(jonasArray[i], typeof jonasArray[i]);
}

console.log("--- BREAK WITH NUMBER---");
for (let i = 0; i < jonasArray.length; i++) {
  if (typeof jonasArray[i] === "number") break;
  console.log(jonasArray[i], typeof jonasArray[i]);
}


const jonas = ["Jonas", "Schmedtmann", 2037 - 1991, "teacher", ["Michael", "Peter", "Steven"]];

for (let i = jonas.length - 1; i >= 0; i--) {
  console.log(jonas[i]);
}

for (let exercise = 1; exercise <= 3; exercise++) {
  console.log(`-------starting exercise ${exercise}`);
  for (let repetition = 1; repetition < 6; repetition++) {
    console.log(`starting rep ${repetition}`);
  }
}


// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep}`);
// }

let rep = 1;
while (rep <= 10) {
  //console.log(`Lifting weights repetition ${rep}`);
  rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`you rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
}

*/
