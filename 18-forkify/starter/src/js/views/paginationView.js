import View from './View.js'; // parent class
import icons from 'url:../../img/icons.svg'; // Parcel 2 way

class PaginationView extends View {
  constructor(_data) {
    super(_data);
    this._parentElement = document.querySelector('.pagination');
  }

  // publisher method in publisher-subscriber design pattern
  // handler is the subscriber function
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // closest looks up in the tree for parents of this class
      const btn = e.target.closest('.btn--inline');
      // guard clause
      if (!btn) return;
      // get btn page number from dataset
      const goToPage = Number(btn.dataset.goto);
      // pass to variable to controlPagination in controller.js
      handler(goToPage);
    });
  }

  // generate HTML, same name as other views so parent View class can use render method on it
  _generateMarkup() {
    const curPage = this._data.page;

    // get number of pages and round up
    // Math.ceil means 0.4 = 1 and 0.6 = 1
    const numPages = Math.ceil(
      this._data?.results.length / this._data?.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButtonNext(curPage);
    }

    // Last page - when we are on the same page as the total number of pages
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButtonBack(curPage);
    }
    // Other Page
    if (curPage < numPages) {
      return (
        this._generateMarkupButtonNext(curPage) +
        this._generateMarkupButtonBack(curPage)
      );
    }
    // Page 1, and there are NO other pages
    // if all other if fail, there must be only 1 page
    // return nothing because no button should display
    return '';
  }

  // generates next button, arrow goes right side
  _generateMarkupButtonNext(passedInPage) {
    return `
      <button data-goto="${
        passedInPage + 1
      }" class="btn--inline pagination__btn--next">
          <span>Page ${passedInPage + 1}</span>
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
              </svg>
      </button>`;
  }

  // generates back button, arrow goes left side
  _generateMarkupButtonBack(passedInPage) {
    return `
    <button data-goto="${
      passedInPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${passedInPage - 1}</span>
    </button>`;
  }
}

// export class instance
export default new PaginationView();
