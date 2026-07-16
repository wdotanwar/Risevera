import { useState } from 'react';
import { Printer, Download, Share2, CornerDownRight, Check, AlertCircle, FileText, ChevronLeft, ArrowRight, Table } from 'lucide-react';
import { SavedAnalysis, MarketplaceScore, ScreenId } from '../types';

interface ReportViewProps {
  analysis: SavedAnalysis | null;
  scores: MarketplaceScore[];
  onNavigate: (screen: ScreenId) => void;
}

export default function ReportView({
  analysis,
  scores,
  onNavigate
}: ReportViewProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fallback default details to assure clicking "View Sample Report" on landing functions flawlessly
  const currentProduct = analysis?.product || "Bamboo Baby Feeding Set";
  const currentCategory = analysis?.category || "Baby & Toddler";
  const currentLandingCost = analysis?.inputData.landingCost || 6.80;
  const currentTargetPrice = analysis?.inputData.targetPrice || 19.99;
  const currentStock = analysis?.inputData.stockQuantity || 300;
  const currentOrigin = analysis?.inputData.origin || "China";
  const currentWeight = analysis?.inputData.weight || 0.6;
  const currentAssumptions = analysis?.inputData.description || "Eco-friendly natural bamboo food-grade feeding set with suction bases.";

  const bestMp = scores[0] || {
    marketplace: "Etsy UK",
    CFS: 84,
    classification: "Strong Fit",
    action: "Launch first",
    reason: "Best fit for gifting, handmade-style positioning, and lower direct competition."
  };

  const grossMargin = Math.round(((currentTargetPrice - currentLandingCost) / currentTargetPrice) * 100);

  return (
    <div id="report-view-container" className="space-y-6 max-w-4xl mx-auto animate-fade-in relative">
      
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div id="report-toast-alert" className="fixed top-20 right-6 z-50 rounded-lg p-4 bg-slate-900 border border-slate-705 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 max-w-sm animate-bounce">
          <Check className="h-4 w-4 text-[#F07125] stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header controls toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold inline-flex items-center gap-1.5"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight mt-1">
            Report Center
          </h2>
          <p className="text-xs text-slate-400">Preview and distribution panel for UK channel evaluation outputs</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Export PDF Button */}
          <button
            id="report-export-pdf-btn"
            onClick={() => showToast("Report export prepared — prototype mode.")}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-2 bg-white text-slate-700 border border-slate-250 rounded shadow-sm hover:bg-slate-50 transition-colors"
          >
            <Printer className="h-3.5 w-3.5" />
            Export PDF
          </button>

          {/* Download CSV Button */}
          <button
            id="report-export-csv-btn"
            onClick={() => showToast("CSV dataset exported — prototype mode.")}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-2 bg-white text-slate-700 border border-slate-250 rounded shadow-sm hover:bg-slate-50 transition-colors"
          >
            <Table className="h-3.5 w-3.5" />
            Download CSV
          </button>

          {/* Share Link Button */}
          <button
            id="report-share-link-btn"
            onClick={() => showToast("Secured distribution hash copied to clipboard — prototype mode.")}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-2 bg-white text-slate-700 border border-slate-250 rounded shadow-sm hover:bg-slate-50 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
            Share Link
          </button>

          {/* Save to Dashboard Button */}
          <button
            id="report-save-dash-btn"
            onClick={() => {
              showToast("Calculated report saved securely — prototype mode.");
              onNavigate('dashboard');
            }}
            className="flex items-center gap-1 text-xs font-semibold px-3.5 py-2 bg-slate-950 text-white rounded shadow-sm hover:bg-[#F07125] transition-colors"
          >
            Save to Dashboard
          </button>
        </div>
      </div>

      {/* The Printable/Professional Report Preview Card */}
      <div className="bg-white border border-slate-250 rounded-xl p-8 sm:p-12 shadow-md space-y-10 text-left font-sans text-slate-800 leading-relaxed">
        
        {/* Report Top Branding */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded bg-orange-50 text-[#F07125] font-mono text-[9px] font-bold border border-orange-100/80">
              RISEVERA DECISION_REPORT // PRIVATE RECORD
            </div>
            <h1 className="text-3xl font-black text-slate-950 mt-3 tracking-tight">
              SME Marketplace Channel Fit Report
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-wider">
              Calculated On: 2026-06-11 UTC // Professional Subscription Tier
            </p>
          </div>
          <div className="text-right sm:text-right border-t sm:border-t-0 sm:border-l sm:pl-6 border-slate-200 pt-4 sm:pt-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">Platform Identifier</span>
            <span className="text-lg font-black text-slate-900 tracking-wider">RISEVERA</span>
            <span className="block text-[9px] text-[#F07125] uppercase tracking-widest font-bold">Channel Intelligence</span>
          </div>
        </div>

        {/* 1. Product Summary */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-mono flex items-center gap-2">
            <span className="h-4 w-1 bg-slate-400 inline-block rounded" />
            01. Product Summary
          </h3>
          <p className="text-xs text-slate-600">
            Product profile identified as <span className="font-semibold text-slate-900">{currentProduct}</span>, catalogued under the <span className="font-semibold text-slate-900">{currentCategory}</span> vertical. This review determines target sales viability levels prior to committing physical stock import outlays.
          </p>
        </section>

        {/* 2. Input Assumptions */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-mono flex items-center gap-2">
            <span className="h-4 w-1 bg-slate-400 inline-block rounded" />
            02. Input Assumptions
          </h3>
          <div className="grid gap-4 sm:grid-cols-4 bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs">
            <div>
              <span className="block text-slate-400 font-medium text-[10px]">Landing Unit Cost:</span>
              <span className="font-bold text-slate-920 font-mono">£{currentLandingCost.toFixed(2)} GBP</span>
            </div>
            <div>
              <span className="block text-slate-400 font-medium text-[10px]">Target Selling Price:</span>
              <span className="font-bold text-slate-920 font-mono">£{currentTargetPrice.toFixed(2)} GBP</span>
            </div>
            <div>
              <span className="block text-slate-400 font-medium text-[10px]">Expected Growth Volume:</span>
              <span className="font-bold text-slate-92) font-mono">{currentStock} Units / m</span>
            </div>
            <div>
              <span className="block text-slate-400 font-medium text-[10px]">Estimated Gross Margin:</span>
              <span className="font-bold text-[#F07125] font-mono">{grossMargin}%</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 italic mt-1 bg-white p-2 rounded border border-slate-100">
            <strong>Description assumption:</strong> {currentAssumptions} (Weight: {currentWeight}kg, Origin: {currentOrigin})
          </div>
        </section>

        {/* 3. Ranked Marketplace Results */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-mono flex items-center gap-2">
            <span className="h-4 w-1 bg-slate-400 inline-block rounded" />
            03. Ranked Marketplace Results
          </h3>
          <div className="space-y-2 text-xs">
            {scores.length > 0 ? (
              scores.map((s, idx) => (
                <div key={s.marketplace} className="flex justify-between items-center py-2 border-b border-slate-100 font-mono">
                  <span className="font-bold text-slate-700 min-w-[120px]">{idx + 1}. {s.marketplace}</span>
                  <div className="h-px bg-slate-100 flex-1 mx-4" />
                  <span className="font-bold text-slate-500 mr-4">CFS: {s.CFS}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold text-right py-0.5 ${
                    s.classification === 'Strong Fit' ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                  }`}>
                    {s.classification}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-3 bg-slate-50 text-slate-400 text-center">
                Demo placeholder results. Initial mock lists 5 active UK marketplaces indexed with Etsy UK rated at 84.
              </div>
            )}
          </div>
        </section>

        {/* 4. Channel Fit Score Breakdown */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-mono flex items-center gap-2">
            <span className="h-4 w-1 bg-slate-400 inline-block rounded" />
            04. Channel Fit Score (CFS) Breakdown
          </h3>
          <p className="text-xs text-slate-650 font-normal">
            A comprehensive evaluation calculated by standard commercial indices:
          </p>
          <ul className="text-xs space-y-2 text-slate-600 pl-4 list-disc font-normal">
            <li><strong>Demand Signal Score (DSS - Weight: 30%):</strong> Assesses search query intensity patterns on the target keyword nodes.</li>
            <li><strong>Competition Intensity Score (CIS - Weight: 25%):</strong> Evaluates organic item saturation, active reviews barrier gaps, and merchant densities.</li>
            <li><strong>Price Viability Index (PVI - Weight: 20%):</strong> Subtracts expected commission charges, storage rates, and listing fees from margins benchmarks.</li>
            <li><strong>Platform Suitability Factor (PSF - Weight: 15%):</strong> Assesses demographics cohort alignment, purchase-intent categories, and checkout habits.</li>
            <li><strong>Market Entry Risk Score (MERS - Weight: 10%):</strong> Indexes regulatory blockages, regional cross-border checks, and warehousing setups.</li>
          </ul>
        </section>

        {/* 5. Recommended Launch Channel */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-mono flex items-center gap-2">
            <span className="h-4 w-1 bg-slate-400 inline-block rounded" />
            05. Recommended Launch Channel
          </h3>
          <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg">
            <p className="text-xs font-bold text-[#F07125] flex items-center gap-1.5 uppercase tracking-wider font-mono">
              ★ Primary Path Recommendation: {bestMp.marketplace}
            </p>
            <p className="text-xs text-slate-700 mt-2 font-normal leading-relaxed">
              Based on calculations, <span className="font-bold text-slate-900">{bestMp.marketplace}</span> presents the optimum launchpad due to stable category-level transaction signals and lower advertising bid pressure.
            </p>
          </div>
        </section>

        {/* 6. Channels to Avoid */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-mono flex items-center gap-2">
            <span className="h-4 w-1 bg-slate-400 inline-block rounded" />
            06. Channels to Avoid
          </h3>
          <div className="bg-slate-50 border border-slate-150 p-4 rounded-lg text-xs font-normal">
            <p className="font-semibold text-slate-800">Low fit channels diagnosed:</p>
            <p className="text-slate-500 mt-1 leading-relaxed">
              OnBuy indexes below the CFS 50 threshold. It shows weak custom category signals and deficient transaction volume indices, which does not justify upfront listing administrative duties at this early trade phase.
            </p>
          </div>
        </section>

        {/* 7. Pricing and Margin Notes */}
        <section className="space-y-3 font-normal">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-mono flex items-center gap-2">
            <span className="h-4 w-1 bg-slate-400 inline-block rounded" />
            07. Pricing and Margin Notes
          </h3>
          <p className="text-xs text-slate-600">
            Evaluating a target target retail of <span className="font-semibold text-slate-900">£{currentTargetPrice.toFixed(2)}</span> against landing costs reveals a solid gross buffer of <span className="font-semibold text-slate-900">{grossMargin}%</span>. However, secondary marketplace commission deductions, referral outlays (average 15% on Amazon UK), and PPC sponsor spend must remain within 18-20% ranges to block cashflow leaks.
          </p>
        </section>

        {/* 8. Market Entry Risk Notes */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-mono flex items-center gap-2">
            <span className="h-4 w-1 bg-slate-400 inline-block rounded" />
            08. Market Entry Risk Notes
          </h3>
          <p className="text-xs text-slate-500 leading-normal font-normal">
            No active cross-border blockages are registered for immediate UK distribution. However, international transit scenarios (e.g. shipping to United States nodes) require wood chemical safety reporting certificates to satisfy strict import requirements.
          </p>
        </section>

        {/* 9. 30-Day Launch Action Plan */}
        <section className="space-y-3 font-normal">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-mono flex items-center gap-2">
            <span className="h-4 w-1 bg-slate-400 inline-block rounded" />
            09. 30-Day Launch Action Plan
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex gap-2">
              <span className="font-bold text-slate-800 shrink-0">Days 1 - 10:</span>
              <p className="text-slate-600">Upload 3 bespoke listing variants with optimized keywords indicating gifting, organic, and toddler safety.</p>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-slate-800 shrink-0">Days 11 - 20:</span>
              <p className="text-slate-600">Set targeted trial pricing at £19.99 with free parcel carriage to gather immediate initial parent community reviews.</p>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-slate-800 shrink-0">Days 21 - 30:</span>
              <p className="text-slate-600">Track analytics impressions closely. Shift inventory placement parameters depending on early listing conversions.</p>
            </div>
          </div>
        </section>

        {/* 10. Appendix: Scoring Methodology */}
        <section className="space-y-3 text-slate-500 font-normal">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-mono flex items-center gap-2">
            <span className="h-4 w-1 bg-slate-400 inline-block rounded" />
            10. Appendix: Scoring Methodology
          </h3>
          <p className="text-[11px] leading-relaxed">
            The Channel Fit Score (CFS) has been calculated using the standardized formulas of the RISEVERA channel intelligence stack. Standard weights adhere strictly to: DSS 30% | CIS 25% | PVI 20% | PSF 15% | MERS 10%. Analysis variables represent prototype data simulations for SME demonstration purposes.
          </p>
        </section>

        {/* Appendix/Methodology declaration */}
        <div className="mt-12 pt-6 border-t border-slate-200 text-center font-mono text-[10px] text-slate-400">
          DECLARATION: SECURE GENERATED PDF RECORD ACCORDING TO DATA RETENTION STANDARD UK-SME-GDPR.
        </div>
      </div>
    </div>
  );
}
