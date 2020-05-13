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
      converted: []
    }

    this.setState = this.setState.bind(this);
    this.verifyJSONData = this.verifyJSONData.bind(this);
    this.getConverted = this.getConverted.bind(this);
    this.postJSONData = this.postJSONData.bind(this);
    this.getConverted();
  }

  // Updates current state obj with keys of newState, copying to prevent mutation as necessary
  setState(newState) {
    for (let key of Object.keys(newState)) {
      if (Array.isArray(newState[key])) {
        this.state[key] = newState[key].slice();
      } else if (typeof newState[key] === 'object') {
        this.state[key] = { ...newState[key] };
      } else {
        this.state[key] = newState[key];
      }
    }
    this.View.render({ ...this.state });
  }

  // Verifies data as JSON string
  verifyJSONData(dataStr, fileName) {
    try {
      let data = JSON.parse(dataStr);
    } catch (e) {
      this.setState({ errMessage: 'Invalid JSON' });
      return false;
    }
    return true;
  }

  // Gets already-converted files
  // TODO: Gets only the converted files of current user (sessions)
  getConverted() {
    fetch('http://localhost:3000/download')
      .then(res => {
        return res.json();
      })
      .then(({ converted }) => {
        this.setState({ converted });
      })
      .catch(err => {
        console.error(err);
      });
  }

  // Posts valid JSON string to server, updating view on post success
  postJSONData(dataStr, fileName) {
    if (this.verifyJSONData(dataStr, fileName)) {
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

      return fetch(request).then(res => {
          if (!res.ok) {
            throw res.statusText;
          }
        })
        .then(() => {
          this.getConverted();
        })
        .catch(err => {
          console.error('Error fetching: ', err);
        });
    } else {
      return Promise.reject();
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
    this.errDisplay = document.querySelector('#message');
    this.downloadList = document.querySelector('#download-list');
    this.curState = null;

    this.render = this.render.bind(this);
    this.createLinkNode = this.createLinkNode.bind(this);
    this.removeTextareaText = this.removeTextareaText.bind(this);
  }

  // Compares newState to current state, updating only keys that have changed
  render(newState) {
    if (!this.curState) {
      this.curState = Object.assign({}, newState);
    }

    if (this.curState.errMessage !== newState.errMessage) {
      this.curState.errMessage = newState.errMessage;
      this.errDisplay.textContent = newState.errMessage;
    }

    if (!checkDeepEqualsArrays(this.curState.converted, newState.converted)) {
      this.curState.converted = newState.converted.slice();
    }

    // TODO: Don't recreate a nodes for each state update
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

  removeTextareaText() {
    this.textarea.value = '';
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
    let file = this.View.filePicker.files[0]

    // File uploaded
    if (file) {
      this.handleFileSubmit(file);

      // Textarea used
    } else if (dataStr && dataStr.length) {
      this.handleTextareaSubmit(dataStr);

      // Both input types are empty
    } else {
      this.Model.setState({ errMessage: 'Must paste or upload a JSON file' });
    }
  }

  handleFileSubmit(file) {
    // Ensure file is JSON
    if (file.type !== 'application/json') {
      this.Model.setState({ errMessage: 'File must be type .json' });
      return;
    } else {
      this.Model.setState({ errMessage: '' });
      // Parse into text with Promise-based Blob(File inheritor).text()
      file.text()
        .then(text => {
          this.Model.postJSONData(text, file.name.slice(0, file.name.length - 5));
        })
        .catch(console.error);
    }
  }

  handleTextareaSubmit(dataStr) {
    this.Model.postJSONData(dataStr, Date.now().toString())
      .then(() => {
        // Only removes err message on successful post, since postJSONData can take an invalid dataStr
        this.Model.setState({ errMessage: '' });
      })
      .catch(() => { });

    this.View.removeTextareaText();
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
 * Checks if two arrays (WITHOUT NESTING) are deeply equal
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {boolean}
 */
const checkDeepEqualsArrays = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  // Convert to Set to handle identical content not in same order (for whatever reason)
  let set2 = new Set(arr2);

  for (let i = 0; i < arr1.length; i++) {
    if (!set2.has(arr1[i])) return false;
  }
  return true;
};