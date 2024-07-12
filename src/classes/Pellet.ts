import { Position } from "@/types";

type PelletsConstructor = {
  position: Position;
  canvasContext: CanvasRenderingContext2D;
  radius?: number;
};

export class Pellet {
  position: Position;
  canvasContext: CanvasRenderingContext2D;
  radius: number;

  constructor({ canvasContext, position, radius = 3 }: PelletsConstructor) {
    this.position = position;
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
    this.canvasContext.fillStyle = "white";
    this.canvasContext.fill();
    this.canvasContext.closePath();
  }
}
