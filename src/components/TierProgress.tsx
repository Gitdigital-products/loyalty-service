// src/components/TierProgress.tsx
import React from 'react';

const TierProgress = ({ currentPoints, nextTierThreshold, currentTier }) => {
  const progress = Math.min((currentPoints / nextTierThreshold) * 100, 100);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-end mb-4">
        <div>
          <p className="text-sm text-slate-500 font-medium">Current Status</p>
          <h3 className="text-2xl font-bold text-indigo-600">{currentTier}</h3>
        </div>
        <p className="text-sm font-semibold text-slate-400">
          {currentPoints.toLocaleString()} / {nextTierThreshold.toLocaleString()} PTS
        </p>
      </div>
      
      <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
        <div 
          className="bg-indigo-500 h-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="mt-3 text-xs text-slate-400 italic">
        {nextTierThreshold - currentPoints} points away from the next tier!
      </p>
    </div>
  );
};
