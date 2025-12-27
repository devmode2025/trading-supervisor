import { useState } from 'react';

function HRLRForm({ onCalculate, result }) {
  const [targetLevel, setTargetLevel] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [wickHigh, setWickHigh] = useState('');
  const [candleClose, setCandleClose] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      const targetLevelNum = parseFloat(targetLevel);
      const currentPriceNum = parseFloat(currentPrice);
      const wickHighNum = parseFloat(wickHigh);
      const candleCloseNum = parseFloat(candleClose);

      if (!targetLevel || !currentPrice || !wickHigh || !candleClose) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (isNaN(targetLevelNum) || isNaN(currentPriceNum) || isNaN(wickHighNum) || isNaN(candleCloseNum)) {
        setError('Please enter valid numbers');
        setLoading(false);
        return;
      }

      if (wickHighNum < candleCloseNum) {
        setError('Wick high must be greater than or equal to candle close');
        setLoading(false);
        return;
      }

      // Call the calculation function
      await onCalculate({
        target_level: targetLevelNum,
        current_price: currentPriceNum,
        wick_high: wickHighNum,
        candle_close: candleCloseNum
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to calculate. Please try again.');
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setTargetLevel('20000');
    setCurrentPrice('19950');
    setWickHigh('19995');
    setCandleClose('19920');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Target Level Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Target Level
          </label>
          <input
            type="number"
            step="0.01"
            value={targetLevel}
            onChange={(e) => setTargetLevel(e.target.value)}
            placeholder="e.g., 20000"
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
          />
          <p className="text-xs text-slate-500 mt-1">Key resistance level to test</p>
        </div>

        {/* Current Price Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Current Price
          </label>
          <input
            type="number"
            step="0.01"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            placeholder="e.g., 19950"
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
          />
          <p className="text-xs text-slate-500 mt-1">Current market price</p>
        </div>

        {/* Wick High Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Wick High
          </label>
          <input
            type="number"
            step="0.01"
            value={wickHigh}
            onChange={(e) => setWickHigh(e.target.value)}
            placeholder="e.g., 19995"
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
          />
          <p className="text-xs text-slate-500 mt-1">Highest point of the candle wick</p>
        </div>

        {/* Candle Close Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Candle Close
          </label>
          <input
            type="number"
            step="0.01"
            value={candleClose}
            onChange={(e) => setCandleClose(e.target.value)}
            placeholder="e.g., 19920"
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
          />
          <p className="text-xs text-slate-500 mt-1">Where the candle closed</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded px-4 py-2 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Detecting...' : 'Detect HRLR'}
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
          <p className="text-xs text-slate-400 mb-3">HRLR Detection Results</p>

          {/* HRLR Status */}
          <div className={`px-4 py-3 rounded ${
            result.hrlr_confirmed
              ? 'bg-yellow-900/30 border-2 border-yellow-500'
              : 'bg-slate-600/50 border-2 border-slate-500'
          }`}>
            <div className="text-center">
              <p className="text-sm text-slate-300 mb-1">Detection Status</p>
              <p className={`font-bold text-3xl ${
                result.hrlr_confirmed ? 'text-yellow-300' : 'text-slate-400'
              }`}>
                {result.hrlr_confirmed ? '✓ HRLR CONFIRMED' : '○ No HRLR Detected'}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                {result.hrlr_confirmed
                  ? 'Liquidity sweep detected - potential reversal zone'
                  : 'Target level not yet swept'}
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-600/50 px-3 py-2 rounded">
              <p className="text-xs text-slate-400">Target Level</p>
              <p className="font-mono font-bold text-white text-lg">
                {result.target_level?.toFixed(2) || 'N/A'}
              </p>
            </div>
            <div className="bg-slate-600/50 px-3 py-2 rounded">
              <p className="text-xs text-slate-400">Wick High</p>
              <p className="font-mono font-bold text-white text-lg">
                {result.wick_high?.toFixed(2) || 'N/A'}
              </p>
            </div>
          </div>

          {/* Distance to Target */}
          <div className="pt-3 mt-3 border-t border-slate-600">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Distance to Target:</span>
              <span className="font-mono font-bold text-white">
                {result.distance_to_target?.toFixed(2) || 'N/A'} points
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-slate-400">Status:</span>
              <span className={`font-bold px-2 py-1 rounded text-sm ${
                result.status === 'sweep'
                  ? 'bg-yellow-900/50 text-yellow-300'
                  : 'bg-slate-600 text-slate-300'
              }`}>
                {result.status || 'N/A'}
              </span>
            </div>
          </div>

          {/* Timestamp */}
          {result.timestamp && (
            <div className="text-xs text-slate-500 pt-2">
              Detected: {new Date(result.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HRLRForm;
