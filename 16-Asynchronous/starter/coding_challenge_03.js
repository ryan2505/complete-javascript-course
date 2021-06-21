/*
Your tasks:

PART 1
1. Write an async function 'loadNPause' that recreates Challenge #2, this time
using async/await (only the part where the promise is consumed, reuse the
'createImage' function from before)

2. Compare the two versions, think about the big differences, and see which one
you like more

3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
in the dev tools Network tab

PART 2
1. Create an async function 'loadAll' that receives an array of image paths
'imgArr'

2. Use .map to loop over the array, to load all the images with the
'createImage' function (call the resulting array 'imgs')

3. Check out the 'imgs' array in the console! Is it like you expected?

4. Use a promise combinator function to actually get the images from the array 😉

5. Add the 'parallel' class to all the images (it has some CSS styles)

Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-
3.jpg']. To test, turn off the 'loadNPause' function
GOOD LUCK 😀
 */
'use strict';
// let img;
const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('No image found'));
    });
  });
};

// from a lesson video
const wait = function (seconds) {
  // no reject because impossible for setTimeout to fail
  return new Promise(function (resolve) {
    // resolve is empty because we don't need it
    setTimeout(resolve, seconds * 1000);
  });
};

// start challenge 3
const loadNPause = async function () {
  try {
    // image 1
    const img1 = await createImage('img/img-1.jpg');
    await wait(2);
    img1.style.display = 'none';

    // image 2
    const img2 = await createImage('img/img-2.jpg');
    await wait(2);
    img2.style.display = 'none';

    // image 3
    const img3 = await createImage('img/img-3.jpg');
    await wait(2);
    img3.style.display = 'none';
  } catch (err) {
    console.log(`${err} 💣`);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = await imgArr.map((imgURL) => createImage(imgURL));
    const allImg = await Promise.all(imgs);
    allImg.map((img) => img.classList.add('parallel'));
  } catch (err) {
    console.log(`${err} 💣`);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
