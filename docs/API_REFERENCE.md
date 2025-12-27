# Trading AI Supervisor: API Reference

## Base URL
- Development: http://localhost:8000
- Production: https://your-railway-url.railway.app

## Documentation
Interactive API docs available at: `{BASE_URL}/docs`

## Endpoints

### Health Check
**GET** `/health`
Returns system status

### Agent 1: DRT Calculator
**POST** `/agents/drt`
```json
{
  "high": 19900,
  "low": 19750
}
```

### Agent 2: AMD Scorer
**POST** `/agents/amd`
```json
{
  "body_ratio": 0.5,
  "wick_ratio": 0.25,
  "volume": 75000,
  "cvd": "positive"
}
```

### Agent 3: HRLR Detector
**POST** `/agents/hrlr`
```json
{
  "target_level": 19875,
  "current_price": 19850,
  "wick_high": 19880,
  "candle_close": 19840
}
```

### Agent 4: Tier Manager
**POST** `/agents/tier`
```json
{
  "entry_price": 19850,
  "entry_size": 4,
  "tier_1_target": 19830,
  "tier_2_target": 19810,
  "current_price": 19860,
  "stop_price": 19820
}
```

### Agent 5: Confluence Scorer
**POST** `/agents/confluence`
```json
{
  "drt_location": "low",
  "drt_type": 2,
  "entry_confluence": 4,
  "amd_phase": "2"
}
```

## Response Format
All endpoints return JSON with:
- `agent`: Agent name
- `status`: Operation status
- `timestamp`: Response timestamp
- Agent-specific data

## Error Handling
- 400: Bad request (invalid parameters)
- 422: Validation error
- 500: Server error

