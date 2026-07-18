import { useState } from 'react';
import { Database, ShieldCheck, User, Building, Sliders, Trash, Check, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';
import { ScreenId } from '../types';
import { DATA_SOURCES_INFO } from '../data';

interface SettingsViewProps {
  onNavigate: (screen: ScreenId) => void;
  textSize: 'normal' | 'large' | 'xlarge';
  onChangeTextSize: (size: 'normal' | 'large' | 'xlarge') => void;
}

export default function SettingsView({ onNavigate, textSize, onChangeTextSize }: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState<'sources' | 'profile' | 'company' | 'weights' | 'compliance'>('sources');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Variable weights state (Scoring Preferences)
  const [weights, setWeights] = useState({
    DSS: 30,
    CIS: 25,
    PVI: 20,
    PSF: 15,
    MERS: 10
  });

  const handleWeightChange = (variable: keyof typeof weights, val: number) => {
    setWeights(prev => ({
      ...prev,
      [variable]: val
    }));
  };

  const handleSaveWeights = () => {
    const total = weights.DSS + weights.CIS + weights.PVI + weights.PSF + weights.MERS;
    if (total !== 100) {
      alert(`Scoring weights must sum to exactly 100%. Current sum: ${total}%`);
      return;
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div id="settings-view" className="space-y-6 max-w-4xl mx-auto animate-fade-in relative">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">System Settings</h2>
        <p className="text-xs text-slate-500 mt-0.5">Configure API integrations, client details, scoring weights, and compliance frameworks</p>
      </div>

      {/* Tabs navigation menu bar */}
      <div className="flex border-b border-slate-200 overflow-x-auto text-xs whitespace-nowrap gap-1">
        <button
          id="setting-tab-sources"
          onClick={() => setActiveTab('sources')}
          className={`px-4 py-2.5 font-semibold border-b-2 flex items-center gap-1.5 cursor-pointer leading-none transition-all ${
            activeTab === 'sources'
              ? 'border-[#F07125] text-[#F07125]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Database className="h-4 w-4" />
          Data Sources (APIs)
        </button>

        <button
          id="setting-tab-profile"
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 font-semibold border-b-2 flex items-center gap-1.5 cursor-pointer leading-none transition-all ${
            activeTab === 'profile'
              ? 'border-[#F07125] text-[#F07125]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="h-4 w-4" />
          Profile Details
        </button>

        <button
          id="setting-tab-company"
          onClick={() => setActiveTab('company')}
          className={`px-4 py-2.5 font-semibold border-b-2 flex items-center gap-1.5 cursor-pointer leading-none transition-all ${
            activeTab === 'company'
              ? 'border-[#F07125] text-[#F07125]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building className="h-4 w-4" />
          Company Information
        </button>

        <button
          id="setting-tab-weights"
          onClick={() => setActiveTab('weights')}
          className={`px-4 py-2.5 font-semibold border-b-2 flex items-center gap-1.5 cursor-pointer leading-none transition-all ${
            activeTab === 'weights'
              ? 'border-[#F07125] text-[#F07125]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sliders className="h-4 w-4" />
          Scoring Preferences (Formula)
        </button>

        <button
          id="setting-tab-compliance"
          onClick={() => setActiveTab('compliance')}
          className={`px-4 py-2.5 font-semibold border-b-2 flex items-center gap-1.5 cursor-pointer leading-none transition-all ${
            activeTab === 'compliance'
              ? 'border-[#F07125] text-[#F07125]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          Privacy &amp; Compliance
        </button>
      </div>

      {/* Save Toast feedback indicator */}
      {saveSuccess && (
        <div className="rounded bg-orange-50 border border-orange-200 p-3.5 text-xs text-[#F07125] font-semibold mb-4 animate-pulse">
          Changes committed successfully to prototype local parameters.
        </div>
      )}

      {/* ACTIVE TAB CONTENTS */}

      {/* 1. DATA SOURCES PAGE */}
      {activeTab === 'sources' && (
        <div id="settings-tab-sources-content" className="space-y-6">
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 text-xs text-slate-700 leading-normal font-normal">
            ⚙️ <span className="font-bold text-slate-800">API Sandbox Notice:</span> In this prototype environment, APIs run in a sandboxed, pre-cached demo simulation containing verified local feeds. Live Seller Partner integrations run natively on production nodes.
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {DATA_SOURCES_INFO.map((source) => (
              <div key={source.name} className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 shadow-sm relative">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{source.name}</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Last Sync: {source.lastSync}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9.5px] font-black tracking-wider uppercase bg-orange-50 text-[#F07125] border border-orange-100 font-mono">
                    {source.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  <div>
                    <span className="block text-[9.5px] uppercase text-slate-400 font-bold">Data Elements Utilized</span>
                    <p className="text-slate-655 font-normal leading-relaxed text-[11px] mt-1">{source.dataTypes}</p>
                  </div>
                  <div>
                    <span className="block text-[9.5px] uppercase text-slate-400 font-bold">Variables Fed</span>
                    <div className="flex flex-wrap gap-1 mt-1 font-mono text-[9px] font-bold">
                      {source.feeds.map(f => {
                        let text = 'DSS (30%)';
                        if (f === 'CIS') text = 'CIS (25%)';
                        if (f === 'PVI') text = 'PVI (20%)';
                        if (f === 'PSF') text = 'PSF (15%)';
                        return (
                          <span key={f} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                            {text}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-50">
                  <button
                    onClick={() => alert(`API token refresh dispatched key verification for ${source.name} (Simulation)`)}
                    className="text-[10px] font-semibold text-slate-502 hover:text-[#F07125] inline-flex items-center gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Force Sync API
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. PROFILE DETAILS TAB */}
      {activeTab === 'profile' && (
        <div id="settings-tab-profile-content" className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm text-xs md:col-span-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-sidebar-100 pb-2">Profile Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Account Owner *</label>
              <input type="text" defaultValue="Muhammad Suleman" className="w-full rounded border border-slate-200 text-xs p-2 focus:border-[#F07125] focus:outline-none" />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Email Address *</label>
              <input type="email" defaultValue="wdotanwar@gmail.com" className="w-full rounded border border-slate-200 text-xs p-2 focus:border-[#F07125] focus:outline-none" />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-slate-705">Mobile Number</label>
              <input type="text" defaultValue="+44 7700 900077" className="w-full rounded border border-slate-200 text-xs p-2 focus:border-[#F07125] focus:outline-none" />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-slate-705">Current Login Passcode</label>
              <input type="password" placeholder="••••••••••••••" className="w-full rounded border border-slate-200 text-xs p-2 focus:border-[#F07125] focus:outline-none" />
            </div>
          </div>

          {/* Readability Preferences */}
          <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Display &amp; Readability Preferences</h4>
            <p className="text-slate-500 text-[11px] font-normal leading-relaxed">
              Adjust the platform's global text sizing to match your visual comfort and reading requirements. Changes will apply immediately across all views.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              <span className="font-bold text-slate-700 text-[11.5px] shrink-0">Interface Scaling Rate:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 w-fit">
                <button
                  type="button"
                  onClick={() => onChangeTextSize('normal')}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    textSize === 'normal'
                      ? 'bg-white text-slate-800 shadow-sm font-extrabold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Normal (100%)
                </button>
                <button
                  type="button"
                  onClick={() => onChangeTextSize('large')}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    textSize === 'large'
                      ? 'bg-white text-[#F07125] shadow-sm font-extrabold'
                      : 'text-slate-500 hover:text-[#F07125]'
                  }`}
                >
                  Large (115%)
                </button>
                <button
                  type="button"
                  onClick={() => onChangeTextSize('xlarge')}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    textSize === 'xlarge'
                      ? 'bg-white text-[#F07125] shadow-sm font-extrabold'
                      : 'text-slate-500 hover:text-[#F07125]'
                  }`}
                >
                  Extra Large (130%)
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => { setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 3000); }}
              className="px-4 py-2 bg-slate-950 hover:bg-[#F07125] text-white font-[#F07125] font-semibold rounded text-xs transition-colors"
            >
              Commit Changes
            </button>
          </div>
        </div>
      )}

      {/* 3. COMPANY TAB */}
      {activeTab === 'company' && (
        <div id="settings-tab-company-content" className="bg-white rounded-xl border border-slate-202 p-6 space-y-4 shadow-sm text-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Company Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Registered Corporate Name</label>
              <input type="text" defaultValue="Suleman E-Commerce Ltd" className="w-full rounded border border-slate-200 text-xs p-2 focus:border-[#F07125] focus:outline-none" />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Companies House ID No.</label>
              <input type="text" defaultValue="14073352" className="w-full rounded border border-slate-205 text-xs p-2 focus:border-[#F07125]" />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">HMRC VAT ID</label>
              <input type="text" defaultValue="GB 388 9005 11" className="w-full rounded border border-slate-205 text-xs p-2 focus:border-[#F07125]" />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Primary Dispatch Depot Postcode</label>
              <input type="text" defaultValue="M1 1AE (Manchester)" className="w-full rounded border border-slate-205 text-xs p-2 focus:border-[#F07125]" />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => { setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 3000); }}
              className="px-4 py-2 bg-slate-950 hover:bg-[#F07125] text-white font-semibold rounded text-xs transition-colors"
            >
              Commit Changes
            </button>
          </div>
        </div>
      )}

      {/* 4. SCORING PREFERENCES (Formula weights customization) */}
      {activeTab === 'weights' && (
        <div id="settings-tab-weights-content" className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm text-xs font-normal">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Scoring Preferences WEIGHTS</h3>
            <p className="text-slate-450 mt-1 max-w-xl text-[11px] leading-relaxed">
              Customize the variable coefficients of the Channel Fit Score (CFS) decision model. The total sum of weights must equal precisely 100%.
            </p>
          </div>

          <div className="space-y-4 max-w-md">
            {/* DSS */}
            <div className="space-y-1">
              <div className="flex justify-between items-center font-semibold">
                <span className="text-slate-700">Demand Signal Score (DSS) Weight</span>
                <span className="font-mono text-[#F07125] text-[11.5px]">{weights.DSS}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={weights.DSS}
                onChange={(e) => handleWeightChange('DSS', Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#F07125]"
              />
            </div>

            {/* CIS */}
            <div className="space-y-1">
              <div className="flex justify-between items-center font-semibold">
                <span className="text-slate-700">Competition Intensity Score (CIS) Weight</span>
                <span className="font-mono text-[#F07125] text-[11.5px]">{weights.CIS}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={weights.CIS}
                onChange={(e) => handleWeightChange('CIS', Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#F07125]"
              />
            </div>

            {/* PVI */}
            <div className="space-y-1">
              <div className="flex justify-between items-center font-semibold">
                <span className="text-slate-700">Price Viability Index (PVI) Weight</span>
                <span className="font-mono text-[#F07125] text-[11.5px]">{weights.PVI}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={weights.PVI}
                onChange={(e) => handleWeightChange('PVI', Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#F07125]"
              />
            </div>

            {/* PSF */}
            <div className="space-y-1">
              <div className="flex justify-between items-center font-semibold">
                <span className="text-slate-700">Platform Suitability Factor (PSF) Weight</span>
                <span className="font-mono text-[#F07125] text-[11.5px]">{weights.PSF}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={weights.PSF}
                onChange={(e) => handleWeightChange('PSF', Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#F07125]"
              />
            </div>

            {/* MERS */}
            <div className="space-y-1">
              <div className="flex justify-between items-center font-semibold">
                <span className="text-slate-700">Market Entry Risk Score (MERS) Weight</span>
                <span className="font-mono text-[#F07125] text-[11.5px]">{weights.MERS}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={weights.MERS}
                onChange={(e) => handleWeightChange('MERS', Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#F07125]"
              />
            </div>

            {/* Check Sum */}
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Total Check Sum:</span>
              <span className={`font-bold ${
                (weights.DSS + weights.CIS + weights.PVI + weights.PSF + weights.MERS) === 100 ? 'text-[#F07125]' : 'text-rose-500'
              }`}>
                {weights.DSS + weights.CIS + weights.PVI + weights.PSF + weights.MERS}% / 100%
              </span>
            </div>
            
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveWeights}
                className="px-4 py-2 bg-slate-950 font-bold hover:bg-orange-600 text-white rounded cursor-pointer text-xs"
              >
                Change Formula Weights
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. PRIVACY & COMPLIANCE SECTION */}
      {activeTab === 'compliance' && (
        <div id="settings-tab-compliance-content" className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm text-xs font-normal">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Privacy &amp; Compliance</h3>
            <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#F07125] bg-orange-50 rounded border border-orange-100">
              verified conformant
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg space-y-2">
              <span className="font-bold text-slate-800 text-[11px] block">🛡️ UK GDPR-ready architecture</span>
              <p className="text-slate-500 leading-relaxed text-[10.5px]">
                RISEVERA GLOBAL protects secret credentials via highly secured tokens logic. Customer transaction logs remain completely localized in the UK.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg space-y-2">
              <span className="font-bold text-slate-800 text-[11px] block">Minimal seller data storage</span>
              <p className="text-slate-500 leading-relaxed text-[10.5px]">
                Only product metadata and targeted dimensions are indexed to satisfy calculation metrics, safely locking private sales databases.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg space-y-2">
              <span className="font-bold text-slate-800 text-[11px] block">Report-level data retention</span>
              <p className="text-slate-500 leading-relaxed text-[10.5px]">
                Analysis files remain fully exportable under custom client configurations or subjected to automatic deletion schedules.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
            <button
              onClick={() => alert("Downloading raw JSON profile log for audit compilation (Simulation)")}
              className="p-2 border border-slate-201 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 rounded transition-colors"
            >
              Export User Personal Data (.JSON)
            </button>

            <button
              id="settings-delete-account-btn"
              onClick={() => {
                if (confirm("Are you absolutely sure you want to request account erasure? This irreversible step removes all saved reports and synchronized API connections.")) {
                  alert("Account erasure request submitted. Redirecting to landing screen.");
                  onNavigate('landing');
                }
              }}
              className="p-2 bg-rose-50 border border-rose-100 hover:bg-rose-100 hover:text-rose-900 text-xs font-bold text-rose-700 rounded transition-colors"
            >
              Delete Account &amp; Erasure Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
