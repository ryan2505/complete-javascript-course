/*let js = "amazing";
console.log(40 + 8 + 23 - 10);

console.log(23);

// this is a comment
let firstname = "jonas"
console.log(firstname);


let javascriptIsFun = true;
console.log(javascriptIsFun)


// console.log(typeof true);
console.log(typeof javascriptIsFun);
// console.log(typeof 31);

javascriptIsFun = 'YES!';
console.log(javascriptIsFun)

let year;
console.log(year);
console.log(typeof year);

console.log(typeof null);


let age = 30;


const birthYear = 1991;

var job = 'programmer';
job = 'teacher';

// math operators
const currentYear = 2037;
const ageJones = currentYear - 1991;
const ageSarah = currentYear - 2018;
console.log((currentYear - 1991), ageSarah);

console.log(ageJones * 2, ageJones / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2*2*2

const firstName = 'Ryan';
const lastName = 'mahara';
console.log(firstName+" "+ lastName);

// assignment operators 
let x = 10 + 5; // 15
x += 10; //x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // x = x + 1 = 101

console.log(x);

// comparison operators;
console.log(ageJones > ageSarah);
console.log(ageSarah >= 18);

const currentYear = 2037;
const ageJones = currentYear - 1991;
const ageSarah = currentYear - 2018;

console.log(currentYear - 1991 > currentYear - 2018);

let x, y;
x = y = 25-10-5; // x = y = 10
console.log(x, y);

const averageAge = (ageJones + ageSarah) / 2;
console.log(ageJones, ageSarah, averageAge);



const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const currentYear = 2037;

const jonas = "I'm " + firstName + ', a ' + (currentYear - birthYear) + " years old " + job + '!';

console.log(jonas);

const jonasNew = `I'm ${firstName} a ${currentYear - birthYear} years old ${job}!`;

console.log(jonasNew)




const age = 15;


if(age >= 18) {
    console.log('Sarah can start driving license 👌')

} else {
    const yearsLeft = 18 - age;
    console.log(`Sarah is too young. wait another ${yearsLeft} years :)`);
}


const birthYear = 1991;
let century;
if (birthYear <= 2000){
    century = 20;
}else {
    century = 21;
}

console.log(`you were born in the ${century}th century`)



// type conversion
const inputYear = '1991';
console.log(Number(inputYear));
console.log(Number(inputYear) + 18);

console.log(String(23));

// type coercion
console.log('I am ' + 23 +" years old")
console.log('23' + '10' - 3);

let n = '1' + 1
n = n-1
console.log(n)



console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('jonas'));
console.log(Boolean({}));

const money = 0;

if (money){
    console.log("Don't spend it all ; )")
}else {
    console.log("you should get a job!")
}

let height;

if (height) {
    console.log('yay height is defined')
}else{
    console.log('height is undefined')
}



const age = 18;

if(age == '18') console.log("You just became an adult");

const favorite = Number(prompt("What's your favorite number"));
console.log(favorite);

if (favorite === 23){
    console.log('cool! 23 is aight')
} else if (favorite === 7){
    console.log("7 is aight")
} else{
    console.log('wrong')
}

*/

const hasDriversLicense = true; // A
const hasGoodVision = false; // B

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

const shouldDrive = 