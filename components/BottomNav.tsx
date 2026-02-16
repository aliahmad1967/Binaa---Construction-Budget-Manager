
import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: Screen.HOME, label: 'الرئيسية', icon: 'home' },
    { id: Screen.CONTRACTORS, label: 'المقاولين', icon: 'groups' },
    { id: Screen.REPORTS, label: 'التقارير', icon: 'monitoring' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-around items-center px-4 py-3 z-40">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
              isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span 
              className={`material-symbols-outlined text-2xl ${isActive ? 'fill-1' : ''}`}
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
