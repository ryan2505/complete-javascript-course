// Coding Challenge #1

/*
Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).


Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.


Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall.
GOOD LUCK 😀

*/

console.log("Challenge Answers start now")

console.log("TEST DATA 1:")

const markWeightData1 = 78;
const markHeightData1 = 1.69;
const JohnWeightData1 = 92;
const JohnHeightData1 = 1.95;

let markBMIData1 = markWeightData1 / markHeightData1 ** 2;
let JohnBMIData1 = JohnWeightData1 / JohnHeightData1 ** 2
console.log("Marks BMI for Data 1 is "+markBMIData1);
console.log("Johns BMI for Data 1 is "+JohnBMIData1);

let markHigherBMIData1 = markBMIData1 > JohnBMIData1;

// console.log("Does Mark have a higher BMI than John?: "+ markHigherBMIData1);


if (markBMIData1 > JohnBMIData1){
    console.log(`Mark's BMI (${markBMIData1}) is higher than John's! (${JohnBMIData1})`)
} else {
    console.log(`John's BMI (${JohnBMIData1}) is higher than Mark's! (${markBMIData1})`)
}

const markWeightData2 = 95;
const markHeightData2 = 1.88;
const JohnWeightData2 = 85;
const JohnHeightData2 = 1.76;


console.log("TEST DATA 2:")
let markBMIData2 = markWeightData2 / markHeightData2 ** 2;
let JohnBMIData2 = JohnWeightData2 / JohnHeightData2 ** 2
console.log("Marks BMI for Data 2 is "+markBMIData2);
console.log("Johns BMI for Data 2 is "+JohnBMIData2);

let markHigherBMIData2 = markBMIData2 > JohnBMIData2;

// console.log("Does Mark have a higher BMI than John?: "+ markHigherBMIData2);


// Coding Challenge #2

/*
Use the BMI example from Challenge #1, and the code you already wrote, and
improve it.

Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"

2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"

Hint: Use an if/else statement 
GOOD LUCK  */

if (markBMIData2 > JohnBMIData2){
    console.log(`Mark's BMI (${markBMIData2}) is higher than John's! (${JohnBMIData2})`)
} else {
    console.log(`John's BMI (${JohnBMIData2}) is higher than Mark's! (${markBMIData2})`)
}