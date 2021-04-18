'use strict';
/* -------------Default parameters for functions -----------
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //ES 5 way
  //   numPassengers = numPassengers || 1; //default is 1, short circuit if falsy
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('lh123', 2, 800);
createBooking('lh123', 2);
createBooking('lh123', undefined, 800); //undefined is used to skip the parameter we don't know
*/

/*---------------passing arguments - values vs reference-----------
const flight = 'LH123';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

function checkIn(flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    console.log('Check In');
  } else {
    console.log('Wrong passport');
  }
}

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000);
};

newPassport(jonas);
console.log(jonas.passport);
checkIn(flight, jonas);
*/

// /*---------------higher-order functions in practice-----------

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// const transformer = function (str, fn) {
//   /*higher order fuction, takes a fuction as an argument*/
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);
//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer(
//   'JavaScript is the best!',
//   upperFirstWord
// ); /*no () in function so we don't call it */
// transformer('JavaScript is the best!', oneWord);

// const high5 = function () {
//   console.log('👋');
// };

// document.body.addEventListener(
//   'click',
//   high5
// ); /*high5 is a callback funcation, addevenlistener is a higher order function*/

// ['jonas', 'Martha', 'Adam'].forEach(high5);

// --------------------functions returning functions-------------------
/*
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');

greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('ryan');

//challenge - make it an arrow function

const greet2 = (greeting2) => (name2) => console.log(`${greeting2} ${name2}`);

greet2('Heyo')('Amber');
*/

//------------------function .call and .apply----------
/*
const united = {
  airline: 'United Airlines',
  iataCode: 'UA',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

united.book(239, 'Ryan Mahara');
united.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = united.book;

// doesn't work because this keyword
// book(23, 'mike blue');

book.call(eurowings, 23, 'Mike Blue');
// console.log(`From Eurowings bookings: ${eurowings.bookings.entries()}`);

book.call(united, 239, 'Mary Copper');

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 738, 'Mary Copper');

//Apply method

const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

// ---------------function bind method---------

console.log(`



Bind method below


`);

const bookEW = book.bind(eurowings); //bind locks the this keyword to the object pased
const bookUA = book.bind(united);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);

bookEW23('mark');

//with event listeners

united.planes = 300;
united.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', united.buyPlane.bind(united));

//partial application

const addTax = (rate, value) => value + value * rate;

console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(200));

//Challenge - create the above addVAT without using BIND method

function manualAddTax(taxPercentage) {
  return function (value) {
    return value + value * taxPercentage;
  };
}

const addVAT2 = manualAddTax(0.23);
const addHalf = manualAddTax(0.5);

console.log(addVAT2(200));
console.log(addHalf(200));
*/

/* ------------------immediately invoked function expression or IIFE---------


const runOnce = function () {
  console.log('This will never run again');
};

// immediately invoked function expression or IIFE
(function () {
  console.log('This will never run again');
  // const isPrivate = 23;
})();

// (() => console.log('This will never run again'))(); // arrow function version

{
  const isPrivate = 23;
}

console.log(isPrivate);

*/

/*------------closures---------

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker(); // 1 passengers
booker(); // 2 passengers

// console.dir(booker); // how to look at closures

*/

/*------------closures examples--------

//example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
// console.dir(f);

//re-assigning f function
h();
f();

// console.dir(f);

//example 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    //closure occured because a settimeout calls the function after boardpassengers's execution context
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // will not be used in the settimeout function because closure gets priorty over scope chain

boardPassengers(180, 3);

*/
