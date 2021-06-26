// Importing module

// when importaning the .js at the end isn't required
// all the code in the import is parsed and executed first
// import statements are hoisted to the top
// all modules are executed in strict mode by default
// variable name needs to be the same as the one in shoppingCart.js
// named imports need same name and need to be inside clury braces
// we can rename the export with the as syntax
// import { addToCart, totalPrice as price, qt } from "./shoppingCart.js";

// console.log('Importing module')

// addToCart('bread', 5)
// console.log(price, qt)

// we can import everything in the file into a single object
// this creates a name space for all the values from this file
// import * as ShoppingCart from "./shoppingCart.js";
// this is almost like if we made a class instance

// ShoppingCart.addToCart('bread', 5)
// console.log(ShoppingCart)
// console.log(ShoppingCart.totalPrice)

// we can mix default and named imports in the same line
// in practice we don't do this because the perfered style is to import one default value per module if using default
// import add, { addToCart, totalPrice as price, qt }  from './shoppingCart.js'

// import default
import add, { cart } from './shoppingCart.js';

add('egg', 10);
add('bread', 2);
add('pizza', 5);

// proving modules are live connection and not copies
// cart in shoppingcart.js is empty
// above we added (3) items to the cart using addToCart() function
// live connection means this cart puts to the same thing in memory and is not a copy
console.log(cart);

// will print
//(3) [{…}, {…}, {…}]
// 0: {product: "egg", quantity: 10}
// 1: {product: "bread", quantity: 2}
// 2: {product: "pizza", quantity: 5}
// length: 3

/*
////////////////////////////
// module pattern - old way to do modules
////////////////////////////

// IFFY is created so the code is only ran once and not multiple times
// only purpose is to create a new scope and only return once
// all the data inside this is private basically and can only accessed with a return inside the IFFY

const ShoppingCart2 = (function(){
    const cart =[];
    const shippingCost = 10;
    const totalPrice = 237
    const totalQuantity = 23


    const addToCart = function(product, quantity) {
        cart.push({product, quantity})
        console.log(`${quantity} ${product} added to cart`)
    } 

    const orderStock = function(product, quantity) {
        cart.push({product, quantity})
        console.log(`${quantity} ${product} ordered from supplier`)
    } 

    // we create/return an object with everything we want to make public
    return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity
    }
})();

// ShoppingCart2 is our access point
// we get access to everything returned in the object
// we can access it like our ES6 module methods
// all variables are accessible because of function closures
ShoppingCart2.addToCart('apple', 4)
ShoppingCart2.addToCart('pizza', 4)
console.log(ShoppingCart2)
console.log(ShoppingCart2.shippingCost) // returns undefined 
// shippingCost is private now

// problem with module pattern
// if we wanted one file for each module we would then have to link them all in the HTML
// then HTML order would matter and could get screwed up easier
// also bundlers wouldn't be able to function properly 
 // also all variables would be available in the global namespace

 */
/*
////////////////////////////
// CommonJS- another old way to do modules
////////////////////////////

// besides the module pattern there was other ways to do modules
// CommonJS and AMD modules
// CommonJS were a thing in node.js since the beginning till recently when node.js added ES6 modules
// alot of the npm repo still uses CommonJS because it hasn't been refactored yet
// so CommonJS is still common
// like with ES6 modules - one file is a module approach


// Export
// this won't work in browser but will work in node JS
// in Node JS export is an object
export.addToCart = function(product, quantity) {
    cart.push({product, quantity})
    console.log(`${quantity} ${product} added to cart`)
} 

// Import

// require is defined in node JS so it wont work here
const { addToCart } = require('./shoppingCart.js')

// end goal - ES6 modules should replace all modules but thats far away
*/

////////////////////////////
// Introduction to node JS
////////////////////////////

// why we need NPM
// before NPM people would expose their project packages in the index.html
// in mapty we did this with the leaflet.js by using a script tag to link the CDN
// if we downloaded the API library, we would have to manual updated everytime the API changed
// before NPM there used to be multiple places you could get your packages leading to more confusion
// all of this made a big mess

