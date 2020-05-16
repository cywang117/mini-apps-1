// TODO:
// 1. Line 127 (don't recreate <a> nodes for each state update)
// 2. Finish advanced content @GLearn
// 3. Finish nightmare content @GLearn ---> server.js line 36: Return file name with unique id at end -- change file names to have uuid, store in DB
//                              ---> Line 50 (Get only the converted files of current user (sessions))
//                              ---> Display 'Previous Conversions' files chronologically


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