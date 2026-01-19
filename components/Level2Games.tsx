import React, { useState, useEffect } from 'react';
import { Package, Plus, Calculator, Terminal, ArrowRight, HelpCircle, Target, Check } from 'lucide-react';

// --- Shared Helper for "Memory Boxes" ---
const VariableBox = ({ name, value, type }: { name: string, value: string | number, type: 'string' | 'number' }) => (
    <div className="flex flex-col items-center">
        <div className="bg-white border-4 border-city-dark rounded-lg w-24 h-24 flex items-center justify-center shadow-lg relative overflow-hidden group">
            <span className={`text-2xl font-bold ${type === 'string' ? 'text-funfair-blue' : 'text-funfair-red'}`}>
                {type === 'string' ? `"${value}"` : value}
            </span>
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="mt-2 bg-city-dark text-white px-3 py-1 rounded font-mono text-sm shadow-md">
            {name}
        </div>
    </div>
);

// --- Game 4: Treasure Boxes (Variables) ---
export const TreasureBoxes: React.FC<{ updateCode: (c: string) => void }> = ({ updateCode }) => {
    const [name, setName] = useState("Player");
    const [score, setScore] = useState(0);
    const [generatedCode, setGeneratedCode] = useState('');
    
    // Quiz State
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizStatus, setQuizStatus] = useState<'idle'|'correct'|'wrong'>('idle');

    const quizzes = [
        { q: 'x = 10\nx = 20\nprint(x)', a: '20' },
        { q: 'name = "Bob"\nprint(name + name)', a: 'BobBob' },
        { q: 'a = 5\nb = 2\nprint(a + b)', a: '7' },
        { q: 'x = "5"\nprint(x)', a: '5' }
    ];

    useEffect(() => {
        const code = `
player_name = "${name}"
score = ${score}

print("Welcome " + player_name)
print("Score: " + str(score))
        `.trim();
        setGeneratedCode(code);
        updateCode(code);
    }, [name, score, updateCode]);

    const checkQuiz = () => {
        if (quizAnswer.trim() === quizzes[quizIndex].a) {
            setQuizStatus('correct');
            setTimeout(() => {
                setQuizStatus('idle');
                setQuizAnswer('');
                setQuizIndex((prev) => (prev + 1) % quizzes.length);
            }, 1500);
        } else {
            setQuizStatus('wrong');
        }
    }

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-comic font-bold text-city-dark mb-2">Memory Boxes 🏦</h2>
                <p className="text-gray-600">Variables are like boxes with labels. Change what's inside!</p>
            </div>

            {/* Interactive Section */}
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center bg-blue-50 p-8 rounded-2xl border-2 border-blue-100">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-500 uppercase">Input 1</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="border-2 border-gray-300 rounded-lg p-2 text-center text-lg focus:border-funfair-blue focus:outline-none"
                    />
                    <ArrowRight className="mx-auto text-gray-400 rotate-90 md:rotate-0" />
                </div>
                
                <VariableBox name="player_name" value={name} type="string" />

                <div className="w-px h-24 bg-gray-300 hidden md:block"></div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-500 uppercase">Input 2</label>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setScore(Math.max(0, score - 10))} className="bg-red-200 text-red-700 w-8 h-8 rounded hover:bg-red-300">-</button>
                        <span className="text-xl font-mono w-12 text-center">{score}</span>
                        <button onClick={() => setScore(score + 10)} className="bg-green-200 text-green-700 w-8 h-8 rounded hover:bg-green-300">+</button>
                    </div>
                     <ArrowRight className="mx-auto text-gray-400 rotate-90 md:rotate-0" />
                </div>

                <VariableBox name="score" value={score} type="number" />
            </div>

            <div className="bg-slate-900 rounded-lg p-6 relative group">
                <div className="absolute -top-3 left-4 bg-funfair-yellow text-black text-xs font-bold px-2 py-1 rounded">PYTHON CODE</div>
                <pre className="font-mono text-green-400 text-lg">
                    {generatedCode}
                </pre>
            </div>

            {/* Pop Quiz Section */}
            <div className="border-t-4 border-gray-200 pt-6">
                <div className="bg-purple-100 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><HelpCircle size={100} /></div>
                    <h3 className="text-xl font-bold text-purple-800 flex items-center gap-2 mb-4">
                        <HelpCircle /> Pop Quiz: What will print?
                    </h3>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="bg-slate-800 text-white font-mono p-4 rounded-lg shadow-inner w-full md:w-1/2">
                            {quizzes[quizIndex].q.split('\n').map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </div>
                        <div className="flex-1 flex flex-col justify-center gap-4">
                            <p className="text-sm text-purple-700 font-bold">Type the output:</p>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={quizAnswer}
                                    onChange={(e) => { setQuizAnswer(e.target.value); setQuizStatus('idle'); }}
                                    className={`flex-1 border-2 rounded-lg px-4 py-2 text-lg font-mono outline-none ${quizStatus === 'wrong' ? 'border-red-400 bg-red-50' : 'border-purple-300 focus:border-purple-500'}`}
                                    placeholder="?"
                                />
                                <button 
                                    onClick={checkQuiz}
                                    className={`px-6 rounded-lg font-bold text-white transition-all ${quizStatus === 'correct' ? 'bg-green-500' : 'bg-purple-600 hover:bg-purple-700'}`}
                                >
                                    {quizStatus === 'correct' ? <Check /> : 'Check'}
                                </button>
                            </div>
                            {quizStatus === 'wrong' && <p className="text-red-500 text-sm font-bold animate-shake">Try again!</p>}
                            {quizStatus === 'correct' && <p className="text-green-600 text-sm font-bold">Correct! Next question...</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Game 5: Number Battle (Math) ---
export const NumberBattle: React.FC<{ updateCode: (c: string) => void }> = ({ updateCode }) => {
    const [num1, setNum1] = useState(5);
    const [num2, setNum2] = useState(3);
    const [operator, setOperator] = useState('+');
    const [result, setResult] = useState<number | null>(null);
    
    // Target Mode
    const [targetMode, setTargetMode] = useState(false);
    const [target, setTarget] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        updateCode(`
monster_health = ${num1}
attack_power = ${num2}
damage = monster_health ${operator} attack_power
print(damage)
        `.trim());
    }, [num1, num2, operator, updateCode]);

    // Initialize random target when entering mode
    useEffect(() => {
        if (targetMode && target === 0) {
            generateNewTarget();
        }
    }, [targetMode]);

    const generateNewTarget = () => {
        // Generate a reachable target based on simple maths
        const ops = ['+', '-', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        let t = 0;
        if (op === '+') t = a + b;
        if (op === '-') t = a - b; // Can be negative, that's fine for kids learning
        if (op === '*') t = a * b;
        setTarget(t);
        setResult(null);
        setMessage('');
    };

    const calculate = () => {
        let res = 0;
        switch(operator) {
            case '+': res = num1 + num2; break;
            case '-': res = num1 - num2; break;
            case '*': res = num1 * num2; break;
            case '/': res = parseFloat((num1 / num2).toFixed(2)); break;
        }
        setResult(res);

        if (targetMode) {
            if (res === target) {
                setMessage('CRITICAL HIT! 💥 Next Monster!');
                setTimeout(() => generateNewTarget(), 1500);
            } else {
                setMessage('Missed! Try different numbers. 🛡️');
            }
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
             <div className="text-center mb-6">
                <h2 className="text-3xl font-comic font-bold text-funfair-red mb-2">Number Battle ⚔️</h2>
                
                {/* Mode Toggle */}
                <div className="flex justify-center gap-4 mt-4">
                    <button 
                        onClick={() => { setTargetMode(false); setMessage(''); }}
                        className={`px-4 py-2 rounded-full font-bold transition-colors ${!targetMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-gray-500'}`}
                    >
                        Free Play
                    </button>
                    <button 
                        onClick={() => { setTargetMode(true); }}
                        className={`px-4 py-2 rounded-full font-bold transition-colors ${targetMode ? 'bg-red-600 text-white shadow-lg scale-105' : 'bg-gray-200 text-gray-500'}`}
                    >
                        Target Mode 🎯
                    </button>
                </div>
            </div>

            {targetMode && (
                <div className="bg-red-100 border-2 border-red-300 text-red-800 p-4 rounded-xl text-center mb-6 animate-pulse">
                    <p className="font-bold text-lg">MONSTER HP: {target}</p>
                    <p className="text-sm">Find numbers that equal {target}!</p>
                </div>
            )}

            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
                <input type="number" value={num1} onChange={(e) => {setNum1(Number(e.target.value)); setResult(null);}} className="w-20 text-center p-3 text-2xl border-4 border-gray-200 rounded-xl focus:border-funfair-blue outline-none" />
                
                <div className="flex flex-col gap-2">
                    {['+', '-', '*', '/'].map(op => (
                        <button 
                            key={op}
                            onClick={() => { setOperator(op); setResult(null); }}
                            className={`w-10 h-10 rounded-lg font-bold text-xl ${operator === op ? 'bg-funfair-blue text-white shadow-inner' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                            {op}
                        </button>
                    ))}
                </div>

                <input type="number" value={num2} onChange={(e) => {setNum2(Number(e.target.value)); setResult(null);}} className="w-20 text-center p-3 text-2xl border-4 border-gray-200 rounded-xl focus:border-funfair-blue outline-none" />
                
                <span className="text-4xl font-bold">=</span>
                
                <div className={`w-24 h-24 flex items-center justify-center bg-gray-100 rounded-xl border-4 ${targetMode && result === target ? 'border-green-500 bg-green-100' : 'border-dashed border-gray-300'}`}>
                    {result !== null ? <span className="text-3xl font-bold text-funfair-green animate-bounce">{result}</span> : <span className="text-gray-400 text-2xl">?</span>}
                </div>
            </div>

            {message && <div className="text-center font-bold text-lg mb-4 h-6">{message}</div>}

            <button onClick={calculate} className="w-full py-4 bg-funfair-red text-white font-bold rounded-xl text-xl shadow-[0_4px_0_rgb(150,0,0)] hover:bg-red-500 active:shadow-none active:translate-y-1 transition-all">
                ATTACK! 💥
            </button>
        </div>
    )
}

// --- Game 6: Interview Computer (Input) ---
export const InterviewComputer: React.FC<{ updateCode: (c: string) => void }> = ({ updateCode }) => {
    const [logs, setLogs] = useState<{type: 'sys'|'user', text: string}[]>([
        {type: 'sys', text: 'Hello! What is your name?'}
    ]);
    const [inputVal, setInputVal] = useState('');
    const [step, setStep] = useState(0);

    const codeSnippet = `
print("Hello! What is your name?")
name = input()
print("Nice to meet you " + name)
print("What is your favorite color?")
color = input()
print("Wow! " + color + " is beautiful!")
    `.trim();

    useEffect(() => { updateCode(codeSnippet); }, [updateCode, codeSnippet]);

    const handleInput = () => {
        if(!inputVal.trim()) return;
        const newLogs = [...logs, {type: 'user', text: inputVal} as const];
        
        if (step === 0) {
            newLogs.push({type: 'sys', text: `Nice to meet you ${inputVal}`});
            newLogs.push({type: 'sys', text: "What is your favorite color?"});
            setStep(1);
        } else if (step === 1) {
            newLogs.push({type: 'sys', text: `Wow! ${inputVal} is beautiful!`});
            newLogs.push({type: 'sys', text: "Interview complete! Refresh to start again."});
            setStep(2);
        }
        
        setLogs(newLogs);
        setInputVal('');
    };

    return (
        <div className="p-6 max-w-2xl mx-auto h-[500px] flex flex-col">
             <div className="text-center mb-4">
                <h2 className="text-3xl font-comic font-bold text-purple-600 mb-2">Interview The Computer 🎤</h2>
            </div>

            <div className="flex-1 bg-black rounded-t-xl p-4 overflow-y-auto space-y-2 font-mono text-lg border-4 border-gray-700 border-b-0">
                {logs.map((l, i) => (
                    <div key={i} className={`${l.type === 'sys' ? 'text-green-400' : 'text-cyan-400 text-right'}`}>
                        {l.type === 'sys' ? '> ' : ''}{l.text}
                    </div>
                ))}
            </div>
            
            <div className="bg-gray-800 p-2 rounded-b-xl border-4 border-gray-700 border-t-0 flex gap-2">
                <span className="text-green-500 font-mono py-2">{'>'}</span>
                <input 
                    disabled={step === 2}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleInput()}
                    className="flex-1 bg-transparent text-white font-mono focus:outline-none"
                    autoFocus
                />
            </div>
        </div>
    )
}