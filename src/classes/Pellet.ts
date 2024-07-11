import { Position } from "@/types";

type PelletsConstructor = {
  position: Position;
};

export class Pellet {
  position: Position;
  constructor({ position }: PelletsConstructor) {
    this.position = position;
  }
}
