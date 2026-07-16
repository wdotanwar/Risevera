import {
  LayoutDashboard,
  PlusCircle,
  Bookmark,
  ShieldAlert,
  Globe,
  FileText,
  CreditCard,
  Settings,
  X,
  Sparkles
} from 'lucide-react';
import { ScreenId } from '../types';
import RiseveraLogo from './RiseveraLogo';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onStartSpecificWizard: (type: 'New Product Launch' | 'Channel Rescue' | 'Global Expansion') => void;
}

export default function Sidebar({
  currentScreen,
  onNavigate,
  isOpen,
  onClose,
  onLogout,
  onStartSpecificWizard
}: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard' as ScreenId,
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview & performance'
    },
    {
      id: 'wizard' as ScreenId,
      label: 'New Analysis',
      icon: PlusCircle,
      description: 'Fit evaluation score'
    },
    {
      id: 'saved_analyses' as ScreenId,
      label: 'Saved Analyses',
      icon: Bookmark,
      description: 'Previous studies'
    },
    {
      id: 'channel_rescue' as ScreenId,
      label: 'Channel Rescue',
      icon: ShieldAlert,
      description: 'Fix stuck inventory',
      onClick: () => onStartSpecificWizard('Channel Rescue')
    },
    {
      id: 'global_expansion' as ScreenId,
      label: 'Global Expansion',
      icon: Globe,
      description: 'Launch internationally',
      onClick: () => onStartSpecificWizard('Global Expansion')
    },
    {
      id: 'report_preview' as ScreenId,
      label: 'Reports',
      icon: FileText,
      description: 'Client-ready reports'
    },
    {
      id: 'subscription' as ScreenId,
      label: 'Subscription',
      icon: CreditCard,
      description: 'Usage & tier rates'
    },
    {
      id: 'settings' as ScreenId,
      label: 'Settings',
      icon: Settings,
      description: 'Data integrations'
    },
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    if (item.onClick) {
      item.onClick();
    } else {
      onNavigate(item.id);
    }
    onClose();
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          id="sidebar-overlay"
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0f172a] text-slate-300 border-r border-[#1e293b]/50 transition-transform duration-350 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <RiseveraLogo className="h-8 w-8" isDarkBackground={true} />
            <div>
              <span className="text-xl font-semibold tracking-tight text-white leading-none">RISEVERA</span>
              <span className="block text-[9px] font-bold text-[#F07125] uppercase tracking-widest leading-none mt-0.5">
                Channel Intelligence
              </span>
            </div>
          </div>
          <button
            id="close-sidebar-btn"
            onClick={onClose}
            className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* User Badge */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300">
              MS
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-semibold text-white truncate">Muhammad S.</h4>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#F07125]" />
                Professional Plan
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 px-3 py-6 overflow-y-auto">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold px-3 mb-2">Main Menu</div>
          {menuItems.map((item) => {
            const isSelected = currentScreen === item.id || 
              (item.id === 'wizard' && currentScreen === 'wizard') ||
              (item.id === 'report_preview' && currentScreen === 'report_preview');

            return (
              <button
                id={`sidebar-item-${item.id}`}
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-start gap-3 px-3 py-2 rounded text-left transition-all text-sm cursor-pointer ${
                  isSelected
                    ? 'sidebar-item-active text-white font-medium'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <item.icon className={`h-4 w-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#F07125]' : 'text-slate-400'}`} />
                <div>
                  <span className="block leading-tight">{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Sandbox Note */}
        <div className="p-4 m-4 rounded-lg bg-slate-900/40 border border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
            ⚙️ <span className="font-semibold">Prototype Mode</span>
          </p>
          <p className="text-[9px] text-slate-500 mt-1">
            Simulated engine & scores for testing
          </p>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500 bg-slate-900/10">
          <span>v1.0.4-beta</span>
          <button
            id="sidebar-logout-btn"
            onClick={onLogout}
            className="hover:text-amber-400 transition-colors font-medium cursor-pointer"
          >
            Switch to Landing
          </button>
        </div>
      </aside>
    </>
  );
}
