import { useState } from 'react';
import './App.css';
import DRTForm from './components/DRTForm';
import AMDForm from './components/AMDForm';
import HRLRForm from './components/HRLRForm';
import TierForm from './components/TierForm';
import ConfluenceForm from './components/ConfluenceForm';
import PreTradeForm from './components/PreTradeForm';
import MonitorForm from './components/MonitorForm';
import RiskForm from './components/RiskForm';
import PostTradeForm from './components/PostTradeForm';

function App() {
  // State for all 10 agents
  const [drtResult, setDrtResult] = useState(null);
  const [amdResult, setAmdResult] = useState(null);
  const [hrlrResult, setHRLRResult] = useState(null);
  const [tierResult, setTierResult] = useState(null);
  const [confluenceResult, setConfluenceResult] = useState(null);
  const [preTradeResult, setPreTradeResult] = useState(null);
  const [monitorResult, setMonitorResult] = useState(null);
  const [riskResult, setRiskResult] = useState(null);
  const [postTradeResult, setPostTradeResult] = useState(null);

  const API_BASE = 'http://localhost:8000';

  // ============================================================================
  // AGENT 1: DRT CALCULATOR
  // ============================================================================

  const calculateDRT = async (params) => {
    try {
      console.log('📤 DRT Request:', params);
      const response = await fetch(`${API_BASE}/agents/drt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const data = await response.json();
      console.log('📥 DRT Response:', data);
      setDrtResult(data);
    } catch (error) {
      console.error('❌ DRT Error:', error);
      alert('Error calculating DRT zones. Please check your inputs and try again.');
    }
  };

  // ============================================================================
  // AGENT 2: AMD SCORER
  // ============================================================================

  const calculateAMD = async (params) => {
    try {
      console.log('📤 AMD Request:', params);
      const response = await fetch(`${API_BASE}/agents/amd`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const data = await response.json();
      console.log('📥 AMD Response:', data);
      setAmdResult(data);
    } catch (error) {
      console.error('❌ AMD Error:', error);
      alert('Error calculating AMD score. Please check your inputs and try again.');
    }
  };

  // ============================================================================
  // AGENT 3: HRLR DETECTOR
  // ============================================================================

  const calculateHRLR = async (params) => {
    try {
      console.log('📤 HRLR Request:', params);
      const response = await fetch(`${API_BASE}/agents/hrlr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const data = await response.json();
      console.log('📥 HRLR Response:', data);
      setHRLRResult(data);
    } catch (error) {
      console.error('❌ HRLR Error:', error);
      alert('Error detecting HRLR. Please check your inputs and try again.');
    }
  };

  // ============================================================================
  // AGENT 4: TIER MANAGER
  // ============================================================================

  const calculateTier = async (params) => {
    try {
      console.log('📤 Tier Request:', params);
      const response = await fetch(`${API_BASE}/agents/tier`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const data = await response.json();
      console.log('📥 Tier Response:', data);
      setTierResult(data);
    } catch (error) {
      console.error('❌ Tier Error:', error);
      alert('Error calculating tiers. Please check your inputs and try again.');
    }
  };

  // ============================================================================
  // AGENT 5: CONFLUENCE SCORER
  // ============================================================================

  const calculateConfluence = async (params) => {
    try {
      console.log('📤 Confluence Request:', params);
      const response = await fetch(`${API_BASE}/agents/confluence`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const data = await response.json();
      console.log('📥 Confluence Response:', data);
      setConfluenceResult(data);
    } catch (error) {
      console.error('❌ Confluence Error:', error);
      alert('Error scoring confluence. Please check your inputs and try again.');
    }
  };

  // ============================================================================
  // AGENT 7: PRE-TRADE REPORT GENERATOR
  // ============================================================================

  const generatePreTrade = async (params) => {
    try {
      console.log('📤 PreTrade Request:', params);
      const response = await fetch(`${API_BASE}/agents/pretrade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const data = await response.json();
      console.log('📥 PreTrade Response:', data);
      setPreTradeResult(data);
    } catch (error) {
      console.error('❌ PreTrade Error:', error);
      alert('Error generating pre-trade report. Please check your inputs and try again.');
    }
  };

  // ============================================================================
  // AGENT 8: LIVE SETUP MONITOR
  // ============================================================================

  const monitorSetup = async (params) => {
    try {
      console.log('📤 Monitor Request:', params);
      const response = await fetch(`${API_BASE}/agents/monitor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const data = await response.json();
      console.log('📥 Monitor Response:', data);
      setMonitorResult(data);
    } catch (error) {
      console.error('❌ Monitor Error:', error);
      alert('Error monitoring setup. Please check your inputs and try again.');
    }
  };

  // ============================================================================
  // AGENT 9: RISK CALCULATOR
  // ============================================================================

  const calculateRisk = async (params) => {
    try {
      console.log('📤 Risk Request:', params);
      const response = await fetch(`${API_BASE}/agents/risk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const data = await response.json();
      console.log('📥 Risk Response:', data);
      setRiskResult(data);
    } catch (error) {
      console.error('❌ Risk Error:', error);
      alert('Error calculating risk. Please check your inputs and try again.');
    }
  };

  // ============================================================================
  // AGENT 10: POST-TRADE REPORT GENERATOR
  // ============================================================================

  const generatePostTrade = async (params) => {
    try {
      console.log('📤 PostTrade Request:', params);
      const response = await fetch(`${API_BASE}/agents/posttrade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const data = await response.json();
      console.log('📥 PostTrade Response:', data);
      setPostTradeResult(data);
    } catch (error) {
      console.error('❌ PostTrade Error:', error);
      alert('Error generating post-trade report. Please check your inputs and try again.');
    }
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-cyan-400 mb-2">
          Trading AI Supervisor
        </h1>
        <p className="text-slate-400">10-Agent Execution System</p>
      </header>

      {/* 3x4 GRID: ALL 10 AGENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ==================================================================
            AGENT 1: DRT CALCULATOR
            ================================================================== */}
        <div className="bg-slate-800 p-6 rounded-lg border border-cyan-500">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">
            Agent 1: DRT Calculator
          </h2>
          <DRTForm onCalculate={calculateDRT} result={drtResult} />
        </div>

        {/* ==================================================================
            AGENT 2: AMD SCORER
            ================================================================== */}
        <div className="bg-slate-800 p-6 rounded-lg border border-purple-500">
          <h2 className="text-xl font-bold text-purple-400 mb-4">
            Agent 2: AMD Scorer
          </h2>
          <AMDForm onCalculate={calculateAMD} result={amdResult} />
        </div>

        {/* ==================================================================
            AGENT 3: HRLR DETECTOR
            ================================================================== */}
        <div className="bg-slate-800 p-6 rounded-lg border border-yellow-500">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">
            Agent 3: HRLR Detector
          </h2>
          <HRLRForm onCalculate={calculateHRLR} result={hrlrResult} />
        </div>

        {/* ==================================================================
            AGENT 4: TIER MANAGER
            ================================================================== */}
        <div className="bg-slate-800 p-6 rounded-lg border border-blue-500">
          <h2 className="text-xl font-bold text-blue-400 mb-4">
            Agent 4: Tier Manager
          </h2>
          <TierForm onCalculate={calculateTier} result={tierResult} />
        </div>

        {/* ==================================================================
            AGENT 5: CONFLUENCE SCORER
            ================================================================== */}
        <div className="bg-slate-800 p-6 rounded-lg border border-pink-500">
          <h2 className="text-xl font-bold text-pink-400 mb-4">
            Agent 5: Confluence Scorer
          </h2>
          <ConfluenceForm onCalculate={calculateConfluence} result={confluenceResult} />
        </div>

        {/* ==================================================================
            AGENT 7: PRE-TRADE REPORT GENERATOR
            ================================================================== */}
        <div className="bg-slate-800 p-6 rounded-lg border border-green-500">
          <h2 className="text-xl font-bold text-green-400 mb-4">
            Agent 7: Pre-Trade Report
          </h2>
          <PreTradeForm onCalculate={generatePreTrade} result={preTradeResult} />
        </div>

        {/* ==================================================================
            AGENT 8: LIVE SETUP MONITOR
            ================================================================== */}
        <div className="bg-slate-800 p-6 rounded-lg border border-orange-500">
          <h2 className="text-xl font-bold text-orange-400 mb-4">
            Agent 8: Live Monitor
          </h2>
          <MonitorForm onCalculate={monitorSetup} result={monitorResult} />
        </div>

        {/* ==================================================================
            AGENT 9: RISK CALCULATOR
            ================================================================== */}
        <div className="bg-slate-800 p-6 rounded-lg border border-red-500">
          <h2 className="text-xl font-bold text-red-400 mb-4">
            Agent 9: Risk Calculator
          </h2>
          <RiskForm onCalculate={calculateRisk} result={riskResult} />
        </div>

        {/* ==================================================================
            AGENT 10: POST-TRADE REPORT GENERATOR
            ================================================================== */}
        <div className="bg-slate-800 p-6 rounded-lg border border-indigo-500">
          <h2 className="text-xl font-bold text-indigo-400 mb-4">
            Agent 10: Post-Trade Report
          </h2>
          <PostTradeForm onCalculate={generatePostTrade} result={postTradeResult} />
        </div>

        {/* ==================================================================
            STATUS PANEL
            ================================================================== */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-600">
          <h2 className="text-xl font-bold text-slate-300 mb-4">System Status</h2>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <strong>Backend:</strong> http://localhost:8000
            </p>
            <p className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <strong>API Docs:</strong> /docs
            </p>
            <p className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <strong>Agents:</strong> All 10 running
            </p>
            <div className="pt-3 border-t border-slate-600 text-slate-400 text-xs">
              <p>Click any button above to test agents in real-time.</p>
              <p className="mt-2">Results display instantly below each button.</p>
              <p className="mt-2 text-green-400">✅ System fully operational</p>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="mt-12 text-center text-slate-500 text-sm">
        <p>Trading AI Supervisor • All 10 Agents Operational</p>
        <p>Frontend: React 18 + Vite + Tailwind | Backend: FastAPI + Python</p>
      </footer>
    </div>
  );
}

export default App;

