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

*/
