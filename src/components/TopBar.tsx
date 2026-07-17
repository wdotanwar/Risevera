import { Search, Bell, Menu, Plus, ShieldCheck, Database, Type } from 'lucide-react';
import { ScreenId } from '../types';

interface TopBarProps {
  onMenuToggle: () => void;
  onNavigate: (screen: ScreenId) => void;
  textSize: 'normal' | 'large' | 'xlarge';
  onChangeTextSize: (size: 'normal' | 'large' | 'xlarge') => void;
  currentUser: { email: string; name: string; plan: string } | null;
}

export default function TopBar({ onMenuToggle, onNavigate, textSize, onChangeTextSize, currentUser }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      {/* Search & Mobile Toggle */}
      <div className="flex items-center gap-4 flex-1">
        <button
          id="mobile-menu-trigger"
          onClick={onMenuToggle}
          className="rounded p-1.5 text-slate-505 hover:bg-slate-100 lg:hidden cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </button>

        {/* Search input simulation */}
        <div className="relative max-w-sm w-full hidden md:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="search"
            placeholder="Search channels, keywords, saved products..."
            className="h-9 w-full rounded-md border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs font-medium text-slate-700 placeholder-slate-400 focus:border-[#F07125] focus:bg-white focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Status indicator pill */}
        <div className="hidden lg:flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 font-mono text-[10px] font-semibold text-[#F07125] border border-orange-100/85">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F07125] animate-pulse" />
          DATA INTEGRITY: VERIFIED
        </div>

        {/* Sync Indicator */}
        <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400 font-normal">
          <Database className="h-3 w-3 text-[#F07125]" />
          <span>Prototype Environment</span>
        </div>

        {/* Notification Icon (Simulated) */}
        <button className="relative rounded-full p-2 text-slate-505 hover:bg-slate-50 hover:text-slate-800 transition-colors">
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-[#F07125]" />
          <Bell className="h-4 w-4" />
        </button>

        {/* Readability Text Sizer */}
        <div className="flex items-center gap-1 border border-slate-200 bg-slate-50 p-1 rounded-lg shrink-0" id="readability-control-panel">
          <Type className="h-3.5 w-3.5 text-slate-400 mx-1 shrink-0" title="Text Readability" />
          <button
            onClick={() => onChangeTextSize('normal')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
              textSize === 'normal'
                ? 'bg-white text-slate-800 shadow-sm font-black'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
            title="Normal text size"
          >
            A
          </button>
          <button
            onClick={() => onChangeTextSize('large')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
              textSize === 'large'
                ? 'bg-white text-[#F07125] shadow-sm font-black'
                : 'text-slate-500 hover:text-[#F07125] font-semibold'
            }`}
            title="Large text size"
          >
            A+
          </button>
          <button
            onClick={() => onChangeTextSize('xlarge')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
              textSize === 'xlarge'
                ? 'bg-white text-[#F07125] shadow-sm font-black'
                : 'text-slate-500 hover:text-[#F07125] font-semibold'
            }`}
            title="Extra Large text size"
          >
            A++
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* User Stats Pill */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="block text-xs font-semibold text-slate-800">{currentUser ? currentUser.name : 'Guest Partner'}</span>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{currentUser ? currentUser.plan : 'Guest Account'}</span>
          </div>

          {/* New Analysis CTA Button */}
          <button
            id="topbar-new-analysis-btn"
            onClick={() => onNavigate('wizard')}
            className="flex items-center gap-1.5 rounded-md bg-[#F07125] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-600 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">New Analysis</span>
          </button>
        </div>
      </div>
    </header>
  );
}
