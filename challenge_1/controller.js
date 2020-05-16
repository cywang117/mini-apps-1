class GameController {
  constructor(model) {
    this.Model = model;
    this.handleClick = this.handleClick.bind(this);
    this.handleInputFocusOut = this.handleInputFocusOut.bind(this);
  }

  handleClick(e) {
    let sqId = e.target.id.slice(-1);
    if (this.Model.isSquareEmpty(sqId) && !this.Model.hasWinner()) {
      this.Model.setState(sqId);
    }
  }

  handleInputFocusOut(e) {
    let curInputIdx = e.target.id.slice(-1);
    if (e.target.value === '') {
      e.target.value = `Player ${parseInt(curInputIdx) + 1}`;
    }
    let curPlayers = this.Model.getPlayers();
    curPlayers[e.target.id.slice(-1)] = e.target.value;
    this.Model.setState(undefined, curPlayers);
  }
}