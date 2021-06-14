/*
Your tasks:
1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
child class of the 'CarCl' class

2. Make the 'charge' property private

3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl'
class. Then experiment with chaining!

Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀 
*/
'use strict';

// challenge 2 - es6 classes way
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    return this; //challenge 04 - chaining support
  }

  brake() {
    this.speed -= 5;
    return this; //challenge 04 - chaining support
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  // speed property needs to be set for this to work
  set speedUS(speed) {
    this.speed = speed *= 1.6;
  }
}
// start challenge 04
class EVCL extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed}km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this; // chaining support
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this; // chaining support
  }
}

const rivian = new EVCL('Rivian', 120, 23);

rivian
  .chargeBattery(86)
  .accelerate()
  .brake()
  .accelerate()
  .accelerate()
  .accelerate();
