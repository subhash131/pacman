import { Position, Velocity } from "@/types";

type PlayerConstructor = {
  position: Position;
  velocity: Velocity;
  canvasContext: CanvasRenderingContext2D;
  radius?: number;
};

export class Player {
  static SPEED = 2;
  position: Position;
  velocity: Velocity;
  canvasContext: CanvasRenderingContext2D;
  radius: number;

  constructor({
    canvasContext,
    position,
    velocity,
    radius = 10,
  }: PlayerConstructor) {
    this.position = position;
    this.velocity = velocity;
    this.canvasContext = canvasContext;
    this.radius = radius;
  }

  draw() {
    this.canvasContext.beginPath();
    this.canvasContext.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2
    );
    this.canvasContext.fillStyle = "yellow";
    this.canvasContext.fill();
    this.canvasContext.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
