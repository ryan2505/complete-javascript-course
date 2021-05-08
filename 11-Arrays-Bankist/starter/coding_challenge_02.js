/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.

Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4

2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)

3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)

4. Run the function for both test datasets

Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]


GOOD LUCK 😀
*/
'use strict';

//long human readable way
// const calcAverageHumanAge = function (arr) {
//   return arr
//     .map(function (cur) {
//       if (cur < 2) {
//         return cur * 2;
//       } else {
//         return 16 + cur * 4;
//       }
//     })
//     .filter(function (cur) {
//       return cur >= 18;
//     })
//     .reduce(function (acc, cur, i, totalArr) {
//       return acc + cur / totalArr.length;
//     }, 0);
// };

//short way
const calcAverageHumanAge = (arr) =>
  arr
    .map((cur) => (cur <= 2 ? cur * 2 : 16 + cur * 4))
    .filter((cur) => cur >= 18)
    .reduce((acc, cur, i, totalArr) => acc + cur / totalArr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
