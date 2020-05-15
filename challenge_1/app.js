// Wrapper for MVC
class Game {
  constructor() {
    this.Model;
    this.View;
    this.Controller;
  }

  initialize() {
    this.View = new GameView();
    this.Model = new GameModel(this.View);
    this.Controller = new GameController(this.Model);
  }

  // Model constructor: constructor(view, turn = 'X', score = [0, 0], players = ['X', 'O'])
  resetBoard() {
    this.View = new GameView();
    this.Model = new GameModel(this.View, this.Model.state.players[0], this.Model.state.score, this.Model.state.players);
    this.Controller.Model = this.Model;
  }

  resetScores() {
    this.View = new GameView();
    this.Model = new GameModel(this.View);
    this.Controller.Model = this.Model;
  }
}

// Init
window.onload = () => {
  // Initialize game instance
  window.game = new Game();
  game.initialize();
  // Setup click handlers
  for (let node of game.View.squareNodes) {
    node.onclick = game.Controller.handleClick;
  }
};