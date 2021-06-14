'use strict';

/*
const Person = function (firstName, birthYear) {
  //Instance Properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside a constructor function
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);

// when called with new:
// 1. New {} is created
// 2. function is called, this keyword is set to the new empty object, this = {}
// 3. {} linked to prototype
// 4. function automatically return {} (object should be filled at this point)

// console.log(jonas);

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

// console.log(matilda);
// console.log(jack);

// console.log(jonas instanceof Person); // true

// Prototypes
// console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// jonas.calcAge(); // 46

// console.log(jonas.__proto__);
// console.log(jonas.__proto__ === Person.prototype); // True
// prototype of the constructor function is basically passed down to the Object instances
// Person.prototype is not the prototype of Person but is the prototype
// that will be used for the constructor function

// console.log(Person.prototype.isPrototypeOf(jonas)); // true
// console.log(Person.prototype.isPrototypeOf(Person)); // false
// console.log(Person.prototype);
// console.log(jonas.__proto__);
// console.log(Person.__proto__);

// .prototypeOfLinkedObjects

Person.prototype.species = 'Homo Sapiens';

// console.log(jonas);
// console.log(matilda);
// console.log(jonas.species, matilda.species);

// console.log(jonas.hasOwnProperty('firstName')); // True
// console.log(jonas.hasOwnProperty('species')); // False

console.log(jonas.__proto__); // Person
console.log(jonas.__proto__.__proto__); // Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__.__proto__); // Null

console.dir(Person.prototype.constructor);

const arr = [1, 2, 351, 2, 1, 351, 51]; // new Array === []

console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__); // Object.prototype (top of prototype chain)
// because prototype is an object and all objects get object.prototype

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');

console.log(h1.__proto__); // HTMLHeadingElement
console.log(h1.__proto__.__proto__); // HTMLElement
console.log(h1.__proto__.__proto__.__proto__); // Element
console.log(h1.__proto__.__proto__.__proto__.__proto__); // Node
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__); // EventTarget
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); // object
console.log(
  h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
); // null

console.dir(x => x + 1);
*/
/*------------ES6 classes
//class expression
// const PersonCl = class {};

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // Methods will be added .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  bye() {
    console.log(`bye ${this.firstName}`);
  }
}

const dave = new PersonCl('Dave', 1996);

console.log(dave);
dave.calcAge(); // 41

console.log(dave.__proto__ === PersonCl.prototype); // true

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};

dave.greet();
dave.bye();

// Things to keep in mind:

// 1. Classes are NOT hoisted
// 2. Class are first-class citizens
//      can be returned and passed into functions
// 3. Classes are executed in strict mode
*/

/*---------static methods-------
const account = {
  owner: 'jonas',
  movements: [200, 420, 120, 300],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    // setters need exactly one parameter
    this.movements.push(mov);
  },
};

console.log(account.latest); // getter reads like a property
account.latest = 50; // setter
console.log(account.movements);

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Methods will be added .prototype property
  // instances methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  bye() {
    console.log(`bye ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }
  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullname() {
    return this._fullName;
  }
  // static methods
  static hey() {
    console.log('Hey There');
    console.log(this); // constructor function
  }
}

const dave = new PersonCl('Dave Mayflower', 1996);

console.log(dave.age); // 41
console.log(dave);

const walter = new PersonCl('Walter White', 1965);

console.log(walter);

// static methods

const Person = function (firstName, birthYear) {
  //Instance Properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.hey = function () {
  console.log('Hey There');
  console.log(this); // constructor function
};

const jonas = new Person('Jonas', 1991);

Person.hey(); // works
// jonas.hey(); // doesn't work
*/
/*
// object.create
// no new keyword
// no prototype property
// no constructor function

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// empty object with link to personProto
const steven = Object.create(PersonProto);

// manually way
steven.name = 'Steven';
steven.birthYear = 2002;

console.log(steven);
steven.calcAge(); // 35

console.log(steven.__proto__ === PersonProto); // true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);

sarah.calcAge(); // 58
*/
/*
// real inheritance between "Classes"

// Constructor way

const Person = function (firstName, birthYear) {
  //Instance Properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// manually links person prototype to student prototype
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');

console.log(mike);
mike.introduce();
mike.calcAge(); // 17

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike.__proto__.__proto__.__proto__);
console.log(mike.__proto__.__proto__.__proto__.__proto__);

console.dir(Student.prototype.constructor); // person
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor); // student

// showing the prototype
console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true

console.log(mike);
*/

/*
// real inheritance between "Classes"

// Classes way

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Methods will be added .prototype property
  // instances methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  bye() {
    console.log(`bye ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }
  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }
  // static methods
  static hey() {
    console.log('Hey There');
    console.log(this); // constructor function
  }
}

// Child Class below
// links prototypes behind scenes
class StudentCl extends PersonCl {
  // if no new properties in child class, constructor method not necessary.
  //super() is called automatically
  constructor(fullName, birthYear, course) {
    // Always needs to happen first - sets this keyword
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student i feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');

martha.introduce();
martha.calcAge(); // 25
console.log(martha);
*/
/*
// real inheritance between "Classes"

// object.create way

// parent
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

// child
const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);

jay.init('Jay', 2015, 'Computer Science');
console.log(jay);
jay.introduce();
jay.calcAge(); // 22
*/
/*
// another class example - why we need encapsulation


class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // protected property
    this._pin = pin;
    this._movements = []; // default property
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // public interface - AKA API
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
    // by added - we abstract away that a withdraw is a negative movement
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved for ${val}`);
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// BAD - DON'T DO - don't interact with class properties directly
// acc1.movements.push(250);
// acc1.movements.push(-140);

// using public interface
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);

// acc1._approveLoan(1000);

console.log(acc1.getMovements());

console.log(acc1);
*/
/*
// Private class fields - in stage 3 of proposal
// ONLY CHROME supports this for now

// different fields in class fields proposal - 8 total
// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods - not implemented in chrome yet
// (there is also the static versions that make up the other 4 fields)

class Account {
  // 1) public fields (on instances NOT prototype)
  local = navigator.language;

  // 2) Private fields (on instances NOT prototype)
  #movements = [];
  #pin; //set to nothing first, redefine in constructor

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // protected property
    this.#pin = pin;
    // this._movements = []; // default property
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods

  // public interface - AKA API
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    // by added - we abstract away that a withdraw is a negative movement
    return this; // returns account object
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved for ${val}`);
      return this;
    }
  }

  // 4) Private methods
  #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

acc1.deposit(250);
acc1.deposit(175);
console.log(acc1);
acc1.requestLoan(1000);
// console.log(acc1.#movements); // will give syntax error

console.log(acc1.getMovements()); // can still access movements with method

// setting up chaining in classes

acc1.deposit(300).deposit(450).withdraw(35).requestLoan(2500).withdraw(4000);

console.log(acc1.getMovements());
*/
