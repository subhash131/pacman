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
  radians: number;
  openRate: number;
  rotation: number;

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
    this.radians = 0.75;
    this.openRate = 0.15;
    this.rotation = 0;
  }

  draw() {
    this.canvasContext.save();
    this.canvasContext.translate(this.position.x, this.position.y);
    this.canvasContext.rotate(this.rotation);
    this.canvasContext.translate(-this.position.x, -this.position.y);

    this.canvasContext.beginPath();
    this.canvasContext.arc(
      this.position.x,
      this.position.y,
      this.radius,
      this.radians,
      Math.PI * 2 - this.radians
    );
    this.canvasContext.lineTo(this.position.x, this.position.y);
    this.canvasContext.fillStyle = "yellow";
    this.canvasContext.fill();
    this.canvasContext.closePath();
    this.canvasContext.restore();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.radians < 0 || this.radians > 0.75) this.openRate = -this.openRate;
    this.radians += this.openRate;
  }
}
