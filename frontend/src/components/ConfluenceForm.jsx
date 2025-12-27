import { useState } from 'react';

function ConfluenceForm({ onCalculate, result }) {
  const [drtLocation, setDrtLocation] = useState('');
  const [drtType, setDrtType] = useState('');
  const [entryConfluence, setEntryConfluence] = useState('');
  const [amdPhase, setAmdPhase] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      const drtTypeNum = parseInt(drtType);
      const entryConfluenceNum = parseInt(entryConfluence);

      if (!drtLocation || !drtType || !entryConfluence || !amdPhase) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (isNaN(drtTypeNum) || isNaN(entryConfluenceNum)) {
        setError('Please enter valid numbers');
        setLoading(false);
        return;
      }

      if (entryConfluenceNum < 0 || entryConfluenceNum > 5) {
        setError('Entry confluence must be between 0 and 5');
        setLoading(false);
        return;
      }

      // Call the calculation function
      await onCalculate({
        drt_location: drtLocation,
        drt_type: drtTypeNum,
        entry_confluence: entryConfluenceNum,
        amd_phase: amdPhase
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to calculate. Please try again.');
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setDrtLocation('low');
    setDrtType('2');
    setEntryConfluence('4');
    setAmdPhase('3');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* DRT Location */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            DRT Location (15 pts max)
          </label>
          <select
            value={drtLocation}
            onChange={(e) => setDrtLocation(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
          >
            <option value="">Select location...</option>
            <option value="low">Low - Best entry (15 pts)</option>
            <option value="mid">Mid - Good entry (10 pts)</option>
            <option value="high">High - Risky entry (5 pts)</option>
          </select>
        </div>

        {/* DRT Type */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            DRT Type (15 pts max)
          </label>
          <select
            value={drtType}
            onChange={(e) => setDrtType(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
          >
            <option value="">Select type...</option>
            <option value="2">Type 2 - Strong setup (15 pts)</option>
            <option value="1">Type 1 - Medium setup (10 pts)</option>
            <option value="0">Type 0 - Weak setup (3 pts)</option>
          </select>
        </div>

        {/* Entry Confluence */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Entry Confluence (15 pts max)
          </label>
          <select
            value={entryConfluence}
            onChange={(e) => setEntryConfluence(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
          >
            <option value="">Select confluence...</option>
            <option value="5">5 factors - Excellent (15 pts)</option>
            <option value="4">4 factors - Very good (12 pts)</option>
            <option value="3">3 factors - Good (9 pts)</option>
            <option value="2">2 factors - Fair (6 pts)</option>
            <option value="1">1 factor - Weak (3 pts)</option>
            <option value="0">0 factors - None (0 pts)</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">Number of confirming factors</p>
        </div>

        {/* AMD Phase */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            AMD Phase (30 pts max)
          </label>
          <select
            value={amdPhase}
            onChange={(e) => setAmdPhase(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
          >
            <option value="">Select phase...</option>
            <option value="3">Phase 3 - Distribution (30 pts)</option>
            <option value="2">Phase 2 - Manipulation (20 pts)</option>
            <option value="1">Phase 1 - Accumulation (10 pts)</option>
          </select>
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
            className="flex-1 bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Scoring...' : 'Score Confluence'}
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
          <p className="text-xs text-slate-400 mb-3">Setup Quality Score</p>

          {/* Score Display */}
          <div className={`px-4 py-4 rounded border-2 ${
            result.total_score >= 80 ? 'bg-green-900/30 border-green-500' :
            result.total_score >= 60 ? 'bg-yellow-900/30 border-yellow-500' :
            'bg-red-900/30 border-red-500'
          }`}>
            <div className="text-center">
              <p className="text-sm text-slate-300 mb-2">Total Score</p>
              <p className={`font-mono font-bold text-5xl ${
                result.total_score >= 80 ? 'text-green-300' :
                result.total_score >= 60 ? 'text-yellow-300' :
                'text-red-300'
              }`}>
                {result.total_score || 0}
              </p>
              <p className="text-sm text-slate-400 mt-1">
                out of {result.max_score || 100} points
              </p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`px-3 py-3 rounded text-center ${
              result.recommendation === 'GO'
                ? 'bg-green-900/50 border-2 border-green-500'
                : 'bg-red-900/50 border-2 border-red-500'
            }`}>
              <p className="text-xs text-slate-400 mb-1">Recommendation</p>
              <p className={`font-bold text-2xl ${
                result.recommendation === 'GO' ? 'text-green-300' : 'text-red-300'
              }`}>
                {result.recommendation || 'N/A'}
              </p>
            </div>
            <div className={`px-3 py-3 rounded text-center ${
              result.confidence === 'HIGH' ? 'bg-green-900/50' :
              result.confidence === 'MEDIUM' ? 'bg-yellow-900/50' :
              'bg-red-900/50'
            }`}>
              <p className="text-xs text-slate-400 mb-1">Confidence</p>
              <p className={`font-bold text-2xl ${
                result.confidence === 'HIGH' ? 'text-green-300' :
                result.confidence === 'MEDIUM' ? 'text-yellow-300' :
                'text-red-300'
              }`}>
                {result.confidence || 'N/A'}
              </p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="pt-3 mt-3 border-t border-slate-600">
            <p className="text-xs text-slate-400 mb-2">Score Breakdown:</p>
            <div className="space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>• DRT Location:</span>
                <span>up to 15 pts</span>
              </div>
              <div className="flex justify-between">
                <span>• DRT Type:</span>
                <span>up to 15 pts</span>
              </div>
              <div className="flex justify-between">
                <span>• Entry Confluence:</span>
                <span>up to 15 pts</span>
              </div>
              <div className="flex justify-between">
                <span>• AMD Phase:</span>
                <span>up to 30 pts</span>
              </div>
              <div className="flex justify-between">
                <span>• Macro Timing:</span>
                <span>up to 25 pts</span>
              </div>
            </div>
            <div className="mt-3 p-2 bg-slate-600/50 rounded text-xs">
              <p className="text-slate-300">
                <strong>Scoring Guide:</strong><br/>
                80-100: HIGH confidence GO<br/>
                60-79: MEDIUM confidence GO<br/>
                0-59: LOW confidence NO-GO
              </p>
            </div>
          </div>

          {/* Timestamp */}
          {result.timestamp && (
            <div className="text-xs text-slate-500 pt-2">
              Scored: {new Date(result.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ConfluenceForm;
