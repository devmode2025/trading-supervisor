import { useState } from 'react';

function TierForm({ onCalculate, result }) {
  const [entryPrice, setEntryPrice] = useState('');
  const [entrySize, setEntrySize] = useState('');
  const [tier1Target, setTier1Target] = useState('');
  const [tier2Target, setTier2Target] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      const entryPriceNum = parseFloat(entryPrice);
      const entrySizeNum = parseInt(entrySize);
      const tier1TargetNum = parseFloat(tier1Target);
      const tier2TargetNum = parseFloat(tier2Target);
      const currentPriceNum = parseFloat(currentPrice);
      const stopPriceNum = parseFloat(stopPrice);

      if (!entryPrice || !entrySize || !tier1Target || !tier2Target || !currentPrice || !stopPrice) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (isNaN(entryPriceNum) || isNaN(entrySizeNum) || isNaN(tier1TargetNum) || 
          isNaN(tier2TargetNum) || isNaN(currentPriceNum) || isNaN(stopPriceNum)) {
        setError('Please enter valid numbers');
        setLoading(false);
        return;
      }

      if (tier2TargetNum <= tier1TargetNum) {
        setError('Tier 2 target must be greater than Tier 1 target');
        setLoading(false);
        return;
      }

      // Call the calculation function
      await onCalculate({
        entry_price: entryPriceNum,
        entry_size: entrySizeNum,
        tier_1_target: tier1TargetNum,
        tier_2_target: tier2TargetNum,
        current_price: currentPriceNum,
        stop_price: stopPriceNum
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to calculate. Please try again.');
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setEntryPrice('19800');
    setEntrySize('100');
    setTier1Target('19900');
    setTier2Target('20000');
    setCurrentPrice('19950');
    setStopPrice('19750');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Entry Price */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Entry Price
          </label>
          <input
            type="number"
            step="0.01"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            placeholder="e.g., 19800"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        {/* Entry Size */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Entry Size (contracts)
          </label>
          <input
            type="number"
            step="1"
            value={entrySize}
            onChange={(e) => setEntrySize(e.target.value)}
            placeholder="e.g., 100"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        {/* Tier 1 Target */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Tier 1 Target (55% exit)
          </label>
          <input
            type="number"
            step="0.01"
            value={tier1Target}
            onChange={(e) => setTier1Target(e.target.value)}
            placeholder="e.g., 19900"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        {/* Tier 2 Target */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Tier 2 Target (30% exit)
          </label>
          <input
            type="number"
            step="0.01"
            value={tier2Target}
            onChange={(e) => setTier2Target(e.target.value)}
            placeholder="e.g., 20000"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        {/* Current Price */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Current Price
          </label>
          <input
            type="number"
            step="0.01"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            placeholder="e.g., 19950"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        {/* Stop Price */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Stop Loss Price
          </label>
          <input
            type="number"
            step="0.01"
            value={stopPrice}
            onChange={(e) => setStopPrice(e.target.value)}
            placeholder="e.g., 19750"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
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
            className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Calculating...' : 'Calculate Tiers'}
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
          <p className="text-xs text-slate-400 mb-3">Position Management Results</p>

          {/* PnL Display */}
          <div className={`px-4 py-3 rounded ${
            result.pnl_dollars >= 0
              ? 'bg-green-900/30 border-2 border-green-500'
              : 'bg-red-900/30 border-2 border-red-500'
          }`}>
            <div className="text-center">
              <p className="text-sm text-slate-300 mb-1">Current P&L</p>
              <p className={`font-mono font-bold text-3xl ${
                result.pnl_dollars >= 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                ${result.pnl_dollars?.toFixed(2) || '0.00'}
              </p>
              <p className={`text-lg font-bold ${
                result.pnl_percent >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {result.pnl_percent >= 0 ? '+' : ''}{result.pnl_percent?.toFixed(2) || '0.00'}%
              </p>
            </div>
          </div>

          {/* Tier Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`px-3 py-2 rounded ${
              result.tier_1_filled ? 'bg-green-900/50' : 'bg-slate-600/50'
            }`}>
              <p className="text-xs text-slate-400">Tier 1 (55%)</p>
              <p className={`font-bold text-lg ${
                result.tier_1_filled ? 'text-green-300' : 'text-slate-400'
              }`}>
                {result.tier_1_filled ? '✓ Filled' : '○ Pending'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Exit: {result.tier_1_exit_size || 0} contracts
              </p>
            </div>
            <div className={`px-3 py-2 rounded ${
              result.tier_2_filled ? 'bg-green-900/50' : 'bg-slate-600/50'
            }`}>
              <p className="text-xs text-slate-400">Tier 2 (30%)</p>
              <p className={`font-bold text-lg ${
                result.tier_2_filled ? 'text-green-300' : 'text-slate-400'
              }`}>
                {result.tier_2_filled ? '✓ Filled' : '○ Pending'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Exit: {result.tier_2_exit_size || 0} contracts
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="pt-3 mt-3 border-t border-slate-600 space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">New Stop:</span>
              <span className="font-mono text-white">
                {result.new_stop?.toFixed(2) || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Distance to Tier 1:</span>
              <span className="font-mono text-white">
                {result.distance_to_tier_1?.toFixed(2) || 'N/A'} points
              </span>
            </div>
          </div>

          {/* Timestamp */}
          {result.timestamp && (
            <div className="text-xs text-slate-500 pt-2">
              Calculated: {new Date(result.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TierForm;

