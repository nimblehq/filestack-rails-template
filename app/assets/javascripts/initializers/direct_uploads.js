const DUPLOAD_DEFAULT_SELECTOR = '[data-form="direct-uploads"]';

const DUPLOAD_DEFAULT_OPTIONS = {
  selector: DUPLOAD_DEFAULT_SELECTOR
};

class DirectUploads {
  constructor(elementRef) {
    this.elementRef = elementRef;

    this._setup();
  }

  _setup() {
    this._addEventListeners();
  }

  _addEventListeners() {
    this.elementRef.addEventListener("direct-upload:initialize", event => {
      const {target, detail} = event;
      const {id, file} = detail;
      target.insertAdjacentHTML("beforebegin", `
        <div id="direct-upload-${id}" class="direct-upload direct-upload--pending">
          <div id="direct-upload-progress-${id}" class="direct-upload__progress" style="width: 0%"></div>
          <span class="direct-upload__filename">${file.name}</span>
        </div>
      `)
    });

    this.elementRef.querySelector('.form-control-file').addEventListener("direct-upload:start", event => {
      const {id} = event.detail;
      const element = document.getElementById(`direct-upload-${id}`);
      element.classList.remove("direct-upload--pending");
    });

    this.elementRef.querySelector('.form-control-file').addEventListener("direct-upload:progress", event => {
      const {id, progress} = event.detail;
      const progressElement = document.getElementById(`direct-upload-progress-${id}`);
      progressElement.style.width = `${progress}%`;
    });

    this.elementRef.addEventListener("direct-upload:end", event => {
      const {id} = event.detail;
      const element = document.getElementById(`direct-upload-${id}`);
      element.classList.add("direct-upload--complete");
    });
  }
}

document.querySelectorAll(DUPLOAD_DEFAULT_OPTIONS['selector']).forEach(directUploadForm => {
  new DirectUploads(directUploadForm);
});
