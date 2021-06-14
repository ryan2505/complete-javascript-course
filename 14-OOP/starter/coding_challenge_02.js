/* 
Your tasks:

1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')

2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
by 1.6)

3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
converts it to km/h before storing the value, by multiplying the input by 1.6)

4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter.

Test data:
§ Data car 1: 'Ford' going at 120 km/h

GOOD LUCK 😀 */

'use strict';

// challenge 1 - constructor way
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  return (this.speed += 10);
};

Car.prototype.brake = function () {
  return (this.speed -= 5);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
// end challenge 1

// challenge 2 - es6 classes way
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
  }

  brake() {
    this.speed -= 5;
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  // speed property needs to be set for this to work
  set speedUS(speed) {
    this.speed = speed *= 1.6;
  }
}

const ford = new CarCl('Ford', 120);

ford.accelerate();
ford.brake();
ford.accelerate();
ford.accelerate();
ford.brake();
ford.brake();
console.log(ford);

ford.speedUS = 50;
console.log(ford);
