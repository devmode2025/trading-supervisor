import { useState } from 'react';

function AMDForm({ onCalculate, result }) {
  const [bodyRatio, setBodyRatio] = useState('');
  const [wickRatio, setWickRatio] = useState('');
  const [volume, setVolume] = useState('');
  const [cvd, setCvd] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      const bodyRatioNum = parseFloat(bodyRatio);
      const wickRatioNum = parseFloat(wickRatio);
      const volumeNum = parseInt(volume);

      if (!bodyRatio || !wickRatio || !volume || !cvd) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (isNaN(bodyRatioNum) || isNaN(wickRatioNum) || isNaN(volumeNum)) {
        setError('Please enter valid numbers');
        setLoading(false);
        return;
      }

      if (bodyRatioNum < 0 || bodyRatioNum > 1) {
        setError('Body ratio must be between 0 and 1');
        setLoading(false);
        return;
      }

      if (wickRatioNum < 0 || wickRatioNum > 1) {
        setError('Wick ratio must be between 0 and 1');
        setLoading(false);
        return;
      }

      // Prepare data for backend
      const payload = {
        body_ratio: bodyRatioNum,
        wick_ratio: wickRatioNum,
        volume: volumeNum,
        cvd: cvd  // Send as string
      };

      // Debug logging
      console.log('🔍 AMD Form - Sending to backend:', payload);

      // Call the calculation function
      await onCalculate(payload);
      setLoading(false);
    } catch (err) {
      setError('Failed to calculate. Please try again.');
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setBodyRatio('0.75');
    setWickRatio('0.25');
    setVolume('150000');
    setCvd('strong');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Body Ratio Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Body Ratio (0-1)
          </label>
          <input
            type="number"
            step="0.01"
            value={bodyRatio}
            onChange={(e) => setBodyRatio(e.target.value)}
            placeholder="e.g., 0.75"
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <p className="text-xs text-slate-500 mt-1">Candle body size relative to total range</p>
        </div>

        {/* Wick Ratio Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Wick Ratio (0-1)
          </label>
          <input
            type="number"
            step="0.01"
            value={wickRatio}
            onChange={(e) => setWickRatio(e.target.value)}
            placeholder="e.g., 0.25"
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <p className="text-xs text-slate-500 mt-1">Wick size relative to total range</p>
        </div>

        {/* Volume Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Volume
          </label>
          <input
            type="number"
            step="1"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            placeholder="e.g., 150000"
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <p className="text-xs text-slate-500 mt-1">Trading volume for the candle</p>
        </div>

        {/* CVD Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            CVD (Cumulative Volume Delta)
          </label>
          <select
            value={cvd}
            onChange={(e) => setCvd(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="">Select CVD status...</option>
            <option value="neutral">Neutral - Balanced buying/selling</option>
            <option value="building">Building - Momentum developing</option>
            <option value="strong">Strong - Clear directional bias</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">Buy volume minus sell volume trend</p>
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
            className="flex-1 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Calculating...' : 'Calculate AMD Score'}
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
          <p className="text-xs text-slate-400 mb-3">AMD Analysis Results</p>

          {/* Phase Display */}
          <div className="bg-purple-900/30 px-4 py-3 rounded">
            <div className="text-center">
              <p className="text-sm text-purple-300 mb-1">Market Phase</p>
              <p className="font-mono font-bold text-purple-300 text-4xl">
                Phase {result.phase || 'N/A'}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                {result.phase === '1' && 'Accumulation - Building positions'}
                {result.phase === '2' && 'Manipulation - Price action volatility'}
                {result.phase === '3' && 'Distribution - Taking profits'}
                {!result.phase && (
                  <span className="text-yellow-400">
                    ⚠️ Unable to determine phase - check console (F12) for details
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Position Sizing */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-600/50 px-3 py-2 rounded">
              <p className="text-xs text-slate-400">Position Size</p>
              <p className="font-bold text-white text-lg">{result.position_size || 'N/A'}</p>
            </div>
            <div className="bg-slate-600/50 px-3 py-2 rounded">
              <p className="text-xs text-slate-400">Multiplier</p>
              <p className="font-bold text-white text-lg">{result.size_multiplier?.toFixed(3) || 'N/A'}x</p>
            </div>
          </div>

          {/* Phase Scores */}
          {result.scores && (
            <div className="pt-3 mt-3 border-t border-slate-600 space-y-2">
              <p className="text-xs text-slate-400 mb-2">Phase Scores:</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Phase 1 (Accumulation):</span>
                  <span className="font-mono text-white">{result.scores.phase_1 || 0}/4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Phase 2 (Manipulation):</span>
                  <span className="font-mono text-white">{result.scores.phase_2 || 0}/4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Phase 3 (Distribution):</span>
                  <span className="font-mono text-white">{result.scores.phase_3 || 0}/4</span>
                </div>
              </div>
            </div>
          )}

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

export default AMDForm;

