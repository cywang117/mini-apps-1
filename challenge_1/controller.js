class GameController {
  constructor(model) {
    this.Model = model;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let sqId = e.target.id.slice(-1);
    if (this.Model.isSquareEmpty(sqId) && !this.Model.hasWinner()) {
      this.Model.setState(sqId);
    }
  }
}