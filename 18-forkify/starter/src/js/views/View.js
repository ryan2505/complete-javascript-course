import icons from 'url:../../img/icons.svg';

// we export the class because we are only using it as a parent class of the child views
export default class View {
  constructor() {
    this._data;
  }

  render(data, render = true) {
    // guard clause if no data can be received or data is an empty array
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    // when render is false only the markup is returned
    if (!render) return markup;

    this._htmlClear();
    // insert out modified html
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // update text and attributes that change in the DOM to avoid re-rendering entire thing
  // algorithm used here is ok for small application but on large sites this wouldn't cut it
  update(data) {
    // guard clause if no data can be received or data is an empty array
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    // don't need this because we don't call on empty array chance

    // we will create new markup but not render it
    // new markup will be compared against old markup and parts differ get rendered
    this._data = data;
    const newMarkup = this._generateMarkup();

    // converts newMarkup template string to a real DOM object living in memory/ virtual DOM
    // we can work this is DOM object like the DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // select all the elements/nodes in the newDOM
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    // selecting all elements/nodes in the current DOM on the page
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // isEqualNode() is a method on all nodes
      // will return boolean if node is different then comparison node
      // parent nodes will read true if any children change
      // if different will return false so we use !false to make true
      // firstChild of a node with textContent is the text itself
      // nodeValue is a property on nodes that returns stuff based on what the node is , more on MDN
      // text nodes will return the text so we can do a strict comparison to empty string so it only lets filled strings through
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // only updates CHANGED text and not attributes
        curEl.textContent = newEl.textContent;
      }

      // only updates CHANGED attributes
      if (!newEl.isEqualNode(curEl)) {
        // Array.from() will create an array out of all the NamedNodeMaps so we can loop over them with forEach
        // then we set the attribute on current elements on page to the ones changed in our virtual DOM
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  // abstracts away the html clear
  _htmlClear() {
    // wipe out html already in recipe container
    this._parentElement.innerHTML = '';
  }

  // public method to use in controller.js
  // injects a loading spinner that uses CSS animations while we await data fetch
  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;
    this._htmlClear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Error html public method
  // defaults to view class property set for error message
  // if no message passed in
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>;
    `;

    this._htmlClear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // for rendering any message to the view container
  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

    this._htmlClear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
