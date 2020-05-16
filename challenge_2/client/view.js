class GeneratorView {
  constructor() {
    this.app = document.querySelector('#app');
    this.formField = document.querySelector('#form');
    this.textarea = document.querySelector('#data-field');
    this.filePicker = document.querySelector('#file-picker');
    this.filterInput = document.querySelector('#filter-input');
    this.msgDisplay = document.querySelector('#message');
    this.latestDownload = document.querySelector('#latest-conversion');
    this.downloadList = document.querySelector('#download-list');
    this.curState = null;

    this.render = this.render.bind(this);
    this.removeFormFieldInputs = this.removeFormFieldInputs.bind(this);
  }

  // Compares newState to current state, updating only keys that have changed
  render(newState) {
    if (!this.curState) {
      this.curState = { ...newState };
    }

    if (this.curState.errMessage !== newState.errMessage) {
      this.curState.errMessage = newState.errMessage;
      this.msgDisplay.textContent = newState.errMessage;
      this.msgDisplay.style.color = 'red';
    }

    if (this.curState.successMessage !== newState.successMessage && this.curState.errMessage === '') {
      this.curState.successMessage = newState.successMessage;
      this.msgDisplay.textContent = newState.successMessage;
      this.msgDisplay.style.color = 'green';
    }

    if (this.curState.latest !== newState.latest) {
      this.curState.latest = newState.latest;
      let latestDownloadLink = this.createLinkNode(this.curState.latest);
      this.latestDownload.innerHTML = '';
      this.latestDownload.append(latestDownloadLink);
    }

    if (!checkShallowArrayEquality(this.curState.converted, newState.converted)) {
      this.curState.converted = [...newState.converted];
    }

    // TODO: Don't recreate <a> nodes for each state update
    this.downloadList.innerHTML = '';
    this.curState.converted.forEach(fileName => {
      this.downloadList.prepend(this.createLinkNode(fileName));
    });
  }

  // Creates an <a> node to a CSV file download
  createLinkNode(fileName) {
    let linkToFile = document.createElement('a');
    linkToFile.setAttribute('href', `http://localhost:3000/download/${fileName}`);
    linkToFile.textContent = fileName;
    return linkToFile;
  }

  removeFormFieldInputs() {
    this.textarea.value = '';
    this.filePicker.value = '';
    this.filterInput.value = '';
  }
}