import React from "react";

interface SettingsProps {
  volume: number;
  onVolumeChange: (newVolume: number) => void;
  difficulty: string;
  onDifficultyChange: (newDifficulty: string) => void;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  volume,
  onVolumeChange,
  difficulty,
  onDifficultyChange,
  onClose,
}) => {
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(parseFloat(event.target.value));
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onDifficultyChange(event.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Settings</h2>

        {/* Volume Control */}
        <div className="mb-4">
          <label htmlFor="volume" className="block text-sm font-bold mb-2">
            Music Volume:
          </label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-purple-500"
          />
        </div>

        {/* Difficulty Control */}
        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-sm font-bold mb-2">
            Difficulty:
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={handleDifficultyChange}
            className="w-full border border-gray-300 rounded p-2 bg-purple-100"
          >
            <option value="Easy">Easy</option>
            <option value="Normal">Normal</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded shadow"
        >
          Close
        </button>
      </div>
    </div>
  );
};
