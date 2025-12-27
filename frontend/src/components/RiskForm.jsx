import { useState } from 'react';

function RiskForm({ onCalculate, result }) {
  const [accountSize, setAccountSize] = useState('');
  const [riskPercent, setRiskPercent] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const accountNum = parseFloat(accountSize);
      const riskNum = parseFloat(riskPercent);
      const entryNum = parseFloat(entryPrice);
      const stopNum = parseFloat(stopLoss);
      const targetNum = targetPrice ? parseFloat(targetPrice) : null;

      if (!accountSize || !riskPercent || !entryPrice || !stopLoss) {
        setError('Please fill in required fields');
        setLoading(false);
        return;
      }

      if (isNaN(accountNum) || isNaN(riskNum) || isNaN(entryNum) || isNaN(stopNum)) {
        setError('Please enter valid numbers');
        setLoading(false);
        return;
      }

      if (riskNum < 0 || riskNum > 10) {
        setError('Risk percent must be between 0 and 10%');
        setLoading(false);
        return;
      }

      await onCalculate({
        account_size: accountNum,
        risk_percent: riskNum,
        entry_price: entryNum,
        stop_loss: stopNum,
        target_price: targetNum
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to calculate risk. Please try again.');
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setAccountSize('10000');
    setRiskPercent('1.5');
    setEntryPrice('1000');
    setStopLoss('990');
    setTargetPrice('1050');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Account Size */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Account Size ($)
          </label>
          <input
            type="number"
            value={accountSize}
            onChange={(e) => setAccountSize(e.target.value)}
            placeholder="e.g., 10000"
            step="0.01"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500 text-sm"
          />
        </div>

        {/* Risk Percent */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Risk % (0-10%)
          </label>
          <input
            type="number"
            value={riskPercent}
            onChange={(e) => setRiskPercent(e.target.value)}
            placeholder="e.g., 1.5"
            step="0.1"
            min="0"
            max="10"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500 text-sm"
          />
          <p className="text-xs text-slate-500 mt-1">Recommended: 1-2% per trade</p>
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
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500 text-sm"
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
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500 text-sm"
          />
        </div>

        {/* Target Price (Optional) */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Target Price (Optional)
          </label>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder="e.g., 1050"
            step="0.01"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500 text-sm"
          />
          <p className="text-xs text-slate-500 mt-1">For R:R ratio calculation</p>
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
            className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Calculating...' : 'Calculate Risk'}
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
          <p className="text-xs text-slate-400 mb-3">Risk Metrics</p>

          {/* Risk Status */}
          <div className={`px-4 py-3 rounded border-2 text-center ${
            result.risk_status === 'GREEN' 
              ? 'bg-green-900/30 border-green-500' 
              : result.risk_status === 'YELLOW'
              ? 'bg-yellow-900/30 border-yellow-500'
              : 'bg-red-900/30 border-red-500'
          }`}>
            <p className="text-xs text-slate-300 mb-1">Risk Status</p>
            <p className={`font-bold text-2xl ${
              result.risk_status === 'GREEN' 
                ? 'text-green-300' 
                : result.risk_status === 'YELLOW'
                ? 'text-yellow-300'
                : 'text-red-300'
            }`}>
              {result.risk_status || 'N/A'}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="space-y-2">
            <p className="text-xs text-slate-400 mb-2">Key Metrics:</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-600/50 px-3 py-2 rounded">
                <p className="text-xs text-slate-400">Risk Amount</p>
                <p className="font-mono font-bold text-sm text-red-300">
                  ${result.risk_amount || 0}
                </p>
              </div>
              <div className="bg-slate-600/50 px-3 py-2 rounded">
                <p className="text-xs text-slate-400">Position Size</p>
                <p className="font-mono font-bold text-sm text-cyan-300">
                  {result.position_size || 0}
                </p>
              </div>
              <div className="bg-slate-600/50 px-3 py-2 rounded">
                <p className="text-xs text-slate-400">Stop Distance</p>
                <p className="font-mono font-bold text-sm text-yellow-300">
                  {result.stop_distance || 0}
                </p>
              </div>
              <div className="bg-slate-600/50 px-3 py-2 rounded">
                <p className="text-xs text-slate-400">R:R Ratio</p>
                <p className="font-mono font-bold text-sm text-green-300">
                  {result.risk_reward_ratio || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Risk Guide */}
          <div className="pt-3 mt-3 border-t border-slate-600">
            <p className="text-xs text-slate-400 mb-2">Risk Guide:</p>
            <div className="space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>• 0-1.5%:</span>
                <span className="text-green-300">GREEN - Conservative</span>
              </div>
              <div className="flex justify-between">
                <span>• 1.5-2.5%:</span>
                <span className="text-yellow-300">YELLOW - Moderate</span>
              </div>
              <div className="flex justify-between">
                <span>• 2.5%+:</span>
                <span className="text-red-300">RED - Aggressive</span>
              </div>
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

export default RiskForm;

