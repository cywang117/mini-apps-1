// TODO:
// 1. Line 127 (don't recreate <a> nodes for each state update)
// 2. Finish advanced content @GLearn
// 3. Finish nightmare content @GLearn ---> server.js line 36: Return file name with unique id at end -- change file names to have uuid, store in DB
//                              ---> Line 50 (Get only the converted files of current user (sessions))
//                              ---> Display 'Previous Conversions' files chronologically

// Model
class GeneratorModel {
  constructor(view) {
    this.server = 'http://localhost:3000/';
    this.View = view;

    this.state = {
      errMessage: '',
      successMessage: '',
      converted: [],
      latest: null
    }

    this.setState = this.setState.bind(this);
    this.getConverted = this.getConverted.bind(this);
    this.postJSONData = this.postJSONData.bind(this);
    this.getConverted();
  }

  // Updates current state obj with keys of newState, copying to prevent mutation as necessary
  setState(newState) {
    for (let key of Object.keys(newState)) {
      if (Array.isArray(newState[key])) {
        this.state[key] = [ ...newState[key] ];
      } else if (typeof newState[key] === 'object') {
        this.state[key] = { ...newState[key] };
      } else {
        this.state[key] = newState[key];
      }
    }
    this.View.render({ ...this.state });
  }

  // Gets already-converted files
  // TODO: Gets only the converted files of current user (sessions)
  async getConverted() {
    try {
      let result = await fetch('http://localhost:3000/download');
      let resultJSON = await result.json();
      this.setState(resultJSON);
    } catch(e) {
      console.error(e);
    }
  }

  // Posts valid JSON string to server, updating view on post success
  // Returns boolean indicating post success
  async postJSONData(dataStr, fileName) {
    try {
      JSON.parse(dataStr);
    } catch(e) {
      return false;
    }

    let request = new Request(this.server, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonStr: dataStr,
        fileName
      })
    });

    let result = await fetch(request);
    if (!result.ok) {
      console.error('Error fetching: ', result.statusText);
      return false;
    } else {
      let uploadedFileName = await result.text();
      this.setState({ latest: uploadedFileName });
      this.getConverted();
      return true;
    }
  }
}

// View
class GeneratorView {
  constructor() {
    this.app = document.querySelector('#app');
    this.formField = document.querySelector('#form');
    this.textarea = document.querySelector('#data-field');
    this.filePicker = document.querySelector('#file-picker');
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
      this.curState.converted = [ ...newState.converted ];
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
  }
}

// Controller
class GeneratorController {
  constructor(model, view) {
    this.Model = model;
    this.View = view;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
    this.handleTextareaSubmit = this.handleTextareaSubmit.bind(this);
  }

  // Handles initial JSON parsing on form submit
  handleSubmit(e) {
    e.preventDefault();
    let dataStr = this.View.textarea.value;
    let file = this.View.filePicker.files[0];

    // File uploaded
    if (file) {
      this.handleFileSubmit(file);

      // Textarea used
    } else if (dataStr && dataStr.length) {
      this.handleTextareaSubmit(dataStr);

      // Both input types are empty
    } else {
      this.Model.setState({ errMessage: 'Must paste or upload a JSON file', successMessage: '' });
    }
  }

  async handleFileSubmit(file) {
    // Ensure file is JSON
    if (file.type !== 'application/json') {
      this.Model.setState({ errMessage: 'File must be type .json', successMessage: '' });
      return;
    } else {
      // Parse into text with Promise-based Blob(File inheritor).text()
      let text = await file.text();
      this.Model.postJSONData(text, file.name.slice(0, file.name.length - 5));
      this.Model.setState({ errMessage: '', successMessage: 'Conversion complete' });
    }
    this.View.removeFormFieldInputs();
  }

  async handleTextareaSubmit(dataStr) {
    let isPostSuccessful = await this.Model.postJSONData(dataStr, Date.now().toString());
    if (isPostSuccessful) {
      // Only removes err message on successful post, since postJSONData can take an invalid dataStr
      this.Model.setState({ errMessage: '', successMessage: 'Conversion complete' });
    } else {
      this.Model.setState({ errMessage: 'Invalid JSON in text area', successMessage: '' });
    }
    this.View.removeFormFieldInputs();
  }
}

// Wrapper for MVC
class App {
  constructor() {
    this.View;
    this.Model;
    this.Controller;
  }

  initialize() {
    this.View = new GeneratorView();
    this.Model = new GeneratorModel(this.View);
    this.Controller = new GeneratorController(this.Model, this.View);
  }
}

// Init
window.onload = () => {
  // MVC are technically not globally scoped but still accessible through App -- better way?
  window.app = new App();
  app.initialize();
  app.View.formField.onsubmit = app.Controller.handleSubmit;
}


// Utils
/**
 * Checks if two arrays (WITHOUT NESTING) are equal
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {boolean}
 */
const checkShallowArrayEquality = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  // Convert to Set to handle identical content not in same order (for whatever reason)
  let set2 = new Set(arr2);

  for (let i = 0; i < arr1.length; i++) {
    if (!set2.has(arr1[i])) return false;
  }
  return true;
};