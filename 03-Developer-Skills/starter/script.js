// Remember, we're gonna use strict mode in all scripts now!
'use strict';
/*
//PROBLEM 1:
// we work for a company building a smart home thermometer. our most recent task is this:
//"Given an array of temperatures of one day, calculate the temperature amplitude.
//keep in mind that somtimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) understanding the problem

//-what is temp amplitude? Answer: difference between highest and lowest temp in array
//- how to compute max and min temperatures?
//-what does a sensor error look like? and what to do when one occures.

// 2) Breaking up into sub-problems

//- how to ignore sensor errors
//-find max vaule in temp array
//-find min vaule in temp array
//-subtract min from max (amplitude) and return it

function findArrayMax(arr) {
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'string') {
      // error handling
      continue;
    } else if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

function findArrayMin(arr) {
  let min = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'string') {
      //error handling
      continue;
    } else if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}

function calcTempAmplitude(temps) {
  return findArrayMax(temps) - findArrayMin(temps);
}
console.log(calcTempAmplitude(temperatures));

//PROBLEM 2
//function should now recieve 2 arrays of temps

// 1) understanding the problem
// - with 2 arrays should we implement the function twice? answer: NO! just merge two arrays

// 2) Breaking up into sub-problems
// merge two arrays

function calcTempAmplitudeNew(t1, t2) {
  const temps = t1.concat(t2);
  return findArrayMax(temps) - findArrayMin(temps);
}
console.log(calcTempAmplitudeNew(temperatures, [35, 2, 3, 1]));


function measureKelvin() {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    //c) FIX bug
    // value: Number(prompt('Degrees celsius')),
    value: 10,
  };
  // B) Find bug
  //   console.table(measurement);
  //   console.warn(measurement.value);
  //   console.error(measurement.value);
  const kelvin = measurement.value + 273;
  return kelvin;
}

// A) INDENTIFY the bug
console.log(measureKelvin());

// using a debugger

*/
