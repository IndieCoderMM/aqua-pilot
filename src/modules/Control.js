export class Controller {
  constructor() {
    this.forward = false;
    this.reverse = false;
    this.left = false;
    this.right = false;

    this.#listenKeyInput();
  }

  #listenKeyInput() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          this.forward = true;
          break;
        case 'ArrowDown':
          this.reverse = true;
          break;
        case 'ArrowLeft':
          this.left = true;
          break;
        case 'ArrowRight':
          this.right = true;
          break;
      }
    });
    document.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          this.forward = false;
          break;
        case 'ArrowDown':
          this.reverse = false;
          break;
        case 'ArrowLeft':
          this.left = false;
          break;
        case 'ArrowRight':
          this.right = false;
          break;
      }
    });
  }
}
