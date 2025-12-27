# AGENT 8: LIVE SETUP MONITOR
# Copy this code into main.py

from pydantic import BaseModel
from datetime import datetime

class MonitorRequest(BaseModel):
    current_price: float
    entry_price: float
    stop_loss: float
    tier_1_target: float
    tier_2_target: float

# Add this endpoint to main.py
"""
@app.post("/agents/monitor")
async def monitor_setup(request: MonitorRequest):
    '''
    Agent 8: Live Setup Monitor
    Monitors active setups in real-time
    '''
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
"""

