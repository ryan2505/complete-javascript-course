import * as model from './model.js'; // load our model for MVC architecture
import recipeView from './views/recipeView.js'; // load our view class instance
import searchView from './views/searchView.js'; // load our view class instance
import resultsView from './views/resultsView.js'; // load our view class instance
import paginationView from './views/paginationView.js'; // load our view class instance
import bookmarksView from './views/bookmarksView.js'; // load our view class instance

// polyfilling all es6 code
import 'core-js/stable';
// polyfilling all es6 async/await
import 'regenerator-runtime/runtime';

////////////////////////////////////////////
// for parcel hot reloading
// if (module.hot) {
//   module.hot.accept();
// }
////////////////////////////////////////////
const { async } = require('q');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // window.location is the url, hash gives us only the hash with the # included
    const id = window.location.hash.slice(1);
    //guard clause for no id AKA loading website without hash
    if (!id) return;

    recipeView.renderSpinner();

    // 0) Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1) loading recipe

    // this model.loadRecipe is a async function so we need to await it
    // an async function returns a promise we need to handle
    await model.loadRecipe(id);

    // 2) rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

/////////////////////////
// search results
/////////////////////////

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get Search query
    const query = searchView.getQuery();
    // guard clause, if no query return to stop function
    if (!query) return;

    // 2) Load search results
    // dont need to store await in a variable because this function manipulates the state in model.js
    await model.loadSearchResults(query);

    // 3) render results
    // all the results
    // resultsView.render(model.state.search.results);
    // only some results
    resultsView.render(model.getSearchResultsPage());
    // 4) render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

/////////////////////////
// pagination on search results
/////////////////////////

const controlPagination = function (goToPage) {
  // 1) render NEW results
  // this works because render clears previous html before inserting new html
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 3) render NEW pagination buttons
  // model.state.search changes/updates on the getSearchResultsPage function
  paginationView.render(model.state.search);
};

/////////////////////////
// Updating recipe serving size
/////////////////////////

// no "view" required because the servings buttons are already
// in the recipe view we are updating
const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);
  // update the recipe view
  // recipeView.render(model.state.recipe);
  // on update text and attributes in the DOM to avoid re-rending entire recipe
  recipeView.update(model.state.recipe);
};

/////////////////////////
// Bookmarks
/////////////////////////

const controlAddBookmark = function () {
  // 1) Add/remove bookmark

  // add bookmark if its not there already
  // bookmarked will be false !false = true
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  // delete bookmark if already bookmarked
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  // update for filled bookmark svg attribute
  recipeView.update(model.state.recipe);

  // 3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

/////////////////////////
// INIT
/////////////////////////
const init = function () {
  // subscriber part in publisher-subscriber design pattern
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServingSize(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