// Intro to NPM
// to use NPM we need node.js installed as its part of it
// to check we have it installed we type "npm -v"
// then in the terminal in vscode we type "npm init"
// the init process will ask you questions to create the package.json file
// after options it will ask you if its OK and you click enter to accept
// package.json is created

// package.json stores our entire configuration for our project

// example on how to install leaflet.js as an npm package
// on their website find their download section and NPM section
// copy this into terminal "npm install leaflet" ===> short version "npm i leaflet"
// npm called first to use npm
// this will download the API NPM package current version

// with this package installed we can now see the package in our json under dependencies with the current version we installed
// a folder called node_modules will also be created with the leaflet library code in its own folder
// all packages get installed into the node modules folder

// if we wanted to use this we would need a module bundler because its using CommonJS module method
// we can't directly import leaflet into our code till the bundler is used

// another example library to load is lodash.js
// lodash.js creates alot of helpful object and array methods that should be in JS but aren't
// to install it without the CommonJS methods we look for lodash-es (es = es modules)
// to install "npm i lodash-es" in terminal
// this will add it to the package.json and to the node_modules folder

// if want to move computers, commit to git, or share with a friend
// never include node_modules folder - its huge
// so how to do you keep the packages?
// the package.json files keeps track of all your dependencies so even when you delete the node-modules folder you can get it back
// use the command "npm i" with no package filled out will download them all again from package.json

// to import cloneDeep.js within lodash

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

// with parcel it will read this import and automatically find this clonedeep function its self
// it doesn't need the full address like above
// this works for all project addresses like img, html, css, modules
import cloneDeep from 'lodash-es';

// if we import a package we don't have downloaded, parcel will read that and run "npm i lodash" to install it and use it
// parcel works with CommonJS modules
// import cloneDeep from 'lodash';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);

// this is a clone not a deep copy
console.log(stateClone);

const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);

// will change stateClone too
state.user.loggedIn = false;

////////////////////////////
// Bundling with parcel and NPM scripts
////////////////////////////

// parcel works out of the box without any configuration
// webpack is really popular too for react world, but very complicated with config setups

// Parcel is a build too on NPM
// too install we write "npm i parcel --save-dev"
// this is a different type of dependency, a dev dependency is a tool we need to build our project/app but not required in the code
// dev dependencies are in a different section in the package.json file
// parcel doesn't work with locally installed dependency's and with the above command we installed it locally
// so its only within this project
// to use parcel in the terminal we can use npx or npm scripts
// first thing we will try is npx which is built into npm
// "npx parcel index.html" <----- index.html is the entry point where we included our script.js src (the file we want to bundle)
// currently in this example script we are importing shoppingcart.js, using lodash cloneDeep, and useing it all in script.js
// so parcel should bundle these (3) things for us
// when we run this "npx parcel index.html" in the terminal. parcel bundles are packages and gives us a new server instance
// Server running at http://localhost:1234 is now runnning our code with the bundled stuff
// parcel does the same thing live server does basically, throws the website on localhost aka http://127.0.0.1/
// a new JS file is created with parcel code injected and all our code modified to use in one file.
// our 200 line script becomes 3340 lines with parcel stuff and other packages like lodash code required

// if parcel doesn't install we could use "sudo" in the command to give more admin rights
// or install the exact version we know it works by typing "npm i parcel@1.12.4" to get a version we want
// we might get errors because we defined a "type = module" script for our ES6 module to work but parcel builds a new script
// and doesn't need it so we comment it out and create a version without "type = module" after saving parcel will rebuild
// the application
// each file save, parcel rebuilds

// what parcel did:
// created a "dist" folder standing for distribution, this is the folder we will send to production
// this code we will send to finally users
// in the "dist" folder we can see all the files parcel created
// there will be a new index.html, JS script, and since we use leaflet a new map js file
// JS file called "index.b4f5078c.js"
// inside this file we can find uncompressed JS code with our code mixed in and modified but variable names stay the same
// this is called the development step, compression and tree shaking out old/unused code comes later in the build step
// this bundled super script, we normally don't care about in development. we keep modifying and fixing our original scripts
// and modules then let parcel figure out the bundling

