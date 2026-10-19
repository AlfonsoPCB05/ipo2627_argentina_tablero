export default class Model {
  constructor() {
    this.dimension = 3;
    this.board = [];
    this.moves = 0;
    this.newGame();
  }

  newGame() {
    // Cada tipo aparece N veces: así siempre existe una distribución ganadora.
    const pieces = Array.from({ length: this.dimension * this.dimension }, (_, i) => Math.floor(i / this.dimension) % 3);
    // Para N > 3 hay que elegir un tipo para cada fila; cada fila sigue teniendo N fichas.
    for (let row = 0; row < this.dimension; row++) {
      for (let col = 0; col < this.dimension; col++) pieces[row * this.dimension + col] = row % 3;
    }
    for (let i = pieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
    // Evitamos empezar con el tablero resuelto.
    if (this.isSolvedArray(pieces)) {
      const other = pieces.findIndex(type => type !== pieces[0]);
      if (other !== -1) [pieces[0], pieces[other]] = [pieces[other], pieces[0]];
    }
    this.board = pieces;
    this.moves = 0;
  }

  setDimension(value) {
    const dimension = Number(value);
    if (!Number.isInteger(dimension) || dimension < 3 || dimension > 12) throw new Error('La dimensión debe ser un entero entre 3 y 12.');
    this.dimension = dimension;
    this.newGame();
  }

  swap(from, to) {
    const count = this.board.length;
    if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to < 0 || from >= count || to >= count || from === to) return false;
    [this.board[from], this.board[to]] = [this.board[to], this.board[from]];
    this.moves++;
    return true;
  }

  isSolvedArray(board) {
    for (let row = 0; row < this.dimension; row++) {
      const start = row * this.dimension;
      for (let col = 1; col < this.dimension; col++) {
        if (board[start + col] !== board[start]) return false;
      }
    }
    return true;
  }

  isSolved() { return this.isSolvedArray(this.board); }
}
