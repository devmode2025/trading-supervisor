# AIRTABLE MISSING FIELDS - PRIORITIZED LIST
## Essential vs. Nice-to-Have Fields from v2.3 Checklist

---

## PRIORITY 1: ESSENTIAL FIELDS (Add Immediately)

These fields are **required** for the trading system to function properly.

### PRE_MARKET_ANALYSIS Table (8 Essential Fields)

| # | Field Name | Type | Purpose |
|---|---|---|---|
| 1 | Analysis_Date | Date | The trading date for this analysis |
| 2 | MTF_Final_Bias | Single Select | BULLISH / BEARISH / NEUTRAL - final determination |
| 3 | MTF_All_Aligned | Checkbox | Are all 4 timeframes aligned? |
| 4 | DRT_Type | Single Select | Type 1 (Continuation) / Type 2 (Reversal) / Type 3 (Consolidation) |
| 5 | DRT_Equilibrium | Number | 50% equilibrium level |
| 6 | HRLR_Expected_Level | Number | Pre-identified sweep level |
| 7 | PreMarket_Status | Single Select | READY_TO_TRADE / WAITING_FOR_SETUP / NO_TRADE_TODAY |
| 8 | High_Impact_Event | Checkbox | Is there a high-impact event today? |

### MASTER_TRADES Table (10 Essential Fields)

| # | Field Name | Type | Purpose |
|---|---|---|---|
| 1 | Trade_Date | Date | Date of this trade |
| 2 | Entry_Price | Number | Actual entry price |
| 3 | Stop_Loss_Price | Number | Stop loss level |
| 4 | Tier_1_Target | Number | First profit target (50% exit) |
| 5 | Tier_2_Target | Number | Second profit target (30% exit) |
| 6 | Tier_3_Target | Number | Third profit target (20% exit) |
| 7 | LRLR_Tier1_Reached | Checkbox | Did price reach Tier 1? |
| 8 | LRLR_Tier2_Reached | Checkbox | Did price reach Tier 2? |
| 9 | LRLR_Tier3_Reached | Checkbox | Did price reach Tier 3? |
| 10 | Trade_PnL_Points | Number | Profit/Loss in points |

**ESSENTIAL TOTAL: 18 fields**

---

## PRIORITY 2: NICE-TO-HAVE FIELDS (Add Later)

These fields provide **additional tracking** but aren't required for basic operation.

### PRE_MARKET_ANALYSIS Table (9 Nice-to-Have)

| # | Field Name | Type | Purpose |
|---|---|---|---|
| 1 | MTF_Daily_Bias | Single Select | Daily chart bias |
| 2 | MTF_4H_Bias | Single Select | 4H chart bias |
| 3 | MTF_1H_Bias | Single Select | 1H chart bias |
| 4 | MTF_15M_Bias | Single Select | 15M chart bias |
| 5 | Session_Asian_Direction | Single Select | UP / DOWN / SIDEWAYS |
| 6 | Session_London_Direction | Single Select | UP / DOWN / SIDEWAYS |
| 7 | DRT_Daily_High | Number | Daily high level |
| 8 | DRT_Daily_Low | Number | Daily low level |
| 9 | DRT_Range_Width | Number | Range width in points |

### MASTER_TRADES Table (6 Nice-to-Have)

| # | Field Name | Type | Purpose |
|---|---|---|---|
| 1 | DRT_Price_Position | Single Select | PREMIUM / BALANCED / DISCOUNT |
| 2 | High_Impact_Event_Name | Text | Name of event if any |
| 3 | MMM_Confidence_Adjustment | Number | +15, +5, 0, or -10 |
| 4 | MMM_SmartMoney_Campaign | Single Select | BUYING / SELLING / DISTRIBUTING |
| 5 | MMM_Expected_Pattern | Single Select | Expected intraday pattern |
| 6 | MMM_Expected_HRLR_LRLR | Single Select | Expected setup type |

**NICE-TO-HAVE TOTAL: 15 fields**

---

## SUMMARY

| Priority | PRE_MARKET_ANALYSIS | MASTER_TRADES | Total |
|---|---|---|---|
| **Essential (Add Now)** | 8 | 10 | **18** |
| **Nice-to-Have (Add Later)** | 9 | 6 | **15** |
| **TOTAL** | 17 | 16 | **33** |

---

## RECOMMENDATION

1. **Today:** Add the 18 Essential fields using the Omni prompts below
2. **After 1-2 weeks:** Add Nice-to-Have fields based on what you find useful
3. **Review monthly:** Remove any fields you're not using

---

## OMNI PROMPTS

See separate files:
- `AIRTABLE_OMNI_PROMPT_PRE_MARKET_TABLE.md` - Creates PRE_MARKET_ANALYSIS table
- `AIRTABLE_OMNI_PROMPT_MASTER_TRADES_ESSENTIAL.md` - Adds essential fields to MASTER_TRADES

