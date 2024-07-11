"use client";
import { Boundary } from "@/classes/Boundary";
import { Pellet } from "@/classes/Pellet";
import { Player } from "@/classes/Player";
import { map } from "@/constants";
import React, { KeyboardEventHandler, useEffect, useMemo, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let context: CanvasRenderingContext2D | null;

  const boundaries: Boundary[] = useMemo(() => [], []);
  const pellets: Pellet[] = useMemo(() => [], []);
  let player: Player | null = null;
  let lastKey = " ";
  const keys = {
    a: {
      pressed: false,
    },
    w: {
      pressed: false,
    },
    s: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
  };
  function detectCollision({
    boundary,
    player,
  }: {
    player: Player;
    boundary: Boundary;
  }): boolean {
    return (
      player.position.y - player.radius + player.velocity.y <=
        boundary.position.y + boundary.height &&
      player.position.x + player.radius + player.velocity.x >=
        boundary.position.x &&
      player.position.y + player.radius + player.velocity.y >=
        boundary.position.y &&
      player.position.x - player.radius + player.velocity.x <=
        boundary.position.x + boundary.width
    );
  }
  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = innerWidth;
    canvasRef.current.height = innerHeight;
    canvasRef.current.style.backgroundColor = "black";
    context = canvasRef.current.getContext("2d");
    if (!context) return;

    map.forEach((row, i) => {
      row.forEach((symbol, j) => {
        switch (symbol) {
          case "-":
            boundaries.push(
              new Boundary({
                image: "/pipeHorizontal.png",
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                canvasContext: context!,
              })
            );
            break;
          case "|":
            boundaries.push(
              new Boundary({
                image: "/pipeVertical.png",
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                canvasContext: context!,
              })
            );
            break;
          case "1":
            boundaries.push(
              new Boundary({
                image: "/pipeCorner1.png",
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                canvasContext: context!,
              })
            );
            break;
          case "2":
            boundaries.push(
              new Boundary({
                image: "/pipeCorner2.png",
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                canvasContext: context!,
              })
            );
            break;
          case "3":
            boundaries.push(
              new Boundary({
                image: "/pipeCorner3.png",
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                canvasContext: context!,
              })
            );
            break;
          case "4":
            boundaries.push(
              new Boundary({
                image: "/pipeCorner4.png",
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                canvasContext: context!,
              })
            );
            break;
          case "b":
            boundaries.push(
              new Boundary({
                image: "/block.png",
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                canvasContext: context!,
              })
            );
            break;
          case "[":
            boundaries.push(
              new Boundary({
                canvasContext: context!,
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                image: "/capLeft.png",
              })
            );
            break;
          case "]":
            boundaries.push(
              new Boundary({
                canvasContext: context!,
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                image: "/capRight.png",
              })
            );
            break;
          case "_":
            boundaries.push(
              new Boundary({
                canvasContext: context!,
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                image: "/capBottom.png",
              })
            );
            break;
          case "^":
            boundaries.push(
              new Boundary({
                canvasContext: context!,
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                image: "/capTop.png",
              })
            );
            break;
          case "+":
            boundaries.push(
              new Boundary({
                canvasContext: context!,
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                image: "/pipeCross.png",
              })
            );
            break;
          case "5":
            boundaries.push(
              new Boundary({
                canvasContext: context!,
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                image: "/pipeConnectorTop.png",
              })
            );
            break;
          case "6":
            boundaries.push(
              new Boundary({
                canvasContext: context!,
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                image: "/pipeConnectorRight.png",
              })
            );
            break;
          case "7":
            boundaries.push(
              new Boundary({
                canvasContext: context!,
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                image: "/pipeConnectorBottom.png",
              })
            );
            break;
          case "8":
            boundaries.push(
              new Boundary({
                canvasContext: context!,
                position: {
                  x: j * Boundary.WIDTH,
                  y: i * Boundary.HEIGHT,
                },
                image: "/pipeConnectorLeft.png",
              })
            );
            break;
          case ".":
            pellets.push(
              new Pellet({
                position: {
                  x: j * Boundary.WIDTH + Boundary.WIDTH / 2,
                  y: i * Boundary.HEIGHT + Boundary.HEIGHT / 2,
                },
              })
            );
            break;
        }
      });
    });

    player = new Player({
      canvasContext: context,
      position: {
        x: Boundary.WIDTH + Boundary.WIDTH / 2,
        y: Boundary.HEIGHT + Boundary.HEIGHT / 2,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      radius: 15,
    });

    // draw
    function animate() {
      if (!canvasRef.current || !player) return;
      requestAnimationFrame(animate);

      context?.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      if (keys.w.pressed && lastKey === "w") {
        for (let boundary of boundaries) {
          if (
            detectCollision({
              boundary,
              player: {
                ...player,
                draw: player.draw,
                update: player.update,
                velocity: { x: 0, y: -Player.SPEED },
              },
            })
          ) {
            player.velocity.y = 0;
            break;
          } else {
            player.velocity.y = -Player.SPEED;
          }
        }
      } else if (keys.a.pressed && lastKey === "a") {
        for (let boundary of boundaries) {
          if (
            detectCollision({
              boundary,
              player: {
                ...player,
                draw: player.draw,
                update: player.update,
                velocity: { x: -Player.SPEED, y: 0 },
              },
            })
          ) {
            player.velocity.x = 0;
            break;
          } else {
            player.velocity.x = -Player.SPEED;
          }
        }
      } else if (keys.s.pressed && lastKey === "s") {
        for (let boundary of boundaries) {
          if (
            detectCollision({
              boundary,
              player: {
                ...player,
                draw: player.draw,
                update: player.update,
                velocity: { x: 0, y: Player.SPEED },
              },
            })
          ) {
            player.velocity.y = 0;
            break;
          } else {
            player.velocity.y = Player.SPEED;
          }
        }
      } else if (keys.d.pressed && lastKey === "d") {
        for (let boundary of boundaries) {
          if (
            detectCollision({
              boundary,
              player: {
                ...player,
                draw: player.draw,
                update: player.update,
                velocity: { x: Player.SPEED, y: 0 },
              },
            })
          ) {
            player.velocity.x = 0;
            break;
          } else {
            player.velocity.x = Player.SPEED;
          }
        }
      }

      boundaries.forEach((boundary) => {
        if (!player) return;
        boundary.draw();
        if (detectCollision({ player, boundary })) {
          player.velocity.y = 0;
          player.velocity.x = 0;
        }
      });
      player.update();
    }

    animate();
  }, []);

  //key control
  useEffect(() => {
    addEventListener("keydown", (e) => {
      if (!player) return;
      switch (e.key.toLowerCase()) {
        case "w":
        case "ArrowUp".toLowerCase():
          keys.w.pressed = true;
          lastKey = "w";
          break;
        case "a":
        case "ArrowLeft".toLowerCase():
          keys.a.pressed = true;
          lastKey = "a";
          break;
        case "s":
        case "ArrowDown".toLowerCase():
          keys.s.pressed = true;
          lastKey = "s";
          break;
        case "d":
        case "ArrowRight".toLowerCase():
          keys.d.pressed = true;
          lastKey = "d";
          break;
        case " ":
          lastKey = " ";
          player.velocity.x = 0;
          player.velocity.y = 0;
          break;
      }
    });
    addEventListener("keyup", (e) => {
      if (!player) return;
      switch (e.key.toLowerCase()) {
        case "w":
        case "ArrowUp".toLowerCase():
          keys.w.pressed = false;
          break;
        case "a":
        case "ArrowLeft".toLowerCase():
          keys.a.pressed = false;
          break;
        case "s":
        case "ArrowDown".toLowerCase():
          keys.s.pressed = false;
          break;
        case "d":
        case "ArrowRight".toLowerCase():
          keys.d.pressed = false;
          break;
      }
    });
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
