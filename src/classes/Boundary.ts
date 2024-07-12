import { Position } from "@/types";

type BoundaryConstructor = {
  position: Position;
  canvasContext: CanvasRenderingContext2D;
  image: HTMLImageElement;
};

export class Boundary {
  static WIDTH = 40;
  static HEIGHT = 40;
  position: Position = {
    x: 0,
    y: 0,
  };
  width: number;
  height: number;
  canvasContext: CanvasRenderingContext2D;
  image: HTMLImageElement;

  constructor({ position, canvasContext, image }: BoundaryConstructor) {
    this.position = position;
    this.width = Boundary.WIDTH;
    this.height = Boundary.HEIGHT;
    this.canvasContext = canvasContext;
    this.image = image;
  }

  draw() {
    // const image = new Image();
    // image.src = this.image;
    // image.width = this.width;
    // image.height = this.height;
    this.canvasContext.drawImage(this.image, this.position.x, this.position.y);
  }
}
