import React from 'react';

export const ExerciseStatsModal = ({ isOpen, onClose, exercise }) => {
  if (!isOpen || !exercise) return null;
  return (
    <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-10">
      <div className="bg-neutral-900 p-8 rounded-3xl border border-white/10 text-white">
        <h2 className="text-2xl font-bold">{exercise.name}</h2>
        <p>Stats loading logic disabled for debugging...</p>
        <button onClick={onClose} className="mt-4 px-6 py-2 bg-lime-500 text-black rounded-xl">CLOSE</button>
      </div>
    </div>
  );
};
