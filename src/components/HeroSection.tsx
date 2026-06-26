import { ArrowRight, Sparkles } from 'lucide-react';
import { PepsiFlavor } from '../types';

interface HeroSectionProps {
  activeFlavor: PepsiFlavor;
  onSelectFlavor: (id: PepsiFlavor['id']) => void;
}

export function HeroSection({ activeFlavor, onSelectFlavor }: HeroSectionProps) {
  const isDiet = activeFlavor.id === 'diet';
  const textColor = isDiet ? 'text-slate-900' : 'text-white';
  const highlightColor = activeFlavor.id === 'zero' ? 'text-red-500' : 'text-blue-400';
  const tagBg = activeFlavor.id === 'zero' ? 'bg-red-500/10 border-red-500/20 text-red-400' : activeFlavor.id === 'diet' ? 'bg-blue-600/10 border-blue-600/20 text-blue-700' : 'bg-white/10 border-white/20 text-blue-200';

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 lg:px-16 overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Copywriting content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left z-10 hero-text-container select-none">
          
          {/* Animated Tagline Pill */}
          <div className={`inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md animate-bounce-slow ${tagBg}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXCLUSIVELY CRAFTED 3D EXPERIENCES</span>
          </div>

          {/* Staggered Headers */}
          <h1 className={`text-6xl md:text-8xl font-black tracking-tight leading-[0.9] uppercase ${textColor}`}>
            THIRST <br />
            FOR <span className={highlightColor}>MORE</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-black mt-4 uppercase tracking-wider text-red-500">
            {activeFlavor.tagline}
          </h2>

          <p className={`mt-6 text-base md:text-lg max-w-xl font-normal leading-relaxed opacity-80 ${isDiet ? 'text-slate-700' : 'text-zinc-200'}`}>
            {activeFlavor.subtagline}
          </p>

          {/* Interaction: Flavor switcher directly on Hero */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex gap-2 p-1.5 bg-black/20 backdrop-blur-md border border-white/10 rounded-full">
              <button
                onClick={() => onSelectFlavor('classic')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeFlavor.id === 'classic' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
              >
                Classic
              </button>
              <button
                onClick={() => onSelectFlavor('zero')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeFlavor.id === 'zero' ? 'bg-red-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
              >
                Zero Sugar
              </button>
              <button
                onClick={() => onSelectFlavor('diet')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeFlavor.id === 'diet' ? 'bg-slate-300 text-black shadow-md' : 'text-zinc-400 hover:text-black/80'}`}
              >
                Diet
              </button>
            </div>

            <a
              href="#showcase"
              className={`flex items-center gap-2 group text-sm font-bold uppercase tracking-widest px-6 py-3.5 rounded-full border border-white/20 transition-all ${isDiet ? 'bg-slate-800 text-white border-transparent hover:bg-slate-700' : 'bg-white/5 hover:bg-white/10'}`}
            >
              Explore Showcase
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Inline small specs info card */}
          <div className="mt-12 grid grid-cols-4 gap-6 max-w-lg border-t border-white/10 pt-6">
            <div>
              <span className={`block text-xs uppercase tracking-widest opacity-60 ${isDiet ? 'text-slate-600' : 'text-zinc-400'}`}>Calories</span>
              <span className={`text-2xl font-black ${textColor}`}>{activeFlavor.nutrition.calories}</span>
            </div>
            <div>
              <span className={`block text-xs uppercase tracking-widest opacity-60 ${isDiet ? 'text-slate-600' : 'text-zinc-400'}`}>Sugars</span>
              <span className={`text-2xl font-black ${textColor}`}>{activeFlavor.nutrition.sugar}</span>
            </div>
            <div>
              <span className={`block text-xs uppercase tracking-widest opacity-60 ${isDiet ? 'text-slate-600' : 'text-zinc-400'}`}>Caffeine</span>
              <span className={`text-2xl font-black ${textColor}`}>{activeFlavor.nutrition.caffeine}</span>
            </div>
            <div>
              <span className={`block text-xs uppercase tracking-widest opacity-60 ${isDiet ? 'text-slate-600' : 'text-zinc-400'}`}>Sodium</span>
              <span className={`text-2xl font-black ${textColor}`}>{activeFlavor.nutrition.sodium}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Empty Spacer where the 3D canvas is absolute positioned floating */}
        <div className="lg:col-span-5 h-[350px] lg:h-[600px] pointer-events-none relative flex items-center justify-center">
          {/* Subtle glowing ambient ring behind the canvas */}
          <div className={`absolute w-72 h-72 rounded-full blur-3xl opacity-30 transition-all duration-1000 animate-pulse ${activeFlavor.id === 'zero' ? 'bg-red-500' : activeFlavor.id === 'diet' ? 'bg-sky-400' : 'bg-blue-500'}`}></div>
        </div>

      </div>

      {/* Mouse scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none opacity-60 animate-bounce-slow">
        <span className={`text-[10px] uppercase tracking-[0.25em] font-bold ${textColor}`}>Scroll down</span>
        <div className={`w-6 h-10 rounded-full border-2 flex justify-center p-1.5 ${isDiet ? 'border-slate-800' : 'border-white/50'}`}>
          <div className={`w-1 h-2 rounded-full animate-scroll-dot ${isDiet ? 'bg-slate-800' : 'bg-white'}`}></div>
        </div>
      </div>
    </section>
  );
}
