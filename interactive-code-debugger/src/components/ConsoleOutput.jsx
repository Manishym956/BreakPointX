import React from 'react';

const ConsoleOutput = ({ output }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
        <h3 className="font-semibold">Console Output</h3>
      </div>
      <div className="flex-1 p-4 overflow-auto bg-gray-900 text-green-400 font-mono">
        {output.length === 0 ? (
          <div className="text-gray-500">No output yet</div>
        ) : (
          output.map((line, index) => <div key={index}>{line}</div>)
        )}
      </div>
    </div>
  );
};

export default ConsoleOutput;