// every save parcel rebuilds but in parcel we can activate hot module replacement
// this code below is how we activate it. this code only parcel understands so it is instructions for parcel that wont make it into
// the final bundle

// hot module reloading =  when we modify one of the modules that will get put in parcel rebuild but won't force the page to reload
// it will magically get injected into the script in the page so if we are testing any state type components they won't restart

// if (module.hot) {
//   module.hot.accept();
// }

// the other way to use parcel is to use npm scripts which is how we actually use it in practice/ real world
// npm scripts let us bundle local scripts and automate tasks like commands we reuse over and over
// in the terminal we cant write "parcel index.html" but in package.json script section we can write:
// "scripts": {"start": "parcel index.html"}
// and use it in the terminal with "npm run start" <--- start is the name of the NPM script we created/defined

// When were done developing our project we need to build the final bundle
// final bundle is compressed, with unused code eliminated
// for this we need another parcel command that we create in the package.json scripts section
// "build": "parcel build index.html" to run in the terminal with "npm run build"
// this compresses all the files to save on space/ performance improved and puts them in "dist" folder
// these files would be our production files

// we can also install packages globally meaning we can use them in every directory on our computer
// "npm i parcel -g" for that
// most tools you should install locally so you stay on the latest version you need for the project

////////////////////////////
// Configuring Babel and polyfilling
////////////////////////////

// Babel is used for converting ES6+ code back to ES5
// so our application can be used old versions of internet explorer
// parcel includes babel with some default config decisions
// Babel works with plugins and presets that can both be configured
// a plugin is a specific JS feature we want to transpile (aka convert)
// example: lets say we only want to convert arrow functions to ES5 but leave everything else in ES6 - so we would use this plugin
// if we wanted to convert everything we would use a preset, which is a bunch of plugins bundled together.
// by default parcel uses "@babel/preset-env for compiling ES2015+ syntax"
// this preset automatically selects which JS features should be compiled/converted based browser support
// "@babel/preset-env supports all browsers except browsers with less then 0.25% market usage

// when we run "npm run start" ""start": "parcel index.html""
// inside the JS script we can see all variables are in VAR and no longer LET or CONST
// meaning we have reverted back to ES5
// @babel/preset-env only includes final features of JS so all features passed stage 4 of the ecma process
// a stage 3 feature wouldn't convert like class fields for private variables
// this is how we would transpile that

class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

// this works because the experimental JS plugin for babel is already inside the preset @babel/preset-env

// below is an examples of using an ES6 features of filter and promise that won't convert to ES5
// the below code will work for us because our browser understands ES6 but on internet explore 7 it wouldn't
// we can find this not converted in the dev bundle file parcel makes

console.log(cart.filter(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

// babel can only convert syntax only so arrow functions, spread operator do things in a shorten way
// that babel can write the long way over to convert
// but filter and promise are new JS features not syntax

// for these features we need to polyfill them, meaning converting there purpose into the ES5 equivalent
// babel used to do this but no recommends the core-js library
// in terminal "npm i core-js" to install

// import 'core-js/stable';

// core-JS/stable is what we need for these features
// what will happen now is Core-JS will recreate the filter and promise as functions that follow es5
// so that can still be used

// polyfill will polyfill everything even if we are not using it
// if we wanted too we could cherry pick the features we want to polyfill only
// this reduces bundle size
// this is alot of work and normally not done unless you are really worried about bundle size

// this is how to target one method
import 'core-js/stable/array/filter';

// there is one feature core-js doesn't cover so we need a 2nd package
// to install "npm i regenerator-runtime"

// for polyfilling async functions
import 'regenerator-runtime/runtime';

// imports normally go at the top of the file, but they get hoisted to the top anyways
