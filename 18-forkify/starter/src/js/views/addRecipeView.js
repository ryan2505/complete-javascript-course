import View from './View.js'; // parent class
import icons from 'url:../../img/icons.svg'; // Parcel 2 way

class AddRecipeView extends View {
  constructor(_data) {
    super(_data);
    this._parentElement = document.querySelector('.upload');
    this._window = document.querySelector('.add-recipe-window');
    this._overlay = document.querySelector('.overlay');
    this._btnOpen = document.querySelector('.nav__btn--add-recipe');
    this._btnClose = document.querySelector('.btn--close-modal');

    // no controller needed for this but still need to import into controller
    // if its not imported, the module would never get ran by the bundler
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    // toggle class on if not there, off if there
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    // this inside of event listeners is the this of the button the event is
    // attached too so we need to bind the this
    // no () after toggleWindow so it executes after click
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  // using close btn
  _addHandlerHideWindow() {
    // X button to close
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    // clicking outside of modal window
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      // FormData browser API
      // returns object we can't use so we spread into an array
      // this data is another API call - in MVC, API calls need to happen in the model
      // this = <form class='upload'> AKA the
      const dataArr = [...new FormData(this)];

      // since ES2019 we can use a method to convert array to an object
      //.fromEntries() takes array of 2 pair entries and creates an object
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  // generate HTML,
  //same name as other views so parent View class can use render method on it
  _generateMarkup() {}
}

// export class instance
export default new AddRecipeView();
