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