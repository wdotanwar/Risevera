import { useState, useEffect } from 'react';
import { ScreenId, SavedAnalysis, MarketplaceScore, ProductInput } from './types';
import { INITIAL_SCORES, INITIAL_SAVED_ANALYSES } from './data';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import LandingView from './components/LandingView';
import DashboardView from './components/DashboardView';
import WizardView from './components/WizardView';
import ResultsView from './components/ResultsView';
import ComparisonView from './components/ComparisonView';
import SavedAnalysesView from './components/SavedAnalysesView';
import ReportView from './components/ReportView';
import SubscriptionView from './components/SubscriptionView';
import SettingsView from './components/SettingsView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>(INITIAL_SAVED_ANALYSES);
  
  // Accessibility text size state
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>(() => {
    return (localStorage.getItem('risevera-text-size') as 'normal' | 'large' | 'xlarge') || 'normal';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    root.classList.add(`text-size-${textSize}`);
    localStorage.setItem('risevera-text-size', textSize);
  }, [textSize]);

  // Active assessment states
  const [activeAnalysis, setActiveAnalysis] = useState<SavedAnalysis | null>(INITIAL_SAVED_ANALYSES[0]);
  const [activeScores, setActiveScores] = useState<MarketplaceScore[]>(INITIAL_SCORES);
  const [selectedMarketplaceDetailName, setSelectedMarketplaceDetailName] = useState<string | null>(null);

  // Layout states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [preselectedWizardType, setPreselectedWizardType] = useState<'New Product Launch' | 'Channel Rescue' | 'Global Expansion' | null>(null);

  // Handlers
  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    // Reset secondary drilldowns when moving screens
    setSelectedMarketplaceDetailName(null);
  };

  const handleSelectProductAnalysis = (analysis: SavedAnalysis) => {
    setActiveAnalysis(analysis);
    
    // Dynamically regenerate or mock the scores cascade if they select a custom one
    // Let's seed scores based on whether it is the standard baby cup mock or custom
    if (analysis.product === "Bamboo Baby Feeding Set") {
      setActiveScores(INITIAL_SCORES);
    } else {
      // Create interesting deterministic scores depending on product parameters
      const nameSeed = analysis.product.length;
      const scoresMock: MarketplaceScore[] = analysis.inputData.selectedMarketplaces.map((mp, index) => {
        let dss = 70 + (nameSeed % 3) * 5 + (index % 2) * 4;
        let cis = 65 + (index % 3) * 7;
        let pvi = 75 + (index % 2) * 5;
        let psf = 80 + (index % 2) * 6;
        let mers = 72 - (index % 2) * 8;

        if (mp.includes('Etsy')) {
          psf = 88; cis = 81; pvi = 84; dss = 76; mers = 74;
        } else if (mp.includes('Amazon')) {
          dss = 93; cis = 45; pvi = 61; psf = 78; mers = 62;
        } else if (mp.includes('TikTok')) {
          dss = 82; cis = 64; pvi = 73; psf = 85; mers = 78;
        } else if (mp.includes('eBay')) {
          dss = 64; cis = 58; pvi = 68; psf = 56; mers = 45;
        } else {
          dss = 48; cis = 52; pvi = 58; psf = 46; mers = 32;
        }

        const totalCFS = Math.round(dss * 0.3 + cis * 0.25 + pvi * 0.2 + psf * 0.15 + mers * 0.1);
        let classification: 'Strong Fit' | 'Moderate Fit' | 'Weak Fit' | 'No Fit' = 'Moderate Fit';
        if (totalCFS >= 80) classification = 'Strong Fit';
        else if (totalCFS < 60 && totalCFS >= 40) classification = 'Weak Fit';
        else if (totalCFS < 40) classification = 'No Fit';

        return {
          marketplace: mp,
          country: 'UK',
          DSS: dss,
          CIS: cis,
          PVI: pvi,
          PSF: psf,
          MERS: mers,
          CFS: totalCFS,
          classification,
          action: totalCFS >= 80 ? 'Launch first' : totalCFS >= 60 ? 'Secondary focus' : 'Do not prioritize',
          reason: `Analysis calculated from customized parameters for ${analysis.product}.`
        };
      });

      scoresMock.sort((a,b)=>b.CFS - a.CFS);
      setActiveScores(scoresMock);
    }

    setSelectedMarketplaceDetailName(null);
    setCurrentScreen('results');
  };

  const handleStartWizardType = (type: 'New Product Launch' | 'Channel Rescue' | 'Global Expansion') => {
    setPreselectedWizardType(type);
    setCurrentScreen('wizard');
  };

  const handleClearPreselect = () => {
    setPreselectedWizardType(null);
  };

  const handleAddAnalysis = (completedAnalysis: SavedAnalysis, calculatedScores: MarketplaceScore[]) => {
    // Prepend to savedAnalyses so it lists on recent dashboard accurately
    setSavedAnalyses(prev => [completedAnalysis, ...prev]);
    setActiveAnalysis(completedAnalysis);
    setActiveScores(calculatedScores);
  };

  const handleDeleteAnalysis = (id: string) => {
    if (confirm("Delete this completed analysis card history?")) {
      setSavedAnalyses(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleDuplicateAnalysis = (analysis: SavedAnalysis) => {
    const duplicated: SavedAnalysis = {
      ...analysis,
      id: String(Date.now()),
      product: `${analysis.product} (Copy)`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setSavedAnalyses(prev => [duplicated, ...prev]);
  };

  const handleNavigateToResults = (analysis: SavedAnalysis, scores: MarketplaceScore[]) => {
    setActiveAnalysis(analysis);
    setActiveScores(scores);
    setSelectedMarketplaceDetailName(null);
    setCurrentScreen('results');
  };

  const handleLogout = () => {
    setCurrentScreen('landing');
  };

  const handleStartFromLanding = () => {
    // Dispatches user straight into Dashboard
    handleNavigate('dashboard');
  };

  const handleViewSampleReport = () => {
    // Pre-populate with sample baby feeds analysis, first saved analysis, then open preview report Screen 9
    setActiveAnalysis(savedAnalyses[0]);
    setActiveScores(INITIAL_SCORES);
    handleNavigate('report_preview');
  };

  // Render full Landing Experience
  if (currentScreen === 'landing') {
    return (
      <LandingView
        onStart={handleStartFromLanding}
        onViewSample={handleViewSampleReport}
      />
    );
  }

  // App Master layout wrapper for logged-in screens
  return (
    <div id="master-layout" className="flex h-screen w-screen bg-[#f1f5f9] overflow-hidden font-sans">
      
      {/* Responsive Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        onStartSpecificWizard={handleStartWizardType}
      />

      {/* Main Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* Sticky Header TopBar */}
        <TopBar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onNavigate={handleNavigate}
          textSize={textSize}
          onChangeTextSize={setTextSize}
        />

        {/* Dynamic Main Canvas View wrapper */}
        <main id="main-content-canvas" className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 bg-[#f8fafc]">
          
          {currentScreen === 'dashboard' && (
            <DashboardView
              savedAnalyses={savedAnalyses}
              onNavigate={handleNavigate}
              onSelectProductAnalysis={handleSelectProductAnalysis}
              onStartWizardType={handleStartWizardType}
            />
          )}

          {currentScreen === 'wizard' && (
            <WizardView
              onAddAnalysis={handleAddAnalysis}
              onNavigateToResults={handleNavigateToResults}
              preselectedType={preselectedWizardType}
              onClearPreselect={handleClearPreselect}
            />
          )}

          {currentScreen === 'results' && (
            <ResultsView
              analysis={activeAnalysis}
              scores={activeScores}
              onNavigate={handleNavigate}
              onSelectMarketplaceDetail={setSelectedMarketplaceDetailName}
              selectedMarketplaceDetailName={selectedMarketplaceDetailName}
            />
          )}

          {currentScreen === 'comparison' && (
            <ComparisonView
              analysis={activeAnalysis}
              scores={activeScores}
              onNavigate={handleNavigate}
              onSelectMarketplaceDetail={setSelectedMarketplaceDetailName}
            />
          )}

          {currentScreen === 'saved_analyses' && (
            <SavedAnalysesView
              savedAnalyses={savedAnalyses}
              onSelectProductAnalysis={handleSelectProductAnalysis}
              onNavigate={handleNavigate}
              onDeleteAnalysis={handleDeleteAnalysis}
              onDuplicateAnalysis={handleDuplicateAnalysis}
            />
          )}

          {currentScreen === 'report_preview' && (
            <ReportView
              analysis={activeAnalysis}
              scores={activeScores}
              onNavigate={handleNavigate}
            />
          )}

          {currentScreen === 'subscription' && (
            <SubscriptionView
              onNavigate={handleNavigate}
            />
          )}

          {currentScreen === 'settings' && (
            <SettingsView
              onNavigate={handleNavigate}
              textSize={textSize}
              onChangeTextSize={setTextSize}
            />
          )}

        </main>
      </div>
    </div>
  );
}
