import React from "react";

type PipePair = {
  x: number;
  height: number;
  scored: boolean;
};

const FLOOR_HEIGHT = 100;

interface PipesProps {
  pipes: PipePair[];
  difficulty: string;
}

export const Pipes: React.FC<PipesProps> = ({ pipes, difficulty }) => {
  const PIPE_WIDTH = 80;

  const PIPE_GAP =
    difficulty === "Easy" ? 400 : difficulty === "Normal" ? 280 : 210;

  return (
    <>
      {pipes.map((pipe, i) => (
        <React.Fragment key={i}>
          {/* Top pipe */}
          <img
            src="/pipe-top.png"
            alt="Pipe Top"
            className="absolute"
            style={{
              width: `${PIPE_WIDTH}px`,
              height: `${pipe.height}px`,
              left: `${pipe.x}px`,
              top: 0,
            }}
          />
          {/* Bottom pipe */}
          <img
            src="/pipe-bottom.png"
            alt="Pipe Bottom"
            className="absolute"
            style={{
              width: `${PIPE_WIDTH}px`,
              height: `${
                window.innerHeight - pipe.height - PIPE_GAP - FLOOR_HEIGHT
              }px`,
              left: `${pipe.x}px`,
              top: `${pipe.height + PIPE_GAP}px`,
            }}
          />
        </React.Fragment>
      ))}
    </>
  );
};
