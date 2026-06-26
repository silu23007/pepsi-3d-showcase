import { Activity, Shield, Sparkles, Heart } from 'lucide-react';
import { PepsiFlavor } from '../types';

interface FlavorShowcaseSectionProps {
  activeFlavor: PepsiFlavor;
}

export function FlavorShowcaseSection({ activeFlavor }: FlavorShowcaseSectionProps) {
  const isDiet = activeFlavor.id === 'diet';
  const isZero = activeFlavor.id === 'zero';
  const textColor = isDiet ? 'text-slate-900' : 'text-white';
  const subTextColor = isDiet ? 'text-slate-600' : 'text-zinc-300';
  const cardBg = activeFlavor.cardBg;

  // Icons mapper helper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Activity className="w-5 h-5 text-red-500" />;
      case 'Wind': return <Sparkles className="w-5 h-5 text-blue-400" />;
      case 'Heart': return <Heart className="w-5 h-5 text-emerald-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-red-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-blue-400" />;
      case 'Flame': return <Activity className="w-5 h-5 text-amber-500" />;
      default: return <Shield className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="showcase" className="relative min-h-screen flex items-center justify-center px-6 lg:px-16 py-24 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column (Desktop Spacer): SODA CAN sits on the left of this section */}
        <div className="lg:col-span-5 h-[280px] lg:h-[500px] pointer-events-none relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Spinning background rays/radar rings behind the 3D can */}
            <div className={`absolute w-80 h-80 rounded-full border border-white/5 animate-spin-slow`}></div>
            <div className={`absolute w-96 h-96 rounded-full border border-dashed border-white/10 animate-spin-reverse`}></div>
            <div className={`absolute w-[450px] h-[450px] rounded-full border border-white/5`}></div>
          </div>
        </div>

        {/* Right Column: Premium Interactive Flavor Dashboard */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10 text-left">
          
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-500 mb-2">
            TASTE EXPLORATION
          </span>
          <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${textColor}`}>
            The Flavor Profile
          </h2>
          <p className={`mt-4 text-base ${subTextColor} max-w-xl`}>
            A scientific look inside your favorite fizzy can. Each recipe is balanced to hit the maximum refreshment point.
          </p>

          {/* 3 Grid Card Highlights */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activeFlavor.features.map((feat, idx) => (
              <div key={idx} className={`p-5 rounded-2xl ${cardBg} hover:translate-y-[-4px] transition-all duration-300`}>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {getIcon(feat.icon)}
                </div>
                <h3 className={`text-sm font-black uppercase tracking-wide ${textColor}`}>
                  {feat.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Compare recipes and detail nutrition indicators */}
          <div className={`mt-6 p-6 rounded-3xl ${cardBg}`}>
            <h4 className={`text-sm font-black uppercase tracking-widest mb-4 ${textColor}`}>
              NUTRITION COMPARISON MATRIX
            </h4>
            
            <div className="space-y-4">
              {/* Ingredient Sweetener slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className={subTextColor}>Sweetener Intensity</span>
                  <span className={textColor}>
                    {activeFlavor.id === 'classic' ? 'High Fructose Corn Syrup' : isZero ? 'Aspartame + Ace-K' : 'Sucralose Blend'}
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${isZero ? 'bg-red-500 w-[95%]' : isDiet ? 'bg-blue-400 w-[70%]' : 'bg-blue-600 w-[85%]'}`}
                  ></div>
                </div>
              </div>

              {/* Carbonation Carbonic Bite slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className={subTextColor}>Carbonic Bite (Fizz)</span>
                  <span className={textColor}>
                    {activeFlavor.id === 'classic' ? 'Aggressive' : isZero ? 'Maximum' : 'Crisp & Smooth'}
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${isZero ? 'bg-red-500 w-[100%]' : isDiet ? 'bg-blue-400 w-[80%]' : 'bg-blue-600 w-[90%]'}`}
                  ></div>
                </div>
              </div>

              {/* Caffeine profile */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className={subTextColor}>Caffeine Boost</span>
                  <span className={textColor}>
                    {activeFlavor.nutrition.caffeine}
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${isZero ? 'bg-red-500 w-[85%]' : isDiet ? 'bg-blue-400 w-[50%]' : 'bg-blue-600 w-[55%]'}`}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick stats footer inside comparison card */}
            <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="block text-zinc-400 uppercase tracking-widest font-semibold">Ingredients Core</span>
                <span className={`font-bold ${textColor}`}>
                  {activeFlavor.id === 'classic' ? 'Phosphoric Acid, Cola Nut' : isZero ? 'Panax Ginseng Root, Caramel' : 'Citric Extract, Smooth Cola'}
                </span>
              </div>
              <div>
                <span className="block text-zinc-400 uppercase tracking-widest font-semibold">Dietary Status</span>
                <span className={`font-bold ${textColor}`}>
                  {activeFlavor.id === 'classic' ? 'Standard Sweet' : isZero ? 'Keto Friendly / Vegan' : 'Gluten-Free / Zero Sugar'}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
