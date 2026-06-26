export interface PepsiFlavor {
  id: 'classic' | 'zero' | 'diet';
  name: string;
  tagline: string;
  subtagline: string;
  primaryColor: string;    // CSS-compatible color
  secondaryColor: string;  // Red or secondary brand color
  accentColor: string;     // For buttons and small accents
  bgColor: string;         // Full-screen background color
  textColor: string;       // Primary text
  cardBg: string;          // Inner card background
  shadowColor: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  nutrition: {
    calories: string;
    sugar: string;
    sodium: string;
    caffeine: string;
  };
}

export const PEPSI_FLAVORS: Record<PepsiFlavor['id'], PepsiFlavor> = {
  classic: {
    id: 'classic',
    name: 'Classic Pepsi',
    tagline: 'Bold. Refreshing. Iconic.',
    subtagline: 'The original cola flavor that started it all, delivering that sweet, crisp taste with every sip.',
    primaryColor: '#004B87', // Pepsi Blue
    secondaryColor: '#C9002B', // Pepsi Red
    accentColor: '#FFFFFF',
    bgColor: 'bg-gradient-to-br from-[#003B6D] via-[#004B87] to-[#001D3D]',
    textColor: 'text-white',
    cardBg: 'bg-white/10 backdrop-blur-md border border-white/20',
    shadowColor: 'rgba(0, 75, 135, 0.4)',
    features: [
      { title: 'Legendary Taste', description: 'The unique, original sweet blend with a bold flavor profile.', icon: 'Zap' },
      { title: 'Crisp Refreshment', description: 'Maximum fizz and carbonic bite to quench your deep thirst.', icon: 'Wind' },
      { title: '100% Real Sugar', description: 'Crafted with premium ingredients for the authentic experience.', icon: 'Heart' }
    ],
    nutrition: {
      calories: '150',
      sugar: '41g',
      sodium: '30mg',
      caffeine: '38mg'
    }
  },
  zero: {
    id: 'zero',
    name: 'Pepsi Zero Sugar',
    tagline: 'Zero Sugar. Maximum Taste.',
    subtagline: 'Sleek, bold, and crafted for those who compromise on nothing. All the flavor, none of the sugar.',
    primaryColor: '#0A0A0A', // Matte Black
    secondaryColor: '#C9002B', // Pepsi Red
    accentColor: '#004B87', // Electric Pepsi Blue
    bgColor: 'bg-gradient-to-br from-[#121212] via-[#0A0A0A] to-[#000000]',
    textColor: 'text-white',
    cardBg: 'bg-zinc-900/40 backdrop-blur-md border border-zinc-800',
    shadowColor: 'rgba(199, 0, 43, 0.25)',
    features: [
      { title: 'Zero Sugar', description: 'All the classic bold Pepsi taste, with absolutely zero calories or sugar.', icon: 'Sparkles' },
      { title: 'Ginseng Infused', description: 'Enhanced with a touch of ginseng for that clean, focused edge.', icon: 'Activity' },
      { title: 'Sleek Aesthetic', description: 'A bold, premium matte black look that stands out in any crowd.', icon: 'Flame' }
    ],
    nutrition: {
      calories: '0',
      sugar: '0g',
      sodium: '40mg',
      caffeine: '69mg'
    }
  },
  diet: {
    id: 'diet',
    name: 'Diet Pepsi',
    tagline: 'Light. Crisp. Refreshing.',
    subtagline: 'Crisp, guilt-free carbonation with a lighter taste profile. Refreshment that keeps you feeling light.',
    primaryColor: '#8C9BB0', // Metallic Silver/Grey
    secondaryColor: '#004B87', // Pepsi Blue
    accentColor: '#C9002B', // Pepsi Red
    bgColor: 'bg-gradient-to-br from-[#D9E2EC] via-[#BCCCDC] to-[#829AB1]',
    textColor: 'text-slate-900',
    cardBg: 'bg-white/40 backdrop-blur-md border border-white/60',
    shadowColor: 'rgba(130, 154, 177, 0.4)',
    features: [
      { title: 'Light & Crisp', description: 'A sparkling, lighter cola sensation with a uniquely smooth finish.', icon: 'Feather' },
      { title: 'Guilt-Free Sip', description: 'Zero sugar and zero carbs so you can stay refreshed and light.', icon: 'Check' },
      { title: 'Aspartame Free', description: 'Smooth, clean recipe option designed for your refreshing lifestyle.', icon: 'Shield' }
    ],
    nutrition: {
      calories: '0',
      sugar: '0g',
      sodium: '35mg',
      caffeine: '35mg'
    }
  }
};
