import React, { useEffect } from "react";

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  highScore,
  onRestart,
}) => {
  useEffect(() => {
    const audio = new Audio("/sounds/game-over.mp3");
    audio.play();
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-purple-200 bg-black/50">
      <h1 className="xl:text-4xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold mb-2">
        Game Over
      </h1>
      <p className="xl:text-md lg:text-md text-sm mb-2">Score: {score}</p>
      <p className="xl:text-md lg:text-md text-sm mb-2">
        High Score: {highScore}
      </p>
      <button
        onClick={onRestart}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded shadow mt-4"
      >
        Try Again
      </button>
    </div>
  );
};
