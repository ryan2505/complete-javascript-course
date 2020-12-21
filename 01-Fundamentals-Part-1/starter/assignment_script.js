// Lecture Assignment: Values and Variables
/*
const country = "USA";
const continent = "North America";
let population = 328;

console.log(country)
console.log(continent)
console.log(population)

// Lecture Assignment: Data Types
const isIsland = false;
let language

console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

// Lecture Assignment: let, const and var

language = "English"

// Lecture Assignment: Basic Operators

let populationHalf = population / 2;
population++;
console.log(population); // 329.2

let finlandPopulation = 6;
console.log(finlandPopulation > population); // false

const avgCountryPopulation = 33;
console.log(population < avgCountryPopulation);

console.log(country + " is in " + continent + " ,and its " + population +" million people speak " + language);

// Lecture Assignment: String and Template Literals

const description = `${country} is in ${continent}, and its ${population} million people speak ${language}`;
console.log(description);


// Lecture Assignment: Taking Decisions: if / else statements

if (population > avgCountryPopulation) {
    console.log(`${country}'s population is above average.`)
} else {
    console.log(`${country}'s population is ${avgCountryPopulation-population} million below average`)
}


// Lecture Assignment: Type Conversion and Coercion


/*
1. Predict the result of these 5 operations without executing them:
'9' - '5'; // 4
'19' - '13' + '17'; // 617
'19' - '13' + 17; //23
'123' < 57; // false
5 + 6 + '4' + 9 - 4 - 2; //1143
2. Execute the operations to check if you were right

*/

// Lecture Assignment: Equality Operators: == vs ===

// let numNeighbours = Number(prompt("How many neighbour countries does your country have?"));

// if (numNeighbours === 1){
//     console.log('Only 1 border!')
// } else if (numNeighbours > 1){
//     console.log('more than 1 border')
// }else {
//     console.log('No borders')
// }

// Lecture Assignment: Logical Operators

/*
if ((language === "English") && isIsland && (population < 50)){ // "english" is case sensitive here
    console.log('You should live in USA :)')
} else {
    console.log('USA does not meet your criteria :(')
}



// Lecture Assignment: The switch statement

const language = 'arabic'

switch (language) {
    case 'chinese':
    case 'mandarin':
        console.log('MOST number of native speakers!');
        break;
    case 'spanish':
        console.log('2nd place in number of native speakers');
        break;
    case 'english':
        console.log('3rd place');
        break;
    case 'hindi':
        console.log('Number 4');
        break;
    case 'arabic':
        console.log('5th most spoken language');
        break;
    default:
        console.log('great language too :D')

}

*/
/*
// Lecture Assignment: The Conditional (Ternary) Operator

const population = 328;

console.log(
  `USA's population is ${population > 33 ? "above" : "below"} average`
);
*/
