// Importing module
/*
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
import add, {cart} from './shoppingCart.js'



add('egg', 10)
add('bread', 2)
add('pizza', 5)


// proving modules are live connection and not copies
// cart in shoppingcart.js is empty
// above we added (3) items to the cart using addToCart() function
// live connection means this cart puts to the same thing in memory and is not a copy
console.log(cart)

// will print 
//(3) [{…}, {…}, {…}]
// 0: {product: "egg", quantity: 10}
// 1: {product: "bread", quantity: 2}
// 2: {product: "pizza", quantity: 5}
// length: 3


*/
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

import cloneDeep from './node_modules/lodash-es/cloneDeep.js'

const state = {
    cart: [
        {product: 'bread', quantity: 5},
        {product: 'pizza', quantity: 5}
    ],
    user: {loggedIn: true}
}

const stateClone = Object.assign({}, state)

// this is a clone not a deep copy
console.log(stateClone)

const stateDeepClone = cloneDeep(state)
console.log(stateDeepClone)

// will change stateClone too
state.user.loggedIn = false