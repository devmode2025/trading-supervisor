import { useState } from 'react';

function PreTradeForm({ onCalculate, result }) {
  const [confluenceScore, setConfluenceScore] = useState('');
  const [riskAmount, setRiskAmount] = useState('');
  const [positionSize, setPositionSize] = useState('');
  const [tier1Target, setTier1Target] = useState('');
  const [tier2Target, setTier2Target] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const confluenceNum = parseInt(confluenceScore);
      const riskNum = parseFloat(riskAmount);
      const positionNum = parseFloat(positionSize);
      const tier1Num = parseFloat(tier1Target);
      const tier2Num = parseFloat(tier2Target);

      if (!confluenceScore || !riskAmount || !positionSize || !tier1Target || !tier2Target) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (isNaN(confluenceNum) || isNaN(riskNum) || isNaN(positionNum) || isNaN(tier1Num) || isNaN(tier2Num)) {
        setError('Please enter valid numbers');
        setLoading(false);
        return;
      }

      if (confluenceNum < 0 || confluenceNum > 100) {
        setError('Confluence score must be between 0 and 100');
        setLoading(false);
        return;
      }

      await onCalculate({
        confluence_score: confluenceNum,
        risk_amount: riskNum,
        position_size: positionNum,
        tier_1_target: tier1Num,
        tier_2_target: tier2Num
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to generate report. Please try again.');
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setConfluenceScore('75');
    setRiskAmount('50');
    setPositionSize('100');
    setTier1Target('1050');
    setTier2Target('1100');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Confluence Score */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Confluence Score (0-100)
          </label>
          <input
            type="number"
            value={confluenceScore}
            onChange={(e) => setConfluenceScore(e.target.value)}
            placeholder="e.g., 75"
            min="0"
            max="100"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-green-500 text-sm"
          />
        </div>

        {/* Risk Amount */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Risk Amount ($)
          </label>
          <input
            type="number"
            value={riskAmount}
            onChange={(e) => setRiskAmount(e.target.value)}
            placeholder="e.g., 50"
            step="0.01"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-green-500 text-sm"
          />
        </div>

        {/* Position Size */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Position Size (contracts)
          </label>
          <input
            type="number"
            value={positionSize}
            onChange={(e) => setPositionSize(e.target.value)}
            placeholder="e.g., 100"
            step="0.01"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-green-500 text-sm"
          />
        </div>

        {/* Tier 1 Target */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Tier 1 Target Price
          </label>
          <input
            type="number"
            value={tier1Target}
            onChange={(e) => setTier1Target(e.target.value)}
            placeholder="e.g., 1050"
            step="0.01"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-green-500 text-sm"
          />
        </div>

        {/* Tier 2 Target */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Tier 2 Target Price
          </label>
          <input
            type="number"
            value={tier2Target}
            onChange={(e) => setTier2Target(e.target.value)}
            placeholder="e.g., 1100"
            step="0.01"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-green-500 text-sm"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded px-3 py-2 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
          <button
            type="button"
            onClick={handleQuickFill}
            disabled={loading}
            className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-sm transition disabled:opacity-50"
          >
            Quick Fill
          </button>
        </div>
      </form>

      {/* Results Display */}
      {result && (
        <div className="mt-4 bg-slate-700 p-4 rounded space-y-3">
          <p className="text-xs text-slate-400 mb-3">Pre-Trade Checklist</p>

          {/* Overall Recommendation */}
          <div className={`px-4 py-4 rounded border-2 ${
            result.checklist?.overall_recommendation === 'GO' 
              ? 'bg-green-900/30 border-green-500' 
              : 'bg-red-900/30 border-red-500'
          }`}>
            <div className="text-center">
              <p className="text-sm text-slate-300 mb-2">Overall Recommendation</p>
              <p className={`font-bold text-3xl ${
                result.checklist?.overall_recommendation === 'GO' 
                  ? 'text-green-300' 
                  : 'text-red-300'
              }`}>
                {result.checklist?.overall_recommendation || 'N/A'}
              </p>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-2">
            <p className="text-xs text-slate-400 mb-2">Checklist Items:</p>
            <div className={`px-3 py-2 rounded text-sm ${
              result.checklist?.setup_quality === 'GO' 
                ? 'bg-green-900/30 border border-green-500' 
                : 'bg-red-900/30 border border-red-500'
            }`}>
              <span className={result.checklist?.setup_quality === 'GO' ? 'text-green-300' : 'text-red-300'}>
                ✓ Setup Quality: {result.checklist?.setup_quality || 'N/A'}
              </span>
            </div>
            <div className={`px-3 py-2 rounded text-sm ${
              result.checklist?.risk_management === 'GO' 
                ? 'bg-green-900/30 border border-green-500' 
                : 'bg-red-900/30 border border-red-500'
            }`}>
              <span className={result.checklist?.risk_management === 'GO' ? 'text-green-300' : 'text-red-300'}>
                ✓ Risk Management: {result.checklist?.risk_management || 'N/A'}
              </span>
            </div>
            <div className={`px-3 py-2 rounded text-sm ${
              result.checklist?.position_sizing === 'GO' 
                ? 'bg-green-900/30 border border-green-500' 
                : 'bg-red-900/30 border border-red-500'
            }`}>
              <span className={result.checklist?.position_sizing === 'GO' ? 'text-green-300' : 'text-red-300'}>
                ✓ Position Sizing: {result.checklist?.position_sizing || 'N/A'}
              </span>
            </div>
          </div>

          {/* Trade Details */}
          <div className="pt-3 mt-3 border-t border-slate-600">
            <p className="text-xs text-slate-400 mb-2">Trade Details:</p>
            <div className="space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>• Confluence Score:</span>
                <span className="font-mono">{result.confluence_score || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>• Risk Amount:</span>
                <span className="font-mono">${result.risk_amount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>• Position Size:</span>
                <span className="font-mono">{result.position_size || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>• Tier 1 Target:</span>
                <span className="font-mono">${result.tier_1_target || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>• Tier 2 Target:</span>
                <span className="font-mono">${result.tier_2_target || 0}</span>
              </div>
            </div>
          </div>

          {/* Timestamp */}
          {result.timestamp && (
            <div className="text-xs text-slate-500 pt-2">
              Generated: {new Date(result.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PreTradeForm;

