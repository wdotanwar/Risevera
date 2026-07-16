import { useState } from 'react';
import { ArrowLeft, ArrowRight, FileText, BarChart3, HelpCircle, Check, AlertTriangle, ShieldCheck, ChevronRight, CornerDownRight, Award, Plus, Share2 } from 'lucide-react';
import { SavedAnalysis, MarketplaceScore, ScreenId } from '../types';

interface ResultsViewProps {
  analysis: SavedAnalysis | null;
  scores: MarketplaceScore[];
  onNavigate: (screen: ScreenId) => void;
  onSelectMarketplaceDetail: (mpName: string) => void;
  selectedMarketplaceDetailName: string | null;
}

export default function ResultsView({
  analysis,
  scores,
  onNavigate,
  onSelectMarketplaceDetail,
  selectedMarketplaceDetailName
}: ResultsViewProps) {
  // Fallback if no active analysis has been loaded
  if (!analysis || scores.length === 0) {
    return (
      <div className="py-12 text-center bg-white border border-slate-200 rounded-xl p-8 space-y-4">
        <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto" />
        <h3 className="text-sm font-bold text-slate-900">No Assessment loaded</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Please run a New Product Analysis from the wizard to generate live Channel Fit scores.
        </p>
        <button
          onClick={() => onNavigate('wizard')}
          className="px-4 py-2 bg-slate-950 text-white rounded text-xs font-semibold hover:bg-orange-600 transition-colors"
        >
          Initialize Wizard
        </button>
      </div>
    );
  }

  const bestFit = scores[0]; // Already sorted on wizard calculation

  // Handler to toggle open the Screen 7: Recommendation Detail Page block
  const handleMarketplaceCardClick = (mpName: string) => {
    onSelectMarketplaceDetail(mpName);
  };

  const selectedMpScore = scores.find(s => s.marketplace === selectedMarketplaceDetailName) || bestFit;

  // Render detail view (Screen 7)
  if (selectedMarketplaceDetailName) {
    // Generate tailored texts depending on the selected marketplace
    let executiveRecText = `Launch first on ${selectedMpScore.marketplace}. Use premium category bundling and design-led pricing offsets.`;
    let dssDetail = `Steady demand index with high search velocity relative to standard catalogs.`;
    let cisDetail = `Saturated but navigable density. High organic positioning opportunities available.`;
    let pviDetail = `Excellent price viability score. Profit metrics fit healthy target thresholds after commission deductions.`;
    let psfDetail = `Target demographics align accurately with the buyer profile of this channel.`;
    let mersDetail = `Minimal active entry hurdles or compliance risk indicators detected.`;

    if (selectedMpScore.marketplace.includes('Etsy')) {
      executiveRecText = "Launch first on Etsy UK. Use premium gifting positioning and bundle-led pricing. Avoid positioning as a commodity baby product.";
      dssDetail = "Healthy category demand with stable seasonal interest.";
      cisDetail = "Competition exists, but direct product overlap is lower than Amazon UK.";
      pviDetail = "Target price of £19.99 sits within viable buyer range after estimated fees.";
      psfDetail = "Product fits Etsy’s gifting, design-led, parent-focused buying behaviour.";
      mersDetail = "Moderate fulfilment and listing complexity. No major cross-border issue for UK launch.";
    } else if (selectedMpScore.marketplace.includes('Amazon')) {
      executiveRecText = "Maximize volume footprint but delay initial inventory launch until a comprehensive PPC budget and 25-review launchpad is fully provisioned.";
      dssDetail = "Extremely high query volume. Outstanding commercial scale but expensive visibility index.";
      cisDetail = "Brutal competitive density. Heavy reliance on global sponsored ads bidding.";
      pviDetail = "FBA fees, referral charges, and PPC bids heavily squeeze net unit margin.";
      psfDetail = "Commodity buying behavior. Buyers seek rapid next-day delivery and discount matching.";
      mersDetail = "Strict category gated compliance rules and brand registry checks mandated.";
    } else if (selectedMpScore.marketplace.includes('TikTok')) {
      executiveRecText = "Perfect for collaborative content. Partner directly with TikTok creators for rapid short-video traction on UK feeds.";
      dssDetail = "Extremely volatile. Viral loops can exceed standard inventory bounds overnight.";
      cisDetail = "Medium competitor thickness. Driven primarily by content virality than text search.";
      pviDetail = "Heavily reliant on affiliate commission outlays to influencers (10-15%).";
      psfDetail = "High impulse buy tendency. Perfect for millennial parents and gift-givers.";
      mersDetail = "High returns rate risk on open packages. Influencer coordination is required.";
    } else if (selectedMpScore.marketplace.includes('eBay')) {
      executiveRecText = "Recommended strictly as a secondary dispatch node. List as dual-pack to elevate the low standard average order value.";
      dssDetail = "Stable, flat search interest. Low correlation to seasonal gift spikes.";
      cisDetail = "Highly active price-undercutting Chinese sellers dominate direct keyword results.";
      pviDetail = "Price ceiling on eBay UK limits premium pricing opportunities for eco-materials.";
      psfDetail = "Bargain-driven buying pattern. Low loyalty with focus on free Royal Mail parameters.";
      mersDetail = "Simple listing conditions. Zero gatekeep rules.";
    }

    const actionPlans = selectedMpScore.marketplace.includes('Etsy') ? [
      "Launch on Etsy UK first with premium lifestyle imagery",
      "Build 3 distinct listing variations focusing on parent gifting and eco-friendly keywords",
      "Test bundle pricing at £19.99 and £24.99 with free UK domestic delivery",
      "Use parent gifting keywords & prepare high-quality lifestyle photography",
      "Delay Amazon UK until review and PPC budget are secure"
    ] : [
      `Deploy pilot listings with exact category keyword descriptors on ${selectedMpScore.marketplace}`,
      "Set aggressive promotional trial campaign limits to build first 10 organic review metrics",
      "Monitor daily listing click-through conversion closely for pricing elasticity shifts",
      "Ensure local warehouse can dispatch within 24 hours of notification syncs"
    ];

    const riskNotes = selectedMpScore.marketplace.includes('Etsy') ? [
      "Avoid overstocking before first 30-day signal is calculated",
      "Monitor refund rates closely for fragile wood components",
      "Avoid competing directly on lowest price — convey artisan workmanship instead"
    ] : [
      "Avoid high ad spend outlays prior to stabilizing conversion rate indices above 2.5%",
      "Expect high review fatigue without structured follow-up sequences",
      "Strict merchant standards require consistent shipping lead-times"
    ];

    return (
      <div id="recommendation-detail-view" className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectMarketplaceDetail(null)}
            className="p-1 px-2.5 rounded border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Results List
          </button>
          <div className="h-4 w-px bg-slate-350" />
          <span className="text-xs text-slate-400 font-mono">CFS_DEEP_DIVE: {selectedMpScore.marketplace}</span>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Why {selectedMpScore.marketplace} is the strongest fit
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed criteria-level analysis for {analysis.product}
          </p>
        </div>

        {/* Executive Recommendation section */}
        <div className="bg-[#1D2F5C] text-orange-50 rounded-xl p-6 border border-[#1D2F5C]/80 shadow-sm">
          <h3 className="text-xs uppercase tracking-widest font-mono text-[#F07125] font-bold">
            Executive Recommendation
          </h3>
          <p className="text-sm sm:text-base font-semibold mt-2.5 leading-relaxed">
            “{executiveRecText}”
          </p>
        </div>

        {/* Scores Grid */}
        <div className="grid gap-4 sm:grid-cols-5">
          {/* Card 1 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">DSS (30%)</span>
            <div className="text-xl font-black font-mono text-slate-900 mt-1">{selectedMpScore.DSS}</div>
            <p className="text-[10px] text-slate-500 mt-2 font-normal leading-normal">{dssDetail}</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">CIS (25%)</span>
            <div className="text-xl font-black font-mono text-slate-900 mt-1">{selectedMpScore.CIS}</div>
            <p className="text-[10px] text-slate-500 mt-2 font-normal leading-normal">{cisDetail}</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">PVI (20%)</span>
            <div className="text-xl font-black font-mono text-slate-900 mt-1">{selectedMpScore.PVI}</div>
            <p className="text-[10px] text-slate-500 mt-2 font-normal leading-normal">{pviDetail}</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">PSF (15%)</span>
            <div className="text-xl font-black font-mono text-slate-900 mt-1">{selectedMpScore.PSF}</div>
            <p className="text-[10px] text-slate-500 mt-2 font-normal leading-normal">{psfDetail}</p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">MERS (10%)</span>
            <div className="text-xl font-black font-mono text-slate-900 mt-1">{selectedMpScore.MERS}</div>
            <p className="text-[10px] text-slate-500 mt-2 font-normal leading-normal">{mersDetail}</p>
          </div>
        </div>

        {/* Action Plan & Risk Notes */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Action Plan card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Action Plan Tasks
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {actionPlans.map((action, i) => (
                <li key={i} className="flex gap-2 items-start font-medium leading-relaxed">
                  <span className="h-5 w-5 rounded bg-orange-50 text-[#F07125] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Risk Notes card */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-850 border-b border-slate-200/60 pb-2 flex items-center gap-1">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Pre-Launch Risk Alerts
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {riskNotes.map((note, i) => (
                <li key={i} className="flex gap-2 items-start font-normal leading-relaxed">
                  <span className="text-amber-500 shrink-0 mt-0.5">✦</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA to simulate report */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500">
            Want to download these findings as a customized PDF?
          </span>
          <button
            onClick={() => onNavigate('report_preview')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md text-xs font-semibold hover:bg-orange-600 transition-all cursor-pointer"
          >
            <FileText className="h-4 w-4" />
            Generate Launch Report
          </button>
        </div>
      </div>
    );
  }

  // Render list dashboard (Screen 5)
  return (
    <div id="results-list-view" className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Channel Fit Results: {analysis.product}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked marketplace recommendation before launching inventory or marketing campaigns.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('comparison')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded shadow-sm cursor-pointer"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            View Comparison Table
          </button>
          <button
            onClick={() => onNavigate('report_preview')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-orange-600 rounded shadow-sm cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Recommended Hero Block */}
      <div className="bg-white border-2 border-[#F07125]/80 rounded-xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#F07125] text-white font-black tracking-widest text-[9.5px] uppercase py-1 px-4 rounded-bl-lg font-mono">
          🏆 RATED BEST CHANNEL
        </div>

        <div className="grid gap-6 md:grid-cols-3 items-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Primary Recommendation</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{bestFit.marketplace}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-3xl font-extrabold font-mono text-[#F07125]">{bestFit.CFS}</span>
              <div className="border-l border-slate-250 h-6 px-2 text-left">
                <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase leading-none">CFS Index</span>
                <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-[#F07125] border border-orange-100 mt-1">
                  {bestFit.classification}
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3.5 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 text-xs text-slate-600">
            <p className="text-slate-800 font-semibold leading-relaxed text-sm">
              “Etsy UK shows strong platform suitability, lower direct competition, and healthy price viability for this product category. Amazon UK has stronger demand but higher competitive intensity.”
            </p>
            
            {/* Score Breakdown Bars with Formula */}
            <div className="space-y-2">
              <span className="block text-[10px] text-slate-400 font-mono tracking-widest uppercase mb-1">
                Weighted Calculation Variables:
              </span>
              <div className="grid sm:grid-cols-5 gap-2 text-center text-[10.5px]">
                <div className="p-1.5 bg-slate-50 border border-slate-105 rounded">
                  <span className="block font-semibold text-slate-500 text-[9px] uppercase tracking-wider leading-none">DSS (30%)</span>
                  <span className="block font-mono font-bold text-slate-850 mt-1">{bestFit.DSS}/100</span>
                </div>
                <div className="p-1.5 bg-slate-50 border border-slate-105 rounded">
                  <span className="block font-semibold text-slate-500 text-[9px] uppercase tracking-wider leading-none">CIS (25%)</span>
                  <span className="block font-mono font-bold text-slate-850 mt-1">{bestFit.CIS}/100</span>
                </div>
                <div className="p-1.5 bg-slate-50 border border-slate-105 rounded">
                  <span className="block font-semibold text-slate-500 text-[9px] uppercase tracking-wider leading-none">PVI (20%)</span>
                  <span className="block font-mono font-bold text-slate-850 mt-1">{bestFit.PVI}/100</span>
                </div>
                <div className="p-1.5 bg-slate-50 border border-slate-105 rounded">
                  <span className="block font-semibold text-slate-500 text-[9px] uppercase tracking-wider leading-none">PSF (15%)</span>
                  <span className="block font-mono font-bold text-slate-850 mt-1">{bestFit.PSF}/100</span>
                </div>
                <div className="p-1.5 bg-slate-50 border border-slate-105 rounded">
                  <span className="block font-semibold text-slate-500 text-[9px] uppercase tracking-wider leading-none">MERS (10%)</span>
                  <span className="block font-mono font-bold text-slate-850 mt-1">{bestFit.MERS}/100</span>
                </div>
              </div>

              {/* Formula text */}
              <div className="text-[10px] font-mono text-slate-400 pt-2 flex items-center justify-between border-t border-slate-50">
                <span>FORMULA: CFS = DSS×0.30 + CIS×0.25 + PVI×0.20 + PSF×0.15 + MERS×0.10</span>
                <span className="text-[#F07125] font-bold">
                  {bestFit.DSS}×0.30 + {bestFit.CIS}×0.25 + {bestFit.PVI}×0.20 + {bestFit.PSF}×0.15 + {bestFit.MERS}×0.10 = {bestFit.CFS}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ranked Channels List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
          Ranked Marketplace Suitability Ladder
        </h3>

        <div className="space-y-3.5">
          {scores.map((score, rankIndex) => {
            let classificationClass = 'cfs-badge-weak';
            if (score.classification === 'Strong Fit') {
              classificationClass = 'cfs-badge-strong';
            } else if (score.classification === 'Moderate Fit') {
              classificationClass = 'cfs-badge-moderate';
            }

            return (
              <div
                key={score.marketplace}
                onClick={() => handleMarketplaceCardClick(score.marketplace)}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-[#F07125] hover:shadow-sm transition-all cursor-pointer select-none"
              >
                <div className="flex items-center gap-4">
                  <span className="h-7 w-7 rounded-lg bg-slate-900 font-mono text-xs font-bold text-slate-100 flex items-center justify-center shrink-0">
                    {rankIndex + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#F07125] transition-colors flex items-center gap-2">
                      {score.marketplace}
                      <span className={`inline-block px-2 py-0.5 rounded text-[9.5px] font-bold ${classificationClass}`}>
                        {score.classification}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                      {score.reason}
                    </p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center gap-4 self-end sm:self-auto font-mono text-xs">
                  <div className="text-right">
                    <span className="block text-[9px] text-slate-400 uppercase tracking-wider">CFS Score</span>
                    <span className="font-extrabold text-sm text-slate-800">{score.CFS}/100</span>
                  </div>
                  <button className="p-1 px-2.5 rounded bg-slate-50 text-[11px] font-semibold text-slate-600 group-hover:bg-[#F07125] group-hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                    Explore Details
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
