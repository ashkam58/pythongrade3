import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle, AlertCircle, Bug, Trash2, ArrowRight } from 'lucide-react';
import { BugChallenge } from '../types';
import { generateBugChallenge } from '../services/geminiService';

// --- Shared Components ---
const OutputBox = ({ output, error }: { output: string[], error?: string }) => (
  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm min-h-[100px] border-4 border-gray-700 mt-4 relative">
    <div className="absolute top-0 left-0 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-br">Console</div>
    <div className="mt-4 space-y-1">
      {output.map((line, i) => (
        <div key={i} className="text-green-400 animate-fade-in">{`> ${line}`}</div>
      ))}
      {error && <div className="text-red-400 animate-pulse">{`Error: ${error}`}</div>}
      {!output.length && !error && <div className="text-gray-500 italic">Waiting for code...</div>}
    </div>
  </div>
);

// --- Game 1: Magic Talking Box ---
export const MagicTalkingBox: React.FC<{ updateCode: (c: string) => void }> = ({ updateCode }) => {
  const [code, setCode] = useState('print("Hello World")');
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => { updateCode(code); }, [code, updateCode]);

  const runCode = () => {
    setOutput([]);
    setError(undefined);
    setIsSpeaking(true);

    // Simple parser for print("...")
    const printRegex = /^print\s*\(\s*(['"])(.*?)\1\s*\)$/;
    const match = code.trim().match(printRegex);

    setTimeout(() => {
      if (match) {
        setOutput([match[2]]);
      } else {
        // Fallback for simple errors
        if (code.includes('print') && !code.includes('(')) setError("Missing parenthesis!");
        else if (code.includes('print') && (!code.includes('"') && !code.includes("'"))) setError("Missing quotes around the text!");
        else setError("I don't understand that command yet. Try print(\"text\")");
      }
      setIsSpeaking(false);
    }, 800);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-comic font-bold text-funfair-blue mb-2">Magic Talking Box 📦</h2>
        <p className="text-gray-600">Make the computer speak! Type <span className="font-mono bg-gray-200 px-1 rounded">print("Something")</span></p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Editor */}
        <div className="flex-1 w-full">
          <div className="bg-slate-800 p-4 rounded-t-lg flex items-center justify-between">
            <span className="text-gray-400 text-xs font-mono">main.py</span>
            <button onClick={runCode} className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              <Play size={14} /> Run
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-40 bg-slate-900 text-white font-mono p-4 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-funfair-blue resize-none"
            spellCheck={false}
          />
          <OutputBox output={output} error={error} />
        </div>

        {/* The Box Avatar */}
        <div className="w-full md:w-48 flex flex-col items-center">
          <div className={`relative transition-all duration-300 ${isSpeaking ? 'scale-110' : 'scale-100'}`}>
            <div className="w-32 h-32 bg-funfair-yellow border-4 border-black rounded-xl flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="space-y-2 flex flex-col items-center">
                <div className="flex gap-4">
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                </div>
                <div className={`w-12 h-2 bg-black rounded-full transition-all duration-100 ${isSpeaking ? 'h-8 border-4 border-black bg-white' : ''}`}></div>
              </div>
            </div>
            {output.length > 0 && (
              <div className="absolute -top-16 -right-12 bg-white p-3 rounded-2xl shadow-lg border-2 border-gray-200 animate-bounce">
                <p className="font-comic font-bold text-lg">{output[0]}</p>
                <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-4 h-4 bg-white border-r-2 border-b-2 border-gray-200"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Game 2: Bug Smash ---
export const BugSmash: React.FC<{ updateCode: (c: string) => void }> = ({ updateCode }) => {
  const [challenges, setChallenges] = useState<BugChallenge[]>([
    { id: 1, brokenCode: 'print(Hello World)', correctCode: ['print("Hello World")', "print('Hello World')"], hint: 'Strings need quotes!', solved: false },
    { id: 2, brokenCode: 'prit("Pizza")', correctCode: ['print("Pizza")', "print('Pizza')"], hint: 'Check the spelling of the command.', solved: false },
    { id: 3, brokenCode: 'print "Cool"', correctCode: ['print("Cool")', "print('Cool')"], hint: 'You need parentheses ( ) around the text.', solved: false },
    { id: 4, brokenCode: 'Print("Blue")', correctCode: ['print("Blue")', "print('Blue')"], hint: 'Python is case-sensitive. P is different from p.', solved: false },
    { id: 5, brokenCode: 'print("Cat\')', correctCode: ['print("Cat")', "print('Cat')"], hint: 'Mismatched quotes! Use " " or \' \' matching pairs.', solved: false },
    { id: 6, brokenCode: 'print("Age: " 10)', correctCode: ['print("Age: " + "10")', 'print("Age: ", 10)'], hint: 'To print text and numbers, use a comma , or +', solved: false },
  ]);
  const [currentId, setCurrentId] = useState(1);
  const [userCode, setUserCode] = useState(challenges[0].brokenCode);
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'fail'>('idle');

  useEffect(() => { updateCode(userCode); }, [userCode, updateCode]);

  const currentChallenge = challenges.find(c => c.id === currentId);

  const checkFix = () => {
    if (!currentChallenge) return;
    const normalized = userCode.replace(/\s/g, ''); // Remove spaces for looser checking
    const correctOptions = Array.isArray(currentChallenge.correctCode) ? currentChallenge.correctCode : [currentChallenge.correctCode];
    
    // Check if any of the correct options match
    const isCorrect = correctOptions.some(opt => opt.replace(/\s/g, '') === normalized);

    if (isCorrect) {
      setFeedback('success');
      setChallenges(prev => prev.map(c => c.id === currentId ? { ...c, solved: true } : c));
    } else {
      setFeedback('fail');
    }
  };

  const nextLevel = () => {
    if (currentId < challenges.length) {
      const next = challenges.find(c => c.id === currentId + 1);
      if (next) {
          setCurrentId(next.id);
          setUserCode(next.brokenCode);
          setFeedback('idle');
      }
    }
  };

  const generateNewLevel = async () => {
      // Use Gemini to make a new level
      const newBug = await generateBugChallenge();
      const newId = challenges.length + 1;
      const newChallenge: BugChallenge = {
          id: newId,
          brokenCode: newBug.broken,
          correctCode: [`print("${newBug.broken.replace(/print|[()]/g, '')}")`, newBug.broken.replace('(', '("').replace(')', '")')], 
          hint: newBug.hint,
          solved: false
      };
      setChallenges([...challenges, newChallenge]);
      setCurrentId(newId);
      setUserCode(newChallenge.brokenCode);
      setFeedback('idle');
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h2 className="text-3xl font-comic font-bold text-funfair-red mb-2 flex items-center gap-2">
            <Bug /> Bug Smash
            </h2>
            <p className="text-gray-600">Fix the bugs to clear the code!</p>
        </div>
        <div className="text-xl font-bold bg-white px-4 py-2 rounded-lg shadow-sm">
            Level: {currentId} / {challenges.length}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden">
        <div className="bg-red-50 p-4 border-b border-red-100 flex items-center gap-3">
            <div className="bg-red-200 p-2 rounded-full text-red-700">
                <AlertCircle size={24} />
            </div>
            <div>
                <h4 className="font-bold text-red-800">Bug Detected!</h4>
                <p className="text-sm text-red-600">{currentChallenge?.hint}</p>
            </div>
        </div>

        <div className="p-6">
            <div className="relative">
                <textarea 
                    value={userCode}
                    onChange={(e) => { setUserCode(e.target.value); setFeedback('idle'); }}
                    className={`w-full h-32 bg-slate-900 text-white font-mono p-4 rounded-lg text-lg resize-none border-4 ${feedback === 'fail' ? 'border-red-500' : feedback === 'success' ? 'border-green-500' : 'border-slate-700'}`}
                />
                {feedback === 'success' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                        <div className="bg-white p-4 rounded-xl flex flex-col items-center animate-bounce">
                            <CheckCircle size={48} className="text-green-500 mb-2" />
                            <span className="font-bold text-lg">Bug Smashed!</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-4 mt-6">
                <button 
                    onClick={checkFix}
                    disabled={feedback === 'success'}
                    className="flex-1 bg-funfair-red hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all shadow-[0_4px_0_rgb(150,0,0)] active:shadow-none active:translate-y-1 disabled:opacity-50"
                >
                    SMASH BUG! 🔨
                </button>
                {feedback === 'success' && currentId < challenges.length && (
                    <button 
                        onClick={nextLevel}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all shadow-[0_4px_0_rgb(20,100,20)]"
                    >
                        Next Level ➡️
                    </button>
                )}
                 {feedback === 'success' && currentId === challenges.length && (
                    <button onClick={generateNewLevel} className="flex-1 bg-funfair-blue hover:bg-blue-600 text-white font-bold py-3 rounded-xl">
                        AI Generate New Level ✨
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Game 3: Robot Chef (Ordering) ---
export const RobotChef: React.FC<{ updateCode: (c: string) => void }> = ({ updateCode }) => {
  const recipes = [
    {
        title: "Sandwich Routine",
        steps: [
            { id: '1', text: 'print("Put bread on plate")' },
            { id: '2', text: 'print("Spread peanut butter")' },
            { id: '3', text: 'print("Put jelly on bread")' },
            { id: '4', text: 'print("Put bread on top")' },
            { id: '5', text: 'print("Eat sandwich")' },
        ],
        solution: '12345'
    },
    {
        title: "Morning Routine",
        steps: [
            { id: '1', text: 'print("Wake up")' },
            { id: '2', text: 'print("Brush teeth")' },
            { id: '3', text: 'print("Get dressed")' },
            { id: '4', text: 'print("Eat breakfast")' },
            { id: '5', text: 'print("Go to school")' },
        ],
        solution: '12345'
    },
    {
        title: "Gardening Logic",
        steps: [
            { id: '3', text: 'print("Water the seed")' },
            { id: '1', text: 'print("Dig a hole")' },
            { id: '5', text: 'print("Flower blooms!")' },
            { id: '2', text: 'print("Plant the seed")' },
            { id: '4', text: 'print("Wait for sun")' },
        ],
        solution: '12345'
    }
  ];

  const [level, setLevel] = useState(0);
  const [steps, setSteps] = useState(recipes[0].steps.sort(() => Math.random() - 0.5));
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Reset steps when level changes, shuffle them
    if (!completed) {
         setSteps([...recipes[level].steps].sort(() => Math.random() - 0.5));
    }
  }, [level, completed]);

  useEffect(() => {
    updateCode(steps.map(s => s.text).join('\n'));
  }, [steps, updateCode]);

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...steps];
    if (direction === 'up' && index > 0) {
      [newSteps[index], newSteps[index - 1]] = [newSteps[index - 1], newSteps[index]];
    } else if (direction === 'down' && index < newSteps.length - 1) {
      [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
    }
    setSteps(newSteps);
    setCompleted(false);
  };

  const runChef = () => {
    const currentOrder = steps.map(s => s.id).join('');
    if (currentOrder === recipes[level].solution) {
        setCompleted(true);
    } else {
        alert("Oh no! The robot made a mess! 🤖💥 Try changing the order.");
        setCompleted(false);
    }
  };

  const nextRecipe = () => {
      if (level < recipes.length - 1) {
          setLevel(level + 1);
          setCompleted(false);
      } else {
          alert("You are a Master Chef Programmer! 👨‍🍳👩‍🍳");
          setLevel(0); // Loop back
          setCompleted(false);
      }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-comic font-bold text-funfair-green mb-2">Robot Chef 🤖</h2>
        <div className="flex items-center justify-center gap-4">
             <button onClick={() => {setLevel(Math.max(0, level-1)); setCompleted(false)}} disabled={level===0} className="text-gray-400 hover:text-gray-600 disabled:opacity-0"><ArrowRight className="rotate-180"/></button>
             <p className="text-gray-600 font-bold">{recipes[level].title}</p>
             <button onClick={() => {setLevel((level+1)%recipes.length); setCompleted(false)}} className="text-gray-400 hover:text-gray-600"><ArrowRight/></button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Drag the instructions into the right order!</p>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.id} className={`flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border ${completed ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}>
            <div className="flex flex-col gap-1">
              <button onClick={() => moveStep(index, 'up')} className="p-1 hover:bg-gray-100 rounded text-gray-500">▲</button>
              <button onClick={() => moveStep(index, 'down')} className="p-1 hover:bg-gray-100 rounded text-gray-500">▼</button>
            </div>
            <div className="font-mono bg-slate-100 px-3 py-2 rounded flex-1 text-slate-700">
              {step.text}
            </div>
          </div>
        ))}
      </div>

      {!completed ? (
        <button 
            onClick={runChef}
            className="mt-8 w-full bg-funfair-green hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-[0_4px_0_rgb(30,100,30)] active:shadow-none active:translate-y-1 text-xl flex items-center justify-center gap-3"
        >
            <Play /> Cook!
        </button>
      ) : (
        <div className="mt-8 bg-green-100 p-4 rounded-xl border-2 border-green-300 text-center animate-bounce">
            <h3 className="text-green-800 font-bold text-xl mb-2">Perfect Code! 🌟</h3>
            <button 
                onClick={nextRecipe}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 shadow-lg"
            >
                Next Recipe ➡️
            </button>
        </div>
      )}
    </div>
  );
};