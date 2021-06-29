import { async } from 'regenerator-runtime'; //polyfilling async
import { API_URL, RESULTS_PER_PAGE } from './config.js'; // constant variables
import { getJSON } from './helper.js'; // "./" means current folder

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

// loadRecipe is business logic
// controller gives id
// this function returns noting, just changes our state object so the controller can grab
// it when updated cuz of the module live connection
// not pure function - side affect of manipulating state object
// we could avoid that but its alot more work then its worth in this case
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    // destructor data.data.recipe into just recipe
    const { recipe } = data.data;

    // the server/API object used some _ variables (cooking_time). so we convert to camelCase
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

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
    const data = await getJSON(`${API_URL}?search=${query}`);

    // update state with results
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
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
// Bookmarks
/////////////////////////

// input entire data object of recipe
export const addBookmark = function (recipe) {
  // Add bookmark object
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark with new property for bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

// input entire only ID of recipe
export const deleteBookmark = function (id) {
  // calculate bookmark location in array based id
  const index = state.bookmarks.findIndex(el => el.id === id);
  // delete bookmark from array
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (state.recipe.id === id) state.recipe.bookmarked = false;
};
