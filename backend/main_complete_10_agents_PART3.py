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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=debug)

