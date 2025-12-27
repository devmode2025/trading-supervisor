# AGENT 10: POST-TRADE REPORT GENERATOR
# Copy this code into main.py

from pydantic import BaseModel
from datetime import datetime

class PostTradeRequest(BaseModel):
    entry_price: float
    exit_price: float
    pnl_amount: float
    trade_duration: str
    agents_used: list
    notes: str = ""

# Add this endpoint to main.py
"""
@app.post("/agents/posttrade")
async def generate_posttrade_report(request: PostTradeRequest):
    '''
    Agent 10: Post-Trade Report Generator
    Generates trade review and performance report
    '''
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
"""

