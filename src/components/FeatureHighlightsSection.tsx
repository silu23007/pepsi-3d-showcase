import { Thermometer, Wind, RefreshCw, Layers, ArrowUpRight } from 'lucide-react';
import { PepsiFlavor } from '../types';

interface FeatureHighlightsProps {
  activeFlavor: PepsiFlavor;
}

export function FeatureHighlightsSection({ activeFlavor }: FeatureHighlightsProps) {
  const isDiet = activeFlavor.id === 'diet';
  const textColor = isDiet ? 'text-slate-900' : 'text-white';
  const subTextColor = isDiet ? 'text-slate-600' : 'text-zinc-400';
  const cardBg = activeFlavor.cardBg;

  return (
    <section id="features" className="relative min-h-screen flex items-center justify-center px-6 lg:px-16 py-24 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Bento Grid Layout */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 z-10 text-left">
          
          {/* Header Card (Spanning 2 columns on desktop) */}
          <div className="md:col-span-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-500 block mb-2">
              CAN REENGINEERED
            </span>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${textColor}`}>
              Engineered to Quench
            </h2>
            <p className={`mt-3 text-base ${subTextColor} max-w-xl`}>
              Every angle, material, and pressure point of the aluminum can is engineered to deliver a perfect ice-cold experience from first crack to last drop.
            </p>
          </div>

          {/* Bento Block 1: Aluminum Thermal Retention */}
          <div className={`p-6 rounded-3xl ${cardBg} group transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between h-56`}>
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-blue-400">
                <Thermometer className="w-5 h-5 animate-pulse" />
              </div>
              <h3 className={`text-lg font-black uppercase tracking-wide ${textColor}`}>
                Sub-Zero Retention
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Lightweight recycled alloy designed for rapid thermal exchange, keeping your cola ice-cold longer.
              </p>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mt-4 block">
              Alloy Type: 3104-H19
            </span>
          </div>

          {/* Bento Block 2: Carbonic micro-bubbles */}
          <div className={`p-6 rounded-3xl ${cardBg} group transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between h-56`}>
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-red-400">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-black uppercase tracking-wide ${textColor}`}>
                Pressurized Bite
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Calibrated CO2 pressure lines preserve maximum carbonation and that signature sharp Pepsi bite.
              </p>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mt-4 block">
              Pressure Level: 90 PSI
            </span>
          </div>

          {/* Bento Block 3: Infinite Recycling */}
          <div className={`p-6 rounded-3xl ${cardBg} group transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between h-56`}>
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-emerald-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-black uppercase tracking-wide ${textColor}`}>
                100% Recyclable
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                An infinitely reusable material stream. Your Pepsi can is melt-ready and back on shelves in 60 days.
              </p>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mt-4 block">
              Eco impact: 100% Circular
            </span>
          </div>

          {/* Bento Block 4: Ergonomic Pull Tab */}
          <div className={`p-6 rounded-3xl ${cardBg} group transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between h-56 cursor-pointer`}
               onClick={() => {
                 window.open ? window.open('https://www.pepsi.com', '_blank') : window.location.href = 'https://www.pepsi.com';
               }}>
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-purple-400">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex justify-between items-center">
                <h3 className={`text-lg font-black uppercase tracking-wide ${textColor}`}>
                  Sleek Chime Lip
                </h3>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Tapered rim engineered for perfect ergonomics and a completely seamless, spill-free pour.
              </p>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase mt-4 flex items-center gap-1 group-hover:underline">
              Official pepsi store
            </span>
          </div>

        </div>

        {/* Right Column: Dynamic Empty Spacer where the zoomed/tilted 3D can floats */}
        <div className="lg:col-span-5 h-[280px] lg:h-[500px] pointer-events-none relative flex items-center justify-center">
          <div className={`absolute w-80 h-80 rounded-full blur-3xl opacity-20 transition-all duration-1000 ${activeFlavor.id === 'zero' ? 'bg-zinc-800' : 'bg-blue-400'}`}></div>
          {/* Typographic subtle floating badge */}
          <div className="absolute top-10 border border-white/10 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl text-center select-none animate-float">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">CAN ASSEMBLY SPEC</span>
            <span className="text-xs font-bold text-white uppercase">{activeFlavor.name} 12oz</span>
          </div>
        </div>

      </div>
    </section>
  );
}
