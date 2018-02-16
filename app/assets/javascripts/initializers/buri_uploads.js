const BUPLOAD_DEFAULT_SELECTOR = '[data-ui="buri-uploads"]';

const BUPLOAD_DEFAULT_OPTIONS = {
  selector: BUPLOAD_DEFAULT_SELECTOR
};

class BuriUploads {
  constructor(elementRef) {
    this.elementRef = elementRef;
    this.elementFileInput = this.elementRef.querySelector('input[type="file"]');

    this._setup();
  }

  show(event) {
    event.preventDefault();

    document.body.querySelector(".__filestack-picker .fsp-picker").classList.add('fsp-picker--active');
  }

  hide(event) {
    event.preventDefault();

    document.body.querySelector(".__filestack-picker .fsp-picker").classList.remove('fsp-picker--active');
  }

  pick(event) {
    event.preventDefault();

    $('input[type="file"]').click();
  }

  _setup() {
    this.elementRef.setAttribute('class', 'buri-uploads');
    this.modal = this._createModal();

    this.showButton = this._createPopupButton();

    this._addEventListeners();
  }

  _addEventListeners() {
    this.showButton.addEventListener('click', this.show);

    document.body.querySelector(".fsp-picker__close-button").addEventListener('click', this.hide);
    document.body.querySelector(".fsp-drop-area").addEventListener('click', this.pick);
  }

  _createModal() {
    let modalHTML = `
      <div class="__filestack-picker">
        <div>
            <div class="fsp-picker">
                <div class="fsp-modal">
                    <div class="fsp-modal__sidebar">
                        <div class="fsp-source-list">
                            <div class="fsp-source-list__item fsp-source-list__item--active">
                                <span class="fsp-source-list__icon fsp-icon fsp-icon--local_file_system"></span>
                                <span class="fsp-source-list__label">My Device</span>
                            </div>
                            
                            <div class="fsp-source-list__item"><!----> <span class="fsp-source-list__icon fsp-icon fsp-icon--url"></span> <span class="fsp-source-list__label">Link (URL)</span> <!----> <!----></div>
                            
                            <div class="fsp-source-list__item"><!----> <span class="fsp-source-list__icon fsp-icon fsp-icon--imagesearch"></span> <span class="fsp-source-list__label">Web Search</span> <!----> <!----></div>
                            
                            <div class="fsp-source-list__item"><!----> <span class="fsp-source-list__icon fsp-icon fsp-icon--facebook"></span> <span class="fsp-source-list__label">Facebook</span> <!----> <!----></div>
                            
                            <div class="fsp-source-list__item"><!----> <span class="fsp-source-list__icon fsp-icon fsp-icon--instagram"></span> <span class="fsp-source-list__label">Instagram</span> <!----> <!----></div>
                            
                            <div class="fsp-source-list__item"><!----> <span class="fsp-source-list__icon fsp-icon fsp-icon--googledrive"></span> <span class="fsp-source-list__label">Google Drive</span> <!----> <!----></div>
                            
                            <div class="fsp-source-list__item"><!----> <span class="fsp-source-list__icon fsp-icon fsp-icon--dropbox"></span> <span class="fsp-source-list__label">Dropbox</span> <!----> <!----></div>
                        </div>
                    </div>
                    
                    <div class="fsp-modal__body">
                        <div>
                            <div class="fsp-header">
                                <span class="fsp-header-text--visible"> My Device </span>
                                <div class="fsp-mobile-menu"></div>
                                <span class="fsp-picker__close-button fsp-icon--close-modal"></span>
                            </div>
                        </div>
                            
                        <div class="fsp-content">
                            <div class="fsp-drop-area-container">
                                <div class="fsp-drop-area">
                                    <div class="fsp-select-labels">
                                        <div class="fsp-drop-area__title fsp-text__title"> Select Files to Upload </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.body.querySelector(".__filestack-picker");
  }

  _createPopupButton() {
    let button = document.createElement('button');

    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn btn-light');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#borderlessModal');
    button.innerHTML = 'Choose Files';
    this.elementFileInput.parentNode.insertBefore(button, this.elementFileInput.nextSibling);

    return button;
  }
}

document.querySelectorAll(BUPLOAD_DEFAULT_OPTIONS['selector']).forEach(buriUploadForm => {
  new BuriUploads(buriUploadForm);
});
