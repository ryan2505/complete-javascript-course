import View from './View.js'; // parent class
import previewView from './previewView';
import icons from 'url:../../img/icons.svg'; // Parcel 2 way

class BookmarksView extends View {
  constructor(_data) {
    super(_data);
    this._parentElement = document.querySelector('.bookmarks__list');
    this._errorMessage =
      'No bookmarks yet. Find a nice recipe and bookmark it ;)';
    this._message = '';
  }

  addHandlerLocalStorageBookmarkRender(handler) {
    // required for first bookmark load from local storage
    window.addEventListener('load', handler);
  }

  // generate HTML, same name as other views so parent View class can use render method on it
  _generateMarkup() {
    // will return a string instead of rendering to DOM
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
