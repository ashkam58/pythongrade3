import React, { useState, useEffect } from 'react';
import { Lock, Unlock, GitBranch, AlertTriangle, Car, ArrowRight, Check, XCircle } from 'lucide-react';

// --- Game 7: Password Gate (Basic If) ---
export const PasswordGate: React.FC<{ updateCode: (c: string) => void }> = ({ updateCode }) => {
    const [password, setPassword] = useState("guest");
    const [isOpen, setIsOpen] = useState(false);
    
    // The secret password is "melon" (classic Lord of the Rings reference or just a fun word)
    const secret = "melon";

    useEffect(() => {
        const code = `
secret_word = "melon"
user_input = "${password}"

if user_input == secret_word:
    print("Access Granted! Enter.")
else:
    print("Access Denied.")
        `.trim();
        updateCode(code);
        
        if (password.toLowerCase() === secret) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [password, updateCode]);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-comic font-bold text-logic-dark mb-2">The Cyber Gate 🔐</h2>
                <p className="text-gray-600">Only the correct password will open the <span className="font-mono text-purple-600">if</span> statement!</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Visual Representation */}
                <div className="flex-1 flex flex-col items-center">
                    <div className={`w-48 h-64 border-8 rounded-t-full transition-all duration-700 relative flex items-center justify-center bg-slate-800 ${isOpen ? 'border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.5)]' : 'border-red-500'}`}>
                        {/* Gate Bars */}
                        <div className={`absolute inset-0 flex justify-center gap-2 transition-transform duration-700 origin-top ${isOpen ? 'scale-y-0 opacity-0' : 'scale-y-100'}`}>
                             {[1,2,3,4].map(i => <div key={i} className="w-4 bg-slate-600 h-full"></div>)}
                        </div>
                        {isOpen ? <Unlock size={64} className="text-green-400 z-10" /> : <Lock size={64} className="text-red-500 z-10" />}
                    </div>
                    <div className="mt-4 font-bold text-xl">
                        Status: {isOpen ? <span className="text-green-600">OPEN</span> : <span className="text-red-600">LOCKED</span>}
                    </div>
                </div>

                {/* Input Area */}
                <div className="flex-1 w-full space-y-4">
                     <div className="bg-slate-900 p-6 rounded-lg shadow-xl border-l-4 border-logic-neon">
                        <div className="text-gray-400 font-mono text-sm mb-2"># Try changing the password variable</div>
                        <div className="font-mono text-lg text-white space-y-2">
                            <div>secret_word = <span className="text-yellow-400">"melon"</span></div>
                            <div className="flex items-center gap-2">
                                <span>user_input = </span>
                                <input 
                                    type="text" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-slate-800 border-b-2 border-logic-neon text-white px-2 py-1 focus:outline-none w-32 text-center"
                                />
                            </div>
                            <br/>
                            <div><span className="text-purple-400">if</span> user_input == secret_word:</div>
                            <div className="pl-8 text-gray-400">print(<span className="text-green-300">"Access Granted!"</span>)</div>
                            <div><span className="text-purple-400">else</span>:</div>
                            <div className="pl-8 text-gray-400">print(<span className="text-red-300">"Access Denied."</span>)</div>
                        </div>
                     </div>
                     <p className="text-sm text-center text-gray-500">Hint: Look at the secret_word!</p>
                </div>
            </div>
        </div>
    );
};

