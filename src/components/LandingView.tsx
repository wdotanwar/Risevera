import React, { useState } from 'react';
import { 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Layers, 
  ExternalLink,
  Check,
  Star,
  Compass,
  Search,
  Award,
  DollarSign,
  Globe,
  Users,
  Activity,
  Plus,
  Minus,
  Mail,
  Loader2,
  Lock,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import RiseveraLogo from './RiseveraLogo';
const heroDashboardImg = "/src/assets/images/riservera_h.png";
const stepsWorkflowImg = "/src/assets/images/steps_workflow_1781186040393.png";

interface LandingViewProps {
  onStart: () => void;
  onViewSample: () => void;
}

export default function LandingView({ onStart, onViewSample }: LandingViewProps) {
  // Frequently Asked Questions state toggling
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Newsletter subscription
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [isSubmittingNews, setIsSubmittingNews] = useState(false);

  // Demo interactive channel scanner showcase
  const [selectedDemoChannel, setSelectedDemoChannel] = useState<'Etsy' | 'Amazon' | 'TikTok' | 'eBay' | 'OnBuy'>('Etsy');

  // Contact modal state
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubmittingNews(true);
    setTimeout(() => {
      setIsSubmittingNews(false);
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 4000);
    }, 800);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormSubmitted(true);
    setTimeout(() => {
      setShowContactModal(false);
      setContactFormSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 2000);
  };

  const demoChannelData = {
    Etsy: {
      score: 94,
      classification: 'Strong Fit',
      demand: 'High for unique items',
      competition: 'Low - Niche appeal',
      priceViability: 'Excellent (Premium tier acceptable)',
      advice: 'Target handmade, custom-crafted, or organic materials here. Avoid racing to the bottom on price.'
    },
    Amazon: {
      score: 86,
      classification: 'Good Fit',
      demand: 'Massive organic traffic',
      competition: 'High - Heavy PPC needed',
      priceViability: 'Moderate (Strict referral/FBA cuts)',
      advice: 'Ideal for commodity high-volume item launches. Ensure custom packing elements are ready to withstand intense competitors.'
    },
    TikTok: {
      score: 91,
      classification: 'Strong Fit',
      demand: 'Extremely volatile / Viral spurts',
      competition: 'Medium - Requires video engagement',
      priceViability: 'High (Discounts yield high conversion)',
      advice: 'Perfect for visual products with immediate impulse appeal. Partner with creators to maximize short-term ROI.'
    },
    eBay: {
      score: 78,
      classification: 'Moderate Fit',
      demand: 'Broad value-focused buyers',
      competition: 'Medium - Price matching dominant',
      priceViability: 'Healthy flat fee margins',
      advice: 'Promote bundle packs and multi-buy coupons. Use eBay to clear excess inventory or non-branded components sustainably.'
    },
    OnBuy: {
      score: 72,
      classification: 'Moderate Fit',
      demand: 'Steadily emerging UK volume',
      competition: 'Sparse - Excellent shelf visibility',
      priceViability: 'Exceptional (Incredibly low fee structure)',
      advice: 'A superb secondary platform to build passive baseline UK revenue. List stable items with standard shipping turnarounds.'
    }
  };

  return (
    <div id="landing-container" className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans selection:bg-orange-100 selection:text-[#F07125]">
      
      {/* 1. HEADER / NAVBAR (Styled precisely like the premium VoltPeak pattern) */}
      <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur px-6 py-4 lg:px-12 flex items-center justify-between shadow-sm transition-all">
        <div className="flex items-center gap-2">
          <RiseveraLogo className="h-8 w-8" isDarkBackground={false} />
          <div>
            <span className="text-base font-bold tracking-tight text-[#1D2F5C]">RISEVERA</span>
            <span className="block text-[8px] font-bold text-[#F07125] uppercase tracking-widest leading-none">
              Channel Intelligence
            </span>
          </div>
        </div>
        
        {/* Navigation links targeting specific sections */}
        <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
          <a href="#about-us" className="hover:text-[#F07125] transition-colors">About</a>
          <a href="#how-it-works" className="hover:text-[#F07125] transition-colors">How To Use</a>
          <a href="#benefits" className="hover:text-[#F07125] transition-colors">Benefits</a>
          <a href="#marketplace-explorer" className="hover:text-[#F07125] transition-colors">Explorer</a>
          <a href="#pricing" className="hover:text-[#F07125] transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-[#F07125] transition-colors">Success</a>
          <a href="#faqs" className="hover:text-[#F07125] transition-colors">Support</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="landing-login-btn"
            onClick={onStart}
            className="text-xs font-bold text-slate-705 hover:text-[#F07125] bg-slate-50 border border-slate-200/80 px-4 py-2 rounded transition-all cursor-pointer"
          >
            Log In
          </button>
          <button
            id="landing-contact-btn"
            onClick={() => setShowContactModal(true)}
            className="text-xs font-semibold text-white bg-[#1D2F5C] hover:bg-[#F07125] px-4 py-2 rounded transition-all shadow-sm cursor-pointer"
          >
            Contact Co.
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION WITH IMMERSIVE FULL-SCREEN BACKGROUND IMAGE AND GRADIENT TEXT-POP OVERLAY */}
      <section 
        className="relative min-h-[80vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center border-b border-slate-200/60 overflow-hidden bg-cover bg-center md:bg-[center_right_15%] bg-no-repeat"
        style={{ backgroundImage: `url(${heroDashboardImg})` }}
      >
        {/* Full-width responsive white gradient overlay to ensure absolute perfection in typography legibility and pop */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/98 to-white/90 md:from-white via-white/96 md:via-white/90 md:to-transparent z-0" />
        
        {/* Ambient background blur accent behind text column */}
        <div className="absolute left-0 top-0 bottom-0 w-full md:w-[60%] lg:w-[50%] bg-white/25 backdrop-blur-[1px] md:backdrop-blur-none z-0" />

        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text content */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 text-left relative z-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-mono font-semibold text-[#F07125] border border-orange-100/80 animate-fade-in-down">
              <span className="flex h-2 w-2 rounded-full bg-[#F07125] animate-ping" />
              <span>UK SME E-COMMERCE SCENARIO DECISION ENGINE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1D2F5C] tracking-tight leading-[1.08]">
              Fueling the Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F07125] to-orange-500">
                E-Commerce Era.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal max-w-lg">
              Charging your product launches with dynamic, real-time demand scenario scoring. We provide high-speed channel fit assessments designed for the e-commerce mobility of tomorrow. Compare Amazon, Etsy, TikTok, eBay and OnBuy on one screen instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
              <button
                id="start-analysis-btn-hero"
                onClick={onStart}
                className="group flex items-center justify-center gap-1.5 rounded bg-slate-900 text-white font-bold text-xs px-6 py-3.5 shadow-md hover:bg-[#F07125] transition-all cursor-pointer"
              >
                FIND STATION STARTS
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                id="view-sample-report-btn-hero"
                onClick={onViewSample}
                className="flex items-center justify-center gap-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-6 py-3.5 transition-all cursor-pointer"
              >
                VIEW DECISION REPORT
              </button>
            </div>

            {/* Overlapping customer faces pile like VoltPeak */}
            <div className="pt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="h-8 w-8 rounded-full border-2 border-white bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white uppercase ring-1 ring-slate-200">SK</span>
                <span className="h-8 w-8 rounded-full border-2 border-white bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white uppercase ring-1 ring-slate-200">AB</span>
                <span className="h-8 w-8 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-[10px] font-bold text-white uppercase ring-1 ring-slate-200">JL</span>
                <span className="h-8 w-8 rounded-full border-2 border-white bg-rose-500 flex items-center justify-center text-[10px] font-bold text-white uppercase ring-1 ring-slate-200">MS</span>
              </div>
              <div className="text-left leading-none">
                <span className="block text-sm font-black text-slate-900 font-mono tracking-wider">12,400+</span>
                <span className="text-[10px] text-slate-550 font-bold font-mono uppercase">UK Merchants Scored</span>
              </div>
            </div>
          </div>

          {/* Right Spacer Column allowing the elegant full-width background image dashboard visual to be displayed perfectly */}
          <div className="lg:col-span-5 xl:col-span-6 relative h-64 lg:h-auto min-h-[224px] lg:min-h-0 z-10" />
        </div>
      </section>

      {/* 3. KEY STATS BAR */}
      <section className="bg-[#1D2F5C] text-slate-100 py-8 px-6 border-b border-slate-900">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800 font-mono">
          <div className="pt-4 md:pt-0 leading-none">
            <span className="block text-2xl md:text-3xl font-black text-white">570+</span>
            <span className="block text-[9px] text-slate-400 mt-1.5 uppercase font-bold tracking-widest">Premium Scrapers</span>
          </div>
          <div className="pt-4 md:pt-0 leading-none">
            <span className="block text-2xl md:text-3xl font-black text-[#F07125]">2200+</span>
            <span className="block text-[9px] text-slate-400 mt-1.5 uppercase font-bold tracking-widest">Products Scored</span>
          </div>
          <div className="pt-4 md:pt-0 leading-none">
            <span className="block text-2xl md:text-3xl font-black text-white">96.4%</span>
            <span className="block text-[9px] text-slate-400 mt-1.5 uppercase font-bold tracking-widest">Fit Accuracy</span>
          </div>
          <div className="pt-4 md:pt-0 leading-none">
            <span className="block text-2xl md:text-3xl font-black text-[#F07125]">14M+</span>
            <span className="block text-[9px] text-slate-400 mt-1.5 uppercase font-bold tracking-widest">UK Price Nodes</span>
          </div>
          <div className="pt-4 md:pt-0 col-span-2 md:col-span-1 border-t md:border-t-0 border-slate-800 leading-none">
            <span className="block text-2xl md:text-3xl font-black text-white">24/7/365</span>
            <span className="block text-[9px] text-slate-400 mt-1.5 uppercase font-bold tracking-widest">Sync Availability</span>
          </div>
        </div>
      </section>

      {/* 4. ABOUT US SECTION (Styled precisely like VoltPeak text inline layout) */}
      <section id="about-us" className="py-16 sm:py-24 bg-white px-6 border-b border-slate-200/60 leading-normal">
        <div className="max-w-4xl w-full mx-auto text-center space-y-6">
          <span className="block text-[10px] font-black uppercase text-[#F07125] tracking-widest font-mono">
            01 // About Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D2F5C] tracking-tight">
            The Story of Risevera.
          </h2>
          
          {/* Custom paragraph with beautiful custom badges inlined as specified in VoltPeak */}
          <div className="text-lg sm:text-2xl text-slate-800 leading-[1.35] max-w-3xl mx-auto font-normal text-center select-none pt-4">
            <span className="font-extrabold text-slate-900 font-serif">Risevera</span> was founded on a simple mission: to eliminate launch anxiety{' '}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-orange-100 text-[#F07125] text-sm font-semibold border border-orange-200">
              📊 Multi-Channel Data
            </span>{' '}
            and make physical product{' '}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-100 text-blue-700 text-sm font-semibold border border-blue-200">
              ⚡ Effortless Scaling
            </span>{' '}
            possible. We operate a highly scalable network of intelligence algorithms, capturing live pricing{' '}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-100 text-emerald-800 text-sm font-semibold border border-emerald-200">
              📈 Scraped Signal Feeds
            </span>{' '}
            to model optimal retail launch outcomes for professional merchants.
          </div>
        </div>
      </section>

      {/* 5. HOW TO USE - SIMPLE 6 STEPS TO LAUNCH */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 px-6 border-b border-slate-200/80">
        <div className="max-w-6xl w-full mx-auto text-center space-y-12">
          
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase text-[#F07125] tracking-widest font-mono block">
              02 // OPERATIONAL GUIDE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F5C] tracking-tight">
              Simple 6 Steps to Launch
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto font-normal leading-relaxed">
              Scanning and scoring that integrates seamlessly into your merchant workflow. Discover your strongest multi-channel sweet spot in seconds.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center pt-8">
            
            {/* Steps 1-3 (Left Align) */}
            <div className="lg:col-span-4 space-y-8 text-left">
              
              <div className="space-y-2">
                <span className="block text-2xl font-black text-[#F07125] font-mono leading-none">01</span>
                <h4 className="text-sm font-bold text-slate-900">Locate &amp; Input Parameters</h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Enter key variables like base manufacturing unit costs, estimated custom duties, shipping volume metrics, and product category.
                </p>
              </div>

              <div className="space-y-2">
                <span className="block text-2xl font-black text-slate-400 font-mono leading-none">02</span>
                <h4 className="text-sm font-bold text-slate-900">Live Scrape Signals</h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Our cloud scrapers scan real-time UK market volumes and competitor listings, evaluating consumer interest trends immediately.
                </p>
              </div>

              <div className="space-y-2">
                <span className="block text-2xl font-black text-[#F07125] font-mono leading-none">03</span>
                <h4 className="text-sm font-bold text-slate-900">Verify Price Viability</h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Validate target pricing structure after FBA shipping fees, referral commissions, and localized UK VAT taxes are accounted for.
                </p>
              </div>

            </div>

            {/* High-quality 6 Steps Launch Workflow Infographic */}
            <div className="lg:col-span-4 flex justify-center p-2 sm:p-4 animate-fade-in-up">
              <div className="w-full max-w-[340px] rounded-2xl bg-white p-1.5 shadow-xl border border-slate-200/80 overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl">
                <img 
                  src={stepsWorkflowImg} 
                  alt="Risevera 6 Steps Launch Workflow Infographic" 
                  className="w-full h-auto rounded-xl object-contain select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Steps 4-6 (Right Align) */}
            <div className="lg:col-span-4 space-y-8 text-left">
              
              <div className="space-y-2">
                <span className="block text-2xl font-black text-slate-400 font-mono leading-none">04</span>
                <h4 className="text-sm font-bold text-slate-900">Scan Competitor Squeeze</h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Evaluate local listing satuation, reviewing PPC spend and average reviews needed to secure index page traction on the channel.
                </p>
              </div>

              <div className="space-y-2">
                <span className="block text-2xl font-black text-[#F07125] font-mono leading-none">05</span>
                <h4 className="text-sm font-bold text-slate-900">Consolidate CFS Formulas</h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Review calculated weights: Demand signal + Competitive ratio + Pricing indexes outputs a singular Channel Fit Score (CFS/100).
                </p>
              </div>

              <div className="space-y-2">
                <span className="block text-2xl font-black text-slate-400 font-mono leading-none">06</span>
                <h4 className="text-sm font-bold text-slate-900">Launch with Certainty</h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Commit capital, dispatch inventory blocks to verified depots, and trigger ad spend with 100% strategic data validation backing.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. WHY CHOOSE US / BENEFITS */}
      <section id="benefits" className="py-16 sm:py-24 bg-white px-6 border-b border-slate-200/60">
        <div className="max-w-6xl w-full mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-black uppercase text-[#F07125] tracking-widest font-mono block">
              03 // ELITE VALUE DIFFERENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F5C] tracking-tight">
              Why Choose Us: <br className="sm:hidden" /> Your Complete Channel Solution.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
              Why do professional merchants trust Risevera? Because we eliminate costly, unvalidated product experiment trial loops entirely by scanning real market conditions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center pt-6">
            
            {/* Left Col - Detailed features checklist card elements */}
            <div className="space-y-8">
              
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 shrink-0 rounded bg-orange-50 text-[#F07125] flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">Reliability &amp; Risk Guarantees</h4>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed max-w-md">
                    Forget saturated listings and overpaid imports. We check for brand squeeze metrics before you wire capital to factory partners.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 shrink-0 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Zap className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">Pioneering Live Signal Scanning</h4>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed max-w-md">
                    We parse real pricing configurations, target referral tax thresholds, and localized depot postcodes to establish actual net profit yields.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 shrink-0 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">The Simplest UX Flow Available</h4>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed max-w-md">
                    No complex developer API connections required. Simply fill in basic unit parameter limits and get beautiful output recommendations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 shrink-0 rounded bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">Compliance &amp; UK Cross-Border Target Ready</h4>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed max-w-md">
                    Designed particularly for modern merchants navigating strict HMRC guidelines, customs declarations, VAT schedules and warehouse routing.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Col - High-fidelity visual preview block */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#F07125]" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">DECISION DYNAMICS</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-bold">SECURE PIPELINE // ACTIVE</span>
              </div>

              {/* Graphical rating block simulating a complex report overview */}
              <div className="space-y-4">
                <div className="p-4 bg-white border border-slate-100 rounded-xl space-y-2">
                  <div className="flex justify-between items-center font-bold text-slate-800 text-xs">
                    <span>Etsy UK (Category: Woodcrafts)</span>
                    <span className="text-[#F07125]">CFS: 94% Fit</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-400 to-[#F07125] w-[94%]" />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                    <span>DSS: 90 / 100</span>
                    <span>CIS: 14 / 100 (Uncrowded)</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-100 rounded-xl space-y-2">
                  <div className="flex justify-between items-center font-bold text-slate-800 text-xs">
                    <span>Amazon UK (Category: FBA Home)</span>
                    <span className="text-blue-600">CFS: 86% Fit</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-[86%]" />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                    <span>DSS: 99 / 100 (Peak Demand)</span>
                    <span>CIS: 78 / 100 (Highly Crowded)</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-100 rounded-xl space-y-2">
                  <div className="flex justify-between items-center font-bold text-slate-800 text-xs">
                    <span>TikTok Shop UK (Category: Apparel)</span>
                    <span className="text-emerald-600 font-bold">CFS: 91% Fit</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F07125] w-[91%]" />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                    <span>DSS: 96 / 100</span>
                    <span>CIS: 45 / 100</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="block text-[8px] text-slate-400 uppercase font-bold tracking-wider font-mono">RECOMMENDED PRIMARY CHANNEL</span>
                  <span className="font-extrabold text-white text-sm">ETSY UK (Niche Advantage)</span>
                </div>
                <button 
                  onClick={onStart} 
                  className="bg-[#F07125] text-white hover:bg-orange-600 font-bold px-3 py-1.5 rounded text-[10px] uppercase font-mono tracking-wider cursor-pointer"
                >
                  RUN SIM
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 7. INTERACTIVE MARKETPLACE EXPLORER (Matches VoltPeak "Find Best Station Near to Your Location") */}
      <section id="marketplace-explorer" className="py-16 sm:py-24 bg-slate-50 px-6 border-b border-slate-200/80">
        <div className="max-w-6xl w-full mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-black uppercase text-[#F07125] tracking-widest font-mono block">
              04 // DATA SANDBOX EXPLORATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F5C] tracking-tight">
              Find Best Fitting Channels
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
              Explore calculated parameters for major channels. Click a platform tab to see how its dynamic score maps to potential product characteristics.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-8">
            
            {/* Horizontal platform toggle tabs */}
            <div className="flex flex-wrap gap-2 justify-center border-b border-slate-100 pb-6">
              {(['Etsy', 'Amazon', 'TikTok', 'eBay', 'OnBuy'] as const).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSelectedDemoChannel(platform)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedDemoChannel === platform
                      ? 'bg-[#1D2F5C] text-white'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-905 hover:bg-slate-100'
                  }`}
                >
                  {platform} UK
                </button>
              ))}
            </div>

            {/* Dynamic card contents displaying details based on selected state */}
            <div className="grid md:grid-cols-12 gap-8 items-center font-mono text-left">
              
              <div className="md:col-span-4 flex justify-center">
                <div className="h-40 w-40 rounded-full border-8 border-slate-100 flex flex-col items-center justify-center relative bg-slate-50 shadow-inner">
                  <span className="text-5xl font-extrabold text-[#F07125] font-mono leading-none">
                    {demoChannelData[selectedDemoChannel].score}
                  </span>
                  <span className="text-[8px] tracking-widest font-black uppercase text-slate-400 mt-2">
                    CFS SCORE
                  </span>
                  <span className="absolute -top-1 px-2.5 py-0.5 rounded-full bg-orange-100 border border-orange-200 text-[#F07125] text-[8px] font-black tracking-widest uppercase">
                    {demoChannelData[selectedDemoChannel].classification}
                  </span>
                </div>
              </div>

              <div className="md:col-span-8 space-y-4">
                <h3 className="text-xl font-bold font-sans text-slate-900 border-b pb-2 flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#F07125]" />
                  {selectedDemoChannel} Channel Report Summary
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <span className="block text-[9px] text-slate-400 uppercase font-bold">Demand Frequency</span>
                    <span className="text-slate-800 font-bold">{demoChannelData[selectedDemoChannel].demand}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[9px] text-slate-400 uppercase font-bold">Competitor Crowding</span>
                    <span className="text-slate-800 font-bold">{demoChannelData[selectedDemoChannel].competition}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[9px] text-slate-400 uppercase font-bold">Target Price Margin</span>
                    <span className="text-slate-800 font-bold">{demoChannelData[selectedDemoChannel].priceViability}</span>
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <span className="block text-[9px] text-slate-400 uppercase font-bold">Platform Tech Integration</span>
                    <span className="text-emerald-600 font-bold">✓ Sandbox Node Approved</span>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200/50 p-3.5 rounded-lg text-xs leading-relaxed font-sans text-slate-700">
                  <span className="font-extrabold text-[#F07125] font-mono text-[10px] uppercase block mb-1">💡 Executive Advice:</span>
                  {demoChannelData[selectedDemoChannel].advice}
                </div>

                <button
                  onClick={onStart}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1D2F5C] hover:bg-[#F07125] px-4 py-2 rounded transition-all cursor-pointer font-sans"
                >
                  Run Real Scenario Matrix
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 8. PRICING & PLANS (The Smartest Option per Launch) */}
      <section id="pricing" className="py-16 sm:py-24 bg-white px-6 border-b border-[#1D2F5C]/15">
        <div className="max-w-6xl w-full mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-black uppercase text-[#F07125] tracking-widest font-mono block">
              05 // PRICING AND PLANS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F5C] tracking-tight text-center">
              The Smartest Score Per Launch
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed text-center">
              Evaluating parameters without compromising capital security. See how our pricing paths deliver verified pre-launch intelligence metrics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-6">
            
            {/* Tier 1 - Pay As You Go */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 relative flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded bg-[#1D2F5C]/5 text-[#1D2F5C]">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Pay As You Go</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Perfect for exploratory sole traders launching one single item.</p>
                </div>
                <div className="pt-2 border-t border-slate-50">
                  <span className="text-3xl font-black text-[#1D2F5C] font-mono">£0.45</span>
                  <span className="text-xs text-slate-400 font-mono"> / run</span>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">£10 setup pass fee</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-550 pt-2 border-t border-slate-50">
                  <li className="flex gap-2 items-center"><Check className="h-3.5 w-3.5 text-[#F07125] shrink-0" /> Full 5-Platform Index Score</li>
                  <li className="flex gap-2 items-center"><Check className="h-3.5 w-3.5 text-[#F07125] shrink-0" /> Local Pre-Cached Scrapes Only</li>
                  <li className="flex gap-2 items-center"><Check className="h-3.5 w-3.5 text-[#F07125] shrink-0" /> PDF Report Export</li>
                </ul>
              </div>
              <button onClick={onStart} className="w-full py-2.5 mt-6 border border-[#1D2F5C] text-[#1D2F5C] hover:bg-slate-50 text-xs font-bold rounded transition-colors cursor-pointer">
                GET STARTED
              </button>
            </div>

            {/* Tier 2 - SME Growth (Recommended) */}
            <div className="rounded-xl border-2 border-[#F07125] bg-white p-6 relative flex flex-col justify-between shadow-lg hover:shadow-xl transition-all">
              <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#F07125] text-white text-[9px] font-black tracking-widest px-3.5 py-1 rounded-full uppercase leading-none font-mono">
                RECOMMENDED
              </span>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded bg-orange-50 text-[#F07125]">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Monthly Membership</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Best for actively scaling e-commerce merchants and small brands.</p>
                </div>
                <div className="pt-2 border-t border-slate-50">
                  <span className="text-3xl font-black text-[#1D2F5C] font-mono">£99</span>
                  <span className="text-xs text-slate-400 font-mono"> / mo</span>
                  <span className="block text-[9px] font-bold text-[#F07125] uppercase tracking-wider mt-1">Free 7-Day Trial Pass Included</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-550 pt-2 border-t border-slate-50">
                  <li className="flex gap-2 items-center"><Check className="h-3.5 w-3.5 text-[#F07125] shrink-0" /> Unlimited Product Profiles Scored</li>
                  <li className="flex gap-2 items-center"><Check className="h-3.5 w-3.5 text-[#F07125] shrink-0" /> Live Synchronized Scraper Access</li>
                  <li className="flex gap-2 items-center"><Check className="h-3.5 w-3.5 text-[#F07125] shrink-0" /> Real-time UK VAT &amp; Depot Calculations</li>
                </ul>
              </div>
              <button onClick={onStart} className="w-full py-2.5 mt-6 bg-slate-900 text-white hover:bg-[#F07125] text-xs font-bold rounded transition-colors cursor-pointer border-none outline-none">
                LAUNCH TRIAL
              </button>
            </div>

            {/* Tier 3 - Fleet & Business */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 relative flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded bg-[#1D2F5C]/5 text-[#1D2F5C]">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Fleet &amp; Business</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">For professional distribution brands managing 100+ active ASINs.</p>
                </div>
                <div className="pt-2 border-t border-slate-50">
                  <span className="text-3xl font-black text-[#1D2F5C] font-mono">£299</span>
                  <span className="text-xs text-slate-400 font-mono"> / mo</span>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Dedicated Account Coordinator</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-550 pt-2 border-t border-slate-50">
                  <li className="flex gap-2 items-center"><Check className="h-3.5 w-3.5 text-[#F07125] shrink-0" /> Customized Regional API Connectors</li>
                  <li className="flex gap-2 items-center"><Check className="h-3.5 w-3.5 text-[#F07125] shrink-0" /> Master Multi-Country Weight Modules</li>
                  <li className="flex gap-2 items-center"><Check className="h-3.5 w-3.5 text-[#F07125] shrink-0" /> Priority 24/7 Ticketing Helpdesks</li>
                </ul>
              </div>
              <button onClick={() => setShowContactModal(true)} className="w-full py-2.5 mt-6 bg-[#1D2F5C] hover:bg-slate-900 text-white text-xs font-bold rounded transition-colors cursor-pointer border-none">
                CONTACT SALES
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 9. VERIFIED REVIEWS / TESTIMONIALS */}
      <section id="testimonials" className="py-16 sm:py-24 bg-slate-50 px-6 border-b border-slate-200/60">
        <div className="max-w-6xl w-full mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-black uppercase text-[#F07125] tracking-widest font-mono block">
              06 // VERIFIED RESULTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F5C] tracking-tight">
              The Risevera Community
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
              We measure our platform success purely by merchant ROI. See how our pre-launch algorithms helped eliminate launch waste and expand securely.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-6">
            
            <div className="bg-white p-6 border border-slate-150 rounded-xl space-y-4 shadow-sm text-left flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex gap-0.5 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-xs text-slate-650 leading-relaxed font-normal italic">
                  "I was seconds away from purchasing £14,000 of bamboo tableware stock. Ran the Risevera assessment, the score flagged extreme competitor squeeze on Amazon UK. We pivoted the initial batch to Etsy, we went break-even inside 3 days!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <span className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-[#F07125] font-mono">SK</span>
                <div className="leading-none">
                  <span className="block text-xs font-extrabold text-[#1D2F5C]">Sarah K.</span>
                  <span className="text-[9px] text-zinc-500 font-bold font-mono mt-1 block">UK Retailer (Active member)</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-xl space-y-4 shadow-sm text-left flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex gap-0.5 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-xs text-slate-650 leading-relaxed font-normal italic">
                  "As an international shipper landing items from overseas, calculating custom duty compliance is a constant puzzle. Risevera streamlines the whole target postage and depot postal routing validation. Transparent fit indexes."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <span className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 font-mono">AB</span>
                <div className="leading-none">
                  <span className="block text-xs font-extrabold text-[#1D2F5C]">Ayon B.</span>
                  <span className="text-[9px] text-zinc-500 font-bold font-mono mt-1 block">Cross-Border FBA Exporter</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-xl space-y-4 shadow-sm text-left flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex gap-0.5 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-xs text-slate-650 leading-relaxed font-normal italic">
                  "I was highly nervous when launch planning on our latest fashion collection. Running the multi-marketplace scenario weight matrix showed TikTok Shop was the primary conversion path. Highly recommend it to physical brands."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <span className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-800 font-mono">JL</span>
                <div className="leading-none">
                  <span className="block text-xs font-extrabold text-[#1D2F5C]">Jessica L.</span>
                  <span className="text-[9px] text-zinc-500 font-bold font-mono mt-1 block">Fashion &amp; Apparel Director</span>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-4">
            <button
              onClick={onStart}
              className="px-6 py-2.5 bg-slate-900 hover:bg-[#F07125] text-white text-xs font-bold rounded transition-colors shadow-sm cursor-pointer"
            >
              MORE REVIEWS ON METRIC SYSTEM
            </button>
          </div>

        </div>
      </section>

      {/* 10. GOT QUESTIONS? ACCORDION FAQS */}
      <section id="faqs" className="py-16 sm:py-24 bg-white px-6 border-b border-slate-200/80">
        <div className="max-w-3xl w-full mx-auto space-y-12">
          
          <div className="text-center space-y-3 animate-fade-in">
            <span className="text-[10px] font-black uppercase text-[#F07125] tracking-widest font-mono block">
              07 // FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F5C] tracking-tight">
              Got Questions? <br className="sm:hidden" /> Everything You Need to Know.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto font-normal leading-relaxed">
              New to product launch scoring or scaling up online brands? We have assembled the most common responses to secure your setup configuration.
            </p>
          </div>

          <div className="space-y-3 pt-6 text-left">
            {[
              {
                q: "How does the Channel Fit Score (CFS) get consolidated?",
                a: "The CFS consists of five weighted parameters adjusted directly in your Settings Dashboard: Demand Signal Score (30%), Competitor Intensity Score (25%), Price Viability Index (20%), Platform Suitability Index (15%), and Market Entry Risk Score (10%). The final aggregated score yields a highly specific risk recommendation score."
              },
              {
                q: "Can I use the applet in offline sandbox simulation mode?",
                a: "Yes! In this prototype environment, APIs run seamlessly on high-fidelity, pre-cached local scenario caches. You can experience the complete visual wizard flow, change active weights, duplicate test campaigns and export launch reports immediately."
              },
              {
                q: "Do I need real merchant API keys or seller tokens to test it?",
                a: "Absolutely not. Risevera is built specifically to assist *pre-launch* strategy planning. Simply provide estimated unit metrics (weights, raw category, margins) and our scrapers construct comparative fits without requiring deep platform account credentials."
              },
              {
                q: "How does customs duty and tax forecasting operate on Risevera?",
                a: "When inserting registered company country structures (UK, international), the algorithm auto-applies standard HMRC VAT logic rules and custom import margins directly, so estimated margins reflect reality."
              },
              {
                q: "If I find a strong fit score, can I immediately export reports?",
                a: "Yes. Once you complete the Scenario assessment wizard, you are provided with full individual platform reports, executable priority Action step lists, and visual charts. The reports are downloadable to present during distribution review board sessions."
              }
            ].map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-lg bg-white overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 font-sans font-bold text-slate-800 text-xs sm:text-sm text-left hover:bg-slate-50/50 outline-none cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <Minus className="h-4 w-4 text-[#F07125] shrink-0" />
                    ) : (
                      <Plus className="h-4 w-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/20 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 11. SIGN UP & NEWSLETTER FOOTER CARD */}
      <section className="bg-slate-100 border-b border-slate-200 text-center py-16 px-6">
        <div className="max-w-4xl w-full mx-auto bg-white rounded-2xl p-8 border border-slate-205 md:p-12 shadow-md relative overflow-hidden">
          
          <div className="absolute top-0 right-0 h-40 w-40 bg-zinc-50 border-l border-b border-slate-100 rounded-bl-[10rem] flex items-center justify-center -z-10 translate-x-12 -translate-y-12">
            <Mail className="h-6 w-6 text-slate-300 -translate-x-4 translate-y-4" />
          </div>

          <div className="max-w-xl mx-auto space-y-6 text-center">
            
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Sign Up to Received <br className="sm:hidden" /> Risevera News
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Join 5,000+ top UK retail brands. No spam, just fresh scrape summaries, regulatory alerts, and channel pricing opportunities dispatched weekly.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-md mx-auto relative">
              <input
                type="email"
                required
                placeholder="teammate@company.co.uk"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 rounded border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#F07125] focus:outline-none placeholder-slate-400 font-sans transition-colors"
              />
              <button
                type="submit"
                disabled={isSubmittingNews}
                className="bg-slate-900 hover:bg-[#F07125] text-white text-xs font-bold px-5 py-2.5 rounded shadow transition-colors font-mono tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-72"
              >
                {isSubmittingNews ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span>SUBSCRIBE NOW</span>
                )}
              </button>
            </form>

            {newsletterSubscribed && (
              <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded font-semibold text-xs leading-none">
                ★ Success! Welcome to the premium dispatcher loop list.
              </div>
            )}

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-250 bg-white py-12 px-6 lg:px-12 text-center text-xs text-slate-400">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 text-left border-b border-slate-100 font-sans mb-10">
          <div className="space-y-4 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <RiseveraLogo className="h-6 w-6" isDarkBackground={false} />
              <span className="text-sm font-black text-[#1D2F5C] tracking-tight">RISEVERA</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-405 font-normal">
              Empowering professional SME physical-goods merchants with verified pre-launch channel validation insights. Headquartered in London, England.
            </p>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider font-mono">Platform Station</h5>
            <ul className="space-y-2 text-[11px] text-slate-500 font-normal">
              <li><button onClick={onStart} className="hover:text-[#F07125]">Enterprise Sandbox</button></li>
              <li><button onClick={onStart} className="hover:text-[#F07125]">Run Scenarios</button></li>
              <li><button onClick={onViewSample} className="hover:text-[#F07125]">Sample Launch Reports</button></li>
              <li><a href="#marketplace-explorer" className="hover:text-[#F07125]">Channel Fit Index</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider font-mono">Channel Resource</h5>
            <ul className="space-y-2 text-[11px] text-slate-500 font-normal">
              <li><a href="#faqs" className="hover:text-[#F07125]">Platform FAQs</a></li>
              <li><a href="#about-us" className="hover:text-[#F07125]">Our Corporate Mission</a></li>
              <li><button onClick={() => setShowContactModal(true)} className="hover:text-[#F07125]">Request Consult</button></li>
              <li><span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[9px] font-bold font-mono inline-block">SYSTEM: ACTIVE</span></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider font-mono">Connect Dispatch</h5>
            <div className="flex gap-3 text-slate-500 pb-2">
              <span className="text-[11px] font-bold font-mono bg-slate-50 p-1 border rounded">LN</span>
              <span className="text-[11px] font-bold font-mono bg-slate-50 p-1 border rounded">FB</span>
              <span className="text-[11px] font-bold font-mono bg-slate-50 p-1 border rounded">TW</span>
            </div>
            <p className="text-[10px] text-slate-400">support@risevera.com.uk</p>
          </div>
        </div>

        <div className="max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-normal text-slate-400">
          <p>© 2026 RISEVERA Ltd. All rights reserved. Registered in England &amp; Wales under Corporate No. 14073352.</p>
          <div className="flex gap-4">
            <a href="#about-us" className="hover:underline">Terms of Service</a>
            <span>•</span>
            <a href="#about-us" className="hover:underline">Privacy &amp; compliance</a>
          </div>
        </div>
      </footer>

      {/* CONTACT MODAL FORM */}
      {showContactModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-6 text-left relative animate-fade-in-up">
            
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">Enterprise Consult Ticket</h3>
                <p className="text-[10px] text-slate-400 mt-1">Submit your parameters to dispatch a custom scenario profile.</p>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <Plus className="h-5 w-5 rotate-45" />
              </button>
            </div>

            {contactFormSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="h-10 w-10 bg-emerald-50 rounded-full text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="h-6 w-6 stroke-[3]" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Consult Request Dispatched</h4>
                <p className="text-xs text-slate-500 leading-normal font-normal">Our commercial team will contact wdotanwar@gmail.com within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-semibold">
                <div className="space-y-1">
                  <label className="block text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Muhammad Suleman"
                    className="w-full text-xs p-2.5 rounded border border-slate-200 focus:border-[#F07125] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-700">Corporate Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="teammate@company.co.uk"
                    className="w-full text-xs p-2.5 rounded border border-slate-200 focus:border-[#F07125] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-705">Specific Channel / Category Details</label>
                  <textarea
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Details about your planned launch niche..."
                    className="w-full text-xs p-2.5 rounded border border-slate-200 focus:border-[#F07125] focus:outline-none font-sans"
                  />
                </div>
                
                <div className="pt-2 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-slate-900 hover:bg-[#F07125] text-white rounded shadow transition-colors font-mono tracking-wider cursor-pointer"
                  >
                    SUBMIT consult
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
