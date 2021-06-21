'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/*

///////////////////////////////
//XMLHttpRequest lesson - call a single country with API
///////////////////////////////

const getCountryData = function (country) {
  // old school way
  const request = new XMLHttpRequest();
  // from rest countries API https://restcountries.eu/ using a endpoint for just portugal data
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  // fetch data in background AKA async
  request.send();

  // const data = request.send(); // we can't do this because at send the data is not there,
  // its fetching the data still
  // so there is nothing to set the variable too, we need to use Async style coding

  request.addEventListener('load', function () {
    // responseText is only available after we get the data
    // console.log(this.responseText);
    // coming in a JSON string

    // JSON.parse returns and array with object in it so we can use destructuring
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `
        <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              Number(data.population) / 1000000
            ).toFixed(1)} million people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
        `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// 2 AJAX calls made in parallel AKA at same time
getCountryData('portugal');
getCountryData('usa');
*/

/*
///////////////////////////////
// call one country and load its border countries next to it
///////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          Number(data.population) / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbor = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbor country (2)
    const [neighbor] = data.borders;

    if (!neighbor) return; // guard clause

    // AJAX call country 1
    const request2 = new XMLHttpRequest();

    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`); // new url for search by country code
    request2.send();

    request2.addEventListener('load', function () {
      // response text no longer an array with objects because we search for country codes
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbor');
    });
  });
};

// getCountryAndNeighbor('portugal');
getCountryAndNeighbor('usa');

// what call back hell looks like
// makes code hard understand and look ugly
// this makes it hard to maintain and refactor
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);
*/

///////////////////////////////
// promises/ fetch API - ES6+ (the new way)
///////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            Number(data.population) / 1000000
          ).toFixed(1)} million people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
      `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//   // Fetch API
//   // .then method is on promises for success
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       // the .json() method is available on all the response objects coming from fetch API
//       // all resolved values (this is a resolved value)
//       // this .json() function is also an async function so it will return a NEW promise
//       return response.json();
//     }) // to handle the new promise we need another then
//     .then(function (data) {
//       console.log(data); // will return the API country call in an array with portugal object
//       renderCountry(data[0]);
//     });
// };

// code without helper functions

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then((response) => {
//       console.log(response);

//       if (!response.ok) {
//         // throw terminates the current function
//         // promise will immediately reject
//         // any error will cause the promise to reject
//         // then the promise rejection will propagate down to the catch method
//         // Error is a class
//         throw new Error(`Country not found (${response.status})`);
//       }

//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       //   const neighbor = data[0].borders[0];
//       const neighbor = 'dodwf';
//       if (!neighbor) return; // wont work but put anyways
//       //country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`);
//     })
//     // .then called on fulfillment
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       response.json();
//     })
//     .then((data) => renderCountry(data, 'neighbor'))
//     // .catch called on rejection
//     .catch((err) => {
//       // err that javascript creates is actually a object so we can call just the message
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//       console.error(`${err} 💥💥💥`);
//     }) // will catch any errors in the chain
//     // errors propagate down the chain till catch grabs them
//     // .finally called no matter if succeed or fail
//     // a good use case is when websites show a loading circle before async, they need to hide that circle after pass or fail
//     .finally(() => {
//       // this works because catch returns a promise as well
//       // container always needs to be made visible
//       countriesContainer.style.opacity = 1;
//     });
// };

// //above is called a flat chain of promises, here we used 4 chains but it could go on for long time without being confusing
// // callback hell would be if we used .then inside of another .then which is a rookie mistake

