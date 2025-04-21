import React, { useEffect, useState, useRef } from "react";
import { Bird } from "./Bird";
import { Pipes } from "./Pipes";
import { ScoreDisplay } from "./ScoreDisplay";
import { GameOverScreen } from "./GameOverScreen";
import "../index.css";

const GRAVITY = 0.4;
const JUMP_HEIGHT = -10;
const FLOOR_HEIGHT = 100;
const PIPE_INTERVAL = 2000;

type GameState = "start" | "playing" | "gameover";
type PipePair = {
  x: number;
  height: number;
  scored: boolean;
};

interface GameProps {
  difficulty: string;
}

export const Game: React.FC<GameProps> = ({ difficulty }) => {
  const pipeSpeed =
    difficulty === "Easy" ? 2 : difficulty === "Normal" ? 3 : 3.5;
  const pipeGap =
    difficulty === "Easy" ? 400 : difficulty === "Normal" ? 280 : 210;

  const [birdY, setBirdY] = useState(200);
  const [velocity, setVelocity] = useState(0);
  const [gameState, setGameState] = useState<GameState>("start");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem("flappyHighScore")) || 0;
  });
  const [pipes, setPipes] = useState<PipePair[]>([]);

  const animationFrameRef = useRef<number | null>(null);

  const restartGame = () => {
    setBirdY(200);
    setVelocity(0);
    setScore(0);
    setPipes([]);
    setGameState("start");
  };

  useEffect(() => {
    const handleInput = () => {
      if (gameState === "start") {
        setGameState("playing");
        setVelocity(JUMP_HEIGHT);
      } else if (gameState === "playing") {
        setVelocity(JUMP_HEIGHT);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        handleInput();
      }
    };

    const handleTouchStart = () => {
      handleInput();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState !== "playing") return;

    const gameLoop = () => {
      setBirdY((prevY) => {
        const newY = prevY + velocity;
        const maxY = window.innerHeight - FLOOR_HEIGHT - 48;
        if (newY >= maxY) {
          setGameState("gameover");
          return maxY;
        }
        return newY;
      });

      setVelocity((v) => v + GRAVITY);

      setPipes((prevPipes) =>
        prevPipes
          .map((pipe) => {
            const newX = pipe.x - pipeSpeed;
            const passed = newX + 60 < 80 && !pipe.scored;

            const birdTop = birdY;
            const birdBottom = birdY + 48;
            const pipeTop = pipe.height;
            const pipeBottom = pipe.height + pipeGap;

            if (
              (birdTop < pipeTop || birdBottom > pipeBottom) &&
              newX < 80 &&
              newX + 60 > 20
            ) {
              setGameState("gameover");
            }

            if (passed) {
              setScore((s) => s + 1);
            }
            return { ...pipe, x: newX, scored: passed ? true : pipe.scored };
          })
          .filter((pipe) => pipe.x + 60 > 0)
      );

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [velocity, gameState, pipes, pipeSpeed, pipeGap]);

  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      const topPipeHeight =
        Math.floor(
          Math.random() * (window.innerHeight - pipeGap - FLOOR_HEIGHT - 100)
        ) + 50;

      setPipes((prev) => [
        ...prev,
        { x: window.innerWidth, height: topPipeHeight, scored: false },
      ]);
    }, PIPE_INTERVAL);

    return () => clearInterval(interval);
  }, [gameState, pipeGap]);

  useEffect(() => {
    if (gameState === "gameover") {
      setHighScore((prevHighScore) => {
        const newHighScore = Math.max(prevHighScore, score);
        localStorage.setItem("flappyHighScore", newHighScore.toString());
        return newHighScore;
      });
    }
  }, [gameState, score]);

  return (
    <div
      className="relative h-screen w-screen overflow-hidden font-sans"
      style={{
        backgroundImage: "url('/sky.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Press Start 2P', sans-serif",
      }}
    >
      {/* Start Screen */}
      {gameState === "start" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-purple-800">
          <h1 className="xl:text-5xl lg:text-5xl md:text-5xl sm:text-4xl text-2xl font-bold mb-4 drop-shadow-lg">
            Flappy Pal
          </h1>
          <p className="xl:text-md lg:text-md text-sm animate-bounce">
            Press Space to Start
          </p>
          <p className="text-sm mt-4">High Score: {highScore}</p>
        </div>
      )}
      <Bird y={birdY} />
      <Pipes pipes={pipes} difficulty={difficulty} />
      {gameState === "playing" && <ScoreDisplay score={score} />}
      {gameState === "gameover" && (
        <GameOverScreen
          score={score}
          highScore={highScore}
          onRestart={restartGame}
        />
      )}

      {/* Ground */}
      <div
        className="absolute bottom-0 w-full bg-pink-200 border-t-4 border-pink-700 shawdow-lg"
        style={{ height: `${FLOOR_HEIGHT}px` }}
      />
    </div>
  );
};
