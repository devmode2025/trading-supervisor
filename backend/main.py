"""
Trading AI Supervisor - FastAPI Backend
Entry point for all 10 trading agents
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Trading AI Supervisor",
    description="10-Agent AI Trading System",
    version="2.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# REQUEST MODELS
# ============================================================================

class DRTRequest(BaseModel):
    high: float
    low: float

class LRLRRequest(BaseModel):
    order_flow_direction: str  # 'BULLISH' or 'BEARISH'
    nearest_high_above: float
    second_high_above: float
    highest_above: float
    nearest_low_below: float
    second_low_below: float
    lowest_below: float

class AMDRequest(BaseModel):
    body_ratio: float
    wick_ratio: float
    volume: int
    cvd: str

class HRLRRequest(BaseModel):
    target_level: float
    current_price: float
    wick_high: float
    candle_close: float

class TierRequest(BaseModel):
    entry_price: float
    entry_size: float
    tier_1_target: float
    tier_2_target: float
    current_price: float
    stop_price: float

class ConfluenceRequest(BaseModel):
    drt_location: str
    drt_type: int
    entry_confluence: int
    amd_phase: str
    macro_timing: str = "neutral"

class EntryValidatorRequest(BaseModel):
    confluence_score: int
    drt_location: str
    order_block_present: bool
    hrlr_confirmed: bool
    lrlr_identified: bool
    price_in_retracement_zone: bool

class RiskRequest(BaseModel):
    account_size: float
    risk_percent: float
    entry_price: float
    stop_loss: float
    target_price: float = None

class PreTradeRequest(BaseModel):
    confluence_score: int
    risk_amount: float
    position_size: float
    tier_1_target: float
    tier_2_target: float

class MonitorRequest(BaseModel):
    current_price: float
    entry_price: float
    stop_loss: float
    tier_1_target: float
    tier_2_target: float

class PostTradeRequest(BaseModel):
    entry_price: float
    exit_price: float
    pnl_amount: float
    trade_duration: str
    agents_used: list
    notes: str = ""

# ============================================================================
# HEALTH CHECK ENDPOINT
# ============================================================================

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "alive",
        "timestamp": datetime.now(),
        "version": "2.0.0",
        "agents": 10
    }

# ============================================================================
# AGENT 1: DRT CALCULATOR
# ============================================================================

@app.post("/agents/drt")
async def calculate_drt(request: DRTRequest):
    """
    Agent 1: DRT Calculator
    Calculates Dealing Range Theory zones
    """
    eq = (request.high + request.low) / 2
    range_width = request.high - request.low

    return {
        "agent": "DRT Calculator",
        "zones": {
            "0_percent": request.low,
            "25_percent": request.low + (0.25 * range_width),
            "equilibrium": eq,
            "75_percent": request.low + (0.75 * range_width),
            "100_percent": request.high,
        },
        "range_width": range_width,
        "status": "calculated",
        "timestamp": datetime.now()
    }

# ============================================================================
# AGENT 1B: LRLR TARGET IDENTIFIER (HRLR/LRLR Integration)
# ============================================================================

@app.post("/agents/lrlr")
async def identify_lrlr_targets(request: LRLRRequest):
    """
    Agent 1B: LRLR Target Identifier
    Pre-identifies LRLR expansion targets and HRLR sweep levels
    Based on order flow direction and previous price structure
    """
    if request.order_flow_direction == 'BULLISH':
        # In bullish, LRLR = previous HIGHS (expansion targets)
        # HRLR = previous LOWS (expected sweep for liquidity)
        lrlr_tier_1 = request.nearest_high_above
        lrlr_tier_2 = request.second_high_above
        lrlr_tier_3 = request.highest_above
        hrlr_expected_sweep = request.nearest_low_below

    else:  # BEARISH
        # In bearish, LRLR = previous LOWS (expansion targets)
        # HRLR = previous HIGHS (expected sweep for liquidity)
        lrlr_tier_1 = request.nearest_low_below
        lrlr_tier_2 = request.second_low_below
        lrlr_tier_3 = request.lowest_below
        hrlr_expected_sweep = request.nearest_high_above

    return {
        "agent": "LRLR Target Identifier",
        "order_flow": request.order_flow_direction,
        "hrlr_expected_sweep_level": hrlr_expected_sweep,
        "lrlr_tier_1_target": lrlr_tier_1,
        "lrlr_tier_2_target": lrlr_tier_2,
        "lrlr_tier_3_target": lrlr_tier_3,
        "targets_identified": True,
        "tier_1_distance": abs(lrlr_tier_1 - hrlr_expected_sweep),
        "tier_2_distance": abs(lrlr_tier_2 - hrlr_expected_sweep),
        "tier_3_distance": abs(lrlr_tier_3 - hrlr_expected_sweep),
        "status": "identified",
        "timestamp": datetime.now()
    }

# ============================================================================
# AGENT 2: AMD SCORER
# ============================================================================

@app.post("/agents/amd")
async def score_amd(request: AMDRequest):
    """
    Agent 2: AMD Scorer
    Scores Accumulation-Manipulation-Distribution phase
    """
    phase_1 = 0
    phase_2 = 0
    phase_3 = 0

    # Body scoring
    if request.body_ratio < 0.35: phase_1 += 1
    elif request.body_ratio < 0.65: phase_2 += 1
    else: phase_3 += 1
    
    # Wick scoring
    if request.wick_ratio > 0.40: phase_1 += 1
    elif request.wick_ratio > 0.20: phase_2 += 1
    else: phase_3 += 1

    # Volume scoring
    if request.volume < 50000: phase_1 += 1
    elif request.volume < 100000: phase_2 += 1
    else: phase_3 += 1

    # CVD scoring
    if request.cvd == "neutral": phase_1 += 1
    elif request.cvd == "building": phase_2 += 1
    elif request.cvd == "strong": phase_3 += 1
    
    scores = {
        "phase_1": phase_1,
        "phase_2": phase_2,
        "phase_3": phase_3
    }
    
    phase = max(scores, key=scores.get).replace("phase_", "")
    multipliers = {"1": 0.625, "2": 1.0, "3": 1.375}
    
    return {
        "agent": "AMD Scorer",
        "phase": phase,
        "scores": scores,
        "position_size": f"{int(multipliers[phase] * 100)}%",
        "size_multiplier": multipliers[phase],
        "status": "scored",
        "timestamp": datetime.now()
    }

# ============================================================================
# AGENT 3: HRLR DETECTOR
# ============================================================================

@app.post("/agents/hrlr")
async def detect_hrlr(request: HRLRRequest):
    """
    Agent 3: HRLR Detector
    Detects High Resistance Liquidity Run
    """
    sweep_occurred = (request.wick_high >= request.target_level * 1.0001 and
                     request.candle_close < request.target_level)

    return {
        "agent": "HRLR Detector",
        "hrlr_confirmed": sweep_occurred,
        "target_level": request.target_level,
        "wick_high": request.wick_high,
        "distance_to_target": abs(request.target_level - request.current_price),
        "status": "sweep" if sweep_occurred else "waiting",
        "timestamp": datetime.now()
    }

# ============================================================================
# AGENT 4: TIER MANAGER
# ============================================================================

@app.post("/agents/tier")
async def manage_tiers(request: TierRequest):
    """
    Agent 4: Tier Manager
    Manages position tiers and exits
    """
    pnl = (request.current_price - request.entry_price) * request.entry_size
    pnl_percent = ((request.current_price - request.entry_price) / request.entry_price) * 100

    tier_1_filled = request.current_price >= request.tier_1_target
    tier_2_filled = request.current_price >= request.tier_2_target

    return {
        "agent": "Tier Manager",
        "pnl_dollars": round(pnl, 2),
        "pnl_percent": round(pnl_percent, 2),
        "tier_1_filled": tier_1_filled,
        "tier_1_exit_size": int(request.entry_size * 0.55) if tier_1_filled else 0,
        "tier_2_filled": tier_2_filled,
        "tier_2_exit_size": int(request.entry_size * 0.30) if tier_2_filled else 0,
        "new_stop": request.entry_price if tier_1_filled else request.stop_price,
        "distance_to_tier_1": abs(request.tier_1_target - request.current_price),
        "timestamp": datetime.now()
    }

# ============================================================================
# AGENT 5: CONFLUENCE SCORER
# ============================================================================

@app.post("/agents/confluence")
async def score_confluence(request: ConfluenceRequest):
    """
    Agent 5: Confluence Scorer
    Scores setup quality (0-100 points)
    """
    score = 0

    # DRT location (15 pts max)
    score += 15 if request.drt_location == "low" else 10 if request.drt_location == "mid" else 5

    # DRT type (15 pts max)
    score += 15 if request.drt_type == 2 else 10 if request.drt_type == 1 else 3

    # Entry confluence (15 pts max)
    score += min(15, request.entry_confluence * 3)

    # AMD alignment (30 pts max)
    score += 30 if request.amd_phase == "3" else 20 if request.amd_phase == "2" else 10

    # Macro timing (25 pts max)
    macro_score = 25 if request.macro_timing == "favorable" else 15 if request.macro_timing == "neutral" else 5
    score += macro_score

    recommendation = "GO" if score >= 60 else "NO-GO"
    confidence = "HIGH" if score >= 80 else "MEDIUM" if score >= 60 else "LOW"

    return {
        "agent": "Confluence Scorer",
        "total_score": score,
        "recommendation": recommendation,
        "confidence": confidence,
        "max_score": 100,
        "timestamp": datetime.now()
    }

# ============================================================================
# AGENT 5B: ENTRY VALIDATOR WITH HRLR/LRLR (HRLR/LRLR Integration)
# ============================================================================

@app.post("/agents/entry-validator")
async def validate_entry_with_hrlr_lrlr(request: EntryValidatorRequest):
    """
    Agent 5B: Entry Validator with HRLR/LRLR
    Validates entry based on confluence score AND HRLR/LRLR requirements

    HRLR/LRLR Requirements:
    - HRLR must be confirmed (sweep detected and candle closed)
    - LRLR targets must be identified (Tier 1, 2, 3)
    - Price must be in retracement zone (not during HRLR sweep)
    """

    # HRLR/LRLR validation checks
    hrlr_lrlr_checks = {
        'hrlr_confirmed': request.hrlr_confirmed,
        'lrlr_identified': request.lrlr_identified,
        'price_in_retracement': request.price_in_retracement_zone
    }

    hrlr_lrlr_valid = all(hrlr_lrlr_checks.values())
    checks_passed = sum(hrlr_lrlr_checks.values())

    # Confluence validation
    confluence_valid = request.confluence_score >= 60

    # Combined decision: BOTH confluence AND HRLR/LRLR must be valid
    entry_decision = 'GO' if (confluence_valid and hrlr_lrlr_valid) else 'NO-GO'

    # Determine reason for decision
    if not confluence_valid:
        reason = f"Confluence score {request.confluence_score} below 60 threshold"
    elif not hrlr_lrlr_valid:
        failed_checks = [k for k, v in hrlr_lrlr_checks.items() if not v]
        reason = f"HRLR/LRLR validation failed: {', '.join(failed_checks)}"
    else:
        reason = "All validations passed: Confluence ≥60 + HRLR confirmed + LRLR identified + Price in retracement"

    return {
        "agent": "Entry Validator (HRLR/LRLR Enhanced)",
        "decision": entry_decision,
        "confluence_score": request.confluence_score,
        "confluence_valid": confluence_valid,
        "hrlr_lrlr_valid": hrlr_lrlr_valid,
        "hrlr_lrlr_checks": hrlr_lrlr_checks,
        "checks_passed": checks_passed,
        "checks_total": len(hrlr_lrlr_checks),
        "reason": reason,
        "drt_location": request.drt_location,
        "order_block_present": request.order_block_present,
        "status": "validated",
        "timestamp": datetime.now()
    }

# ============================================================================
# AGENT 7: PRE-TRADE REPORT GENERATOR
# ============================================================================

@app.post("/agents/pretrade")
async def generate_pretrade_report(request: PreTradeRequest):
    """Agent 7: Pre-Trade Report - Generates pre-trade checklist and GO/NO-GO decision"""
    checklist = {
        "setup_quality": "GO" if request.confluence_score >= 70 else "NO-GO",
        "risk_management": "GO" if request.risk_amount <= 100 else "NO-GO",
        "position_sizing": "GO" if request.position_size > 0 else "NO-GO",
        "overall_recommendation": "GO" if request.confluence_score >= 70 and request.risk_amount <= 100 else "NO-GO"
    }
    return {
        "agent": "Pre-Trade Report",
        "checklist": checklist,
        "confluence_score": request.confluence_score,
        "risk_amount": request.risk_amount,
        "position_size": request.position_size,
        "tier_1_target": request.tier_1_target,
        "tier_2_target": request.tier_2_target,
        "status": "generated",
        "timestamp": datetime.now()
    }

# ============================================================================
# AGENT 8: LIVE SETUP MONITOR
# ============================================================================

@app.post("/agents/monitor")
async def monitor_setup(request: MonitorRequest):
    """Agent 8: Live Setup Monitor - Monitors active setups in real-time"""
    distance_to_entry = request.current_price - request.entry_price
    distance_to_stop = request.current_price - request.stop_loss
    distance_to_tier1 = request.tier_1_target - request.current_price
    status = "ACTIVE" if request.current_price > request.entry_price else "PENDING"
    alert = None
    if abs(distance_to_entry) < 10:
        alert = "APPROACHING ENTRY"
    elif abs(distance_to_tier1) < 10:
        alert = "APPROACHING TIER 1"
    return {
        "agent": "Setup Monitor",
        "current_price": request.current_price,
        "distance_to_entry": round(distance_to_entry, 2),
        "distance_to_stop": round(distance_to_stop, 2),
        "distance_to_tier1": round(distance_to_tier1, 2),
        "status": status,
        "alert": alert,
        "timestamp": datetime.now()
    }

# ============================================================================
# AGENT 9: RISK CALCULATOR
# ============================================================================

@app.post("/agents/risk")
async def calculate_risk(request: RiskRequest):
    """Agent 9: Risk Calculator - Calculates position sizing and risk metrics"""
    risk_amount = request.account_size * (request.risk_percent / 100)
    stop_distance = abs(request.entry_price - request.stop_loss)
    position_size = risk_amount / stop_distance if stop_distance > 0 else 0
    rrr = None
    if request.target_price:
        target_distance = abs(request.target_price - request.entry_price)
        rrr = target_distance / stop_distance if stop_distance > 0 else 0
    risk_status = "GREEN" if request.risk_percent <= 1.5 else "YELLOW" if request.risk_percent <= 2.5 else "RED"
    return {
        "agent": "Risk Calculator",
        "risk_amount": round(risk_amount, 2),
        "position_size": round(position_size, 2),
        "stop_distance": round(stop_distance, 2),
        "risk_reward_ratio": round(rrr, 2) if rrr else None,
        "risk_status": risk_status,
        "status": "calculated",
        "timestamp": datetime.now()
    }

# ============================================================================
# AGENT 10: POST-TRADE REPORT GENERATOR
# ============================================================================

@app.post("/agents/posttrade")
async def generate_posttrade_report(request: PostTradeRequest):
    """Agent 10: Post-Trade Report - Generates trade review and performance report"""
    pnl_percent = ((request.exit_price - request.entry_price) / request.entry_price) * 100
    win_loss = "WIN" if request.pnl_amount > 0 else "LOSS"
    return {
        "agent": "Post-Trade Report",
        "entry_price": request.entry_price,
        "exit_price": request.exit_price,
        "pnl_amount": request.pnl_amount,
        "pnl_percent": round(pnl_percent, 2),
        "duration": request.trade_duration,
        "agents_used": request.agents_used,
        "win_loss": win_loss,
        "notes": request.notes,
        "status": "generated",
        "timestamp": datetime.now()
    }

# ============================================================================
# RUN SERVER
# ============================================================================

if __name__ == "__main__":
    import uvicorn

    debug = os.getenv("DEBUG", "False").lower() == "true"

    print("🚀 Starting Trading AI Supervisor Server...")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("🏥 Health Check: http://localhost:8000/health")
    print("✅ All 10 Agents Ready!")

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=debug
    )

