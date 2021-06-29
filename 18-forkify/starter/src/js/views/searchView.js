class SearchView {
  constructor() {
    this._parentElement = document.querySelector('.search');
  }

  // returns text from search input field
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  // clear search field
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  // publisher method in publisher-subscriber design pattern
  // handler is the subscriber function
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault(); // stop page from reloading
      handler();
    });
  }
}

export default new SearchView();
