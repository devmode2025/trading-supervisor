import { useState } from 'react';

function PostTradeForm({ onCalculate, result }) {
  const [entryPrice, setEntryPrice] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [pnlAmount, setPnlAmount] = useState('');
  const [tradeDuration, setTradeDuration] = useState('');
  const [agentsUsed, setAgentsUsed] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const entryNum = parseFloat(entryPrice);
      const exitNum = parseFloat(exitPrice);
      const pnlNum = parseFloat(pnlAmount);

      if (!entryPrice || !exitPrice || !pnlAmount || !tradeDuration || !agentsUsed) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      if (isNaN(entryNum) || isNaN(exitNum) || isNaN(pnlNum)) {
        setError('Please enter valid numbers');
        setLoading(false);
        return;
      }

      const agentsList = agentsUsed.split(',').map(a => a.trim()).filter(a => a);
      if (agentsList.length === 0) {
        setError('Please enter at least one agent');
        setLoading(false);
        return;
      }

      await onCalculate({
        entry_price: entryNum,
        exit_price: exitNum,
        pnl_amount: pnlNum,
        trade_duration: tradeDuration,
        agents_used: agentsList,
        notes: notes
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to generate report. Please try again.');
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setEntryPrice('1000');
    setExitPrice('1050');
    setPnlAmount('500');
    setTradeDuration('2h 30m');
    setAgentsUsed('Agent 1, Agent 5, Agent 9');
    setNotes('Strong setup with good confluence');
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
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            placeholder="e.g., 1000"
            step="0.01"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Exit Price */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Exit Price
          </label>
          <input
            type="number"
            value={exitPrice}
            onChange={(e) => setExitPrice(e.target.value)}
            placeholder="e.g., 1050"
            step="0.01"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        {/* PnL Amount */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            P&L Amount ($)
          </label>
          <input
            type="number"
            value={pnlAmount}
            onChange={(e) => setPnlAmount(e.target.value)}
            placeholder="e.g., 500"
            step="0.01"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Trade Duration */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Trade Duration
          </label>
          <input
            type="text"
            value={tradeDuration}
            onChange={(e) => setTradeDuration(e.target.value)}
            placeholder="e.g., 2h 30m"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Agents Used */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Agents Used (comma-separated)
          </label>
          <input
            type="text"
            value={agentsUsed}
            onChange={(e) => setAgentsUsed(e.target.value)}
            placeholder="e.g., Agent 1, Agent 5, Agent 9"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500 text-sm"
          />
          <p className="text-xs text-slate-500 mt-1">List agents that contributed to this trade</p>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Trade Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Strong setup with good confluence..."
            rows="2"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500 text-sm resize-none"
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
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
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
          <p className="text-xs text-slate-400 mb-3">Post-Trade Report</p>

          {/* Win/Loss Badge */}
          <div className={`px-4 py-3 rounded border-2 text-center ${
            result.win_loss === 'WIN' 
              ? 'bg-green-900/30 border-green-500' 
              : 'bg-red-900/30 border-red-500'
          }`}>
            <p className="text-xs text-slate-300 mb-1">Trade Result</p>
            <p className={`font-bold text-3xl ${
              result.win_loss === 'WIN' ? 'text-green-300' : 'text-red-300'
            }`}>
              {result.win_loss || 'N/A'}
            </p>
          </div>

          {/* P&L Metrics */}
          <div className="space-y-2">
            <p className="text-xs text-slate-400 mb-2">P&L Metrics:</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-600/50 px-3 py-2 rounded">
                <p className="text-xs text-slate-400">P&L Amount</p>
                <p className={`font-mono font-bold text-sm ${
                  result.pnl_amount >= 0 ? 'text-green-300' : 'text-red-300'
                }`}>
                  ${result.pnl_amount || 0}
                </p>
              </div>
              <div className="bg-slate-600/50 px-3 py-2 rounded">
                <p className="text-xs text-slate-400">P&L %</p>
                <p className={`font-mono font-bold text-sm ${
                  result.pnl_percent >= 0 ? 'text-green-300' : 'text-red-300'
                }`}>
                  {result.pnl_percent || 0}%
                </p>
              </div>
            </div>
          </div>

          {/* Trade Details */}
          <div className="pt-3 mt-3 border-t border-slate-600">
            <p className="text-xs text-slate-400 mb-2">Trade Details:</p>
            <div className="space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>• Entry Price:</span>
                <span className="font-mono">${result.entry_price || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>• Exit Price:</span>
                <span className="font-mono">${result.exit_price || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>• Duration:</span>
                <span className="font-mono">{result.duration || 'N/A'}</span>
              </div>
              {result.agents_used && result.agents_used.length > 0 && (
                <div className="flex justify-between">
                  <span>• Agents Used:</span>
                  <span className="font-mono text-right">{result.agents_used.join(', ')}</span>
                </div>
              )}
              {result.notes && (
                <div className="flex justify-between">
                  <span>• Notes:</span>
                  <span className="font-mono text-right">{result.notes}</span>
                </div>
              )}
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

export default PostTradeForm;

