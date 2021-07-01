import * as model from './model.js'; // load our model for MVC architecture
import recipeView from './views/recipeView.js'; // load our view class instance
import searchView from './views/searchView.js'; // load our view class instance
import resultsView from './views/resultsView.js'; // load our view class instance
import paginationView from './views/paginationView.js'; // load our view class instance
import bookmarksView from './views/bookmarksView.js'; // load our view class instance
import addRecipeView from './views/addRecipeView.js'; // load our view class instance
import { MODAL_CLOSE_SEC } from './config.js';

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

    // 0.5) updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
    // 1) loading recipe

    // this model.loadRecipe is a async function so we need to await it
    // an async function returns a promise we need to handle
    await model.loadRecipe(id);

    // 2) rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
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
// loading stored bookmarks from local storage
/////////////////////////

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

/////////////////////////
// Uploading new recipe
/////////////////////////

// function needs to be async to use await to catch the error from the async function of model.uploadRecipe(newRecipe)
// by having await JS will pass the thrown error correctly
const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Close form window
    // setTimeout for leaving modal window open in time for success message to play
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

    // Display success message
    addRecipeView.renderMessage();

    // render bookmark
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    // history API, pushState() lets us change the URL without reloading the page
    // pushState() takes 3 arguments (state, title, url)
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // history API can go back and forth in the browser alos
    // history.back() to go to previous page
  } catch (err) {
    console.error(err, '💣');

    addRecipeView.renderError(err.message);
  }
};

/////////////////////////
// INIT
/////////////////////////
const init = function () {
  // subscriber part in publisher-subscriber design pattern
  bookmarksView.addHandlerLocalStorageBookmarkRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServingSize(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
