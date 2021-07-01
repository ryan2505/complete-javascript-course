import View from './View.js'; // parent class

// import icons from '../img/icons.svg'; // Parcel 1 way
// we need to import our static icon imgs because in the bundle step parcel is creating a new svg files that
// our html template literal can't read
import icons from 'url:../../img/icons.svg'; // Parcel 2 way
// http://localhost:1234/icons.d4a14980.svg icons url

// fraction is a library for converting decimals to fractional numbers
// fraction has an object with fraction in it
import { Fraction } from 'fractional';
// https://www.npmjs.com/package/fractional

// the view needs to be a class because later we will have parent class called view that all the views should inherit
// also each view should have a couple private properties and methods
class RecipeView extends View {
  constructor(_data) {
    super(_data);
    // makes it so we can reuse parentElement everywhere
    this._parentElement = document.querySelector('.recipe');
    this._errorMessage =
      'we could not find that recipe. Please try another one!';
    this._message =
      'Start by searching for a recipe or an ingredient. Have fun!';
  }

  // publisher method in publisher-subscriber design pattern
  // handler is the subscriber function
  addHandlerRender(handler) {
    // to run multiple events that use the same function
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServingSize(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // closest looks up for the parent with the class name from the target
      const btn = e.target.closest('.btn--update-servings');
      // guard clause - stop null from going through
      if (!btn) return;

      const updateTo = Number(btn.dataset.updateTo);

      // stops counter from going below 1
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // closest looks up for the parent with the class name from the target
      const btn = e.target.closest('.btn--bookmark');
      // guard clause - stop null from going through
      if (!btn) return;
      handler();
    });
  }

  // separate private methods because the render method will be common to all the views later in a parent class
  // and this html is unique to the recipe generation
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings - 1
          }">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings + 1
          }">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data?.bookmarked ? '-fill' : ''
    }"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
      </ul>
    </div>
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`;
  }

  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? new Fraction(ing.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit ? ing.unit : ''}</span>
        ${ing.description}
      </div>
    </li>`;
  }
}

// we export the call instance so that in the controller we dont accidentally run multiple views
// which would make it harder to keep are state in line with our logic
export default new RecipeView();

// if we exported the whole class we would have to do this to set up render recipe in the controller.js
// const recipeView = new recipeView(model.state.recipe);
// this over complicates it
