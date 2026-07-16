import { useState } from 'react';
import { Search, Filter, Trash, Copy, FileText, CheckCircle, Clock, MoreVertical, ExternalLink, HelpCircle, AlertCircle } from 'lucide-react';
import { SavedAnalysis, CFSClassification, ScreenId } from '../types';

interface SavedAnalysesViewProps {
  savedAnalyses: SavedAnalysis[];
  onSelectProductAnalysis: (analysis: SavedAnalysis) => void;
  onNavigate: (screen: ScreenId) => void;
  onDeleteAnalysis: (id: string) => void;
  onDuplicateAnalysis: (analysis: SavedAnalysis) => void;
}

export default function SavedAnalysesView({
  savedAnalyses,
  onSelectProductAnalysis,
  onNavigate,
  onDeleteAnalysis,
  onDuplicateAnalysis
}: SavedAnalysesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');

  // Extract categories dynamically
  const categories = ['All', ...Array.from(new Set(savedAnalyses.map(a => a.category)))];

  // Filter items
  const filteredList = savedAnalyses.filter(item => {
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesClass = classFilter === 'All' || item.classification === classFilter;
    return matchesSearch && matchesCategory && matchesClass;
  });

  return (
    <div id="saved-analyses-view" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Saved Marketplace Analyses</h2>
          <p className="text-xs text-slate-500 mt-0.5">Access previously executed Channel Fit Score evaluations</p>
        </div>
        <button
          onClick={() => onNavigate('wizard')}
          className="px-4 py-2 bg-slate-900 text-white rounded-md text-xs font-semibold hover:bg-emerald-600 transition-all cursor-pointer"
        >
          + Run New Analysis
        </button>
      </div>

      {/* Control filters panel */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm grid gap-4 sm:grid-cols-4">
        {/* Search */}
        <div className="sm:col-span-2 relative">
          <input
            type="text"
            placeholder="Search saved products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-3 pr-3 py-2 text-xs border border-slate-200 bg-slate-50 rounded focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Category filter */}
        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-2 py-2 text-xs border border-slate-200 bg-slate-50 rounded focus:bg-white focus:outline-none"
          >
            <option value="All">All Categories</option>
            {categories.filter(c => c !== 'All').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Classification filter */}
        <div>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="w-full px-2 py-2 text-xs border border-slate-200 bg-slate-50 rounded focus:bg-white focus:outline-none"
          >
            <option value="All">All Fit Ratings</option>
            <option value="Strong Fit">Strong Fit Only</option>
            <option value="Moderate Fit">Moderate Fit Only</option>
            <option value="Weak Fit">Weak Fit Only</option>
          </select>
        </div>
      </div>

      {/* Saved table list */}
      <div className="bg-white rounded-xl border border-slate-202 shadow-sm overflow-hidden">
        {filteredList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 uppercase tracking-widest text-[9px] font-extrabold">
                  <th className="py-3 px-4 font-bold">Product Name</th>
                  <th className="py-3 px-4 font-bold">Analysis Type</th>
                  <th className="py-3 px-4 font-bold">Best Channel</th>
                  <th className="py-3 px-4 text-center font-bold">CFS Score</th>
                  <th className="py-3 px-4 text-center font-bold">Rating</th>
                  <th className="py-3 px-4 font-bold">Created Date</th>
                  <th className="py-3 px-4 font-bold">Report Status</th>
                  <th className="py-3 px-4 text-right font-bold pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {filteredList.map((item) => {
                  let badge = 'bg-rose-50 text-rose-700 border-rose-100';
                  if (item.classification === 'Strong Fit') {
                    badge = 'bg-emerald-50 text-emerald-700 border-emerald-100';
                  } else if (item.classification === 'Moderate Fit') {
                    badge = 'bg-amber-50 text-amber-700 border-amber-100';
                  }

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <button
                          onClick={() => onSelectProductAnalysis(item)}
                          className="hover:text-[#F07125] hover:underline text-left block font-bold"
                        >
                          {item.product}
                        </button>
                        <span className="block text-[10px] text-slate-400 font-normal mt-0.5">{item.category}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-block rounded bg-slate-100 text-slate-600 px-1.5 py-0.5 text-[9.5px]">
                          {item.type}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-slate-800">{item.bestChannel}</span>
                        <span className="block text-[9px] text-slate-400 uppercase tracking-wider font-mono">
                          {item.inputData.selectedCountries?.[0] || 'UK'} Standard
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="font-mono text-sm font-black text-slate-900">{item.cfs}</span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[9.5px] border ${badge}`}>
                          {item.classification}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400 font-normal">
                        {item.createdDate}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#F07125]">
                          <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>Generated</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          {/* Open */}
                          <button
                            onClick={() => onSelectProductAnalysis(item)}
                            className="p-1.5 text-slate-500 hover:bg-slate-100 rounded hover:text-slate-800 transition-colors"
                            title="Open assessment results"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>

                          {/* Duplicate */}
                          <button
                            onClick={() => onDuplicateAnalysis(item)}
                            className="p-1.5 text-slate-400 hover:bg-slate-110 hover:text-[#F07125] rounded transition-colors"
                            title="Duplicate analysis profile"
                          >
                            <Copy className="h-4 w-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => onDeleteAnalysis(item.id)}
                            className="p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded transition-colors"
                            title="Remove analysis history"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400">
            <AlertCircle className="h-8 w-8 text-slate-350 mx-auto mb-2" />
            <p className="text-xs">No analysis files found matching search conditions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
