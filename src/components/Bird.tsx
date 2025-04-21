export const Bird: React.FC<{ y: number }> = ({ y }) => {
  return (
    <img
      src="/bird.png"
      alt="Bird"
      className="absolute left-20 w-14 h-14"
      style={{ top: `${y}px` }}
    />
  );
};
