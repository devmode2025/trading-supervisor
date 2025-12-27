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

