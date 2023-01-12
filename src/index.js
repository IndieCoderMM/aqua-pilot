import './index.css';
import { Ship } from './modules/Ship';
import Ocean from './modules/Ocean';
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

const ocean = new Ocean(
  canvas.width / 2,
  canvas.height / 2,
  canvas.width,
  canvas.height,
);

function run() {
  ship.update(ocean.borders);
  canvas.height = window.innerHeight - 10;
  ocean.draw(ctx);
  ship.draw(ctx);
  requestAnimationFrame(run);
}

run();
