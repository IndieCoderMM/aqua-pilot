import { Controller } from './Control';
import Sensor from './Sensor';
import { polyIntersect } from './utils';

export class Ship {
  constructor({ x, y, width, height, maxSpeed, imgPath, ctrlType }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.maxSpeed = maxSpeed;
    this.image = new Image();
    this.image.src = imgPath;
    this.image.onload = () => {
      this.loaded = true;
    };
    if (ctrlType === 'KEYS') this.sensor = new Sensor(this);
    this.controller = new Controller();
    this.polygon = this.#createPolygon();

    this.angle = 0;
    this.speed = 0;
    this.accel = 0.1;
    this.friction = 0.05;
    this.damaged = false;
  }

  #createPolygon() {
    const points = [];
    const rad = Math.hypot(this.width, this.height);
    const alpha = Math.atan2(this.width, this.height);
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    });
    return points;
  }

  #move() {
    if (this.controller.forward) this.speed += this.accel;
    else if (this.controller.reverse) this.speed -= this.accel;
    if (this.speed !== 0) {
      const flipped = this.speed > 0 ? 1 : -1;
      if (this.controller.left) this.angle += 0.005 * flipped;
      else if (this.controller.right) this.angle -= 0.005 * flipped;
    }

    if (this.speed > 0) this.speed -= this.friction;
    else if (this.speed < 0) this.speed += this.friction;
    if (this.speed >= this.maxSpeed) this.speed = this.maxSpeed;
    else if (this.speed <= -this.maxSpeed) this.speed = -this.maxSpeed;
    if (Math.abs(this.speed) < this.friction) this.speed = 0;

    this.y -= Math.cos(this.angle) * this.speed;
    this.x -= Math.sin(this.angle) * this.speed;
    // console.log(this.x, this.y);
  }

  update(borders, obstacles = []) {
    if (this.damaged) return;
    this.#move();
    this.polygon = this.#createPolygon();
    this.damaged = this.#checkDamage(borders, obstacles);
    if (this.sensor) this.sensor.update(borders, obstacles);
  }

  #checkDamage(borders, obstacles, ships = []) {
    for (let i = 0; i < borders.length; i++) {
      if (polyIntersect(this.polygon, borders[i])) return true;
    }

    for (let i = 0; i < obstacles.length; i++) {
      if (polyIntersect(this.polygon, obstacles[i])) return true;
    }

    for (let i = 0; i < ships.length; i++) {
      if (polyIntersect(this.polygon, ships[i].polygon)) return true;
    }

    return false;
  }

  draw(ctx) {
    // ctx.beginPath();
    // ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    // for (let i = 1; i < this.polygon.length; i++) {
    //   ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    // }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();
    ctx.drawImage(this.image, -this.width, -this.height);
    ctx.restore();
    if (this.sensor) this.sensor.draw(ctx);
  }
}
