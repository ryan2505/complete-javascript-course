'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  // since the links at href = '#'
  // the default behavior is to scroll to the top of the page when
  // clicked so we need to prevent that
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// foreach works on node lists
btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth scrolling

btnScrollTo.addEventListener('click', function (e) {
  // Scrolling

  // old way
  // const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: window.pageXOffset + s1coords.left,
  //   top: window.pageYOffset + s1coords.top,
  //   behavior: 'smooth',
  // });

  // new way
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page Navigation

// in sufficient way => adding (1) event per (1) element
// document.querySelectorAll('.nav__link').forEach((el) =>
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); // stop anchor links scroll too animation built into HTML
//     const id = this.getAttribute('href'); //returns relative href
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// );

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); // stop anchor links scroll too animation built into HTML

  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); //returns relative href
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed Component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return; // if null, return early aka don't do anything

  // remove active classes
  tabs.forEach((t) => t.classList.remove('operations__tab--active')); // clear all tabs before adding to the clicked tab
  tabsContent.forEach((c) => c.classList.remove('operations__content--active'));

  // Active Tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu Fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// mouseover bubbles, mouseenter doesn't
nav.addEventListener('mouseover', handleHover.bind(0.5)); // passing an "argument" into handler
// .bind sets the this keyword

// opposite of mouseover is mouseout
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky Navigation

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, //offset, 90 is height of nav, % and rem can't be used here
});
headerObserver.observe(header);

///////////////////////////////////////
// Revealing Sections on scroll

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  // Guard clause
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden'); //commenting for now
});

///////////////////////////////////////
// lazy loading images

const featureImgs = document.querySelectorAll('img[data-src]');

