import './index.css';
import { Ship } from './modules/Ship';
import Rect from './modules/Rect';
import ShipRed from './assets/ships/redShip.png';

const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

const ship = new Ship({
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 30,
  height: 50,
  maxSpeed: 2,
  imgPath: ShipRed,
  ctrlType: 'KEYS',
});

const ocean = new Rect(
  canvas.width / 2,
  canvas.height / 2,
  canvas.width,
  canvas.height,
);

const islands = [
  new Rect(100, 100, 100, 100),
  new Rect(200, 230, 50, 30),
  new Rect(400, 300, 50, 30),
];

function run() {
  ship.update(ocean.borders, islands.borders);
  canvas.height = window.innerHeight - 10;
  ocean.draw(ctx);
  islands.forEach((i) => i.draw(ctx, true));
  ship.draw(ctx);
  requestAnimationFrame(run);
}

run();
