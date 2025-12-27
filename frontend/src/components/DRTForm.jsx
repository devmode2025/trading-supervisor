import { useState } from 'react';

function DRTForm({ onCalculate, result }) {
  const [high, setHigh] = useState('');
  const [low, setLow] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      const highNum = parseFloat(high);
      const lowNum = parseFloat(low);

      if (!high || !low) {
        setError('Please enter both high and low prices');
        setLoading(false);
        return;
      }

      if (isNaN(highNum) || isNaN(lowNum)) {
        setError('Please enter valid numbers');
        setLoading(false);
        return;
      }

      if (highNum <= lowNum) {
        setError('High price must be greater than low price');
        setLoading(false);
        return;
      }

      // Call the calculation function
      await onCalculate({ high: highNum, low: lowNum });
      setLoading(false);
    } catch (err) {
      setError('Failed to calculate. Please try again.');
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setHigh('19900');
    setLow('19750');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* High Price Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            High Price
          </label>
          <input
            type="number"
            step="0.01"
            value={high}
            onChange={(e) => setHigh(e.target.value)}
            placeholder="e.g., 19900"
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Low Price Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Low Price
          </label>
          <input
            type="number"
            step="0.01"
            value={low}
            onChange={(e) => setLow(e.target.value)}
            placeholder="e.g., 19750"
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
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
            className="flex-1 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Calculating...' : 'Calculate DRT Zones'}
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
      {result && result.zones && (
        <div className="mt-4 bg-slate-700 p-4 rounded space-y-2">
          <p className="text-xs text-slate-400 mb-3">Dealing Range Theory Zones</p>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">0% (Low):</span>
              <span className="font-mono font-bold text-white">
                {result.zones['0_percent']?.toFixed(2) || 'N/A'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">25%:</span>
              <span className="font-mono font-bold text-white">
                {result.zones['25_percent']?.toFixed(2) || 'N/A'}
              </span>
            </div>

            <div className="flex justify-between items-center bg-cyan-900/30 px-2 py-1 rounded">
              <span className="text-cyan-300 font-bold">Equilibrium (50%):</span>
              <span className="font-mono font-bold text-cyan-300 text-lg">
                {result.zones.equilibrium?.toFixed(2) || 'N/A'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">75%:</span>
              <span className="font-mono font-bold text-white">
                {result.zones['75_percent']?.toFixed(2) || 'N/A'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">100% (High):</span>
              <span className="font-mono font-bold text-white">
                {result.zones['100_percent']?.toFixed(2) || 'N/A'}
              </span>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-600 text-xs text-slate-500">
            <p>Range Width: {result.range_width?.toFixed(2) || 'N/A'} points</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DRTForm;

