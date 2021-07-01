import { async } from 'regenerator-runtime'; //polyfilling async
import { API_URL, RESULTS_PER_PAGE, KEY } from './config.js'; // constant variables
// import { getJSON, sendJSON } from './helper.js'; // "./" means current folder
import { AJAX } from './helper.js'; // "./" means current folder

// state contains all the data we need to build our application
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  // destructor data.data.recipe into just recipe
  const { recipe } = data.data;
  // the server/API object used some _ variables (cooking_time). so we convert to camelCase
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
    // this is how to attached the API key to user created recipes
    // without messing up all the server ones
    // && short circuits if recipe.key is falsy, so nothing happens
    // if truthy next line gets executed
    // so object { key: recipe.key } gets returned
    // to place the object in the object structure we are writing we using the spreading operator
    // becomes = > key: recipe.key
  };
};

// loadRecipe is business logic
// controller gives id
// this function returns noting, just changes our state object so the controller can grab
// it when updated cuz of the module live connection
// not pure function - side affect of manipulating state object
// we could avoid that but its alot more work then its worth in this case
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    // refactored into a function createRecipeObject
    state.recipe = createRecipeObject(data);

    // .some() returns true if any element in array is true for condition
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    // temporary error handling
    console.error(`${err} 💣💣💣`);
    throw err;
  }
};

/////////////////////////
// search results
/////////////////////////

// will be called by controller
// so controller will be telling this function what to search for
export const loadSearchResults = async function (query) {
  try {
    // we store query incase later we want to use it for some analytics on the most searched thing or something
    state.search.query = query;
    // we search by using ? in url then search=pizza for example
    // this query returns promise with object data filled with an array of stuff matching the search word
    // only minor details so we can display in the search results then we can use the given ID to get the full recipe data
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    // update state with results
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }), //logic explained in createRecipeObject
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 💣💥💣💥`);
    throw err;
  }
};

/////////////////////////
// pagination on search results
/////////////////////////

//not an async function because we already have the search results loaded
// defaults to page 1
export const getSearchResultsPage = function (page = state.search.page) {
  // its a good idea to store what page we are currently on in the state to use later
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0 for page 1;
  const end = page * state.search.resultsPerPage; // 9 for page 1;

  // slice doesn't include end so 10 (state.search.resultsPerPage) works fine
  return state.search.results.slice(start, end);
};

/////////////////////////
// Updating recipe serving size
/////////////////////////

export const updateServings = function (newServings) {
  // change all ingredients to match newServing based on calculation
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
    // newQty = oldQty * newServings / oldServings // x = 2 * 2/4 // x = 1
  });
  // update servings
  state.recipe.servings = newServings;
};

/////////////////////////
// storing bookmarks in local storage
/////////////////////////

const persistBookmarks = function () {
  // will store a JSON object which is a string
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

/////////////////////////
// Bookmarks
/////////////////////////

// input entire data object of recipe
export const addBookmark = function (recipe) {
  // Add bookmark object
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark with new property for bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  // store bookmark into local storage
  persistBookmarks();
};

// input entire only ID of recipe
export const deleteBookmark = function (id) {
  // calculate bookmark location in array based id
  const index = state.bookmarks.findIndex(el => el.id === id);
  // delete bookmark from array
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (state.recipe.id === id) state.recipe.bookmarked = false;

  // store bookmark into local storage
  persistBookmarks();
};

/////////////////////////
// loading stored bookmarks from local storage
/////////////////////////

const localStorageInit = function () {
  const storage = localStorage.getItem('bookmarks');

  // if there are no bookmarks yet we dont want to insert a null into our state
  // so we block it with a if
  if (storage) state.bookmarks = JSON.parse(storage);
};

localStorageInit();

/////////////////////////
// function for debugging
/////////////////////////

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

// clearBookmarks();

// function need to be async because it will make a request to the API
// function needs to format the data the same way we get it from the API
// data comes from the form object we created in the view with Object.fromEntries(dataArr)
// async will make this a promise
export const uploadRecipe = async function (newRecipe) {
  try {
    // Object.entries() turns object syntax back into an array or array pairs
    // first element of pair should start with ingredient and 2nd not be empty
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        // array of ingredients
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        const ingArr = ing[1].split(',').map(el => el.trim()); // changed so spaced ingredients dont lose their space

        // checking if array is length of 3, if not that means its filled out incorrectly
        // this error needs to be rendered by the view
        // error will reject the promise
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        // we can use a ternary operator in our return object
        return {
          quantity: quantity ? Number(quantity) : null,
          unit,
          description,
        };
      });

    // creating the data to be sent back to the API - API used _ so we need too to
    // all case sensitive
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.publisher,
      cooking_time: Number(newRecipe.cookingTime),
      servings: Number(newRecipe.servings),
      publisher: newRecipe.publisher,
      ingredients,
    };

    // sendJSON will return data so we await it
    // key is API key
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    // store our user created recipe into the state
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
