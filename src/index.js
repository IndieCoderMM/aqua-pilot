import './index.css';
import { Ship } from './modules/Ship';
import ShipRed from './assets/ships/redShip.png';

const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

const ship = new Ship({
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 30,
  height: 50,
  maxSpeed: 2,
  imgPath: ShipRed,
});

function run() {
  ship.update();

  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight - 50;
  ship.draw(ctx);
  requestAnimationFrame(run);
}

run();
