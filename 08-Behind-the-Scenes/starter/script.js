'use strict';
/*
function calcAge(birthyear) {
  //global scope, global EC
  const age = 2037 - birthyear; // calcAge function EC, Scope

  function printAge() {
    // calcAge function EC, Scope
    const output = `${firstName} are ${age}, born in ${birthyear}`; // printAge function EC, Scope
    console.log(output); // printAge function EC, Scope

    if (birthyear >= 1981 || birthyear <= 1996) {
      // printAge function EC, Scope
      var millenial = true; //  Print Age function scoped
      const firstName = 'Steven'; // JS will use this variable because it finds it first in variable look up
      const str = `Oh, and you're a millenial, ${firstName}`; // printAge function EC, Block Scope
      console.log(str); // printAge function EC, Block Scope

      function add(a, b) {
        // printAge function EC, Block Scope
        return a + b; // add function EC, function Scope
      }
    }
    // console.log(add(2, 3)); // will work if strict is off, with on its block scoped
    console.log(millenial);
  }
  printAge(); // calcAge function EC, Scope

  return age; // calcAge function EC, Scope
}

const firstName = 'Jonas'; //global scope, global EC
calcAge(1991); // global EC

console.log(testHoist(2, 3));

function testHoist(a, b) {
  return a * b;
}



// Hoisting example with variables

// console.log(me); //undefined
// console.log(job); //in Temporal Dead zone,Uncaught ReferenceError: Cannot access 'job' before initialization
// console.log(year); //in Temporal Dead zone,Uncaught ReferenceError: Cannot access 'job' before initialization

// var me = 'Jonas';
// let job = 'teacher';
// const year = 1991;

//Function Hoisting example

console.log(addDecl(2, 3)); // returns 5, works
// console.log(addExpr(2, 3)); // return undefined(2,3)
// console.log(addArrow(2, 3)); // in TDZ

function addDecl(a, b) {
  return a + b;
}

// when using var it will return "Uncaught TypeError: addExpr is not a function"
//because var hoisting returns undefined so we are basiclly writing undefined(2,3) which returns the same error
var addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

// Example
// due to hoisting numProduct is currently undefined which is a falsy value, we wrote the logic of if NOT False aka true for 0 product, delete shopping cart.
if (!numProduct) deleteShoppingCart(); // will run even though numProduct is 10
var numProduct = 10;

function deleteShoppingCart() {
  console.log('All products Deleted!');
}

var x = 1; // creates property on the global window object
let y = 2; // does not create property on window
const z = 3; // does not create property on window
console.log(x === window.x);


// console.log(this);

const calcAge = function (birthyear) {
  console.log(2037 - birthyear);
  // console.log(this);
};

calcAge(1991);

const calcAgeArrow = birthyear => {
  console.log(2037 - birthyear);
  // console.log(this);
};

calcAgeArrow(1991);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
  },
};

jonas.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge;

matilda.calcAge();

const f = jonas.calcAge;
f();

var firstName = 'Ryan';

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    // console.log(this);

    //solution 1 - ES 5
    // const self = this;
    // const isMillenial = function () {
    //   console.log(this);
    //   console.log(this.year >= 1981 && this.year <= 1996);
    // };

    //soluition 2 - ES 6+
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial(); // won't work with this, because returns undefined
  },
  greet: () => console.log(`Hey ${this.firstName}`),
};

jonas.greet();
jonas.calcAge();

// arguments keyword
function addExpr(a, b) {
  console.log(arguments);
  return a + b;
}

addExpr(2, 5, 7, 8);

const addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};

addArrow(2, 5);


let age = 30;
let oldage = age;

age = 31;

console.log(age);
console.log(oldage);

const me = {
  name: 'jonas',
  age: 30,
};

const friend = me;

friend.age = 27;

console.log('Friend:', friend);
console.log('Me:', me);

*/
// primatives types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis'; // this will change both objects because they point to the same place
console.log(
  `Before marriage: ${jessica.lastName}, now after marriage: ${marriedJessica.lastName}`
);

//copying objects

const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before Marriage:', jessica2);
console.log('After Marriage:', jessicaCopy);
