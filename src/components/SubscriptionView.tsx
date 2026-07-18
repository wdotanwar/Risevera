import { useState } from 'react';
import { CreditCard, Check, Sparkles, AlertCircle, PlusCircle, Users, Milestone, ShieldCheck, HeartPulse } from 'lucide-react';
import { ScreenId } from '../types';

interface SubscriptionViewProps {
  onNavigate: (screen: ScreenId) => void;
}

export default function SubscriptionView({ onNavigate }: SubscriptionViewProps) {
  const [activeTier, setActiveTier] = useState<'Starter' | 'Professional' | 'Agency'>('Professional');
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const tiers = [
    {
      id: 'Starter' as const,
      name: 'Starter',
      price: '£99',
      billing: 'per month',
      description: 'Perfect for solo founders seeking basic evaluation coordinates.',
      features: [
        '1 user account license',
        '20 product analyses / month (soft-cap)',
        '4 core UK marketplaces',
        'Amazon UK, eBay UK, TikTok Shop UK, OnBuy',
        'Standard PDF report output structures',
        'Self-service documentation support desk'
      ],
      color: 'slate-500',
      cta: 'Downgrade to Starter'
    },
    {
      id: 'Professional' as const,
      name: 'Professional',
      price: '£149',
      billing: 'per month',
      description: 'The optimum operational suite for SME e-commerce sellers.',
      features: [
        '3 user accounts licenses',
        'Unlimited product analyses calculations',
        'All 5 UK marketplaces including Etsy UK',
        'International scoring (Amazon US, DE, FR, CA, AU)',
        'Comprehensive 10-node decision reports output',
        'Business hours ticketing help desks'
      ],
      color: 'orange-500',
      cta: 'Current Active Plan',
      badge: 'RECOMMENDED'
    },
    {
      id: 'Agency' as const,
      name: 'Agency',
      price: '£249',
      billing: 'per month',
      description: 'Fully branded intelligence tools for multiple merchant catalogs.',
      features: [
        '10 user accounts licenses',
        'Complete white-labeled reporting layouts',
        'Full REST API credentials access',
        'Dedicated account strategy consultant',
        'Full global and localized marketplace profiles',
        'Priority 2-hour SLA response guarantees'
      ],
      color: 'slate-900',
      cta: 'Upgrade to Agency'
    }
  ];

  return (
    <div id="subscription-view" className="space-y-8 animate-fade-in relative">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 rounded-lg p-4 bg-slate-900 border border-slate-700 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 max-w-sm animate-bounce">
          <Check className="h-4 w-4 text-[#F07125] stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}
      
      {/* Modals simulation */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full border border-slate-200 shadow-xl space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Invite Team Member</h3>
            <p className="text-xs text-slate-500">Your current Professional tier allows up to 3 seats. You have 2 spots left.</p>
            <input
              type="email"
              placeholder="teammate@company.co.uk"
              className="w-full text-xs p-2.5 border border-slate-200 rounded focus:border-[#F07125] focus:outline-none"
            />
            <div className="flex justify-end gap-2 text-xs">
              <button onClick={() => setShowInviteModal(false)} className="px-3 py-1.5 border border-slate-200 text-slate-500 hover:text-slate-700">Cancel</button>
              <button onClick={() => { setShowInviteModal(false); alert("Team invitation dispatched successfully (simulation)."); }} className="px-3.5 py-1.5 bg-slate-950 text-white font-semibold">Dispatch Invite</button>
            </div>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Billing &amp; Usage Quotas</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage subscription pricing, license seats, and historical billing statements</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold rounded text-slate-700 cursor-pointer"
          >
            <Users className="h-4 w-4" />
            Invite Team Member
          </button>
          <button
            onClick={() => { alert("Redirecting to secured billing stripe dashboard (prototype simulation)."); }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-xs font-semibold rounded text-white cursor-pointer"
          >
            <CreditCard className="h-4 w-4" />
            Manage Billing
          </button>
        </div>
      </div>

      {/* Subscription usage stats section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Current Subscription Allocation</h3>
          <p className="text-base font-bold text-slate-900 mt-1">Professional Plan — £149/month</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-4 text-xs font-semibold">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <span className="block text-slate-400 font-medium text-[10px] uppercase">Seats Dispatched</span>
            <span className="text-lg font-black text-slate-900 block mt-1">1 / 3 Users</span>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-[#F07125] h-full w-1/3" />
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <span className="block text-slate-400 font-medium text-[10px] uppercase">Monthly Calculations</span>
            <span className="text-lg font-black text-slate-900 block mt-1">Unlimited</span>
            <span className="text-[10px] text-[#F07125] block mt-2.5">★ Active calculation pass enabled</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <span className="block text-slate-400 font-medium text-[10px] uppercase">UK Marketplaces</span>
            <span className="text-lg font-black text-slate-900 block mt-1">All 5 Active</span>
            <span className="text-[10px] text-slate-500 block mt-2.5">Etsy UK index node unlocked</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <span className="block text-slate-400 font-medium text-[10px] uppercase">Report Downloads</span>
            <span className="text-lg font-black text-slate-900 block mt-1">8 Exported</span>
            <span className="text-[10px] text-slate-405 block mt-2.5">Professional features active</span>
          </div>
        </div>
      </div>

      {/* Pricing cards grid */}
      <div className="grid gap-6 sm:grid-cols-3">
        {tiers.map((tier) => {
          const isProfessional = tier.id === 'Professional';
          const isCurrent = tier.id === activeTier;

          return (
            <div
              key={tier.id}
              className={`rounded-xl border p-6 bg-white relative flex flex-col justify-between ${
                isProfessional 
                  ? 'border-[#F07125] shadow-md ring-1 ring-[#F07125]/10' 
                  : 'border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              {tier.badge && (
                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#F07125] text-white text-[9px] font-black tracking-widest px-3 py-1 rounded-full uppercase leading-none font-mono">
                  {tier.badge}
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-black text-slate-950 uppercase tracking-wider">{tier.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal mt-1.5 min-h-[40px]">{tier.description}</p>
                </div>

                <div className="flex items-baseline gap-1.5 border-b border-slate-100 pb-4">
                  <span className="text-3xl font-black font-sans text-slate-950">{tier.price}</span>
                  <span className="text-xs text-slate-450 font-normal">{tier.billing}</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-650 font-normal">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex gap-2 items-start leading-relaxed">
                      <Check className="h-4 w-4 text-[#F07125] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-50">
                <button
                  onClick={() => {
                    if (isProfessional) return; 
                    setActiveTier(tier.id);
                    showToast(`Switched active calculated tier to ${tier.name} (Simulation)`);
                  }}
                  className={`w-full text-center py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    isProfessional 
                      ? 'bg-slate-950 text-white hover:bg-orange-600' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isCurrent ? 'Plan Active' : tier.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-500 leading-normal font-normal text-center">
        🔒 All RISEVERA GLOBAL transactions are securely routed through pre-synchronized Stripe merchant integrations. Standard UK VAT indices apply at checkout cycles.
      </div>
    </div>
  );
}
