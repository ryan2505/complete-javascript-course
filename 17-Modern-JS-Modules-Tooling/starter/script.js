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