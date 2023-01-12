export default class Rect {
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

    this.topLeft = { x: this.left, y: this.top };
    this.topRight = { x: this.right, y: this.top };
    this.bottomLeft = { x: this.left, y: this.bottom };
    this.bottomRight = { x: this.right, y: this.bottom };
    this.borders = [
      [this.topLeft, this.bottomLeft],
      [this.topRight, this.bottomRight],
      [this.topLeft, this.topRight],
      [this.bottomRight, this.bottomLeft],
    ];
  }

  draw(ctx, fill = false) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    if (fill) {
      ctx.fillStyle = 'orange';
      ctx.rect(this.topLeft.x, this.topLeft.y, this.width, this.height);
      return;
    }
    ctx.setLineDash([10, 10]);
    this.borders.forEach((b) => {
      ctx.beginPath();
      ctx.moveTo(b[0].x, b[0].y);
      ctx.lineTo(b[1].x, b[1].y);
      ctx.stroke();
    });
  }
}
