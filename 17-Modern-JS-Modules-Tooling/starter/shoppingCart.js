// exporting module
// console.log('Exporting module')
/*
// variables declared in a module are scoped to the module
// they are private to this script
// normal scripts would put these in the global scope and 
// we would be able to access them in other scripts
// if we wanted to use these variables in other scripts we need to export them
// in modules there are two types of exports
// named export = export in front of the varible
// const shippingCost = 10;
// export const cart = []

// this is a named export
// exports always need to be in top level code - cant be in a if block for example
export const addToCart = function(product, quantity) {
    cart.push({product, quantity})
    console.log(`${quantity} ${product} added to cart`)
} 


// named exports are good for exporting multiple variables

const totalPrice = 237;
const totalQuantity = 23;

// how to export multiple
// we can rename the export with the as syntax
export {totalPrice, totalQuantity as qt};

// we use default exports when we only want to export one thing per module
// we only export the value so no name is given to this function from the addToCart function
export default function(product, quantity) {
    cart.push({product, quantity})
    console.log(`${quantity} ${product} added to cart`)
} */


