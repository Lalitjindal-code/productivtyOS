import React from 'react';
import { motion } from 'framer-motion';

/**
 * HourlyHeatmap Component
 * Displays task completion density across 24 hours.
 * @param {Array} data - Array of { hour: number, score: number }
 */
export const HourlyHeatmap = ({ data = [] }) => {
  // Ensure we have 24 hours of data
  const hourlyData = Array(24).fill(0).map((_, i) => {
    const found = data.find(d => d.hour === i);
    return found ? found.score : 0;
  });

  const maxScore = Math.max(...hourlyData, 1);

  const getColor = (score) => {
    if (score === 0) return 'bg-white/5';
    const intensity = score / maxScore;
    if (intensity < 0.25) return 'bg-plasma-400/20';
    if (intensity < 0.5) return 'bg-plasma-400/40';
    if (intensity < 0.75) return 'bg-plasma-400/70';
    return 'bg-plasma-400';
  };

  const getLabel = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    return hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {/* Heatmap Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
          {hourlyData.map((score, hour) => (
            <div key={hour} className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: hour * 0.02 }}
                title={`${getLabel(hour)}: ${score} tasks`}
                className={`w-full aspect-square rounded-lg ${getColor(score)} border border-white/5 transition-all hover:ring-2 hover:ring-plasma-400/50 cursor-default flex items-center justify-center`}
              >
                {score > 0 && (
                  <span className="font-mono text-[10px] font-bold text-white/50">{score}</span>
                )}
              </motion.div>
              <span className="font-mono text-[9px] text-neutral-600 rotate-45 sm:rotate-0">
                {hour % 4 === 0 ? getLabel(hour) : ''}
              </span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-3 mt-2">
          <span className="font-body text-[10px] text-neutral-500">Quiet</span>
          <div className="flex gap-1">
            {['bg-white/5', 'bg-plasma-400/20', 'bg-plasma-400/40', 'bg-plasma-400/70', 'bg-plasma-400'].map(c => (
              <div key={c} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
          </div>
          <span className="font-body text-[10px] text-neutral-500">Peak Performance</span>
        </div>
      </div>
    </div>
  );
};
