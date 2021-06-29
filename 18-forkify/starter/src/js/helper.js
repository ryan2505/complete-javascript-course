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

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SEC)]);
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
