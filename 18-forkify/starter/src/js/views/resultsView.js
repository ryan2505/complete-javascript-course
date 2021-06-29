import View from './View.js'; // parent class
import previewView from './previewView';
import icons from 'url:../../img/icons.svg'; // Parcel 2 way

class ResultsView extends View {
  constructor(_data) {
    super(_data);
    this._parentElement = document.querySelector('.results');
    this._errorMessage = 'No recipes found for your query! Please try again';
    this._message = '';
  }

  // generate HTML, same name as other views so parent View class can use render method on it
  _generateMarkup() {
    // will return a string instead of rendering to DOM
    return this._data
      .map(searchResult => previewView.render(searchResult, false))
      .join('');
  }
}

export default new ResultsView();