// --- Game 8: Adventure Fork (If/Else) ---
export const AdventurePath: React.FC<{ updateCode: (c: string) => void }> = ({ updateCode }) => {
    const [path, setPath] = useState<"left" | "right">("left");

    useEffect(() => {
        const code = `
direction = "${path}"

if direction == "left":
    print("You found the Enchanted Forest! 🌲")
else:
    print("You found the Crystal Beach! 🏖️")
        `.trim();
        updateCode(code);
    }, [path, updateCode]);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-comic font-bold text-logic-dark mb-2">The Fork in the Road 🛤️</h2>
                <p className="text-gray-600">Use <span className="font-mono text-purple-600">else</span> to handle two different choices.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100">
                <div className="flex justify-center mb-8">
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-white text-lg w-full max-w-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-purple-400">direction</span> = 
                            <select 
                                value={path} 
                                onChange={(e) => setPath(e.target.value as "left" | "right")}
                                className="bg-slate-700 rounded px-2 py-1 text-yellow-300 cursor-pointer hover:bg-slate-600 transition-colors"
                            >
                                <option value="left">"left"</option>
                                <option value="right">"right"</option>
                            </select>
                        </div>
                        <div><span className="text-purple-400">if</span> direction == <span className="text-green-300">"left"</span>:</div>
                        <div className="pl-8 text-gray-400"># Go to Forest</div>
                        <div><span className="text-purple-400">else</span>:</div>
                        <div className="pl-8 text-gray-400"># Go to Beach</div>
                    </div>
                </div>

                <div className="relative h-64 bg-green-50 rounded-xl overflow-hidden border-2 border-green-100 flex">
                    {/* Scene */}
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 text-6xl z-10 ${path === 'left' ? '-translate-x-32' : 'translate-x-32'}`}>
                        🧙‍♂️
                    </div>

                    {/* Left Background */}
                    <div className={`flex-1 transition-opacity duration-500 flex flex-col items-center justify-center gap-2 ${path === 'left' ? 'opacity-100 bg-green-200' : 'opacity-30 grayscale'}`}>
                        <span className="text-5xl">🌲</span>
                        <span className="font-bold text-green-900">Enchanted Forest</span>
                    </div>

                    {/* Divider */}
                    <div className="w-2 bg-white z-0"></div>

                    {/* Right Background */}
                    <div className={`flex-1 transition-opacity duration-500 flex flex-col items-center justify-center gap-2 ${path === 'right' ? 'opacity-100 bg-blue-200' : 'opacity-30 grayscale'}`}>
                         <span className="text-5xl">🏖️</span>
                         <span className="font-bold text-blue-900">Crystal Beach</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Game 9: Traffic Controller (If/Elif/Else) ---
export const TrafficController: React.FC<{ updateCode: (c: string) => void }> = ({ updateCode }) => {
    const [lightColor, setLightColor] = useState<"red" | "yellow" | "green">("red");

    useEffect(() => {
        const code = `
light = "${lightColor}"

if light == "red":
    print("Stop! 🛑")
elif light == "yellow":
    print("Slow down... ⚠️")
else:
    print("Go! 🏎️")
        `.trim();
        updateCode(code);
    }, [lightColor, updateCode]);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-comic font-bold text-logic-dark mb-2">Traffic Logic 🚦</h2>
                <p className="text-gray-600">Use <span className="font-mono text-purple-600">elif</span> to check multiple conditions.</p>
            </div>

            <div className="flex gap-8 items-start justify-center">
                {/* Traffic Light Visual */}
                <div className="bg-slate-800 p-4 rounded-3xl shadow-2xl flex flex-col gap-4 border-4 border-slate-700">
                    <button 
                        onClick={() => setLightColor("red")}
                        className={`w-16 h-16 rounded-full transition-all duration-300 ${lightColor === 'red' ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] scale-110' : 'bg-red-900 opacity-50'}`}
                    />
                    <button 
                        onClick={() => setLightColor("yellow")}
                        className={`w-16 h-16 rounded-full transition-all duration-300 ${lightColor === 'yellow' ? 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8)] scale-110' : 'bg-yellow-900 opacity-50'}`}
                    />
                    <button 
                        onClick={() => setLightColor("green")}
                        className={`w-16 h-16 rounded-full transition-all duration-300 ${lightColor === 'green' ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] scale-110' : 'bg-green-900 opacity-50'}`}
                    />
                </div>

                {/* Code & Car */}
                <div className="flex-1 space-y-6">
                    <div className="bg-slate-900 p-6 rounded-lg font-mono text-white text-lg">
                        <div className="mb-4 text-gray-400"># Click the lights to change the variable!</div>
                        <div>light = <span className={`${lightColor === 'red' ? 'text-red-400' : lightColor === 'yellow' ? 'text-yellow-400' : 'text-green-400'}`}>"{lightColor}"</span></div>
                        <br/>
                        <div><span className="text-purple-400">if</span> light == "red":</div>
                        <div className="pl-8 text-gray-500">stop_car()</div>
                        <div><span className="text-purple-400">elif</span> light == "yellow":</div>
                        <div className="pl-8 text-gray-500">slow_car()</div>
                        <div><span className="text-purple-400">else</span>:</div>
                        <div className="pl-8 text-gray-500">drive_car()</div>
                    </div>

                    <div className="h-24 bg-gray-200 rounded-xl overflow-hidden relative flex items-center border-b-4 border-gray-300">
                         {/* Road Markings */}
                         <div className="absolute inset-0 flex items-center justify-around">
                            <div className="w-8 h-2 bg-gray-400"></div>
                            <div className="w-8 h-2 bg-gray-400"></div>
                            <div className="w-8 h-2 bg-gray-400"></div>
                            <div className="w-8 h-2 bg-gray-400"></div>
                         </div>
                         
                         {/* Car Animation */}
                         <div className={`absolute transition-all duration-1000 ease-in-out text-logic-dark transform
                             ${lightColor === 'red' ? 'left-10' : lightColor === 'yellow' ? 'left-1/2' : 'left-[85%]'}
                         `}>
                             <Car size={48} className={lightColor === 'green' ? 'animate-bounce' : ''} />
                             {lightColor === 'red' && <div className="absolute -top-6 left-2 font-bold text-red-600 animate-pulse">STOP</div>}
                             {lightColor === 'yellow' && <div className="absolute -top-6 left-0 font-bold text-yellow-600">WAIT</div>}
                             {lightColor === 'green' && <div className="absolute -top-6 left-2 font-bold text-green-600">GO!</div>}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
