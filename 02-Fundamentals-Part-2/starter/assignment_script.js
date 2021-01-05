"use strict";
/*
// LECTURE: Functions

function describeCountry(country, population, capitalCity) {
  console.log(`${country} has ${population} million people and it capital city is ${capitalCity}`);
}

describeCountry("Argentina", 45, "Buenos Aires");
describeCountry("Greece", 10, "Athens");
describeCountry("Italy", 60, "Rome");

//LECTURE: Function Declarations vs. Expressions

function percentageOfWorld1(population) {
  // world population is 7.594 billion as of 2018
  return (population / 7594) * 100;
}

const argentinapopulation = percentageOfWorld1(45);
const greecepopulation = percentageOfWorld1(10);
const italypopulation = percentageOfWorld1(60);

console.log(`${argentinapopulation}%`);
console.log(`${greecepopulation}%`);
console.log(`${italypopulation}%`);

// below is the same as above but as function expressions

const percentageOfWorld2 = function (population) {
  // world population is 7.594 billion as of 2018
  return (population / 7594) * 100;
};

const argentinapopulation2 = percentageOfWorld2(45);
const greecepopulation2 = percentageOfWorld2(10);
const italypopulation2 = percentageOfWorld2(60);

console.log(`${argentinapopulation2}%`);
console.log(`${greecepopulation2}%`);
console.log(`${italypopulation2}%`);


const percentageOfWorld3 = (population) => (population / 7594) * 100;

const argentinapopulation3 = percentageOfWorld3(45);
const greecepopulation3 = percentageOfWorld3(10);
const italypopulation3 = percentageOfWorld3(60);

console.log(`${argentinapopulation3}%`);
console.log(`${greecepopulation3}%`);
console.log(`${italypopulation3}%`);


//LECTURE: Introduction to Arrays

const populations = [45, 10, 60, 328];

if (populations.length >= 4) {
  console.log("there are 4 countries");
} else {
  console.log("there is less then 4 countries");
}

function percentageOfWorld1(population) {
  // world population is 7.594 billion as of 2018
  return (population / 7594) * 100;
}

console.log(percentageOfWorld1(populations[0]));
console.log(percentageOfWorld1(populations[1]));
console.log(percentageOfWorld1(populations[2]));
console.log(percentageOfWorld1(populations[3]));


//LECTURE: Basic Array Operations (Methods)

//country is china
const neighbours = ["North Korea", "Mongolia", "Nepal"];

console.log(neighbours);

neighbours.push("Utopia");
console.log(neighbours);

neighbours.pop();
console.log(neighbours);

if (!neighbours.includes("Germany")) {
  console.log("Probably not a central European country :D");
} else {
  console.log("is this a centeral European country?");
}

if (neighbours.includes("Mongolia")) {
  const location = neighbours.indexOf("Mongolia");
  neighbours[location] = "Vietnam";
}

console.log(neighbours);



//LECTURE: Introduction to Objects

const myCountry = {
  country: "China",
  capital: "Beijing",
  language: "Mandarin",
  population: 1393,
  neighbours: ["North Korea", "Mongolia", "Nepal"],
  describe: function () {
    return `${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`;
  },
  checkIsland: function () {
    return (this.isIsland = this.neighbours.length === 0 ? true : false);
  },
};

//LECTURE: Dot vs. Bracket Notation

console.log(
  `${myCountry.country} has ${myCountry["population"] - 2} million ${myCountry.language}-speaking people, ${
    myCountry.neighbours.length
  } neighbouring countries and a capital called ${myCountry.capital}.`
);

//LECTURE: Object Methods

console.log(myCountry.describe());

console.log(myCountry.checkIsland());
console.log(myCountry.isIsland);


//LECTURE: Iteration: The for Loop

for (let people = 1; people <= 50; people++) {
  console.log(`Voter number ${people} is currently voting`);
}


//LECTURE: Looping Arrays, Breaking and Continuing

function percentageOfWorld1(population) {
  // world population is 7.594 billion as of 2018
  return (population / 7594) * 100;
}

const populations = [45, 10, 60, 328];

const percentage2 = [
  percentageOfWorld1(populations[0]),
  percentageOfWorld1(populations[1]),
  percentageOfWorld1(populations[2]),
  percentageOfWorld1(populations[3]),
];

console.log(percentage2);


//LECTURE: Looping Backwards and Loops in Loops

const listOfNeighbours = [["Canada", "Mexico"], ["Spain"], ["Norway", "Sweden", "Russia"]];

for (let i = 0; i < listOfNeighbours.length; i++) {
  for (let j = 0; j < listOfNeighbours[i].length; j++) {
    console.log(listOfNeighbours[i][j]);
  }
}
*/

//LECTURE: The while loop

function percentageOfWorld1(population) {
  // world population is 7.594 billion as of 2018
  return (population / 7594) * 100;
}

const populations = [45, 10, 60, 328];
const percentage3 = [];

let x = 0;
while (x < populations.length) {
  percentage3.push(percentageOfWorld1(populations[x]));
  x += 1;
}

console.log(percentage3);