const lazyLoadImg = function (entries, observer) {
  const [entry] = entries;
  // Guard clause
  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const featureImgObserver = new IntersectionObserver(lazyLoadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

featureImgs.forEach((img) => featureImgObserver.observe(img));

///////////////////////////////////////
// slider
const slider = function () {
  // Variables
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  const slider = document.querySelector('.slider');

  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';

  // Functions

  // creating the dots
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // 0%, 100%, 200%, 300%

  // Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    // if first slide is 1: -100%, 0%, 100%, 200%,
    activateDot(curSlide);
  };

  // previous Slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    // if first slide is 1: -100%, 0%, 100%, 200%,
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Lecture

/*
// element selection, creation, and deletion

// selections
console.log(document.documentElement); // selects whole document
console.log(document.head); // head
console.log(document.body); // body
const header = document.querySelector('.header'); // header class
const allSections = document.querySelectorAll('.section'); // all section class => creates Node list
// Nodelist don't live update
console.log(allSections);

document.getElementById('section--1'); // selects section--1 ID
const allButtons = document.getElementsByTagName('button'); // selects HTMLCollection of all buttons in HTML
// HTMLCollection are live, if the DOM changes then the collection is automatically updated

console.log(allButtons);

console.log(document.getElementsByClassName('btn')); // selects HTMLCollection of all btn class elements

// Creating and inserting elements

// .insertAdjacentHTML('beforebegin', "<div> Test </div>")

const message = document.createElement('div'); // will return a DOM element/Object not in the DOM
message.classList.add('cookie-message'); // adds class to div element
// message.textContent = 'We use cookies for improved functionality and analytics'; //adds text into the div element
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class = "btn btn--close-cookie">Got it!</button>';
// adds text into the div element
console.log(message);

header.prepend(message); // inserts as first node in the header class element
// header.append(message); // inserts as last node in the header class element
// this will only append the div element, now that its living in the DOM, the element can only be in one place at a time
// to create multiple you would need .insertAdjacentHTML method
// .prepend and .append can also be used to move DOM elements because they are unique and can only be in one place at a time

// to put it in (2) places we need to clone it
// header.append(message.cloneNode(true));

// header.before(message); // will insert before the header (NOT IN), this makes them siblings (same level elements)
// header.after(message); // will insert after the header (NOT IN), this makes them siblings (same level elements)

// Delete elements

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // message is already stored in memory so no queryselector is required
    // .remove() is a recent addition to DOM API
    // old days
    // message.parentElement.removeChild(message) // this is called DOM traversing (moving up and down in DOM)
  });

// this works too because message is a unique div created programmatically
// message.addEventListener('click', function () {
//   message.remove();
// });

// element style, attributes, and classes

// Styles

message.style.backgroundColor = '#37383d'; // all CSS properties are camelCase
message.style.width = '120%'; // all styles set in JS are set as inline styles in the HTML DOM

console.log(message.style.height); // returns nothing, we can't read styles unless they are inline styles
// we can't read the stylesheet CSS
console.log(message.style.backgroundColor); // returns rgb(55, 56, 61) ,because inline style

// to get stylesheet styles
// console.log(getComputedStyle(message)); //returns massive object with all styles
console.log(getComputedStyle(message).color); //returns rgb(187, 187, 187)
// getComputedStyle is the styles has they are on the page, not necessarily the ones set in the stylesheet
console.log(getComputedStyle(message).height); // returns 50px, height wasn't set in the stylesheet
//but the browser had to calculate the height to render it on the HTML

// to change the height
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// whats happening here:
// getComputedStyle(message).height = String(50px);
// string plus number 30 doesn't work
// Number.parseFloat(getComputedStyle(message).height, 10) => looks for a number with a 10 base (normal number system)
// will return 50 so the addition works
// 30 + 'px' => is required because CSS needs a unit always

// CSS custom properties AKA (CSS Variables)
document.documentElement.style.setProperty('--color-primary', 'orangered'); // first: name of property in ROOT (root is document)
// we want to target, second: the value we change too

// custom properties need .setProperty
// CSS custom properties lets us change the color everywhere with on JS line
// setProperty works for all regular properties too

// Attributes

const logo = document.querySelector('.nav__logo');
// this works because on img tags, they have built in support for these properties
// when we create them in the HTML, javascript automatically adds them to the object because they are standards
console.log(logo.alt); // returns 'Bankist logo'
console.log(logo.src); // returns http://127.0.0.1:5500/img/logo.png <== absolute URL
// in the HTML we use relative URL
console.log(logo.className); // returns nav__logo

logo.alt = 'Beautiful minimalist logo'; // sets Attribute alt

// Non-standard
// when we create a custom property on the img tag, JS can't read it because it is not a standard
console.log(logo.designer); // return undefined

// to read non-standards
console.log(logo.getAttribute('designer')); // returns jonas

// to set non-standards
logo.setAttribute('company', 'Bankist'); // sets on img tag

// to read relative URL on src
console.log(logo.getAttribute('src')); // returns img/logo.png <== relative URL

// href is the same
const link = document.querySelector('.nav__link');

console.log(link.href); // http://127.0.0.1:5500/index.html?#section--1 <== absolute URL
console.log(link.getAttribute('href')); // #section--1 <== relative URL

// Data attributes (special object)
console.log(logo.dataset.versionNumber); // returns 3.0
// camelCase on versionNumber in JS, in HTML data-version-number="3.0"
// datasets become camelCase

// Classes

logo.classList.add('class1', 'class2'); // add classes to elements, multiple supported
logo.classList.remove('class1', 'class2'); // remove classes to elements, multiple supported
logo.classList.toggle('c'); // if class exist, remove, if not add
logo.classList.contains('c'); // returns boolen based on class existence on element

// Don't use - will override all existing classes
// logo.className = 'jonas';

console.log(logo);
*/
/*
// type of events and event handlers----------------

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  // alert('addEventListener: Detected mouseenter event');
  console.log('1st mouse enter');

  h1.removeEventListener('mouseenter', alertH1); // only listen for event once
};

// new way
// advantage: can add multiple addEventListeners, onmouseenter can only be one
// advantage: addEventListener can be removed in case we don't need it anymore
h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// old way
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Detected mouseenter event');
// };
*/

/*
// Even Propagation in practice

// rgb (255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('3 nav__link clicked', e.target, e.currentTarget);
  //e.target is where the event happened not where it was attached

  // stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('2 nav__links clicked', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('1 nav clicked', e.target, e.currentTarget);
  console.log(this === e.currentTarget);
});
*/

/*

// DOM Traversing------------

const h1 = document.querySelector('h1');

// going downwards: child element
console.log(h1.querySelectorAll('.highlight')); // highlight class that are children of the h1, no matter how deep
console.log(h1.childNodes); // returns all nodes text,comment, element, etc
console.log(h1.children); // returns HTMLCollection of all direct children HTML tags
console.log(h1.firstElementChild); // returns first HTML child
h1.firstElementChild.style.color = 'white';
console.log(h1.lastElementChild); // returns last HTML child
h1.lastElementChild.style.color = 'red';

// going downwards: parent element

console.log(h1.parentNode); //returns h1's parent
console.log(h1.parentElement); //returns h1's parent

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// finds parent elements looking up towards root/document element

// h1.closest('h1').style.background = 'var(--gradient-primary)'; // the closest element can be the same element

// Going Sideways: siblings
// can only access direct siblings (same level elements)
console.log(h1.previousElementSibling); // returns HTML tag sibling above
console.log(h1.nextElementSibling); // returns HTML tag sibling below

// same things for nodes
console.log(h1.previousSibling); // return node above
console.log(h1.nextSibling); // return node below

// if we need all the siblings

console.log(h1.parentElement.children); // return all sibling

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});
*/
/* 
//-------------THIS IS THE BAD WAY, PERFORMANCE ISSUES SINCE SCROLL EVENT FIRES 100s OF TIMES
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Sticky Navigation: Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, // null means entire viewport
//   threshold: 0, // percentage of visibility, which the callback function will be called
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
*/

/*
// LifeCycle DOM events

// fires when HTML is parsed and loaded
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree Built');
  console.log(e);
});

//fires when everything is loaded
window.addEventListener('load', function (e) {
  console.log('Page fully loaded');
  console.log(e);
});

// fires when people close the website
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
*/
