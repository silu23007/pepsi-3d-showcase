import { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { PepsiFlavor } from '../types';

interface NavigationProps {
  activeFlavor: PepsiFlavor;
  onSelectFlavor: (id: PepsiFlavor['id']) => void;
}

export function Navigation({ activeFlavor, onSelectFlavor }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Dynamic branding text/accent color
  const isDiet = activeFlavor.id === 'diet';
  const navTextColor = isDiet ? 'text-slate-800' : 'text-white';
  const logoColor = activeFlavor.id === 'zero' ? 'text-red-500' : 'text-blue-400';
  const btnBg = activeFlavor.id === 'zero' ? 'bg-red-600 hover:bg-red-700' : activeFlavor.id === 'diet' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white text-blue-900 hover:bg-blue-50';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 backdrop-blur-sm bg-black/10`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Pepsi Logo & Branding */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/40">
            <div className="absolute top-0 w-full h-1/2 bg-[#C9002B]"></div>
            <div className="absolute bottom-0 w-full h-1/2 bg-[#004B87]"></div>
            <div className="absolute w-full h-[6px] bg-white rotate-[-30deg] z-10"></div>
          </div>
          <span className={`text-2xl font-black tracking-tighter uppercase ${navTextColor}`}>
            PEPSI<span className={`text-xs ml-1 font-bold ${logoColor}`}>3D</span>
          </span>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => { onSelectFlavor('classic'); }} className={`text-sm font-semibold tracking-wider transition-colors hover:opacity-80 ${navTextColor} ${activeFlavor.id === 'classic' ? 'underline decoration-2 underline-offset-4' : 'opacity-60'}`}>
            Classic
          </button>
          <button onClick={() => { onSelectFlavor('zero'); }} className={`text-sm font-semibold tracking-wider transition-colors hover:opacity-80 ${navTextColor} ${activeFlavor.id === 'zero' ? 'underline decoration-2 underline-offset-4' : 'opacity-60'}`}>
            Zero Sugar
          </button>
          <button onClick={() => { onSelectFlavor('diet'); }} className={`text-sm font-semibold tracking-wider transition-colors hover:opacity-80 ${navTextColor} ${activeFlavor.id === 'diet' ? 'underline decoration-2 underline-offset-4' : 'opacity-60'}`}>
            Diet
          </button>
          <span className="w-px h-6 bg-white/20"></span>
          <a href="#features" className={`text-sm font-medium tracking-wide opacity-60 hover:opacity-100 transition-opacity ${navTextColor}`}>
            Highlights
          </a>
          <a href="#showcase" className={`text-sm font-medium tracking-wide opacity-60 hover:opacity-100 transition-opacity ${navTextColor}`}>
            Nutrition
          </a>
        </div>

        {/* Buy Now CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => {
              const url = "https://www.pepsi.com";
              window.open ? window.open(url, '_blank') : window.location.href = url;
            }}
            className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg transition-transform hover:scale-105 ${btnBg}`}
          >
            <ShoppingBag className="w-4 h-4" />
            Buy Now
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-md ${navTextColor} focus:outline-none`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-lg border-b border-white/10 py-6 px-6 flex flex-col gap-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Select Flavor</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { onSelectFlavor('classic'); setIsOpen(false); }}
                className={`py-2 px-3 text-xs rounded-lg font-bold border transition-colors ${activeFlavor.id === 'classic' ? 'bg-[#004B87] text-white border-transparent' : 'bg-zinc-900 text-zinc-300 border-zinc-800'}`}
              >
                Classic
              </button>
              <button
                onClick={() => { onSelectFlavor('zero'); setIsOpen(false); }}
                className={`py-2 px-3 text-xs rounded-lg font-bold border transition-colors ${activeFlavor.id === 'zero' ? 'bg-[#c9002b] text-white border-transparent' : 'bg-zinc-900 text-zinc-300 border-zinc-800'}`}
              >
                Zero Sugar
              </button>
              <button
                onClick={() => { onSelectFlavor('diet'); setIsOpen(false); }}
                className={`py-2 px-3 text-xs rounded-lg font-bold border transition-colors ${activeFlavor.id === 'diet' ? 'bg-zinc-200 text-black border-transparent' : 'bg-zinc-900 text-zinc-300 border-zinc-800'}`}
              >
                Diet
              </button>
            </div>
          </div>

          <div className="h-px bg-zinc-800"></div>

          <div className="flex flex-col gap-4">
            <a href="#features" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors">
              Highlights
            </a>
            <a href="#showcase" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors">
              Nutrition Facts
            </a>
          </div>

          <button
            onClick={() => {
              const url = "https://www.pepsi.com";
              window.open ? window.open(url, '_blank') : window.location.href = url;
            }}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            Buy Now
          </button>
        </div>
      )}
    </nav>
  );
}
