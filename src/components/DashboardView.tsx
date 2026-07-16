import { ArrowRight, BarChart3, TrendingUp, AlertTriangle, CheckCircle, Shield, Globe, Award, Sparkles } from 'lucide-react';
import { SavedAnalysis, ScreenId } from '../types';

interface DashboardViewProps {
  savedAnalyses: SavedAnalysis[];
  onNavigate: (screen: ScreenId) => void;
  onSelectProductAnalysis: (analysis: SavedAnalysis) => void;
  onStartWizardType: (type: 'New Product Launch' | 'Channel Rescue' | 'Global Expansion') => void;
}

export default function DashboardView({
  savedAnalyses,
  onNavigate,
  onSelectProductAnalysis,
  onStartWizardType
}: DashboardViewProps) {
  // Calculated stats from savedAnalyses
  const strongFitCount = savedAnalyses.filter(a => a.cfs >= 80).length;
  const avgCFS = Math.round(savedAnalyses.reduce((acc, a) => acc + a.cfs, 0) / savedAnalyses.length) || 0;

  // Static mock channels for comparison
  const marketplacePerformance = [
    { name: 'Etsy UK', avgCFS: 82, badge: 'Strong Fit', color: 'emerald', progress: '82%', listings: '4.1k' },
    { name: 'TikTok Shop UK', avgCFS: 79, badge: 'Moderate Fit', color: 'amber', progress: '79%', listings: '8.3k' },
    { name: 'Amazon UK', avgCFS: 72, badge: 'Moderate Fit', color: 'amber', progress: '72%', listings: '24.9k' },
    { name: 'eBay UK', avgCFS: 61, badge: 'Moderate Fit', color: 'amber', progress: '61%', listings: '11.5k' },
    { name: 'OnBuy', avgCFS: 48, badge: 'Weak Fit', color: 'rose', progress: '48%', listings: '1.2k' },
  ];

  return (
    <div id="dashboard-view" className="space-y-8 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Executive Dashboard</h2>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Operational channel readiness intelligence for Muhammad Suleman
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="dash-cta-rescue"
            onClick={() => onStartWizardType('Channel Rescue')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
          >
            <Shield className="h-3.5 w-3.5 text-amber-500" />
            Channel Rescue
          </button>
          <button
            id="dash-cta-global"
            onClick={() => onStartWizardType('Global Expansion')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-[#F07125]" />
            Global Expansion
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Analyses this month</span>
            <Award className="h-4 w-4 text-slate-400" />
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-sans text-slate-900">12 / 80</span>
            <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              Active Professional
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-normal">
            Monthly quota resets in 19 days
          </p>
        </div>

        {/* KPI 2 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Strong Fit Options</span>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{strongFitCount}</span>
            <span className="text-[11px] font-semibold text-emerald-600">Opportunities found</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-normal">
            CFS benchmark &gt;= 80
          </p>
        </div>

        {/* KPI 3 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Average CFS Score</span>
            <BarChart3 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{avgCFS}</span>
            <span className="text-[11px] font-semibold text-amber-500">Moderate Fit average</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-normal">
            Weighted across 5 platform benchmarks
          </p>
        </div>

        {/* KPI 4 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Estimated Avoided Risk</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2.5 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900">£18,500</span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">GBP</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-normal flex items-center gap-1">
            <span>🛡️ Saved listings &amp; storage fees</span>
          </p>
        </div>
      </div>

      {/* Recommended Next Action banner */}
      <div className="rounded-xl bg-slate-900 text-white p-5 border border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10 text-[#F07125] shrink-0 mt-0.5">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#F07125]">Strategic Next Action Recommended</h4>
            <p className="text-sm font-medium mt-1 text-slate-200">
              Run a Global Expansion analysis for products scoring above 80 in the UK.
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Identify potential high-performing segments on Amazon US or TikTok Shop FR to compound initial UK velocity.
            </p>
          </div>
        </div>
        <button
          id="dash-banner-expand-btn"
          onClick={() => onStartWizardType('Global Expansion')}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-[#F07125] text-white hover:bg-orange-600 transition-all font-medium self-end md:self-auto cursor-pointer"
        >
          Expand Globally
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Grid: Recent Analyses & Marketplace Comparison snapshot */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Analyses list */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Marketplace Analyses</h3>
              <p className="text-[11px] text-slate-500">Historical performance score summaries</p>
            </div>
            <button
              id="view-all-analyses-btn"
              onClick={() => onNavigate('saved_analyses')}
              className="text-xs font-semibold text-[#F07125] hover:text-orange-600 hover:underline"
            >
              View Saved List ({savedAnalyses.length})
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-widest text-[9.5px] font-bold">
                  <th className="py-3 px-2 font-bold">Product</th>
                  <th className="py-3 px-2 font-bold">Category</th>
                  <th className="py-3 px-2 font-bold">Best Channel</th>
                  <th className="py-3 px-2 text-center font-bold">CFS Score</th>
                  <th className="py-3 px-2 text-center font-bold">Fit Level</th>
                  <th className="py-3 px-2 text-right font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {savedAnalyses.slice(0, 5).map((analysis) => {
                  let badgeClass = 'cfs-badge-weak';
                  if (analysis.classification === 'Strong Fit') {
                    badgeClass = 'cfs-badge-strong';
                  } else if (analysis.classification === 'Moderate Fit') {
                    badgeClass = 'cfs-badge-moderate';
                  }

                  return (
                    <tr
                      key={analysis.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      <td className="py-3.5 px-2 font-semibold text-slate-950">
                        <button
                          onClick={() => onSelectProductAnalysis(analysis)}
                          className="hover:text-[#F07125] hover:underline font-bold text-left block max-w-[160px] truncate"
                          title="View detailed assessment"
                        >
                          {analysis.product}
                        </button>
                      </td>
                      <td className="py-3.5 px-2 text-slate-500 font-normal">{analysis.category}</td>
                      <td className="py-3.5 px-2">
                        <span className="font-semibold text-slate-700">{analysis.bestChannel}</span>
                        <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                          {analysis.inputData.selectedCountries?.[0] || 'UK'}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-center">
                        <span className={`inline-block font-mono font-bold text-xs ${
                          analysis.cfs >= 80 ? 'text-[#F07125]' : 'text-slate-700'
                        }`}>
                          {analysis.cfs} <span className="text-[10px] text-slate-400">/100</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${badgeClass}`}>
                          {analysis.classification}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right">
                        <button
                          onClick={() => onSelectProductAnalysis(analysis)}
                          className="text-xs font-semibold text-[#F07125] hover:text-orange-600 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                        >
                          Details
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Marketplace Opportunity Snapshot side-card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900">Marketplace Opportunity Map</h3>
            <p className="text-[11px] text-slate-500">Benchmark comparison of target channels</p>
          </div>

          <div className="mt-5 space-y-4">
            {marketplacePerformance.map((item, idx) => {
              const scoreColor = 
                item.avgCFS >= 80 ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 
                item.avgCFS >= 60 ? 'text-amber-600 bg-amber-50 border-amber-100' : 
                'text-rose-600 bg-rose-50 border-rose-100';

              const barColor = 
                item.avgCFS >= 80 ? 'bg-emerald-500' : 
                item.avgCFS >= 60 ? 'bg-amber-500' : 
                'bg-rose-500';

              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">Vol: {item.listings}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${scoreColor}`}>
                        {item.avgCFS} CFS
                      </span>
                    </div>
                  </div>
                  <div className="relative h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full rounded-full ${barColor}`}
                      style={{ width: item.progress }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed font-normal">
            📊 <span className="font-semibold text-slate-700">Insight Note:</span> Demand Signal density on Amazon UK remains unmatched, but Etsy UK exhibits significantly lower competitor intensity profiles for boutique product classifications.
          </div>
        </div>
      </div>
    </div>
  );
}
