import { lerp, getIntersect } from './utils';

export default class Sensor {
  constructor(ship, rayCount = 5, rayLength = 200) {
    this.ship = ship;
    this.rayCount = rayCount;
    this.rayLength = rayLength;
    this.raySpread = Math.PI / 2;

    this.rays = [];
    this.readings = [];
  }

  update(borders, obstacles) {
    this.#castRays();
    this.readings = [];
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.#getReading(this.rays[i], borders, obstacles));
    }
  }

  #castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle =
        lerp(this.raySpread / 2, -this.raySpread / 2, i / (this.rayCount - 1)) +
        this.ship.angle;
      const start = { x: this.ship.x, y: this.ship.y };
      const end = {
        x: this.ship.x - Math.sin(rayAngle) * this.rayLength,
        y: this.ship.y - Math.cos(rayAngle) * this.rayLength,
      };
      this.rays.push([start, end]);
    }
  }

  #getReading(ray, borders, obstacles, ships = []) {
    let touches = [];

    for (let i = 0; i < borders.length; i++) {
      const touch = getIntersect(ray[0], ray[1], borders[i][0], borders[i][1]);
      if (touch) touches.push(touch);
    }
    for (let i = 0; i < obstacles.length; i++) {
      const touch = getIntersect(
        ray[0],
        ray[1],
        obstacles[i][0],
        obstacles[i][1],
      );
      if (touch) touches.push(touch);
    }

    ships.forEach((o) => {
      for (let i = 0; i < o.polygon.length; i++) {
        const value = getIntersect(
          ray[0],
          ray[1],
          c.polygon[i],
          c.polygon[(i + 1) % c.polygon.length],
        );
        if (value) touches.push(value);
      }
    });

    if (touches.length == 0) {
      return null;
    }
    const offsets = touches.map((t) => t.offset);
    const minOffset = Math.min(...offsets);
    return touches.find((t) => t.offset === minOffset);
  }

  draw(ctx) {
    for (let i = 0; i < this.rayCount; i++) {
      let end = this.rays[i][1];
      if (this.readings[i]) {
        end = this.readings[i];
      }

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'yellow';
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'red';
      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }
}
