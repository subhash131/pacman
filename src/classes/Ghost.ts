import { Position, Velocity } from "@/types";

type GhostConstructor = {
  position: Position;
  velocity: Velocity;
  radius?: number;
  speed?: number;
  color?: string;
  canvasContext: CanvasRenderingContext2D;
};

export class Ghost {
  public static speed: number = 1;
  position: Position;
  velocity: Velocity;
  radius: number;
  color: string;
  canvasContext: CanvasRenderingContext2D;
  prevCollisions: string[];
  speed: number;
  scared: boolean;
  constructor({
    color = "pink",
    position,
    velocity,
    radius = 15,
    canvasContext,
    speed = 2,
  }: GhostConstructor) {
    this.speed = speed;
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.canvasContext = canvasContext;
    this.prevCollisions = [];
    this.scared = false;
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
    this.canvasContext.fillStyle = this.scared ? "blue" : this.color;
    this.canvasContext.fill();
    this.canvasContext.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
