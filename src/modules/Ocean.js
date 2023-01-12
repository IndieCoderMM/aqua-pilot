import { lerp } from './utils';

export default class Ocean {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    // this.laneCount = laneCount;
    this.left = x - this.width / 2;
    this.right = x + this.width / 2;
    this.top = y - this.height / 2;
    this.bottom = y + this.height / 2;

    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
      [topLeft, topRight],
      [bottomRight, bottomLeft],
    ];
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    ctx.setLineDash([10, 10]);
    this.borders.forEach((b) => {
      ctx.beginPath();
      ctx.moveTo(b[0].x, b[0].y);
      ctx.lineTo(b[1].x, b[1].y);
      ctx.stroke();
    });
  }
}
