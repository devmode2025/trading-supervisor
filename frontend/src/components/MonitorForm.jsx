import { useState } from 'react';

function MonitorForm({ onCalculate, result }) {
  const [currentPrice, setCurrentPrice] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [tier1Target, setTier1Target] = useState('');
  const [tier2Target, setTier2Target] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const currentNum = parseFloat(currentPrice);
      const entryNum = parseFloat(entryPrice);
      const stopNum = parseFloat(stopLoss);
      const tier1Num = parseFloat(tier1Target);
      const tier2Num = parseFloat(tier2Target);

      if (!currentPrice || !entryPrice || !stopLoss || !tier1Target || !tier2Target) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (isNaN(currentNum) || isNaN(entryNum) || isNaN(stopNum) || isNaN(tier1Num) || isNaN(tier2Num)) {
        setError('Please enter valid numbers');
        setLoading(false);
        return;
      }

      await onCalculate({
        current_price: currentNum,
        entry_price: entryNum,
        stop_loss: stopNum,
        tier_1_target: tier1Num,
        tier_2_target: tier2Num
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to monitor setup. Please try again.');
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setCurrentPrice('1025');
    setEntryPrice('1000');
    setStopLoss('990');
    setTier1Target('1050');
    setTier2Target('1100');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Current Price */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Current Price
          </label>
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            placeholder="e.g., 1025"
            step="0.01"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500 text-sm"
          />
        </div>

        {/* Entry Price */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Entry Price
          </label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            placeholder="e.g., 1000"
            step="0.01"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500 text-sm"
          />
        </div>

        {/* Stop Loss */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Stop Loss Price
          </label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            placeholder="e.g., 990"
            step="0.01"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500 text-sm"
          />
        </div>

        {/* Tier 1 Target */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Tier 1 Target
          </label>
          <input
            type="number"
            value={tier1Target}
            onChange={(e) => setTier1Target(e.target.value)}
            placeholder="e.g., 1050"
            step="0.01"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500 text-sm"
          />
        </div>

        {/* Tier 2 Target */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Tier 2 Target
          </label>
          <input
            type="number"
            value={tier2Target}
            onChange={(e) => setTier2Target(e.target.value)}
            placeholder="e.g., 1100"
            step="0.01"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500 text-sm"
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
            className="flex-1 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Monitoring...' : 'Monitor Setup'}
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
          <p className="text-xs text-slate-400 mb-3">Live Setup Monitor</p>

          {/* Status Badge */}
          <div className={`px-4 py-3 rounded border-2 text-center ${
            result.status === 'ACTIVE' 
              ? 'bg-green-900/30 border-green-500' 
              : 'bg-yellow-900/30 border-yellow-500'
          }`}>
            <p className="text-xs text-slate-300 mb-1">Status</p>
            <p className={`font-bold text-2xl ${
              result.status === 'ACTIVE' ? 'text-green-300' : 'text-yellow-300'
            }`}>
              {result.status || 'N/A'}
            </p>
          </div>

          {/* Alert */}
          {result.alert && (
            <div className="bg-red-900/50 border border-red-500 rounded px-3 py-2 text-red-200 text-sm font-bold">
              ⚠️ {result.alert}
            </div>
          )}

          {/* Distance Metrics */}
          <div className="space-y-2">
            <p className="text-xs text-slate-400 mb-2">Distance Metrics:</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-600/50 px-3 py-2 rounded text-center">
                <p className="text-xs text-slate-400">To Entry</p>
                <p className="font-mono font-bold text-sm text-cyan-300">
                  {result.distance_to_entry !== undefined ? `${result.distance_to_entry > 0 ? '+' : ''}${result.distance_to_entry}` : 'N/A'}
                </p>
              </div>
              <div className="bg-slate-600/50 px-3 py-2 rounded text-center">
                <p className="text-xs text-slate-400">To Stop</p>
                <p className="font-mono font-bold text-sm text-red-300">
                  {result.distance_to_stop !== undefined ? `${result.distance_to_stop > 0 ? '+' : ''}${result.distance_to_stop}` : 'N/A'}
                </p>
              </div>
              <div className="bg-slate-600/50 px-3 py-2 rounded text-center">
                <p className="text-xs text-slate-400">To Tier 1</p>
                <p className="font-mono font-bold text-sm text-green-300">
                  {result.distance_to_tier1 !== undefined ? `${result.distance_to_tier1 > 0 ? '+' : ''}${result.distance_to_tier1}` : 'N/A'}
                </p>
              </div>
              <div className="bg-slate-600/50 px-3 py-2 rounded text-center">
                <p className="text-xs text-slate-400">Current Price</p>
                <p className="font-mono font-bold text-sm text-slate-300">
                  ${result.current_price || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Timestamp */}
          {result.timestamp && (
            <div className="text-xs text-slate-500 pt-2">
              Updated: {new Date(result.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MonitorForm;

