import React, { useEffect, useRef } from "react";

interface ScoreDisplayProps {
  score: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (score > 0) {
      const audio = new Audio("/sounds/plop.mp3");
      audio.play();
    }
  }, [score]);

  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold drop-shadow-md">
      {score}
    </div>
  );
};
