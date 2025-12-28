"""
Unit Tests for HRLR/LRLR Enhanced Agents
Tests Agent 1B (LRLR Identifier) and Agent 5B (Entry Validator)
"""

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# ============================================================================
# TESTS FOR AGENT 1B: LRLR TARGET IDENTIFIER
# ============================================================================

def test_lrlr_identifier_bullish():
    """Test LRLR identification in bullish order flow"""
    response = client.post("/agents/lrlr", json={
        "order_flow_direction": "BULLISH",
        "nearest_high_above": 25300.0,
        "second_high_above": 25400.0,
        "highest_above": 25500.0,
        "nearest_low_below": 25100.0,
        "second_low_below": 25000.0,
        "lowest_below": 24900.0
    })
    
    assert response.status_code == 200
    data = response.json()
    
    # Verify LRLR targets are set to highs (expansion targets)
    assert data["lrlr_tier_1_target"] == 25300.0
    assert data["lrlr_tier_2_target"] == 25400.0
    assert data["lrlr_tier_3_target"] == 25500.0
    
    # Verify HRLR sweep is set to low (liquidity grab)
    assert data["hrlr_expected_sweep_level"] == 25100.0
    assert data["targets_identified"] == True
    assert data["order_flow"] == "BULLISH"


def test_lrlr_identifier_bearish():
    """Test LRLR identification in bearish order flow"""
    response = client.post("/agents/lrlr", json={
        "order_flow_direction": "BEARISH",
        "nearest_high_above": 25300.0,
        "second_high_above": 25400.0,
        "highest_above": 25500.0,
        "nearest_low_below": 25100.0,
        "second_low_below": 25000.0,
        "lowest_below": 24900.0
    })
    
    assert response.status_code == 200
    data = response.json()
    
    # Verify LRLR targets are set to lows (expansion targets)
    assert data["lrlr_tier_1_target"] == 25100.0
    assert data["lrlr_tier_2_target"] == 25000.0
    assert data["lrlr_tier_3_target"] == 24900.0
    
    # Verify HRLR sweep is set to high (liquidity grab)
    assert data["hrlr_expected_sweep_level"] == 25300.0
    assert data["targets_identified"] == True
    assert data["order_flow"] == "BEARISH"


# ============================================================================
# TESTS FOR AGENT 5B: ENTRY VALIDATOR WITH HRLR/LRLR
# ============================================================================

def test_entry_validator_all_conditions_met():
    """Test entry validation when all conditions are met"""
    response = client.post("/agents/entry-validator", json={
        "confluence_score": 75,
        "drt_location": "low",
        "order_block_present": True,
        "hrlr_confirmed": True,
        "lrlr_identified": True,
        "price_in_retracement_zone": True
    })
    
    assert response.status_code == 200
    data = response.json()
    
    assert data["decision"] == "GO"
    assert data["confluence_valid"] == True
    assert data["hrlr_lrlr_valid"] == True
    assert data["checks_passed"] == 3
    assert "All validations passed" in data["reason"]


def test_entry_validator_low_confluence():
    """Test entry validation when confluence score is too low"""
    response = client.post("/agents/entry-validator", json={
        "confluence_score": 45,
        "drt_location": "low",
        "order_block_present": True,
        "hrlr_confirmed": True,
        "lrlr_identified": True,
        "price_in_retracement_zone": True
    })
    
    assert response.status_code == 200
    data = response.json()
    
    assert data["decision"] == "NO-GO"
    assert data["confluence_valid"] == False
    assert "below 60 threshold" in data["reason"]


def test_entry_validator_hrlr_not_confirmed():
    """Test entry validation when HRLR is not confirmed"""
    response = client.post("/agents/entry-validator", json={
        "confluence_score": 75,
        "drt_location": "low",
        "order_block_present": True,
        "hrlr_confirmed": False,
        "lrlr_identified": True,
        "price_in_retracement_zone": True
    })
    
    assert response.status_code == 200
    data = response.json()
    
    assert data["decision"] == "NO-GO"
    assert data["hrlr_lrlr_valid"] == False
    assert "hrlr_confirmed" in data["reason"]


def test_entry_validator_price_not_in_retracement():
    """Test entry validation when price is not in retracement zone"""
    response = client.post("/agents/entry-validator", json={
        "confluence_score": 75,
        "drt_location": "low",
        "order_block_present": True,
        "hrlr_confirmed": True,
        "lrlr_identified": True,
        "price_in_retracement_zone": False
    })
    
    assert response.status_code == 200
    data = response.json()
    
    assert data["decision"] == "NO-GO"
    assert data["hrlr_lrlr_valid"] == False
    assert "price_in_retracement" in data["reason"]


if __name__ == "__main__":
    pytest.main([__file__, "-v"])

