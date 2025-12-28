# AIRTABLE OMNI PROMPT - MASTER_TRADES ESSENTIAL FIELDS
## Adds essential trade execution fields to your existing MASTER_TRADES table

---

## HOW TO USE

1. Open your Airtable base
2. Go to your MASTER_TRADES table
3. Press Cmd+K (Mac) or Ctrl+K (Windows) to open Omni
4. Paste the prompt below
5. Review and confirm

---

## OMNI PROMPT - ESSENTIAL FIELDS (Add Now)

```
Add the following 10 essential fields to this table for trade execution tracking:

1. Field name: "Trade_Date"
   Type: Date
   Description: Date of this trade

2. Field name: "Entry_Price"
   Type: Number with 2 decimal places
   Description: Actual entry price for this trade

3. Field name: "Stop_Loss_Price"
   Type: Number with 2 decimal places
   Description: Stop loss level placed below/above HRLR protected level

4. Field name: "Tier_1_Target"
   Type: Number with 2 decimal places
   Description: First profit target - exit 50% of position here

5. Field name: "Tier_2_Target"
   Type: Number with 2 decimal places
   Description: Second profit target - exit 30% of position here

6. Field name: "Tier_3_Target"
   Type: Number with 2 decimal places
   Description: Third profit target - exit remaining 20% here

7. Field name: "LRLR_Tier1_Reached"
   Type: Checkbox
   Description: Did price reach Tier 1 profit target?

8. Field name: "LRLR_Tier2_Reached"
   Type: Checkbox
   Description: Did price reach Tier 2 profit target?

9. Field name: "LRLR_Tier3_Reached"
   Type: Checkbox
   Description: Did price reach Tier 3 profit target?

10. Field name: "Trade_PnL_Points"
    Type: Number with 2 decimal places
    Description: Total profit or loss in points for this trade

Please add all 10 fields to this table.
```

---

## OMNI PROMPT - NICE-TO-HAVE FIELDS (Add Later)

```
Add the following 6 fields to this table for advanced tracking:

1. Field name: "DRT_Price_Position"
   Type: Single Select
   Options: "PREMIUM_75_100", "BALANCED_25_75", "DISCOUNT_0_25"
   Description: Where was price in the DRT range at entry?

2. Field name: "High_Impact_Event_Name"
   Type: Single Line Text
   Description: Name of high-impact event if any (e.g., "FOMC", "NFP")

3. Field name: "MMM_Confidence_Adjustment"
   Type: Number
   Description: Confidence adjustment from MMM alignment (+15, +5, 0, or -10)

4. Field name: "MMM_SmartMoney_Campaign"
   Type: Single Select
   Options: "BUYING", "SELLING", "DISTRIBUTING", "ACCUMULATING"
   Description: What is Smart Money doing today?

5. Field name: "MMM_Expected_Pattern"
   Type: Single Select
   Options: "CONSOLIDATION_BREAK", "TREND_CONTINUATION", "RANGE_BOUND", "REVERSAL"
   Description: Expected intraday pattern based on MMM phase

6. Field name: "MMM_Expected_HRLR_LRLR"
   Type: Single Select
   Options: "UPSIDE_SWEEP", "DOWNSIDE_SWEEP", "CONTINUATION", "WEAK_SETUP"
   Description: Expected HRLR/LRLR setup type

Please add all 6 fields to this table.
```

---

## VERIFICATION CHECKLIST

After running the Essential prompt, verify these 10 fields exist:

- [ ] Trade_Date (Date)
- [ ] Entry_Price (Number)
- [ ] Stop_Loss_Price (Number)
- [ ] Tier_1_Target (Number)
- [ ] Tier_2_Target (Number)
- [ ] Tier_3_Target (Number)
- [ ] LRLR_Tier1_Reached (Checkbox)
- [ ] LRLR_Tier2_Reached (Checkbox)
- [ ] LRLR_Tier3_Reached (Checkbox)
- [ ] Trade_PnL_Points (Number)

---

## FIELD NAMES FOR QUICK COPY

```
Trade_Date
Entry_Price
Stop_Loss_Price
Tier_1_Target
Tier_2_Target
Tier_3_Target
LRLR_Tier1_Reached
LRLR_Tier2_Reached
LRLR_Tier3_Reached
Trade_PnL_Points
```

---

## NOTE ON EXISTING FIELDS

Some of these fields may already exist in your MASTER_TRADES table.
If Omni says a field already exists, skip it and move to the next one.

