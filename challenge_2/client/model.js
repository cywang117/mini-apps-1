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
        this.state[key] = [...newState[key]];
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
    } catch (e) {
      console.error(e);
    }
  }

  // Posts valid JSON string to server, updating view on post success
  // Returns boolean indicating post success
  async postJSONData(dataStr, fileName, filterVal) {
    try {
      JSON.parse(dataStr);
    } catch (e) {
      return false;
    }

    let body = {
      jsonStr: dataStr,
      fileName
    };
    if (filterVal) {
      body.filterVal = filterVal;
    }

    let request = new Request(this.server, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
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