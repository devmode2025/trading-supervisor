# INTEGRATION INSTRUCTIONS FOR AGENTS 7-10

## ✅ FILES CREATED:
- agent_7_pretrade.py
- agent_8_monitor.py
- agent_9_risk.py
- agent_10_posttrade.py

## 📋 STEP-BY-STEP INTEGRATION:

### STEP 1: Add Pydantic Models to main.py

Open `backend/main.py` and add these 4 classes after line 65 (after ConfluenceRequest):

```python
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
```

### STEP 2: Add Agent 7 Endpoint

Copy the endpoint code from `agent_7_pretrade.py` and paste it before the "RUN SERVER" section (around line 252).

### STEP 3: Add Agent 8 Endpoint

Copy the endpoint code from `agent_8_monitor.py` and paste it after Agent 7.

### STEP 4: Add Agent 9 Endpoint

Copy the endpoint code from `agent_9_risk.py` and paste it after Agent 8.

### STEP 5: Add Agent 10 Endpoint

Copy the endpoint code from `agent_10_posttrade.py` and paste it after Agent 9.

### STEP 6: Restart Backend Server

```bash
cd backend
python main.py
```

### STEP 7: Test Endpoints

Visit http://localhost:8000/docs and test:
- POST /agents/pretrade
- POST /agents/monitor
- POST /agents/risk
- POST /agents/posttrade

## ✅ VERIFICATION:

You should see 9 total endpoints:
1. GET /health
2. POST /agents/drt
3. POST /agents/amd
4. POST /agents/hrlr
5. POST /agents/tier
6. POST /agents/confluence
7. POST /agents/pretrade (NEW)
8. POST /agents/monitor (NEW)
9. POST /agents/risk (NEW)
10. POST /agents/posttrade (NEW)

## 🎯 NEXT STEP:

After backend is working, we'll build the frontend forms for all 4 agents.

