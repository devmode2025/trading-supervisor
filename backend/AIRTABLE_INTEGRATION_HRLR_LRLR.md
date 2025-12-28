# Airtable Integration: HRLR/LRLR Agent Outputs
## Mapping Agent Outputs to Airtable Fields

---

## OVERVIEW

This document specifies how the updated agents (Agent 1B and Agent 5B) integrate with Airtable to automatically populate HRLR/LRLR tracking fields.

---

## AGENT 1B → AIRTABLE MAPPING

### Agent 1B: LRLR Target Identifier

**Endpoint:** `POST /agents/lrlr`

**Output Fields → Airtable Fields:**

| Agent 1B Output | Airtable Field | Type | Purpose |
|---|---|---|---|
| `hrlr_expected_sweep_level` | HRLR_Expected_Level | Number | Pre-identified sweep point |
| `lrlr_tier_1_target` | LRLR_Target_1 | Number | Tier 1 profit target |
| `lrlr_tier_2_target` | LRLR_Target_2 | Number | Tier 2 profit target |
| `lrlr_tier_3_target` | LRLR_Target_3 | Number | Tier 3 profit target |
| `targets_identified` | Targets_Identified | Checkbox | Boolean confirmation |
| `order_flow` | Order_Flow_Direction | Single Select | BULLISH / BEARISH |
| `timestamp` | Agent_1B_Timestamp | Date/Time | When targets were identified |

**Auto-Population Timing:** 8:05-8:07 AM (pre-market)

**Example Record:**
```
HRLR_Expected_Level: 25193.50
LRLR_Target_1: 25257.50
LRLR_Target_2: 25350.00
LRLR_Target_3: 25450.00
Targets_Identified: ☑ (checked)
Order_Flow_Direction: BULLISH
Agent_1B_Timestamp: 2025-01-06 08:06:00
```

---

## AGENT 5B → AIRTABLE MAPPING

### Agent 5B: Entry Validator with HRLR/LRLR

**Endpoint:** `POST /agents/entry-validator`

**Output Fields → Airtable Fields:**

| Agent 5B Output | Airtable Field | Type | Purpose |
|---|---|---|---|
| `decision` | Entry_Decision_Final | Single Select | GO / NO-GO |
| `confluence_score` | Confluence_Score | Number | 0-100 score |
| `confluence_valid` | Confluence_Valid | Checkbox | ≥60 threshold met |
| `hrlr_lrlr_valid` | HRLR_LRLR_Valid | Checkbox | All HRLR/LRLR checks passed |
| `hrlr_confirmed` | HRLR_Confirmed | Checkbox | Sweep detected & confirmed |
| `lrlr_identified` | LRLR_Identified | Checkbox | Targets identified |
| `price_in_retracement` | Price_In_Retracement | Checkbox | Price in correct zone |
| `reason` | Validation_Reason | Long Text | Detailed reason for decision |
| `timestamp` | Agent_5B_Timestamp | Date/Time | When validation occurred |

**Auto-Population Timing:** 9:45-10:30 AM (entry window)

**Example Record:**
```
Entry_Decision_Final: GO
Confluence_Score: 75
Confluence_Valid: ☑ (checked)
HRLR_LRLR_Valid: ☑ (checked)
HRLR_Confirmed: ☑ (checked)
LRLR_Identified: ☑ (checked)
Price_In_Retracement: ☑ (checked)
Validation_Reason: "All validations passed: Confluence ≥60 + HRLR confirmed + LRLR identified + Price in retracement"
Agent_5B_Timestamp: 2025-01-06 09:47:00
```

---

## AIRTABLE FIELD SETUP CHECKLIST

### Create These Fields in MASTER_TRADES Table:

**Agent 1B Fields (Pre-Market):**
- ☐ HRLR_Expected_Level (Number, decimals allowed)
- ☐ LRLR_Target_1 (Number, decimals allowed)
- ☐ LRLR_Target_2 (Number, decimals allowed)
- ☐ LRLR_Target_3 (Number, decimals allowed)
- ☐ Targets_Identified (Checkbox)
- ☐ Order_Flow_Direction (Single Select: BULLISH, BEARISH)
- ☐ Agent_1B_Timestamp (Date/Time)

**Agent 5B Fields (Entry Validation):**
- ☐ Entry_Decision_Final (Single Select: GO, NO-GO)
- ☐ Confluence_Score (Number, 0-100)
- ☐ Confluence_Valid (Checkbox)
- ☐ HRLR_LRLR_Valid (Checkbox)
- ☐ HRLR_Confirmed (Checkbox)
- ☐ LRLR_Identified (Checkbox)
- ☐ Price_In_Retracement (Checkbox)
- ☐ Validation_Reason (Long Text)
- ☐ Agent_5B_Timestamp (Date/Time)

---

## INTEGRATION WORKFLOW

### Daily Trading Workflow:

**8:05 AM - Agent 1B Runs:**
1. Agent 1B identifies HRLR/LRLR targets
2. Outputs sent to Airtable
3. HRLR_Expected_Level, LRLR_Target_1/2/3 populated
4. Targets_Identified checkbox marked

**9:45-10:30 AM - Agent 5B Runs:**
1. Agent 5B validates entry conditions
2. Outputs sent to Airtable
3. Entry_Decision_Final populated (GO/NO-GO)
4. All validation checkboxes marked
5. Validation_Reason recorded

**Post-Trade:**
1. Compare actual price action to LRLR targets
2. Record if Tier 1, 2, 3 were reached
3. Validate Agent 1B accuracy over time

---

## TRACKING & ANALYSIS

### Weekly Review Questions:

1. **Agent 1B Accuracy:** Did HRLR_Expected_Level get swept as predicted?
2. **LRLR Accuracy:** Did price reach LRLR_Target_1/2/3 as identified?
3. **Agent 5B Validation:** Did GO decisions result in profitable trades?
4. **False Signals:** How many NO-GO decisions prevented losses?

### Monthly Metrics:

- Agent 1B HRLR prediction accuracy: ____%
- Agent 1B LRLR target accuracy: ____%
- Agent 5B GO decision win rate: ____%
- Agent 5B NO-GO decision loss prevention: ____%

---

**Integration Status:** ☐ READY FOR DEPLOYMENT

