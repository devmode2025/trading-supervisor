# ============================================================================
# AGENT 2: AMD SCORER
# ============================================================================

@app.post("/agents/amd")
async def score_amd(request: AMDRequest):
    """Agent 2: AMD Scorer - Scores Accumulation-Manipulation-Distribution phase"""
    phase_1 = phase_2 = phase_3 = 0
    if request.body_ratio < 0.35: phase_1 += 1
    elif request.body_ratio < 0.65: phase_2 += 1
    else: phase_3 += 1
    if request.wick_ratio > 0.40: phase_1 += 1
    elif request.wick_ratio > 0.20: phase_2 += 1
    else: phase_3 += 1
    if request.volume < 50000: phase_1 += 1
    elif request.volume < 100000: phase_2 += 1
    else: phase_3 += 1
    if request.cvd == "neutral": phase_1 += 1
    elif request.cvd == "building": phase_2 += 1
    elif request.cvd == "strong": phase_3 += 1
    scores = {"phase_1": phase_1, "phase_2": phase_2, "phase_3": phase_3}
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
    """Agent 3: HRLR Detector - Detects High Resistance Liquidity Run"""
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
    """Agent 4: Tier Manager - Manages position tiers and exits"""
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
    """Agent 5: Confluence Scorer - Scores setup quality (0-100 points)"""
    score = 0
    score += 15 if request.drt_location == "low" else 10 if request.drt_location == "mid" else 5
    score += 15 if request.drt_type == 2 else 10 if request.drt_type == 1 else 3
    score += min(15, request.entry_confluence * 3)
    score += 30 if request.amd_phase == "3" else 20 if request.amd_phase == "2" else 10
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

