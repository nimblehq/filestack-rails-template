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
    if(document.body.querySelector(".fsp-image-search:not(.fsp-area--hide)")) {
      setTimeout(function() {
        document.body.querySelector(".fsp-action-content").classList.add('fsp-action--active');
      }, 300);
    }
  }

  hide(event) {
    event.preventDefault();

    document.body.querySelector(".__filestack-picker .fsp-picker").classList.remove('fsp-picker--active');
    document.body.querySelector(".fsp-action-content").classList.remove('fsp-action--active');

    if(document.body.querySelector(".fsp-image-search:not(.fsp-area--hide)")) {
      let container;

      if(!document.body.querySelector(".fsp-image-preview")) {
        container = document.createElement('div');

        container.setAttribute('class', 'fsp-image-preview fsp-area--hide');
        document.body.querySelector('input[type="file"]').parentNode.insertBefore(container, document.body.querySelector('input[type="file"]'));
      } else {
        container = document.body.querySelector(".fsp-image-preview");
        container.innerHTML = '';
        container.setAttribute('class', 'fsp-image-preview fsp-area--hide');
      }

      let clone = document.body.querySelector(".fsp-image-search__results .fsp-image-grid").cloneNode(true);
      container.appendChild(clone);
      setTimeout(function() {
        container.classList.remove('fsp-area--hide');

        setTimeout(function() {
          clone.classList.add('fsp-image-grid--active');
        }, 300);
      }, 300);
    } else {
      if(document.body.querySelector(".fsp-image-preview")) {
        document.body.querySelector(".fsp-image-preview").remove();
      }
    }
  }

  pick(event) {
    event.preventDefault();

    document.body.querySelector('input[type="file"]').click();
  }

  change(event) {
    if (event.target.files.length > 0) {
      document.body.querySelector(".__filestack-picker .fsp-content .fsp-drop-area-container").classList.add('fsp-area--hide');

      if(!document.body.querySelector(".fsp-image-search")) {
        let galleryHTML = `
          <div class="fsp-image-search">
            <div class="fsp-image-search__results">
              <div class="fsp-image-grid" style="padding-top: 0px;"></div>
            </div>
          </div>
        `;
        document.body.querySelector(".__filestack-picker .fsp-content").insertAdjacentHTML('beforeend', galleryHTML);
      } else {
        document.body.querySelector(".__filestack-picker .fsp-content .fsp-image-grid").innerHTML = '';
      }

      document.body.querySelector(".__filestack-picker .fsp-content .fsp-image-search").classList.remove('fsp-area--hide');
      document.body.querySelector(".fsp-action-content").classList.add('fsp-action--active');

      setTimeout(function() {
        for(let i=0; i<event.target.files.length; i++) {
          let file = event.target.files[i];
          let grid = document.createElement('div');
          let overlay = document.createElement('div');
          let preview = document.createElement('img');
          let reader = new FileReader();

          grid.setAttribute('class', 'fsp-image-grid__cell');
          grid.setAttribute('data-image-index', i+1);

          overlay.setAttribute('class', 'fsp-overlay-grid__cell');

          preview.setAttribute('class', 'fsp-image-grid__image');

          reader.onloadend = function() {
            preview.src = reader.result;

            grid.appendChild(overlay);
            grid.appendChild(preview);
            document.body.querySelector(".__filestack-picker .fsp-image-grid").appendChild(grid);

            setTimeout(function() {
              grid.classList.add('fsp-image-grid--active');
            }, 300);
          };

          if(file) {
            reader.readAsDataURL(file);
          } else {
            preview.src = '';

            grid.appendChild(preview);
            document.body.querySelector(".__filestack-picker .fsp-image-grid").appendChild(grid);
          }
        }


      }, 600);
    } else {
      document.body.querySelector(".__filestack-picker .fsp-content .fsp-image-search").classList.add('fsp-area--hide');
      document.body.querySelector(".__filestack-picker .fsp-content .fsp-drop-area-container").classList.remove('fsp-area--hide');
      document.body.querySelector(".fsp-action-content").classList.remove('fsp-action--active');
    }
  }

  _setup() {
    this.elementRef.setAttribute('class', 'buri-uploads');

    this.modal = this._createModal();
    this._createDefaultContainer(this.modal);

    this.showButton = this._createPopupButton();

    this._addEventListeners();
  }

  _addEventListeners() {
    this.showButton.addEventListener('click', this.show);
    this.elementFileInput.addEventListener('change', this.change);

    document.body.querySelector(".fsp-picker__close-button").addEventListener('click', this.hide);
    document.body.querySelector(".fsp-action-content .submit-btn").addEventListener('click', this.hide);

    document.body.querySelector(".fsp-drop-area").addEventListener('click', this.pick);
    document.body.querySelector(".fsp-action-content .choose-file-btn").addEventListener('click', this.pick);
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
                  <!-- Content -->
                </div>
                
                <div class="fsp-action-content">
                  <button type="button" class="btn btn-light choose-file-btn">Choose Files</button>
                  <button type="button" class="btn btn-primary submit-btn">OK</button>
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

  _createDefaultContainer() {
    let containerHTML = `
      <div class="fsp-drop-area-container">
        <div class="fsp-drop-area">
          <div class="fsp-select-labels">
            <div class="fsp-drop-area__title fsp-text__title"> Select Files to Upload</div>
          </div>
        </div>
      </div>
    `;

    document.body.querySelector(".__filestack-picker .fsp-content").innerHTML = containerHTML;
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
