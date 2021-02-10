'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  // ES6 lets you compute property names
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  //ES6 enhanced object literals
  openingHours,
  //es5 way - order: function (starterindex, mainindex)
  order(starterindex, mainindex) {
    return [this.starterMenu[starterindex], this.mainMenu[mainindex]];
  },

  orderDelivery: function ({
    starterindex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `order received ${this.starterMenu[starterindex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/*
///////////////////////Enhanced object literals
//property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days:`;

for (const day of Object.keys(openingHours)) {
  openStr += ` ${day},`;
}

console.log(openStr);

//property VALUES

const values = Object.values(openingHours);
console.log(values);

//Entire Object

const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

*/
/*
////////////////////////////////// Optional chaining ?./////////////
//old pre es 2020 way
// if (restaurant.openingHours.mon.open)
//   console.log(restaurant.openingHours.mon.open);
//with optional chaining
console.log(restaurant.openingHours.mon?.open);

//example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day} the restaurant opens at ${open}`);
}

//Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

//Arrays

const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
console.log(users[0]?.name ?? 'User array empty');

*/
/*
////////////////////// for-of loop////////////
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

for (const [i, element] of menu.entries()) {
  console.log(`${i + 1}: ${element}`);
}

// console.log([...menu.entries()]);
*/
/*
/////////////////////////Nullish Coalescing operator
restaurant.numGuests = 0;
const guest = restaurant.numGuests || 10;
console.log(guest);

const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
*/
/*
//////////////////////////////////////////////////// Short circuiting
console.log('----OR Operator----');

//use ANY data type, return ANYT data type, short-circuiting (short circuit evalulation )
console.log(0 || 'Jonas' || 'test'); // returns jonas
console.log('' || 'Jonas'); // returns jonas
console.log(true || 0); // returns true
console.log(undefined || null); //returns null

console.log(undefined || 0 || '' || 'hello' || 23 || null); // Returns hello

// restaurant.numGuests = 23;

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('----AND Operator----');

console.log(0 && 'jonas'); //returns jonas
console.log('Hello' && 23 && null && 'jonas'); // returns null

//practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'Spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'Spinach');
*/
/*
///////////////////////////////REST Operator///////////

//1) destructuring
//SPREAD, because on right side of =
const arr = [1, 2, ...[[3, 4]]];

const [a, b, ...others] = [1, 2, 3, 4, 5];

console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(pizza, risotto, otherFood);

//objects

const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

//2) functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(1, 2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 1, 4);

const x = [23, 5, 7, 8, 9, 11];
add(...x);

//order pizza example

restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
*/
/*
///////////////////////////////////////////Spread operator///////////////
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]]; // don't do this
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

//Iterables: arrays, stings, amps, sets. NOT objects
const str = 'jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);

//order pasta example

// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Let's make pasta! Ingredient 2?"),
//   prompt("Let's make pasta! Ingredient 3?"),
// ];

// restaurant.orderPasta(...ingredients);

//Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);
*/
/*
///////////////////////////Object Destructuring////////////////////
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterindex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterindex: 2,
});

const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
// console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// Mutating Variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
// console.log(a, b);

//nested objects

const {
  fri: { open, close },
} = openingHours;
// console.log(open, close);

*/
/*
////////////////////BELOW IS ARRAY DESTRUCTURING////////////////////
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;

console.log(x, y, z);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// const temp = main;
// main = secondary;
// secondary = temp;

[main, secondary] = [secondary, main];

console.log(main, secondary);

// recieve 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;

// console.log(i, j);

const [i, , [j, k]] = nested;
console.log(i, j, k);

const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

*/
