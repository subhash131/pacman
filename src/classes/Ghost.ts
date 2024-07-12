import { Position, Velocity } from "@/types";

type GhostConstructor = {
  position: Position;
  velocity: Velocity;
  radius?: number;
  color: string;
  canvasContext: CanvasRenderingContext2D;
};

export class Ghost {
  position: Position;
  velocity: Velocity;
  radius: number;
  color: string;
  canvasContext: CanvasRenderingContext2D;
  constructor({
    color,
    position,
    velocity,
    radius = 15,
    canvasContext,
  }: GhostConstructor) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.canvasContext = canvasContext;
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