// //to simulate losing of internet

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// // new error - searching for a non-supported county in API
// // getCountryData('dwsfsaf');
// // will return - script.js:201 TypeError: Cannot read property 'flag' of undefined 💥💥💥
// // which is not the real error, the real error is this cant be found in API so its a 404 error

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(`${url}`).then((response) => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      if (!neighbor) throw new Error('No neighbor found!');
      //country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbor}`,
        'Country not found'
      );
    })
    .then((data) => renderCountry(data, 'neighbor'))
    .catch((err) => {
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
      console.error(`${err} 💥💥💥`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });
/*
///////////////////////////////
// The Event Loop in practice
///////////////////////////////

console.log('Test Start'); // executes 1st
setTimeout(() => console.log('0 sec timer'), 0); // executes 5th after long pause

Promise.resolve('Resolved promise 1').then((res) => console.log(res)); // executes 3rd

Promise.resolve('Resolved promise 2').then((res) => {
  // executes 4th
  for (let i = 0; i < 1000000000; i++) {}

  console.log(res);
});

console.log('Test End'); // executes 2nd
*/

/*
///////////////////////////////
// Building a promise
///////////////////////////////

// lottery example
// fulfilled promise = win lottery
// rejected promise = lose lottery

// promise is a special object
// promise takes one argument, the executor function will run first with 2 other arguments - resolve and reject
// executor function is async
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  // time out function makes this Async
  setTimeout(function () {
    // first If is the lottery win so it would be a fulfilled promise
    // to mark it as fulfilled, we call the resolve promise
    if (Math.random() >= 0.5) {
      // fulfilled state
      // the string is the fulfilled value that we have access too with .then()
      resolve('you WIN 💰');
    } else {
      // rejected state
      // the string is the error value we will .catch()
      reject(new Error('you lost your money'));
    }
  }, 2000);
});

// this is called consuming a promise when we act on it
lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// this is called promisefying when we convert async behavior into promise behavior

// Promisifying setTimeout
const wait = function (seconds) {
  // no reject because impossible for setTimeout to fail
  return new Promise(function (resolve) {
    // resolve is empty because we don't need it
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  // since wait returns an empty resolve, it requires no argument
  .then(() => {
    console.log('I waited for 2 seconds');
    // new return wait to give next then() another promise to consume
    return wait(1);
  })
  .then(() => console.log('Now I waited for 3 seconds total'));

// will resolve
Promise.resolve('this will resolve immediately').then((x) => console.log(x));

// will reject
Promise.reject('this will reject immediately').catch((x) => console.error(x));
*/
/*
///////////////////////////////
// Promisifying geolocation API
///////////////////////////////

// async behavior
// callback based API
// takes to callback functions for success and fail to get position
// navigator.geolocation.getCurrentPosition(
//   (position) => console.log(position),
//   (err) => console.error(err)
// );
// console.log('Getting position');

// change to promise based API

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => resolve(position),
    //   (err) => reject(err)
    // );

    // we can skip the callback part and just use resolve and reject since we are returning a promise
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// promise returns a object with location data
getPosition()
  .then((data) => console.log(data.coords))
  // catch if user blocks the location access
  .catch((err) => console.error(err));

const whereAmI = function () {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then((response) => {
      // geocode.xyz has a 3 request per second throttle
      if (!response.ok) {
        throw new Error('Exceed max request per sec from API');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.state}, ${data.country}`);
      return data.country;
    })
    .then((country) => getCountryData(country)) // function from other script
    .catch((err) => console.log(`${err}`));
};

btn.addEventListener('click', whereAmI);
*/

///////////////////////////////
// Async/Await
///////////////////////////////

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// this makes the function async
// when the function is done it automatically returns a promise
const whereAmI = async function () {
  try {
    // Geolocation

    // no error handling required here because the promise was built with reject in mind
    // if it returns a rejections then catch will show it as an error
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    // reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    // fetch only promise rejects on no internet
    // if API returns 403 or 404 it won't be caught as an error by fetch so we need this line of code
    // on 403 and 404 .ok property will read false
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // multiple await's can be used inside an async function
    // await stops the code execution till the promise is fulfilled
    // this stop does not block the callstack because it is async and running on another API in the background
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );

    if (!res.ok) throw new Error('Problem getting country');
    // async/await is syntax sugar over promises

    // with await we skip the .then() promise chain and we can store stuff in variables
    const data = await res.json();
    renderCountry(data[0]);

    // fulfilled value
    return `You are in ${dataGeo.city}`;
  } catch (err) {
    console.error(`${err} 💣💣💣`);
    renderError(`💣💣💣 ${err.message} 💣💣💣`);

    // Reject promise returned from async function
    throw err;
  }
};

// console.log('1: Will get location'); // execute 1st
// const city = whereAmI(); // execute 3rd
// console.log(city);

// if there is a error in the try block of this whereAmI() promise this will return undefined because it jumps to the catch block
// but since .then() executed that means even on error the promise still fulfilled
// this could lead to problems because our error in the try block we would assume is caught but this creates a new problem
// whereAmI()
//   .then((city) => console.log(`2: ${city}`))
//   .catch((err) => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: finished getting location'));

// same thing as above in async/await format

// // this is an IFFY
// (async function () {
//   try {
//     const data = await whereAmI();
//     console.log(`2: ${data}`);
//   } catch (err) {
//     console.error(`💣💥💣 ${err.message} 💣💥💣`);
//   }
//   console.log('3: finished getting location');
// })(); // call IFFY

/////////////////////////////////////////////////////////////
// exactly the same thing with promises and then
// fetch(`https://restcountries.eu/rest/v2/name/${country}`).then((res) =>
//   console.log(res)
// );
/////////////////////////////////////////////////////////////

// try will attempt code but if errors will pass the error to catch to do something with
// try {
//   let y = 1;
//   const x = 2;
//   x = 3; // will error because reassignment of constant but catch will stop the error from being throw and won't break code
// } catch (err) {
//   console.log(err.message);
// }
/*
///////////////////////////////
// Running promises in parallel
///////////////////////////////

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(`${url}`).then((response) => {
//     if (!response.ok) {
//       throw new Error(`${errorMsg} (${response.status})`);
//     }
//     return response.json();
//   });
// };

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );

    // static method - takes array of promises and will run all promises at same time
    // if one promise rejects, all promise will reject
    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);

    console.log(data.map((d) => d[0].capital));
    // console.log(data1.capital, data2.capital, data3.capital);
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');
*/
/*
///////////////////////////////
// Other Promise Combinators: race, allSettled, and any
///////////////////////////////

// Promise.race
// receives array of promises and returns a promise
// settles as soon as (1) promise of the set wins the race
// settles means fulfilled or rejected

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/${'portugal'}`),
    getJSON(`https://restcountries.eu/rest/v2/name/${'canada'}`),
    getJSON(`https://restcountries.eu/rest/v2/name/${'tanzania'}`),
  ]);

  // first one will display success or rejected
  console.log(res[0]);
})();

///////////////////////////////
// real world example
// if user has a bad internet connect then await might take way to long to be useful
// we can use .race() to help with that

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/${'portugal'}`),
  timeout(0.01), // rejects after 1 second
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.log(err));

// Promise.allSettled
// from ES 2020
// takes array of promises and returns an array of all settled promises
// like Promise.all but difference is .all will short circuit if any promise rejects
//  .allSettled will only return settled (fulfilled) promises

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
]).then((res) => console.log(res));

// compared with .all
// will error because there is a reject
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
]).then((res) => console.log(res));

// Promise.any
// ES 2021
// returns first fulfilled promise and ignore rejected promises
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
]).then((res) => console.log(res));
*/
