# HRLR/LRLR Agent Validation Guide
## Backtesting Instructions for Agent 1B and Agent 5B

---

## VALIDATION OVERVIEW

This guide provides step-by-step instructions for validating the updated agents on historical charts before live deployment.

**Agents Being Validated:**
- Agent 1B: LRLR Target Identifier
- Agent 5B: Entry Validator with HRLR/LRLR

**Success Criteria:** 5+ out of 6 checks pass on each backtest

---

## BACKTEST TEMPLATE

### Test #1: Date __________ | Pair __________ | Timeframe __________

**Step 1: Pre-Market Analysis (8:05-8:07 AM)**

Using Agent 1B (LRLR Identifier), identify:
- Order Flow Direction: ☐ BULLISH  ☐ BEARISH
- Nearest High Above: __________
- Second High Above: __________
- Highest Above: __________
- Nearest Low Below: __________
- Second Low Below: __________
- Lowest Below: __________

Agent 1B Output:
- HRLR Expected Sweep: __________
- LRLR Tier 1: __________
- LRLR Tier 2: __________
- LRLR Tier 3: __________

**Step 2: Live Session Observation (8:15-10:30 AM)**

Monitor for HRLR confirmation:
- ☐ Did price wick toward HRLR level?
- ☐ Did candle close confirm the sweep?
- ☐ HRLR Confirmed: YES / NO

**Step 3: Entry Validation (9:45-10:30 AM)**

Using Agent 5B (Entry Validator), check:
- Confluence Score: __________
- HRLR Confirmed: ☐ YES  ☐ NO
- LRLR Identified: ☐ YES  ☐ NO
- Price in Retracement: ☐ YES  ☐ NO

Agent 5B Decision: ☐ GO  ☐ NO-GO

**Step 4: Validation Scoring**

☐ HRLR levels correctly identified?
☐ HRLR confirmed with candle closure?
☐ LRLR targets in correct direction?
☐ Price reached Tier 1 LRLR?
☐ Price reached Tier 2 LRLR?
☐ Agent 5B decision matched actual trade outcome?

**Score: ___/6** (Target: 5+)

---

## VALIDATION RESULTS SUMMARY

| Test | Date | Pair | Score | Status |
|------|------|------|-------|--------|
| 1 | __________ | __________ | __/6 | ☐ PASS |
| 2 | __________ | __________ | __/6 | ☐ PASS |
| 3 | __________ | __________ | __/6 | ☐ PASS |
| 4 | __________ | __________ | __/6 | ☐ PASS |
| 5 | __________ | __________ | __/6 | ☐ PASS |

**Average Score: ___/6**

**Overall Status:** ☐ APPROVED (5+ avg)  ☐ NEEDS REFINEMENT (<5 avg)

---

## DEPLOYMENT CHECKLIST

Before deploying updated agents to production:

☐ All unit tests pass (6/6)
☐ Backtesting validation complete (5+ tests)
☐ Average backtest score ≥5/6
☐ Agent 1B LRLR identification accurate
☐ Agent 5B validation logic working correctly
☐ Airtable integration tested
☐ Ready for Monday deployment

---

**Validation Date: __________**
**Validated By: __________**
**Status: ☐ READY FOR DEPLOYMENT**

