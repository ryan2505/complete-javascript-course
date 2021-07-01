// helper.js is for functions we want to reuse in multiple locations
import { async } from 'regenerator-runtime'; //polyfilling async
import { TIMEOUT_SEC } from './config.js'; // constant variables

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// combined of getJSON and sendJSON
export const AJAX = async function (url, uploadData = undefined) {
  try {
    // ternary operator if upload data exists
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // tells the API the data will be in JSON format
          },
          body: JSON.stringify(uploadData), // body is data we are sending, has to be in JSON so we stringify the object
        })
      : fetch(`${url}`);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    // convert promise.body from json to an object
    const data = await res.json();

    // res.ok property will be false when 400, 403, 404 status code occurs
    if (!res.ok) throw new Error(`💣${data.message} (${res.status})`);

    return data; // resolved value of promise
  } catch (err) {
    console.error(`${err} 💥💥💣💣`);
    // we throw the err so it gets passed to the next catch
    // the error is propagated
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SEC)]);
//     // convert promise.body from json to an object
//     const data = await res.json();

//     // res.ok property will be false when 400, 403, 404 status code occurs
//     if (!res.ok) throw new Error(`💣${data.message} (${res.status})`);

//     return data; // resolved value of promise
//   } catch (err) {
//     console.error(`${err} 💥💥💣💣`);
//     // we throw the err so it gets passed to the next catch
//     // the error is propagated
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     // to send data with fetch we need an object of options as the 2nd parameter
//     const fetchPro =

//     // the forkify API will return data back thats why all the below is the same as getJSON

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     // convert promise.body from json to an object
//     const data = await res.json();

//     // res.ok property will be false when 400, 403, 404 status code occurs
//     if (!res.ok) throw new Error(`💣${data.message} (${res.status})`);

//     return data; // resolved value of promise
//   } catch (err) {
//     console.error(`${err} 💥💥💣💣`);
//     // we throw the err so it gets passed to the next catch
//     // the error is propagated
//     throw err;
//   }
// };
