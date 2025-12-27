# AGENT 9: RISK CALCULATOR
# Copy this code into main.py

from pydantic import BaseModel
from datetime import datetime

class RiskRequest(BaseModel):
    account_size: float
    risk_percent: float
    entry_price: float
    stop_loss: float
    target_price: float = None

# Add this endpoint to main.py
"""
@app.post("/agents/risk")
async def calculate_risk(request: RiskRequest):
    '''
    Agent 9: Risk Calculator
    Calculates position sizing and risk metrics
    '''
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
"""

