import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, RotateCcw, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CodeFlowVisualization from './CodeFlowVisualization';

const InteractiveDebugger = () => {
  const [code, setCode] = useState('// Enter your JavaScript code here\nfunction factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nfunction calculate(num) {\n  console.log("Calculating factorial and fibonacci for", num);\n  const fact = factorial(num);\n  const fib = fibonacci(num);\n  console.log("Factorial:", fact);\n  console.log("Fibonacci:", fib);\n  return { factorial: fact, fibonacci: fib };\n}\n\nconst result = calculate(6);\nconsole.log("Final result:", result);');
  const [output, setOutput] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);
  const [variables, setVariables] = useState({});
  const [executionState, setExecutionState] = useState('idle'); 
  const [executionSteps, setExecutionSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [breakpoints, setBreakpoints] = useState([]);
  const [executionStack, setExecutionStack] = useState([]);
  const [errors, setErrors] = useState(null);
  const [executionStats, setExecutionStats] = useState([]);
  const [executionSpeed, setExecutionSpeed] = useState(500); 

  const runCode = () => {
    setOutput([]);
    setCurrentLine(null);
    setVariables({});
    setExecutionState('running');
    setCurrentStep(0);
    setErrors(null);
    setExecutionStack([]);
    setExecutionStats([]);
    
    try {
      const steps = simulateExecution(code);
      setExecutionSteps(steps);
      
      executeNextStep(steps, 0);
    } catch (error) {
      setErrors(error.message);
      setExecutionState('idle');
    }
  };

  const simulateExecution = (sourceCode) => {
    const lines = sourceCode.split('\n');
    const steps = [];
    
    const functionMatches = sourceCode.match(/function\s+(\w+)/g) || [];
    const functionNames = functionMatches.map(f => f.replace('function ', ''));
    
    const functionLines = {};
    lines.forEach((line, index) => {
      functionNames.forEach(name => {
        if (line.includes(`function ${name}`)) {
          functionLines[name] = index + 1;
        }
      });
    });
    
    steps.push({ 
      line: 22, 
      variables: {},
      stack: ['global'],
      output: []
    });
    
    steps.push({
      line: 13,
      variables: { num: 6 },
      stack: ['global', 'calculate(6)'],
      output: []
    });
    
    steps.push({
      line: 14,
      variables: { num: 6 },
      stack: ['global', 'calculate(6)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 15,
      variables: { num: 6 },
      stack: ['global', 'calculate(6)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 2,
      variables: { n: 6 },
      stack: ['global', 'calculate(6)', 'factorial(6)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 3,
      variables: { n: 6 },
      stack: ['global', 'calculate(6)', 'factorial(6)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 4,
      variables: { n: 6 },
      stack: ['global', 'calculate(6)', 'factorial(6)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 2,
      variables: { n: 5 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 4,
      variables: { n: 5 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 2,
      variables: { n: 4 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)', 'factorial(4)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 4,
      variables: { n: 4 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)', 'factorial(4)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 2,
      variables: { n: 3 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)', 'factorial(4)', 'factorial(3)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 4,
      variables: { n: 3 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)', 'factorial(4)', 'factorial(3)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 2,
      variables: { n: 2 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)', 'factorial(4)', 'factorial(3)', 'factorial(2)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 4,
      variables: { n: 2 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)', 'factorial(4)', 'factorial(3)', 'factorial(2)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 2,
      variables: { n: 1 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)', 'factorial(4)', 'factorial(3)', 'factorial(2)', 'factorial(1)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 3,
      variables: { n: 1 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)', 'factorial(4)', 'factorial(3)', 'factorial(2)', 'factorial(1)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 3,
      variables: { n: 1, returnValue: 1 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)', 'factorial(4)', 'factorial(3)', 'factorial(2)', 'factorial(1)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 4,
      variables: { n: 2, returnValue: 2 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)', 'factorial(4)', 'factorial(3)', 'factorial(2)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 4,
      variables: { n: 3, returnValue: 6 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)', 'factorial(4)', 'factorial(3)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 4,
      variables: { n: 4, returnValue: 24 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)', 'factorial(4)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 4,
      variables: { n: 5, returnValue: 120 },
      stack: ['global', 'calculate(6)', 'factorial(6)', 'factorial(5)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 4,
      variables: { n: 6, returnValue: 720 },
      stack: ['global', 'calculate(6)', 'factorial(6)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 15,
      variables: { num: 6, fact: 720 },
      stack: ['global', 'calculate(6)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 16,
      variables: { num: 6, fact: 720 },
      stack: ['global', 'calculate(6)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 8,
      variables: { n: 6 },
      stack: ['global', 'calculate(6)', 'fibonacci(6)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 10,
      variables: { n: 6, returnValue: 8 },
      stack: ['global', 'calculate(6)', 'fibonacci(6)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 16,
      variables: { num: 6, fact: 720, fib: 8 },
      stack: ['global', 'calculate(6)'],
      output: ['Calculating factorial and fibonacci for 6']
    });
    
    steps.push({
      line: 17,
      variables: { num: 6, fact: 720, fib: 8 },
      stack: ['global', 'calculate(6)'],
      output: ['Calculating factorial and fibonacci for 6', 'Factorial: 720']
    });
    
    steps.push({
      line: 18,
      variables: { num: 6, fact: 720, fib: 8 },
      stack: ['global', 'calculate(6)'],
      output: ['Calculating factorial and fibonacci for 6', 'Factorial: 720', 'Fibonacci: 8']
    });
    
    steps.push({
      line: 19,
      variables: { num: 6, fact: 720, fib: 8, returnValue: { factorial: 720, fibonacci: 8 } },
      stack: ['global', 'calculate(6)'],
      output: ['Calculating factorial and fibonacci for 6', 'Factorial: 720', 'Fibonacci: 8']
    });
    
    steps.push({
      line: 22,
      variables: { result: { factorial: 720, fibonacci: 8 } },
      stack: ['global'],
      output: ['Calculating factorial and fibonacci for 6', 'Factorial: 720', 'Fibonacci: 8']
    });
    
    steps.push({
      line: 23,
      variables: { result: { factorial: 720, fibonacci: 8 } },
      stack: ['global'],
      output: ['Calculating factorial and fibonacci for 6', 'Factorial: 720', 'Fibonacci: 8', 'Final result: {"factorial":720,"fibonacci":8}']
    });
    
    steps.push({
      line: null,
      variables: { result: { factorial: 720, fibonacci: 8 } },
      stack: [],
      output: ['Calculating factorial and fibonacci for 6', 'Factorial: 720', 'Fibonacci: 8', 'Final result: {"factorial":720,"fibonacci":8}'],
      completed: true
    });
    
    return steps;
  };

  const executeNextStep = (steps, stepIndex) => {
    if (stepIndex >= steps.length) {
      setExecutionState('completed');
      return;
    }

    const step = steps[stepIndex];
    setCurrentLine(step.line);
    setVariables(step.variables || {});
    setExecutionStack(step.stack || []);
    setCurrentStep(stepIndex);
    
    setExecutionStats(prev => {
      const newStats = [...prev];
      newStats.push({
        step: stepIndex,
        stackDepth: (step.stack || []).length,
        variableCount: Object.keys(step.variables || {}).length,
        output: (step.output || []).length
      });
      return newStats;
    });
    
    if (step.output) {
      setOutput(step.output);
    }

    if (breakpoints.includes(step.line)) {
      setExecutionState('paused');
    } else if (step.completed) {
      setExecutionState('completed');
    } else {
      const nextStep = () => {
        if (stepIndex < steps.length - 1) {
          executeNextStep(steps, stepIndex + 1);
        }
      };

      if (executionState === 'running') {
        setTimeout(nextStep, executionSpeed);
      }
    }
  };

  const continueExecution = () => {
    setExecutionState('running');
    executeNextStep(executionSteps, currentStep + 1);
  };

  const stepForward = () => {
    if (currentStep < executionSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      executeNextStep(executionSteps, nextStep);
    }
  };

  const resetExecution = () => {
    setOutput([]);
    setCurrentLine(null);
    setVariables({});
    setExecutionState('idle');
    setCurrentStep(0);
    setExecutionStack([]);
    setErrors(null);
    setExecutionStats([]);
  };

  const toggleBreakpoint = (lineNumber) => {
    if (breakpoints.includes(lineNumber)) {
      setBreakpoints(breakpoints.filter(bp => bp !== lineNumber));
    } else {
      setBreakpoints([...breakpoints, lineNumber]);
    }
  };

  const codeLines = code.split('\n').map((line, index) => {
    const lineNumber = index + 1;
    const isCurrentLine = currentLine === lineNumber;
    const hasBreakpoint = breakpoints.includes(lineNumber);
    
    return (
      <div 
        key={lineNumber} 
        className={`flex ${isCurrentLine ? 'bg-yellow-100' : ''}`}
      >
        <div 
          className={`w-12 text-right pr-3 cursor-pointer select-none ${hasBreakpoint ? 'bg-red-500 text-white' : 'bg-gray-100'}`}
          onClick={() => toggleBreakpoint(lineNumber)}
        >
          {lineNumber}
        </div>
        <pre className="flex-1 pl-3">{line}</pre>
      </div>
    );
  });

  const stackVisualization = (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Call Stack</h3>
      <div className="bg-gray-100 p-3 rounded max-h-40 overflow-auto">
        {executionStack.length === 0 ? (
          <div className="text-gray-500">Empty stack</div>
        ) : (
          <div className="flex flex-col-reverse">
            {executionStack.map((call, index) => (
              <div 
                key={index} 
                className={`border-b border-gray-300 py-1 px-2 ${index === 0 ? 'bg-blue-100' : ''}`}
              >
                {call}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const variableVisualization = (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Variables</h3>
      <div className="bg-gray-100 p-3 rounded max-h-60 overflow-auto">
        {Object.keys(variables).length === 0 ? (
          <div className="text-gray-500">No variables</div>
        ) : (
          <div>
            {Object.entries(variables).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-gray-300 py-1">
                <span className="font-mono">{key}:</span>
                <span className="font-mono font-semibold">
                  {typeof value === 'object' ? JSON.stringify(value) : value !== undefined ? String(value) : 'undefined'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
  const executionStatsChart = (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Execution Metrics</h3>
      {executionStats.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={executionStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="step" label={{ value: 'Execution Step', position: 'insideBottom', offset: -5 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="stackDepth" name="Stack Depth" stroke="#8884d8" />
            <Line type="monotone" dataKey="variableCount" name="Variable Count" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="bg-gray-100 p-3 rounded text-gray-500">No execution data yet</div>
      )}
    </div>
  );
  
  const controlPanel = (
    <div className="mt-4 p-3 bg-gray-100 rounded">
      <h3 className="text-lg font-semibold mb-2">Debug Settings</h3>
      <div className="flex items-center">
        <div className="mr-4">
          <label className="block text-sm font-medium text-gray-700">Execution Speed:</label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={executionSpeed}
            onChange={(e) => setExecutionSpeed(Number(e.target.value))}
            className="mt-1 w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{executionSpeed}ms between steps</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Status:</label>
          <div className="flex items-center mt-1">
            {executionState === 'idle' && (
              <span className="flex items-center text-gray-600">
                <XCircle size={16} className="mr-1" /> Ready
              </span>
            )}
            {executionState === 'running' && (
              <span className="flex items-center text-blue-600">
                <Play size={16} className="mr-1" /> Running
              </span>
            )}
            {executionState === 'paused' && (
              <span className="flex items-center text-yellow-600">
                <Pause size={16} className="mr-1" /> Paused
              </span>
            )}
            {executionState === 'completed' && (
              <span className="flex items-center text-green-600">
                <CheckCircle size={16} className="mr-1" /> Completed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Interactive Code Debugger</h1>
        <p className="text-sm opacity-75">Visualize code execution step by step</p>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r border-gray-300 flex flex-col">
          <div className="border-b border-gray-300 p-3 bg-gray-100">
            <div className="flex space-x-2">
              {executionState === 'idle' && (
                <button 
                  onClick={runCode}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center"
                >
                  <Play size={16} className="mr-1" /> Run
                </button>
              )}
              
              {executionState === 'paused' && (
                <button 
                  onClick={continueExecution}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center"
                >
                  <Play size={16} className="mr-1" /> Continue
                </button>
              )}
              
              {(executionState === 'paused' || executionState === 'completed') && (
                <button 
                  onClick={stepForward}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center"
                  disabled={currentStep >= executionSteps.length - 1}
                >
                  <SkipForward size={16} className="mr-1" /> Step
                </button>
              )}
              
              {(executionState === 'running' || executionState === 'paused' || executionState === 'completed') && (
                <button 
                  onClick={resetExecution}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded flex items-center"
                >
                  <RotateCcw size={16} className="mr-1" /> Reset
                </button>
              )}
            </div>
          </div>
          
          <div className="flex-1 overflow-auto font-mono text-sm">
            <div className="border-b border-gray-300 p-3 bg-gray-100">
              <div className="text-xs text-gray-500 mb-1">Click on line numbers to set breakpoints</div>
            </div>
            <div className="p-0">
              {codeLines}
            </div>
          </div>
        </div>
        
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 overflow-auto p-4">
            <h2 className="text-xl font-bold mb-4">Execution State</h2>
            
            {errors && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-start">
                <AlertCircle size={20} className="mr-2 mt-1" />
                <div>
                  <p className="font-bold">Error</p>
                  <pre className="text-sm">{errors}</pre>
                </div>
              </div>
            )}
            
            {controlPanel}
            
            <div className="mt-4">
              <CodeFlowVisualization 
                executionStack={executionStack} 
                variables={variables} 
                currentLine={currentLine} 
              />
            </div>
            
            {stackVisualization}
            {variableVisualization}
            {executionStatsChart}
            
            {executionSteps.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Execution Progress</h3>
                <div className="bg-gray-200 rounded-full h-4 w-full">
                  <div 
                    className="bg-blue-500 h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / (executionSteps.length - 1)) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Step {currentStep + 1} of {executionSteps.length}
                </div>
              </div>
            )}
          </div>
          
          {/* Console Output */}
          <div className="h-1/3 border-t border-gray-300 flex flex-col">
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
        </div>
      </div>
    </div>
  );
};

export default InteractiveDebugger;