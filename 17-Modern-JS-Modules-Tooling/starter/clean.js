'use strict';

// Object.freeze makes the object immutable (cant add to)
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// freeze can't stop this, it only stops new elements being added
// a 3rd party library could be used to make a deep freeze where this wouldn't work
// budget[0].value = 100000;

// Object.freeze makes the object immutable (cant add to)
// only freezes first level of the object not a Deep freeze
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
// same thing - ES6+
// old way used a variable outside its scope which is bad practice of functional programming
// const getLimit = (user) => spendingLimits?.[user] ?? 0;
// new version we pass in spendingLimits object to use, no longer has a side affect
const getLimit = (limits, user) => limits?.[user] ?? 0;

// here we pass in 5 arguments but we ideally should stick to 3 max.
// to fix this we could pass an object of options but wont for this example
// Pure Function :D
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  // convert to lowercase required to access object property
  // new variable instead of mutating user pass in
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? // im property name is the same as setting name we dont need description: description
      [...state, { value: -value, description, user: cleanUser }]
    : state; // return original state if price over limit
  // avoid mutating the budget array
  // budget.push({ value: -value, description, user: cleanUser });
};

// by setting each to a different variables we retain the same array as we add more
// before when we had just budget it was adding to the array but didn't contain the other adds

// in real world we would use something called composing to create one function to preform all these chains at once
// google composing functions
// this is important for frameworks like react
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

console.log(newBudget3);

// pure function now
const checkExpenses = function (state, limits) {
  // return brand new array
  return state.map(entry => {
    // need to return in map to keep going
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' } // add flag property to object that meets condition
      : entry; // return original object if no changes required
  });

  // old way - mutates original budget array
  // for (const entry of budget) {
  //   if (entry.value < -getLimit(limits, entry.user)) {
  //     entry.flag = 'limit';
  //   }
  // }
};

const finalBudget = checkExpenses(newBudget3, spendingLimits);

console.log(finalBudget);

// impure function because it creates a side effect which is the console.log()
// because the console.log effects the console
const logBigExpenses = function (state, bigLimit) {
  // new functional version - doesn't rely on outside variables
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');

  // makes the function impure
  console.log(bigExpenses);
  // old way mutates the output variable on each loop that passes the condition
  // let output = '';
  // for (const entry of budget) {
  //   // more declarative
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : ''; // Emojis are 2 chars
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

logBigExpenses(finalBudget, 100);
