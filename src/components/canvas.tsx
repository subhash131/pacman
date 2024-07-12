"use client";
import { Boundary } from "@/classes/Boundary";
import { Ghost } from "@/classes/Ghost";
import { Pellet } from "@/classes/Pellet";
import { Player } from "@/classes/Player";
import { map } from "@/constants";
import React, { useEffect, useMemo, useRef, useState } from "react";

const imageCache: { [key: string]: HTMLImageElement } = {};

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let context: CanvasRenderingContext2D | null;
  const [score, setScore] = useState(0);

  const boundaries: Boundary[] = useMemo(() => [], []);
  const pellets: Pellet[] = useMemo(() => [], []);
  const ghosts: Ghost[] = useMemo(() => [], []);
  let player: Player | null = null;
  let lastKey = " ";

  const createImg = (src: string) => {
    if (imageCache && imageCache[src]) {
      return imageCache[src];
    } else {
      const image = new Image();
      image.src = src;
      imageCache[src] = image;
      return image;
    }
  };

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
    const padding = Boundary.WIDTH / 2 - player.radius - 1;
    return (
      player.position.y - player.radius + player.velocity.y <=
        boundary.position.y + boundary.height + padding &&
      player.position.x + player.radius + player.velocity.x >=
        boundary.position.x - padding &&
      player.position.y + player.radius + player.velocity.y >=
        boundary.position.y - padding &&
      player.position.x - player.radius + player.velocity.x <=
        boundary.position.x + boundary.width + padding
    );
  }
  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = innerWidth;
    canvasRef.current.height = innerHeight - 100;
    canvasRef.current.style.backgroundColor = "black";
    context = canvasRef.current.getContext("2d");
    if (!context) return;

    map.forEach((row, i) => {
      row.forEach((symbol, j) => {
        switch (symbol) {
          case "-":
            boundaries.push(
              new Boundary({
                image: createImg("/pipeHorizontal.png"),
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
                image: createImg("/pipeVertical.png"),
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
                image: createImg("/pipeCorner1.png"),
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
                image: createImg("/pipeCorner2.png"),
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
                image: createImg("/pipeCorner3.png"),
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
                image: createImg("/pipeCorner4.png"),
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
                image: createImg("/block.png"),
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
                image: createImg("/capLeft.png"),
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
                image: createImg("/capRight.png"),
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
                image: createImg("/capBottom.png"),
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
                image: createImg("/capTop.png"),
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
                image: createImg("/pipeCross.png"),
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
                image: createImg("/pipeConnectorTop.png"),
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
                image: createImg("/pipeConnectorRight.png"),
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
                image: createImg("/pipeConnectorBottom.png"),
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
                image: createImg("/pipeConnectorLeft.png"),
              })
            );
            break;
          case ".":
            if (!context) return;
            pellets.push(
              new Pellet({
                canvasContext: context,
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
    ghosts.push(
      new Ghost({
        canvasContext: context,
        position: {
          x: Boundary.WIDTH * 6 + Boundary.WIDTH / 2,
          y: Boundary.HEIGHT + Boundary.HEIGHT / 2,
        },
        velocity: {
          x: Ghost.speed,
          y: 0,
        },
        color: "red",
      })
    );

    // draw
    let animationId: number;
    function animate() {
      if (!canvasRef.current || !player) return;
      animationId = requestAnimationFrame(animate);

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
      for (let idx = pellets.length - 1; idx >= 0; idx--) {
        const pellet = pellets[idx];
        if (!player) return;
        pellet.draw();
        if (
          Math.hypot(
            pellet.position.x - player?.position.x,
            pellet.position.y - player.position.y
          ) <
          pellet.radius + player.radius
        ) {
          pellets.splice(idx, 1);
          setScore((prev) => prev + 1);
          if (pellets.length <= 0) {
            // game won
            cancelAnimationFrame(animationId);
          }
        }
      }

      ghosts.forEach((ghost) => {
        if (!player) return;
        ghost.update();

        if (
          Math.hypot(
            ghost.position.x - player.position.x,
            ghost.position.y - player.position.y
          ) <
          ghost.radius + player.radius
        ) {
          // Game lost
          cancelAnimationFrame(animationId);
        }
        const collisions: string[] = [];
        boundaries.forEach((boundary) => {
          if (
            !collisions.includes("right") &&
            detectCollision({
              player: {
                ...ghost,
                draw: ghost.draw,
                update: ghost.update,
                velocity: {
                  x: ghost.speed,
                  y: 0,
                },
              },
              boundary,
            })
          ) {
            collisions.push("right");
          }
          if (
            !collisions.includes("left") &&
            detectCollision({
              player: {
                ...ghost,
                draw: ghost.draw,
                update: ghost.update,
                velocity: {
                  x: -ghost.speed,
                  y: 0,
                },
              },
              boundary,
            })
          ) {
            collisions.push("left");
          }
          if (
            !collisions.includes("up") &&
            detectCollision({
              player: {
                ...ghost,
                draw: ghost.draw,
                update: ghost.update,
                velocity: {
                  x: 0,
                  y: -ghost.speed,
                },
              },
              boundary,
            })
          ) {
            collisions.push("up");
          }
          if (
            !collisions.includes("down") &&
            detectCollision({
              player: {
                ...ghost,
                draw: ghost.draw,
                update: ghost.update,
                velocity: {
                  x: 0,
                  y: ghost.speed,
                },
              },
              boundary,
            })
          ) {
            collisions.push("down");
          }
        });
        if (collisions.length > ghost.prevCollisions.length) {
          ghost.prevCollisions = collisions;
        }
        if (
          JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)
        ) {
          if (ghost.velocity.x > 0) {
            ghost.prevCollisions.push("right");
          } else if (ghost.velocity.x < 0) {
            ghost.prevCollisions.push("left");
          } else if (ghost.velocity.y < 0) {
            ghost.prevCollisions.push("up");
          } else if (ghost.velocity.y > 0) {
            ghost.prevCollisions.push("down");
          }
          const pathWays = ghost.prevCollisions.filter((collision) => {
            return !collisions.includes(collision);
          });

          const direction =
            pathWays[Math.floor(Math.random() * pathWays.length)];

          switch (direction) {
            case "down":
              ghost.velocity.y = ghost.speed;
              ghost.velocity.x = 0;
              break;
            case "up":
              ghost.velocity.y = -ghost.speed;
              ghost.velocity.x = 0;
              break;
            case "left":
              ghost.velocity.y = 0;
              ghost.velocity.x = -ghost.speed;
              break;
            case "right":
              ghost.velocity.y = 0;
              ghost.velocity.x = ghost.speed;
              break;
          }
          ghost.prevCollisions = [];
        }
      });
    }

    animate();
    return () => {
      // Cleanup function
      boundaries.length = 0;
      pellets.length = 0;
      ghosts.length = 0;
      player = null;
      context = null;
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
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
  };
  const handleKeyUp = (e: KeyboardEvent) => {
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
  };
  //key control
  useEffect(() => {
    addEventListener("keydown", handleKeyDown);
    addEventListener("keyup", handleKeyUp);
    return () => {
      removeEventListener("keydown", handleKeyDown);
      removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <section className="bg-black w-full h-full">
      <p className="text-white py-2">Score: {score}</p>
      <canvas ref={canvasRef} />
    </section>
  );
};

export default Canvas;
