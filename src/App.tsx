import { useState, useEffect, useRef } from 'react';
import { PEPSI_FLAVORS, PepsiFlavor } from './types';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { FlavorShowcaseSection } from './components/FlavorShowcaseSection';
import { FeatureHighlightsSection } from './components/FeatureHighlightsSection';
import { PepsiScene } from './components/PepsiScene';

export default function App() {
  const [activeFlavor, setActiveFlavor] = useState<PepsiFlavor>(PEPSI_FLAVORS.classic);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const isScrollingRef = useRef(false);

  // 1. Monitor Page Scroll Progress & Automatically Switch Theme
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalScrollableHeight = document.documentElement.scrollHeight - windowHeight;
      
      // Calculate normalized scroll percentage (0 to 1)
      if (totalScrollableHeight > 0) {
        setScrollProgress(scrollY / totalScrollableHeight);
      }

      // Automatically transition active flavor depending on scrolled segment
      // Section 1: Classic (0 to 45% scroll)
      // Section 2: Zero Sugar (45% to 80% scroll)
      // Section 3: Diet (80% to 100% scroll)
      if (!isScrollingRef.current) {
        if (scrollY < windowHeight * 0.45) {
          if (activeFlavor.id !== 'classic') setActiveFlavor(PEPSI_FLAVORS.classic);
        } else if (scrollY >= windowHeight * 0.45 && scrollY < windowHeight * 1.45) {
          if (activeFlavor.id !== 'zero') setActiveFlavor(PEPSI_FLAVORS.zero);
        } else {
          if (activeFlavor.id !== 'diet') setActiveFlavor(PEPSI_FLAVORS.diet);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeFlavor]);

  // 2. Capture Normalized Mouse Coordinates for 3D Floating/Reacting Loop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize values between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouseCoords({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. Smoothly scroll to target section when a flavor is selected
  const handleSelectFlavor = (id: PepsiFlavor['id']) => {
    isScrollingRef.current = true;
    setActiveFlavor(PEPSI_FLAVORS[id]);

    const viewportHeight = window.innerHeight;
    let targetScroll = 0;
    
    if (id === 'classic') targetScroll = 0;
    if (id === 'zero') targetScroll = viewportHeight;
    if (id === 'diet') targetScroll = viewportHeight * 2;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });

    // Release the manual scrolling override once smooth scroll completes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  // Determine full page background gradient styles
  const bgGradientClass = activeFlavor.bgColor;

  return (
    <div id="pepsi-app" className={`min-h-screen w-full relative transition-all duration-1000 ease-in-out overflow-x-hidden ${bgGradientClass}`}>
      {/* Dynamic Floating Circular Ambient Orbs in the background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl mix-blend-screen pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-3xl mix-blend-screen pointer-events-none animate-bounce-slow"></div>

      {/* FIXED 3D CANVAS PORTAL: Sits perfectly behind HTML texts but handles coordinates */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-20">
        <PepsiScene
          activeFlavor={activeFlavor}
          scrollProgress={scrollProgress}
          mouseCoords={mouseCoords}
        />
      </div>

      {/* HTML OVERLAYS & CONTENT SECTIONS (z-index 10 or 30 to make button clicks fully active) */}
      <div className="relative z-30 w-full">
        {/* Transparent Header Navigation */}
        <Navigation activeFlavor={activeFlavor} onSelectFlavor={handleSelectFlavor} />

        {/* Section 1: Hero */}
        <HeroSection activeFlavor={activeFlavor} onSelectFlavor={handleSelectFlavor} />

        {/* Section 2: Flavor Showcase & Nutrition Specs */}
        <FlavorShowcaseSection activeFlavor={activeFlavor} />

        {/* Section 3: Feature Highlights & Bento Specifications */}
        <FeatureHighlightsSection activeFlavor={activeFlavor} />

        {/* Elegant Footer */}
        <footer className="w-full py-12 px-6 border-t border-white/5 bg-black/40 text-center text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="font-black text-white tracking-tighter">PEPSI</span>
              <span className="opacity-50">| 3D CRAFT SHOWCASE</span>
            </div>
            <p className="opacity-70">
              © 2026 PepsiCo, Inc. Built for demonstration using React 19, R3F, and Tailwind CSS.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
