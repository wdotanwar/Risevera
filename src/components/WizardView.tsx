import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Shield, Globe, Compass, Check, AlertCircle, HelpCircle, Loader2 } from 'lucide-react';
import { ProductInput, SavedAnalysis, MarketplaceScore } from '../types';
import { calculateCFS, getClassification } from '../data';

interface WizardViewProps {
  onAddAnalysis: (analysis: SavedAnalysis, scores: MarketplaceScore[]) => void;
  onNavigateToResults: (analysis: SavedAnalysis, scores: MarketplaceScore[]) => void;
  preselectedType: 'New Product Launch' | 'Channel Rescue' | 'Global Expansion' | null;
  onClearPreselect: () => void;
}

export default function WizardView({
  onAddAnalysis,
  onNavigateToResults,
  preselectedType,
  onClearPreselect
}: WizardViewProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 'processing'>(1);

  // Default values
  const [formData, setFormData] = useState<ProductInput>({
    name: 'Bamboo Baby Feeding Set',
    category: 'Baby & Toddler',
    description: 'Eco-friendly natural bamboo tableware set including suction plate, bowl, and soft-tip spoon.',
    landingCost: 6.80,
    targetPrice: 19.99,
    stockQuantity: 300,
    origin: 'China',
    weight: 0.6,
    length: 22,
    width: 18,
    height: 8,
    analysisType: preselectedType || 'New Product Launch',
    selectedMarketplaces: ['Amazon UK', 'eBay UK', 'TikTok Shop UK', 'Etsy UK', 'OnBuy'],
    selectedCountries: ['UK']
  });

  // Keep type synchronized with sidebar-initiated rescue/global actions
  useEffect(() => {
    if (preselectedType) {
      setFormData(prev => ({
        ...prev,
        analysisType: preselectedType,
        // Default countries for global expansion
        selectedCountries: preselectedType === 'Global Expansion' ? ['UK', 'United States', 'Germany'] : ['UK']
      }));
      setStep(2); // Jump straight to form fields
    }
  }, [preselectedType]);

  // Processing state variables
  const [currentProgressIndex, setCurrentProgressIndex] = useState(0);
  const progressSteps = [
    'Reading product profile and category taxonomy...',
    'Mapping category density and historical metrics...',
    'Estimating demand signal (DSS) across chosen nodes...',
    'Comparing competitor density and reviews (CIS)...',
    'Testing price tolerance & viable gross margin (PVI)...',
    'Verifying platform customer behavior variables (PSF)...',
    'Applying market regulatory & logistics entry risks (MERS)...',
    'Compiling ranked Channel Fit Score reports...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'processing') {
      setCurrentProgressIndex(0);
      interval = setInterval(() => {
        setCurrentProgressIndex((prev) => {
          if (prev >= progressSteps.length - 1) {
            clearInterval(interval);
            // Process calculations!
            handleCompleteCalculation();
            return prev;
          }
          return prev + 1;
        });
      }, 550);
    }
    return () => clearInterval(interval);
  }, [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'landingCost' || name === 'targetPrice' || name === 'stockQuantity' || name === 'weight'
        ? Number(value)
        : value
    }));
  };

  const handleToggleMarketplace = (mp: string) => {
    setFormData(prev => {
      const selected = prev.selectedMarketplaces.includes(mp)
        ? prev.selectedMarketplaces.filter(x => x !== mp)
        : [...prev.selectedMarketplaces, mp];
      return { ...prev, selectedMarketplaces: selected };
    });
  };

  const handleToggleCountry = (c: string) => {
    setFormData(prev => {
      const selected = prev.selectedCountries.includes(c)
        ? prev.selectedCountries.filter(x => x !== c)
        : [...prev.selectedCountries, c];
      return { ...prev, selectedCountries: selected };
    });
  };

  const handleCompleteCalculation = () => {
    // Generate realistic based scores dynamically from formula:
    // CFS = dss * 0.3 + cis * 0.25 + pvi * 0.20 + psf * 0.15 + mers * 0.1
    // Let's seed variations based on product attributes
    const nameSeed = formData.name.length;
    const margin = (formData.targetPrice - formData.landingCost) / (formData.targetPrice || 1);

    const generatedScores: MarketplaceScore[] = formData.selectedMarketplaces.map((mp, index) => {
      // Create interesting deterministic variations
      let dss = 70 + (nameSeed % 3) * 5 + (index % 2) * 5;
      let cis = 65 + (index % 3) * 8 - (formData.landingCost > 10 ? 5 : 0);
      let pvi = Math.round(margin * 100);
      let psf = 75 + (index % 2) * 10;
      let mers = 70 - (formData.origin === 'China' ? 8 : 2) - (formData.weight > 1.5 ? 5 : 0);

      // Apply channel specific corrections
      if (mp.includes('Etsy')) {
        psf = formData.category.toLowerCase().includes('baby') || formData.category.toLowerCase().includes('gift') || formData.category.toLowerCase().includes('decor') ? 91 : 65;
        cis = 82; // Lower intensity generally on Etsy for boutique products
        mers = 72;
        pvi = 86;
        dss = 78;
      } else if (mp.includes('TikTok')) {
        dss = formData.category.toLowerCase().includes('baby') || formData.category.toLowerCase().includes('gift') ? 85 : 68;
        psf = 88;
        cis = 68;
        mers = 83;
      } else if (mp.includes('Amazon')) {
        dss = 92; // Extremely high demand sign
        cis = 48; // Brutal competitor density
        pvi = Math.min(pvi, 68); // High fees reduce price index
        psf = 80;
        mers = 68;
      } else if (mp.includes('eBay')) {
        dss = 66;
        cis = 60;
        pvi = Math.min(pvi, 70);
        psf = 58;
        mers = 35;
      } else if (mp.includes('OnBuy')) {
        dss = 44;
        cis = 55;
        pvi = Math.min(pvi, 61);
        psf = 45;
        mers = 21;
      }

      // Ensure scores fall within 0-100 range
      dss = Math.max(10, Math.min(100, dss));
      cis = Math.max(10, Math.min(100, cis));
      pvi = Math.max(10, Math.min(100, pvi));
      psf = Math.max(10, Math.min(100, psf));
      mers = Math.max(10, Math.min(100, mers));

      const cfs = calculateCFS(dss, cis, pvi, psf, mers);
      const classification = getClassification(cfs);

      // Determine action advice
      let action = 'Use as secondary channel';
      let reason = 'Balanced performance profile, suitable for incremental testing.';
      if (cfs >= 80) {
        action = 'Launch first';
        reason = `Matches consumer profiles for ${formData.category} ideally with low entry barriers and top-tier margin indices.`;
      } else if (cfs >= 60) {
        if (mp.includes('TikTok')) {
          action = 'Test with content-led campaign';
          reason = 'Excellent viral traction indicators, but content delivery and warehousing support remains pivotal.';
        } else if (mp.includes('Amazon')) {
          action = 'Delay until reviews are ready';
          reason = 'Demonstrates high category velocity though review barrier represents significant launch expenditure.';
        } else {
          action = 'Secondary pilot channel';
          reason = 'Healthy viability index but volume indicators fall below prime channels.';
        }
      } else {
        action = 'Do not prioritise';
        reason = 'Weak categories overlap, combined with steep fee levels or highly saturated product spaces.';
      }

      return {
        marketplace: mp,
        country: 'UK',
        DSS: dss,
        CIS: cis,
        PVI: pvi,
        PSF: psf,
        MERS: mers,
        CFS: cfs,
        classification,
        action,
        reason
      };
    });

    // Sort by final score desc
    generatedScores.sort((a, b) => b.CFS - a.CFS);

    const bestScore = generatedScores[0];

    const completedAnalysis: SavedAnalysis = {
      id: String(Date.now()),
      product: formData.name,
      category: formData.category,
      bestChannel: bestScore.marketplace,
      cfs: bestScore.CFS,
      classification: bestScore.classification,
      createdDate: new Date().toISOString().split('T')[0],
      type: formData.analysisType,
      status: 'Ready',
      inputData: formData
    };

    onAddAnalysis(completedAnalysis, generatedScores);
    onClearPreselect();
    onNavigateToResults(completedAnalysis, generatedScores);
  };

  const grossMargin = formData.targetPrice > 0 
    ? Math.round(((formData.targetPrice - formData.landingCost) / formData.targetPrice) * 100)
    : 0;

  return (
    <div id="wizard-view" className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      
      {/* Top Breadcrumb or Steps header */}
      {step !== 'processing' && (
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Channel Fit Analyzer</h2>
            <p className="text-xs text-slate-500 mt-0.5">Define your e-commerce product profile to test commercial suitability</p>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((num) => (
              <span
                key={num}
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  step === num
                    ? 'bg-[#F07125] text-white'
                    : step > num
                    ? 'bg-orange-50 text-[#F07125] border border-orange-200'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > num ? <Check size={14} className="stroke-[3]" /> : num}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: CHOOSE ANALYSIS TYPE */}
      {step === 1 && (
        <div id="wizard-step1" className="space-y-6">
          <div className="text-center py-4">
            <h3 className="text-lg font-bold text-slate-900">Step 1: Select Analysis Engine Mode</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-lg mx-auto">
              Select the option that strictly matches your current product commercial phase for targeted score parameters.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {/* Launch Card (Default) */}
            <button
              id="select-type-launch"
              onClick={() => setFormData(prev => ({ ...prev, analysisType: 'New Product Launch' }))}
              className={`flex flex-col items-start p-6 rounded-xl border text-left transition-all ${
                formData.analysisType === 'New Product Launch'
                  ? 'border-[#F07125] bg-orange-50/20 ring-1 ring-[#F07125]/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="p-2.5 rounded-lg bg-orange-100 text-[#F07125] mb-4">
                <Compass className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">New Product Launch</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal mt-2 flex-1">
                For products not yet launched. Score best-fit channels before committing stock or ad spend.
              </p>
              <span className="text-[10px] uppercase font-bold text-[#F07125] tracking-wider mt-4 inline-flex items-center gap-1 leading-none">
                {formData.analysisType === 'New Product Launch' && '✓ Selected'}
              </span>
            </button>

            {/* Rescue Card */}
            <button
              id="select-type-rescue"
              onClick={() => setFormData(prev => ({ ...prev, analysisType: 'Channel Rescue' }))}
              className={`flex flex-col items-start p-6 rounded-xl border text-left transition-all ${
                formData.analysisType === 'Channel Rescue'
                  ? 'border-[#F07125] bg-orange-50/20 ring-1 ring-[#F07125]/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="p-2.5 rounded-lg bg-amber-100 text-amber-700 mb-4">
                <Shield className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Channel Rescue</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal mt-2 flex-1">
                For products already launched but underperforming. Find stronger UK marketplace conditions before writing off inventory.
              </p>
              <span className="text-[10px] uppercase font-bold text-[#F07125] tracking-wider mt-4 inline-flex items-center gap-1 leading-none">
                {formData.analysisType === 'Channel Rescue' && '✓ Selected'}
              </span>
            </button>

            {/* Global card */}
            <button
              id="select-type-global"
              onClick={() => setFormData(prev => ({ ...prev, analysisType: 'Global Expansion' }))}
              className={`flex flex-col items-start p-6 rounded-xl border text-left transition-all ${
                formData.analysisType === 'Global Expansion'
                  ? 'border-[#F07125] bg-orange-50/20 ring-1 ring-[#F07125]/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="p-2.5 rounded-lg bg-blue-100 text-blue-700 mb-4">
                <Globe className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Global Expansion</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal mt-2 flex-1">
                For products already performing well. Compare country-marketplace combinations for expansion.
              </p>
              <span className="text-[10px] uppercase font-bold text-[#F07125] tracking-wider mt-4 inline-flex items-center gap-1 leading-none">
                {formData.analysisType === 'Global Expansion' && '✓ Selected'}
              </span>
            </button>
          </div>

          <div className="flex justify-end pt-4">
            <button
              id="wizard-next-step-2"
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 rounded-md bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
            >
              Next Step: Product Info
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PRODUCT INPUT */}
      {step === 2 && (
        <div id="wizard-step2" className="space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 2: Define Product Parameters</h3>
            <p className="text-xs text-slate-400 font-normal">Accurate dimensioning and land成本 directly feeds price viability ratios.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 bg-white p-6 rounded-xl border border-slate-200">
            {/* Product Name */}
            <div className="space-y-1 md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700">Product Name *</label>
              <input
                id="form-product-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Bamboo Baby Feeding Set"
                className="w-full rounded border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Category selection */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Product Category *</label>
              <select
                id="form-product-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none"
              >
                <option value="Baby & Toddler">Baby & Toddler</option>
                <option value="Home Office">Home Office</option>
                <option value="Fitness">Fitness</option>
                <option value="Home & Gifts">Home & Gifts</option>
                <option value="Home Improvement">Home Improvement</option>
                <option value="Consumer Electronics">Consumer Electronics</option>
                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
              </select>
            </div>

            {/* Product description */}
            <div className="space-y-1 md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700">Product Description *</label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe key aesthetics, positioning, and buyer audiences..."
                className="w-full rounded border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Landing Cost & Selling Price */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Estimated UK Landing Cost (£) *</label>
              <input
                type="number"
                step="0.01"
                name="landingCost"
                value={formData.landingCost}
                onChange={handleChange}
                className="w-full rounded border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Target Selling Price (£) *</label>
              <input
                type="number"
                step="0.01"
                name="targetPrice"
                value={formData.targetPrice}
                onChange={handleChange}
                className="w-full rounded border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Monthly stock & Weight */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Expected Monthly Stock Volume (Units) *</label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                className="w-full rounded border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Product Weight (kg) *</label>
              <input
                type="number"
                step="0.01"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full rounded border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Origin & dimensions */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Product Origin Country</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className="w-full rounded border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Dimensions (L × W × H cm)</label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="L"
                  name="length"
                  value={formData.length || ''}
                  onChange={handleChange}
                  className="w-full rounded border border-slate-200 px-2 py-2 text-xs text-center focus:border-emerald-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="W"
                  name="width"
                  value={formData.width || ''}
                  onChange={handleChange}
                  className="w-full rounded border border-slate-200 px-2 py-2 text-xs text-center focus:border-emerald-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="H"
                  name="height"
                  value={formData.height || ''}
                  onChange={handleChange}
                  className="w-full rounded border border-slate-200 px-2 py-2 text-xs text-center focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Optional rescue inputs */}
            {formData.analysisType === 'Channel Rescue' && (
              <div className="md:col-span-2 grid gap-4 p-4 rounded-lg bg-yellow-50 border border-yellow-100 text-xs md:grid-cols-3">
                <div className="md:col-span-3 font-semibold text-yellow-800">📋 Existing Channel Rescue Metrics (Optional)</div>
                <div className="space-y-1">
                  <label className="block text-[11px] text-slate-600">Current Marketplace</label>
                  <input
                    type="text"
                    name="currentChannel"
                    value={formData.currentChannel || ''}
                    onChange={handleChange}
                    placeholder="e.g. Amazon UK"
                    className="w-full rounded bg-white border border-slate-200 px-2 py-1.5 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] text-slate-600">Current Monthly Sales (£)</label>
                  <input
                    type="number"
                    name="currentMonthlySales"
                    value={formData.currentMonthlySales || ''}
                    onChange={handleChange}
                    className="w-full rounded bg-white border border-slate-200 px-2 py-1.5 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] text-slate-600">Current Monthly Ad Spend (£)</label>
                  <input
                    type="number"
                    name="currentAdSpend"
                    value={formData.currentAdSpend || ''}
                    onChange={handleChange}
                    className="w-full rounded bg-white border border-slate-200 px-2 py-1.5 text-xs focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1 rounded bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              id="wizard-next-step-3"
              onClick={() => setStep(3)}
              className="flex items-center gap-1.5 rounded-md bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
            >
              Next: Select Channels
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CHOOSE CHANNELS & COUNTRIES */}
      {step === 3 && (
        <div id="wizard-step3" className="space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 3: Target Channels &amp; Geographic Scope</h3>
            <p className="text-xs text-slate-400 font-normal">Choose which platforms are simulated in this execution pass.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* UK Marketplace Checkboxes */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
                United Kingdom Marketplaces
              </h4>
              <div className="space-y-2.5">
                {['Amazon UK', 'eBay UK', 'TikTok Shop UK', 'Etsy UK', 'OnBuy'].map((mp) => {
                  const isChecked = formData.selectedMarketplaces.includes(mp);
                  return (
                    <label
                      key={mp}
                      className={`flex items-center justify-between p-2.5 rounded border transition-all cursor-pointer ${
                        isChecked 
                          ? 'border-orange-300 bg-orange-50/10' 
                          : 'border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleMarketplace(mp)}
                          className="rounded text-[#F07125] focus:ring-[#F07125] h-3.5 w-3.5"
                        />
                        <span className="text-xs font-semibold text-slate-800">{mp}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">UK Active</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* International markets */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2 flex items-center justify-between">
                <span>International Expansion Scope</span>
                {formData.analysisType !== 'Global Expansion' && (
                  <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-normal">
                    Requires Expansion tier
                  </span>
                )}
              </h4>
              <p className="text-[11px] text-slate-400 leading-normal">
                Compare multi-continental logistics, duty margins, and customer fit. Required for global scoring.
              </p>
              <div className="space-y-2.5">
                {['United States', 'Germany', 'Canada', 'Australia', 'France'].map((co) => {
                  const isChecked = formData.selectedCountries.includes(co);
                  const isExpansionType = formData.analysisType === 'Global Expansion';
                  const isDisabled = !isExpansionType;

                  return (
                    <label
                      key={co}
                      className={`flex items-center justify-between p-2.5 rounded border transition-all ${
                        isDisabled 
                          ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed' 
                          : isChecked 
                          ? 'border-orange-300 bg-orange-50/10 cursor-pointer' 
                          : 'border-slate-100 hover:bg-slate-50 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked && isExpansionType}
                          disabled={isDisabled}
                          onChange={() => handleToggleCountry(co)}
                          className="rounded text-[#F07125] focus:ring-[#F07125] h-3.5 w-3.5"
                        />
                        <span className="text-xs font-semibold text-slate-800">{co}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {co === 'United States' ? 'US Region' : 'EU/APAC'}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1 rounded bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              id="wizard-next-step-4"
              onClick={() => setStep(4)}
              className="flex items-center gap-1.5 rounded-md bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
            >
              Next: Review Parameters
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW INPUTS & SUMMARY */}
      {step === 4 && (
        <div id="wizard-step4" className="space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 4: Review Parameters Prior to Evaluation</h3>
            <p className="text-xs text-slate-400 font-normal">Review product metrics before initializing the Channel Fit evaluation pass.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="inline-block rounded bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-[#F07125] uppercase tracking-wider border border-orange-100">
                  {formData.analysisType}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-2">{formData.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{formData.category}</p>
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Gross Margin Estimate</span>
                <span className="text-xl font-bold font-mono text-[#F07125]">{grossMargin}%</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-normal">Landing Unit Cost:</span>
                  <span className="font-semibold text-slate-800 font-mono">£{formData.landingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-normal">Target Selling Price:</span>
                  <span className="font-semibold text-slate-800 font-mono">£{formData.targetPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-normal">Expected Stock:</span>
                  <span className="font-semibold text-slate-800">{formData.stockQuantity} units</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-normal">Product Origin / Weight:</span>
                  <span className="font-semibold text-slate-800">{formData.origin} | {formData.weight} kg</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-normal">Marketplaces to Index:</span>
                  <span className="font-semibold text-slate-800 max-w-[150px] truncate block text-right" title={formData.selectedMarketplaces.join(', ')}>
                    {formData.selectedMarketplaces.length} Channels
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-normal">Geographic Countries:</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {formData.selectedCountries.join(', ')}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-slate-500 font-normal text-xs bg-slate-50 p-3 rounded-lg leading-relaxed">
              💡 <span className="font-bold text-slate-800 text-[11px]">Note:</span> By executing this calculation, RISEVERA indexes historical category demand ratios, competitor density counts, and relative storage thresholds for each selected platform.
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-1 rounded bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                title="Go back to channel selection"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              id="wizard-run-analysis-btn"
              onClick={() => setStep('processing')}
              className="flex items-center gap-1.5 rounded-md bg-[#F07125] px-6 py-2.5 text-xs font-semibold text-white shadow hover:bg-orange-600 active:scale-95 transition-all outline-none border-none cursor-pointer"
            >
              Run Channel Fit Analysis
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 'processing': ANALYSIS PROCESSING SCREEN */}
      {step === 'processing' && (
        <div id="processing-screen" className="py-12 bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-8 animate-pulse text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-14 w-14 rounded-full bg-orange-50 flex items-center justify-center text-[#F07125] animate-spin">
              <Loader2 className="h-8 w-8 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">RISEVERA Analytical Sandbox Processing</h3>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-mono">CHANNEL_FIT_ENGINE EXECUTION RUN</p>
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-3">
            {/* Steps feedback list */}
            {progressSteps.map((stepMsg, idx) => {
              const isPast = idx < currentProgressIndex;
              const isCurrent = idx === currentProgressIndex;
              return (
                <div
                  key={stepMsg}
                  className={`flex items-center gap-3 text-xs text-left transition-colors font-medium ${
                    isPast 
                      ? 'text-[#F07125] font-bold' 
                      : isCurrent 
                      ? 'text-slate-800 font-extrabold animate-bounce' 
                      : 'text-slate-300 font-normal'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isPast ? 'bg-[#F07125]' : isCurrent ? 'bg-slate-700' : 'bg-slate-200'}`} />
                  <span>{stepMsg}</span>
                  {isPast && <span className="text-[10px] text-[#F07125] ml-auto font-mono">OK</span>}
                </div>
              );
            })}
          </div>

          {/* Animated fake progress bar */}
          <div className="max-w-md mx-auto">
            <div className="relative h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-[#F07125] transition-all duration-300"
                style={{ width: `${((currentProgressIndex + 1) / progressSteps.length) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-4 leading-normal italic font-normal">
              * Note: Prototype analysis uses simulated marketplace data. In production, RISEVERA will use live marketplace API integrations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
