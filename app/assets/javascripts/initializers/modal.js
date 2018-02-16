// Default class names for modal states
const CLASS_NAME = {
  MODAL: 'modal',
  OVERLAY: 'modal__overlay',
  SHOW: 'modal--show',
  OPEN: 'modal__open'
};

export const DEFAULT_OPTIONS = {
  className: CLASS_NAME
};

class Modal {
  /**
   * Initializer
   *
   * @param {Element} elementRef - HTML node, to add modal properties on.
   * @param {Object} options - Configuration options, defaults to `DEFAULT_OPTIONS`.
   * */
  constructor(elementRef, options = DEFAULT_OPTIONS) {
    // Initialise attributes

    // Root modal container
    this.elementRef = elementRef;
    // Object to hold all the className of the modal
    this.className = options.className || CLASS_NAME;
    // Button to show the modal
    this.showButton = this._getOpenButton();
    // Button to close the modal
    this.closeButton = this._getCloseButton();

    // Bind functions
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this._setup();
  }

  // Event Handlers

  /**
   * Event handler to open the modal.
   *
   * @param {Event} event - click event on the show button `this.showButton`.
   * */
  show(event) {
    event.preventDefault();

    this.elementRef.classList.add(this.className['SHOW']);
    document.body.classList.add(this.className['OPEN']);
  }

  /**
   * Event handler to hide the modal.
   *
   * @param {Event} event - click event on the close button `this.closeButton`.
   * */
  hide(event) {
    event.preventDefault();

    this.elementRef.classList.remove(this.className['SHOW']);
    document.body.classList.remove(this.className['OPEN']);
  }

  // private

  /**
   * Set-up the modal.
   *  1) Prepares all the DOM Nodes needed for the modal.
   *  2) Appropriately binds all necessary event callbacks.
   * */
  _setup() {
    this.overlay = this._createOverlay();

    this._addEventListeners();
  }

  /**
   * Adds all the required event listeners.
   * */
  _addEventListeners() {
    this.showButton.addEventListener('click', this.show);

    this.overlay.addEventListener('click', this.hide);
    this.closeButton.forEach((elem) => {
      elem.addEventListener('click', this.hide);
    });
  }

  /**
   * Returns the button to open the modal.
   *  - Immediate sibling of `this.elementRef` that has
   *      `data-toggle=modal` and `data-target=#[ID_OF_MODAL]`
   *
   * @return {Element} - HTML node that opens the modal.
   * */
  _getOpenButton() {
    return this.elementRef.parentElement.children.find(elem => {
      return (
          elem.dataset.toggle === this.className['MODAL'] &&
          elem.dataset.target === `#${this.elementRef.id}`
      );
    });
  }

  /**
   * Returns the button to close the modal.
   *  - First children of `this.elementRef` that has `data-hide='modal'`
   *
   * @return {Element} - HTML node that closes the modal.
   * */
  _getCloseButton() {
    return this.elementRef.querySelectorAll("[data-hide='modal']");
  }

  /**
   * Creates the overlay for the modal.
   *
   * @return {Element} - HTML node for the overlay.
   * */
  _createOverlay() {
    let overlay = document.querySelector(`.${this.className['OVERLAY']}`);

    if (overlay) { return overlay; }

    overlay = document.createElement('div');
    overlay.setAttribute('class', this.className['OVERLAY']);
    document.body.appendChild(overlay);

    return overlay;
  }
}

document.querySelectorAll(`.${DEFAULT_OPTIONS['className']['MODAL']}`).forEach(modal => {
  new Modal(modal);
});