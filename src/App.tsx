import { Game } from "./components/Game";
import React, { useRef, useState, useEffect } from "react";
import { Settings } from "./components/Settings";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem("flappyVolume");
    return savedVolume ? parseFloat(savedVolume) : 0.5;
  });
  const [difficulty, setDifficulty] = useState(() => {
    const savedDifficulty = localStorage.getItem("flappyDifficulty");
    return savedDifficulty || "Normal"; // Default to "Normal"
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    localStorage.setItem("flappyVolume", newVolume.toString());
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    localStorage.setItem("flappyDifficulty", newDifficulty);
  };

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    };

    window.addEventListener("click", playAudio);
    window.addEventListener("keydown", playAudio);

    return () => {
      window.removeEventListener("click", playAudio);
      window.removeEventListener("keydown", playAudio);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSettingsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      {/* Background music */}
      <audio ref={audioRef} src="/sounds/game-loop.mp3" autoPlay loop />

      {/* Settings Button */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="absolute top-4 right-4 bg-purple-800 text-white px-2 py-2 rounded shadow z-20"
      >
        <Cog6ToothIcon className="w-8 h-8 text-white" />
      </button>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <Settings
          volume={volume}
          onVolumeChange={handleVolumeChange}
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      <Game difficulty={difficulty} />
    </div>
  );
}

export default App;
