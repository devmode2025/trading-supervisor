# AIRTABLE OMNI PROMPT - ADD MMM FIELDS
## Copy and paste this into Airtable's Omni AI to add all 10 MMM fields

---

## HOW TO USE THIS PROMPT

1. Open your Airtable base
2. Go to your MASTER_TRADES table (or trading table)
3. Click the Omni AI button (or press Cmd+K / Ctrl+K)
4. Paste the prompt below
5. Review and confirm the field additions

---

## OMNI PROMPT (COPY EVERYTHING BELOW THIS LINE)

```
Add the following 10 new fields to this table for Market Maker Model analysis:

1. Field name: "MMM_Climax_Type"
   Type: Single Select
   Options: "Selling_Climax_SC", "Buying_Climax_BC", "Both_Present", "None_Visible"
   Description: Which climax pattern was identified pre-market

2. Field name: "MMM_Climax_Price"
   Type: Number with 2 decimal places
   Description: The exact price level of the climax identified

3. Field name: "MMM_SecondaryTest_Confirmed"
   Type: Checkbox
   Description: Did the secondary test (low-volume retest of climax) occur as expected?

4. Field name: "MMM_SecondaryTest_Price"
   Type: Number with 2 decimal places
   Description: The exact price level of the secondary test retest

5. Field name: "MMM_Range_Type"
   Type: Single Select
   Options: "Accumulation_HigherLows", "Distribution_LowerHighs", "Both_Patterns_Present", "No_Clear_Range", "Not_Yet_Formed"
   Description: Which range pattern is forming after climax and secondary test

6. Field name: "MMM_RangeHigherLows_Count"
   Type: Number (integer, range 0-10)
   Description: How many higher lows are visible in accumulation range (or lower highs in distribution)

7. Field name: "MMM_BreakOfStructure_Status"
   Type: Single Select
   Options: "SOS_Confirmed_SignOfStrength", "SOW_Confirmed_SignOfWeakness", "Both_Breaks_Visible", "Break_InProgress", "Break_Likely_Today", "No_Break_Yet", "Range_Still_Contained"
   Description: Has the range broken upward (SOS) or downward (SOW)?

8. Field name: "MMM_BreakLevel_Price"
   Type: Number with 2 decimal places
   Description: The exact price level where the break of structure occurred or is expected

9. Field name: "MMM_Phase_Identified"
   Type: Single Select
   Options: "Accumulation", "Markup", "Distribution", "Markdown", "Uncertain_Conflicting", "Not_Clearly_Defined"
   Description: Which of the four MMM phases is operating today - THIS IS THE CORE DECISION FIELD

10. Field name: "MMM_MTF_Alignment_Status"
    Type: Single Select
    Options: "Strong_Aligned", "Moderate_Aligned", "Conflicting_Divergence", "Unclear_Insufficient_Data"
    Description: Does the MMM phase align with multi-timeframe bias?

Please add all 10 fields in this order, grouped together for Market Maker Model analysis.
```

---

## ALTERNATIVE: INDIVIDUAL PROMPTS (If Omni can't handle all 10 at once)

### Prompt 1: Climax Fields
```
Add 2 new fields:
1. "MMM_Climax_Type" - Single Select with options: "Selling_Climax_SC", "Buying_Climax_BC", "Both_Present", "None_Visible"
2. "MMM_Climax_Price" - Number with 2 decimal places
```

### Prompt 2: Secondary Test Fields
```
Add 2 new fields:
1. "MMM_SecondaryTest_Confirmed" - Checkbox
2. "MMM_SecondaryTest_Price" - Number with 2 decimal places
```

### Prompt 3: Range Formation Fields
```
Add 2 new fields:
1. "MMM_Range_Type" - Single Select with options: "Accumulation_HigherLows", "Distribution_LowerHighs", "Both_Patterns_Present", "No_Clear_Range", "Not_Yet_Formed"
2. "MMM_RangeHigherLows_Count" - Number (integer)
```

### Prompt 4: Break of Structure Fields
```
Add 2 new fields:
1. "MMM_BreakOfStructure_Status" - Single Select with options: "SOS_Confirmed_SignOfStrength", "SOW_Confirmed_SignOfWeakness", "Both_Breaks_Visible", "Break_InProgress", "Break_Likely_Today", "No_Break_Yet", "Range_Still_Contained"
2. "MMM_BreakLevel_Price" - Number with 2 decimal places
```

### Prompt 5: Phase & Alignment Fields
```
Add 2 new fields:
1. "MMM_Phase_Identified" - Single Select with options: "Accumulation", "Markup", "Distribution", "Markdown", "Uncertain_Conflicting", "Not_Clearly_Defined"
2. "MMM_MTF_Alignment_Status" - Single Select with options: "Strong_Aligned", "Moderate_Aligned", "Conflicting_Divergence", "Unclear_Insufficient_Data"
```

---

## VERIFICATION CHECKLIST

After running the prompts, verify these 10 fields exist:

- [ ] MMM_Climax_Type (Single Select)
- [ ] MMM_Climax_Price (Number)
- [ ] MMM_SecondaryTest_Confirmed (Checkbox)
- [ ] MMM_SecondaryTest_Price (Number)
- [ ] MMM_Range_Type (Single Select)
- [ ] MMM_RangeHigherLows_Count (Number)
- [ ] MMM_BreakOfStructure_Status (Single Select)
- [ ] MMM_BreakLevel_Price (Number)
- [ ] MMM_Phase_Identified (Single Select) ← CORE FIELD
- [ ] MMM_MTF_Alignment_Status (Single Select)

---

## FIELD NAMES FOR QUICK COPY

```
MMM_Climax_Type
MMM_Climax_Price
MMM_SecondaryTest_Confirmed
MMM_SecondaryTest_Price
MMM_Range_Type
MMM_RangeHigherLows_Count
MMM_BreakOfStructure_Status
MMM_BreakLevel_Price
MMM_Phase_Identified
MMM_MTF_Alignment_Status
```

---

**Ready to use!** Copy the main prompt or the individual prompts into Airtable Omni.

