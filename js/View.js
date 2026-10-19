export default class View {
  constructor() {
    this.boardElement = document.querySelector('#board');
    this.statusElement = document.querySelector('#status');
    this.movesElement = document.querySelector('#moves');
    this.form = document.querySelector('#settings-form');
    this.selected = null;
    this.finished = false;
  }

  render(model) {
    this.selected = null;
    this.finished = model.isSolved();
    this.boardElement.replaceChildren();
    this.boardElement.style.setProperty('--dimension', model.dimension);
    this.boardElement.setAttribute('aria-label', `Tablero de ${model.dimension} por ${model.dimension}`);
    model.board.forEach((type, index) => {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cell';
      cell.dataset.index = String(index);
      cell.dataset.row = String(Math.floor(index / model.dimension));
      cell.dataset.col = String(index % model.dimension);
      cell.setAttribute('aria-label', `Fila ${Number(cell.dataset.row) + 1}, columna ${Number(cell.dataset.col) + 1}, ficha tipo ${type + 1}`);
      const piece = document.createElement('span');
      piece.className = `piece type-${type}`;
      piece.draggable = !this.finished;
      piece.setAttribute('aria-hidden', 'true');
      cell.appendChild(piece);
      this.boardElement.appendChild(cell);
    });
    this.movesElement.textContent = `Movimientos: ${model.moves}`;
    this.statusElement.textContent = this.finished ? `¡Enhorabuena! Tablero completado en ${model.moves} movimientos.` : 'Ordena las fichas para que cada fila tenga un solo tipo.';
    this.boardElement.classList.toggle('completed', this.finished);
  }

  setAppearance() {
    const data = new FormData(this.form);
    const size = data.get('size');
    const palette = data.get('palette');
    const shapes = data.get('shapes');
    this.boardElement.dataset.size = size;
    this.boardElement.dataset.palette = palette;
    this.boardElement.dataset.shapes = shapes;
  }

  bindEvents(controller) {
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      controller.applySettings(new FormData(this.form));
    });
    document.querySelector('#restart').addEventListener('click', () => controller.restart());
    const helpButton = document.querySelector('#help-toggle');
    const help = document.querySelector('#help');
    helpButton.addEventListener('click', () => {
      help.hidden = !help.hidden;
      helpButton.setAttribute('aria-expanded', String(!help.hidden));
    });

    this.boardElement.addEventListener('dragstart', event => {
      const piece = event.target.closest('.piece');
      if (!piece || this.finished) { event.preventDefault(); return; }
      const cell = piece.closest('[data-index]');
      event.dataTransfer.setData('text/plain', cell.dataset.index);
      event.dataTransfer.effectAllowed = 'move';
      cell.classList.add('dragging');
    });
    this.boardElement.addEventListener('dragend', () => {
      this.boardElement.querySelectorAll('.dragging, .drop-target').forEach(element => element.classList.remove('dragging', 'drop-target'));
    });
    this.boardElement.addEventListener('dragover', event => {
      const cell = event.target.closest('[data-index]');
      if (!cell || this.finished) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      this.boardElement.querySelectorAll('.drop-target').forEach(element => element.classList.remove('drop-target'));
      cell.classList.add('drop-target');
    });
    this.boardElement.addEventListener('drop', event => {
      const cell = event.target.closest('[data-index]');
      if (!cell || this.finished) return;
      event.preventDefault();
      const raw = event.dataTransfer.getData('text/plain');
      if (!/^\d+$/.test(raw)) return;
      controller.swap(Number(raw), Number(cell.dataset.index));
    });
    // Alternativa accesible a Drag & Drop: seleccionar dos casillas.
    this.boardElement.addEventListener('click', event => {
      const cell = event.target.closest('[data-index]');
      if (!cell || this.finished) return;
      const index = Number(cell.dataset.index);
      if (this.selected === null) {
        this.selected = index;
        cell.classList.add('selected');
        this.statusElement.textContent = 'Selecciona otra ficha para intercambiarlas.';
      } else {
        const from = this.selected;
        this.selected = null;
        if (from === index) {
          cell.classList.remove('selected');
          this.statusElement.textContent = 'Selección cancelada.';
        } else controller.swap(from, index);
      }
    });
  }

  showError(message) { this.statusElement.textContent = message; }
}
