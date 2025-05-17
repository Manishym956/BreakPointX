import React from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

const ExecutionControls = ({ 
  executionState, 
  onRun, 
  onContinue, 
  onStep, 
  onReset, 
  currentStep, 
  totalSteps 
}) => {
  return (
    <div className="border-b border-gray-300 p-3 bg-gray-100">
      <div className="flex space-x-2">
        {executionState === 'idle' && (
          <button 
            onClick={onRun}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center"
          >
            <Play size={16} className="mr-1" /> Run
          </button>
        )}
        
        {executionState === 'paused' && (
          <button 
            onClick={onContinue}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center"
          >
            <Play size={16} className="mr-1" /> Continue
          </button>
        )}
        
        {(executionState === 'paused' || executionState === 'completed') && (
          <button 
            onClick={onStep}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center"
            disabled={currentStep >= totalSteps - 1}
          >
            <SkipForward size={16} className="mr-1" /> Step
          </button>
        )}
        
        {(executionState === 'running' || executionState === 'paused' || executionState === 'completed') && (
          <button 
            onClick={onReset}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded flex items-center"
          >
            <RotateCcw size={16} className="mr-1" /> Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default ExecutionControls;