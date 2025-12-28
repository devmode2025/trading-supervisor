# AIRTABLE OMNI PROMPT - PRE_MARKET_ANALYSIS TABLE
## Creates a new table for daily pre-market analysis

---

## HOW TO USE

1. Open your Airtable base
2. Press Cmd+K (Mac) or Ctrl+K (Windows) to open Omni
3. Paste the prompt below
4. Review and confirm

---

## OMNI PROMPT - CREATE NEW TABLE (ESSENTIAL FIELDS)

```
Create a new table called "PRE_MARKET_ANALYSIS" with the following 8 fields:

1. Field name: "Analysis_Date"
   Type: Date
   Description: The trading date for this pre-market analysis

2. Field name: "MTF_Final_Bias"
   Type: Single Select
   Options: "BULLISH", "BEARISH", "NEUTRAL"
   Description: Final multi-timeframe bias determination

3. Field name: "MTF_All_Aligned"
   Type: Checkbox
   Description: Are all 4 timeframes (Daily, 4H, 1H, 15M) aligned?

4. Field name: "DRT_Type"
   Type: Single Select
   Options: "Type_1_Continuation", "Type_2_Reversal", "Type_3_Consolidation"
   Description: Dealing Range Theory type for today

5. Field name: "DRT_Equilibrium"
   Type: Number with 2 decimal places
   Description: The 50% equilibrium level of the daily range

6. Field name: "HRLR_Expected_Level"
   Type: Number with 2 decimal places
   Description: Pre-identified level where MM sweep is expected

7. Field name: "PreMarket_Status"
   Type: Single Select
   Options: "READY_TO_TRADE", "WAITING_FOR_SETUP", "NO_TRADE_TODAY"
   Description: Overall pre-market readiness status

8. Field name: "High_Impact_Event"
   Type: Checkbox
   Description: Is there a high-impact economic event today?

Please create this table with all 8 fields.
```

---

## OMNI PROMPT - ADD NICE-TO-HAVE FIELDS (Use Later)

```
Add the following 9 fields to the PRE_MARKET_ANALYSIS table:

1. Field name: "MTF_Daily_Bias"
   Type: Single Select
   Options: "BULLISH", "BEARISH", "NEUTRAL"
   Description: Daily chart bias

2. Field name: "MTF_4H_Bias"
   Type: Single Select
   Options: "BULLISH", "BEARISH", "NEUTRAL"
   Description: 4-hour chart bias

3. Field name: "MTF_1H_Bias"
   Type: Single Select
   Options: "BULLISH", "BEARISH", "NEUTRAL"
   Description: 1-hour chart bias

4. Field name: "MTF_15M_Bias"
   Type: Single Select
   Options: "BULLISH", "BEARISH", "NEUTRAL"
   Description: 15-minute chart bias

5. Field name: "Session_Asian_Direction"
   Type: Single Select
   Options: "UP", "DOWN", "SIDEWAYS"
   Description: Asian session price direction

6. Field name: "Session_London_Direction"
   Type: Single Select
   Options: "UP", "DOWN", "SIDEWAYS"
   Description: London session price direction

7. Field name: "DRT_Daily_High"
   Type: Number with 2 decimal places
   Description: Daily high level

8. Field name: "DRT_Daily_Low"
   Type: Number with 2 decimal places
   Description: Daily low level

9. Field name: "DRT_Range_Width"
   Type: Number with 2 decimal places
   Description: Range width in points (High - Low)

Please add all 9 fields to the PRE_MARKET_ANALYSIS table.
```

---

## VERIFICATION CHECKLIST

After running the Essential prompt, verify these 8 fields exist:

- [ ] Analysis_Date (Date)
- [ ] MTF_Final_Bias (Single Select)
- [ ] MTF_All_Aligned (Checkbox)
- [ ] DRT_Type (Single Select)
- [ ] DRT_Equilibrium (Number)
- [ ] HRLR_Expected_Level (Number)
- [ ] PreMarket_Status (Single Select)
- [ ] High_Impact_Event (Checkbox)

---

## FIELD NAMES FOR QUICK COPY

```
Analysis_Date
MTF_Final_Bias
MTF_All_Aligned
DRT_Type
DRT_Equilibrium
HRLR_Expected_Level
PreMarket_Status
High_Impact_Event
```

