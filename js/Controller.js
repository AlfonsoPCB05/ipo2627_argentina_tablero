export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindEvents(this);
    this.view.setAppearance();
    this.view.render(this.model);
  }

  restart() {
    this.model.newGame();
    this.view.render(this.model);
  }

  applySettings(data) {
    try {
      this.model.setDimension(data.get('dimension'));
      this.view.setAppearance();
      this.view.render(this.model);
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  swap(from, to) {
    if (this.model.isSolved()) return;
    if (this.model.swap(from, to)) this.view.render(this.model);
  }
}
