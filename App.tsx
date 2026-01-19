import React, { useState } from 'react';
import { GameMode } from './types';
import { MagicTalkingBox, BugSmash, RobotChef } from './components/Level1Games';
import { TreasureBoxes, NumberBattle, InterviewComputer } from './components/Level2Games';
import { PasswordGate, AdventurePath, TrafficController } from './components/Level3Games';
import { GeminiTutor } from './components/GeminiTutor';
import { Gamepad2, Tent, Building2, ChevronLeft, Cpu } from 'lucide-react';

const App = () => {
  const [mode, setMode] = useState<GameMode>(GameMode.MENU);
  const [currentCode, setCurrentCode] = useState('');

  const renderGame = () => {
    switch (mode) {
      case GameMode.LEVEL_1_TALKING_BOX: return <MagicTalkingBox updateCode={setCurrentCode} />;
      case GameMode.LEVEL_1_BUG_SMASH: return <BugSmash updateCode={setCurrentCode} />;
      case GameMode.LEVEL_1_ROBOT_CHEF: return <RobotChef updateCode={setCurrentCode} />;
      case GameMode.LEVEL_2_TREASURE: return <TreasureBoxes updateCode={setCurrentCode} />;
      case GameMode.LEVEL_2_NUMBER_BATTLE: return <NumberBattle updateCode={setCurrentCode} />;
      case GameMode.LEVEL_2_INTERVIEW: return <InterviewComputer updateCode={setCurrentCode} />;
      case GameMode.LEVEL_3_GATE: return <PasswordGate updateCode={setCurrentCode} />;
      case GameMode.LEVEL_3_PATH: return <AdventurePath updateCode={setCurrentCode} />;
      case GameMode.LEVEL_3_TRAFFIC: return <TrafficController updateCode={setCurrentCode} />;
      default: return null;
    }
  };

  const getContext = () => {
    switch(mode) {
        case GameMode.LEVEL_1_TALKING_BOX: return "Learning Python print() function";
        case GameMode.LEVEL_1_BUG_SMASH: return "Debugging syntax errors in print statements";
        case GameMode.LEVEL_1_ROBOT_CHEF: return "Understanding code execution order";
        case GameMode.LEVEL_2_TREASURE: return "Understanding variables as containers";
        case GameMode.LEVEL_2_NUMBER_BATTLE: return "Basic math operators in Python";
        case GameMode.LEVEL_2_INTERVIEW: return "Using Python input() function";
        case GameMode.LEVEL_3_GATE: return "Learning Python 'if' statements";
        case GameMode.LEVEL_3_PATH: return "Learning Python 'if-else' logic";
        case GameMode.LEVEL_3_TRAFFIC: return "Learning Python 'elif' conditions";
        default: return "Python Coding Menu";
    }
  }

  if (mode === GameMode.MENU) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] p-8">
        <header className="text-center mb-12">
            <h1 className="text-5xl font-comic font-bold text-slate-800 mb-4 tracking-tight">
                Python <span className="text-funfair-red">Fun</span>fair <span className="text-sm align-middle">&</span> <span className="text-funfair-blue">City</span>
            </h1>
            <p className="text-xl text-slate-600 font-sans">Start your coding adventure today!</p>
        </header>

        <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Level 1 Section */}
            <section className="bg-white rounded-3xl shadow-xl overflow-hidden border-b-8 border-funfair-yellow transition-transform hover:-translate-y-1">
                <div className="bg-funfair-yellow p-6 flex items-center gap-4">
                    <Tent className="w-10 h-10 text-slate-800" />
                    <div>
                        <h2 className="text-2xl font-bold font-comic text-slate-800">Level 1: Python Funfair</h2>
                        <p className="text-slate-700">Learn to talk to the computer!</p>
                    </div>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MenuCard 
                        title="Magic Talking Box" 
                        desc="Your first print()" 
                        color="bg-funfair-blue" 
                        onClick={() => setMode(GameMode.LEVEL_1_TALKING_BOX)} 
                    />
                    <MenuCard 
                        title="Bug Smash" 
                        desc="Fix broken code" 
                        color="bg-funfair-red" 
                        onClick={() => setMode(GameMode.LEVEL_1_BUG_SMASH)} 
                    />
                    <MenuCard 
                        title="Robot Chef" 
                        desc="Code in order" 
                        color="bg-funfair-green" 
                        onClick={() => setMode(GameMode.LEVEL_1_ROBOT_CHEF)} 
                    />
                </div>
            </section>

             {/* Level 2 Section */}
             <section className="bg-white rounded-3xl shadow-xl overflow-hidden border-b-8 border-city-dark transition-transform hover:-translate-y-1">
                <div className="bg-city-dark p-6 flex items-center gap-4 text-white">
                    <Building2 className="w-10 h-10" />
                    <div>
                        <h2 className="text-2xl font-bold font-comic">Level 2: Python City</h2>
                        <p className="text-gray-300">Master memory and math!</p>
                    </div>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MenuCard 
                        title="Memory Boxes" 
                        desc="Variables" 
                        color="bg-purple-500" 
                        onClick={() => setMode(GameMode.LEVEL_2_TREASURE)} 
                    />
                    <MenuCard 
                        title="Number Battle" 
                        desc="Math + - * /" 
                        color="bg-orange-500" 
                        onClick={() => setMode(GameMode.LEVEL_2_NUMBER_BATTLE)} 
                    />
                    <MenuCard 
                        title="Interview Bot" 
                        desc="input()" 
                        color="bg-teal-500" 
                        onClick={() => setMode(GameMode.LEVEL_2_INTERVIEW)} 
                    />
                </div>
            </section>

             {/* Level 3 Section (NEW) */}
             <section className="bg-white rounded-3xl shadow-xl overflow-hidden border-b-8 border-logic-dark transition-transform hover:-translate-y-1">
                <div className="bg-logic-dark p-6 flex items-center gap-4 text-white">
                    <Cpu className="w-10 h-10 text-logic-neon" />
                    <div>
                        <h2 className="text-2xl font-bold font-comic text-white">Level 3: Logic Land</h2>
                        <p className="text-logic-light">Make decisions with If / Else!</p>
                    </div>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MenuCard 
                        title="Password Gate" 
                        desc="Basic IF logic" 
                        color="bg-indigo-600" 
                        onClick={() => setMode(GameMode.LEVEL_3_GATE)} 
                    />
                    <MenuCard 
                        title="Adventure Fork" 
                        desc="IF / ELSE choice" 
                        color="bg-pink-600" 
                        onClick={() => setMode(GameMode.LEVEL_3_PATH)} 
                    />
                    <MenuCard 
                        title="Traffic Control" 
                        desc="ELIF signals" 
                        color="bg-violet-600" 
                        onClick={() => setMode(GameMode.LEVEL_3_TRAFFIC)} 
                    />
                </div>
            </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Game Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
            <button 
                onClick={() => setMode(GameMode.MENU)}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors"
            >
                <ChevronLeft /> Back to Map
            </button>
            <div className="flex items-center gap-2">
                <Gamepad2 className="text-funfair-blue" />
                <span className="font-comic font-bold text-xl">Playing Mode</span>
            </div>
            <div className="w-24"></div> {/* Spacer for center alignment */}
        </header>

        {/* Game Content */}
        <main className="flex-1 container mx-auto py-8">
            {renderGame()}
        </main>

        {/* Gemini Tutor - Always present in games */}
        <GeminiTutor context={getContext()} currentCode={currentCode} />
    </div>
  );
};

const MenuCard = ({ title, desc, color, onClick }: { title: string, desc: string, color: string, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className={`${color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-left flex flex-col justify-between h-32 group`}
    >
        <span className="font-bold text-lg font-comic">{title}</span>
        <div className="flex justify-between items-end opacity-90 group-hover:opacity-100">
            <span className="text-sm font-sans">{desc}</span>
            <div className="bg-white/20 p-1 rounded-full"><GameModeIcon /></div>
        </div>
    </button>
);

const GameModeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
)

export default App;