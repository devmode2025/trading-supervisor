/**
 * Trade Entry Form v2.3 - Premium Edition
 * Enhanced JavaScript with validation, conditional logic, and animations
 */

(function() {
  'use strict';

  // =========================================
  // CONFIGURATION (loaded from config.js)
  // =========================================
  const AIRTABLE_CONFIG = {
    apiKey: typeof CONFIG !== 'undefined' ? CONFIG.AIRTABLE_API_KEY : '',
    baseId: typeof CONFIG !== 'undefined' ? CONFIG.AIRTABLE_BASE_ID : '',
    tableName: typeof CONFIG !== 'undefined' ? CONFIG.AIRTABLE_TABLE_NAME : ''
  };

  // Valid Airtable fields from your MASTER_TRADES table (fetched from API)
  const VALID_AIRTABLE_FIELDS = [
    // Identification & Date
    'Trade_Date',

    // Core trade fields (numbers)
    'Entry_Price', 'Exit_Price', 'Stop_Loss_Price',
    'Entry_Confidence', 'Pattern_Quality',

    // Date/Time fields
    'Entry_Time', 'Exit_Time', 'HRLR_Confirmed_Time',

    // HRLR/LRLR fields
    'HRLR_Level',

    // Checkbox fields
    'MMM_SecondaryTest_Confirmed',
    'LRLR_Tier1_Reached', 'LRLR_Tier2_Reached', 'LRLR_Tier3_Reached',

    // Number fields (MMM)
    'MMM_Climax_Price', 'MMM_SecondaryTest_Price',
    'MMM_RangeHigherLows_Count', 'MMM_BreakLevel_Price',

    // Tier targets (numbers)
    'Tier_1_Target', 'Tier_2_Target', 'Tier_3_Target',

    // Text fields
    'Hypothesis_Statement',

    // SELECT FIELDS
    'Setup_Type', 'Exit_Reason',
    'MMM_Climax_Type', 'MMM_Range_Type',
    'MMM_BreakOfStructure_Status', 'MMM_Phase_Identified',
    'MMM_MTF_Alignment_Status'
  ];

  // Map form field names to Airtable field names
  const FIELD_MAPPING = {
    'Date': 'Trade_Date',
    'Your_Actual_Entry_Time': 'Entry_Time',
    'Your_Actual_Exit_Time': 'Exit_Time',
    'Your_Actual_Entry_Price': 'Entry_Price',
    'Your_Actual_Exit_Price': 'Exit_Price',
    'Layer4_System_Stop_Loss': 'Stop_Loss_Price',
    'LRLR_Target_1': 'Tier_1_Target',
    'LRLR_Target_2': 'Tier_2_Target',
    'LRLR_Target_3': 'Tier_3_Target',
    'Tier_1_Exited': 'LRLR_Tier1_Reached',
    'Pattern_Type': 'Setup_Type',
    'Layer3_Confidence_Score': 'Entry_Confidence',
    'Pre_Trade_Confidence': 'Pattern_Quality',
    'Your_Exit_Reason': 'Exit_Reason',
    'Post_Trade_Notes': 'Hypothesis_Statement'
  };

  // =========================================
  // DOM ELEMENTS
  // =========================================
  const form = document.getElementById('tradeEntryForm');
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');
  const sampleDataBtn = document.getElementById('sampleDataBtn');
  const messageContainer = document.getElementById('messageContainer');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  // =========================================
  // CONDITIONAL FIELD MAPPINGS
  // =========================================
  const conditionalFields = {
    'MMM_SecondaryTest_Confirmed': {
      target: 'field_MMM_SecondaryTest_Price',
      showWhen: true
    },
    'MMM_Range_Type': {
      target: 'field_MMM_RangeHigherLows_Count',
      showWhen: ['Accumulation_HigherLows', 'Both_Patterns_Present']
    },
    'MMM_BreakOfStructure_Status': {
      target: 'field_MMM_BreakLevel_Price',
      showWhen: ['SOS_Confirmed_SignOfStrength', 'SOW_Confirmed_SignOfWeakness', 'Both_Breaks_Visible']
    }
  };

  // =========================================
  // INITIALIZATION
  // =========================================
  function init() {
    setDefaultDate();
    setupConditionalLogic();
    setupFormValidation();
    setupFormSubmission();
    setupResetButton();
    setupSampleDataButton();
    setupFieldAnimations();
    console.log('Trade Entry Form v2.3 initialized');
  }

  // =========================================
  // DEFAULT DATE
  // =========================================
  function setDefaultDate() {
    const dateField = document.getElementById('Date');
    if (dateField) {
      const today = new Date().toISOString().split('T')[0];
      dateField.value = today;
    }
  }

  // =========================================
  // CONDITIONAL LOGIC
  // =========================================
  function setupConditionalLogic() {
    Object.entries(conditionalFields).forEach(([triggerId, config]) => {
      const trigger = document.getElementById(triggerId);
      if (!trigger) return;

      // Initial state
      updateConditionalField(trigger, config);

      // Listen for changes
      trigger.addEventListener('change', () => {
        updateConditionalField(trigger, config);
      });
    });
  }

  function updateConditionalField(trigger, config) {
    const targetField = document.getElementById(config.target);
    if (!targetField) return;

    let shouldShow = false;

    if (trigger.type === 'checkbox') {
      shouldShow = trigger.checked === config.showWhen;
    } else {
      if (Array.isArray(config.showWhen)) {
        shouldShow = config.showWhen.includes(trigger.value);
      } else {
        shouldShow = trigger.value === config.showWhen;
      }
    }

    if (shouldShow) {
      targetField.classList.add('active');
      targetField.style.opacity = '1';
    } else {
      targetField.classList.remove('active');
      targetField.style.opacity = '0.5';
    }
  }

  // =========================================
  // FORM VALIDATION
  // =========================================
  function setupFormValidation() {
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => clearFieldError(field));
    });
  }

  function validateField(field) {
    if (!field.value.trim()) {
      field.style.borderColor = 'var(--color-error)';
      return false;
    }
    field.style.borderColor = 'transparent';
    return true;
  }

  function clearFieldError(field) {
    if (field.value.trim()) {
      field.style.borderColor = 'transparent';
    }
  }

  function validateForm() {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    let firstInvalidField = null;

    requiredFields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
        if (!firstInvalidField) firstInvalidField = field;
      }
    });

    if (!isValid && firstInvalidField) {
      firstInvalidField.focus();
      firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return isValid;
  }

  // =========================================
  // FORM SUBMISSION
  // =========================================
  function setupFormSubmission() {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        showMessage('error', 'Please fill in all required fields.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Submitting...';

      try {
        const formData = collectFormData();
        await submitToAirtable(formData);
        showMessage('success', 'Trade logged successfully!');
        form.reset();
        setDefaultDate();
      } catch (error) {
        console.error('Submission error:', error);
        showMessage('error', 'Failed to submit. Check console for details.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-icon">✅</span> Submit Trade';
      }
    });
  }

  function collectFormData() {
    const formData = new FormData(form);
    const rawData = {};
    const mappedData = {};

    // Get the trade date for combining with time fields
    const tradeDateValue = form.elements['Date']?.value || new Date().toISOString().split('T')[0];

    // First collect all raw form data
    formData.forEach((value, key) => {
      const field = form.elements[key];
      if (field && field.type === 'checkbox') {
        rawData[key] = field.checked;
      } else if (value.trim()) {
        if (field && (field.type === 'number' || field.step)) {
          rawData[key] = parseFloat(value);
        } else {
          rawData[key] = value;
        }
      }
    });

    // Add unchecked checkboxes
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
      if (!rawData.hasOwnProperty(cb.name)) {
        rawData[cb.name] = false;
      }
    });

    // Map and filter form fields to valid Airtable fields
    Object.entries(rawData).forEach(([formField, value]) => {
      let airtableField;

      // Check if we have a mapping for this field
      if (FIELD_MAPPING.hasOwnProperty(formField)) {
        airtableField = FIELD_MAPPING[formField];
      } else {
        // Use form field name as-is
        airtableField = formField;
      }

      // Only include if it's a valid Airtable field
      if (airtableField && VALID_AIRTABLE_FIELDS.includes(airtableField)) {
        // Convert time fields to full ISO datetime
        if (airtableField === 'Entry_Time' || airtableField === 'Exit_Time' || airtableField === 'HRLR_Confirmed_Time') {
          // Combine date with time to create ISO datetime
          if (value && value.match(/^\d{2}:\d{2}$/)) {
            mappedData[airtableField] = `${tradeDateValue}T${value}:00.000Z`;
          }
        }
        // Ensure integer fields are sent as integers (not floats)
        else if (airtableField === 'Pattern_Quality' || airtableField === 'Entry_Confidence' ||
                 airtableField === 'MMM_RangeHigherLows_Count') {
          mappedData[airtableField] = Math.round(Number(value));
        }
        else {
          mappedData[airtableField] = value;
        }
      }
    });

    console.log('🔄 Raw form data:', rawData);
    console.log('📋 Mapped & filtered for Airtable:', mappedData);

    return mappedData;
  }

  async function submitToAirtable(data) {
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${encodeURIComponent(AIRTABLE_CONFIG.tableName)}`;

    console.log('📤 Submitting to Airtable:', url);
    console.log('📋 Data being sent:', data);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields: data })
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('❌ Airtable Error:', responseData);
      const errorMsg = responseData.error?.message || 'Failed to submit to Airtable';
      throw new Error(errorMsg);
    }

    console.log('✅ Airtable Response:', responseData);
    return responseData;
  }

  // =========================================
  // SAMPLE DATA BUTTON
  // =========================================
  function setupSampleDataButton() {
    sampleDataBtn.addEventListener('click', () => {
      fillSampleData();
      showMessage('success', 'Sample data filled! Review and submit.');
    });
  }

  function fillSampleData() {
    const sampleData = {
      // Section 1: Trade Identification
      Date: new Date().toISOString().split('T')[0],
      Trade_ID: `TRD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`,
      Pattern_Type: 'Bullish Breakout',
      Win_Loss: 'W',

      // Section 2: Market Maker Analysis
      MMM_Climax_Type: 'Selling_Climax_SC',
      MMM_Climax_Price: 5925.50,
      MMM_SecondaryTest_Confirmed: true,
      MMM_SecondaryTest_Price: 5920.25,
      MMM_Range_Type: 'Accumulation_HigherLows',
      MMM_RangeHigherLows_Count: 3,
      MMM_BreakOfStructure_Status: 'SOS_Confirmed_SignOfStrength',
      MMM_BreakLevel_Price: 5940.00,
      MMM_Phase_Identified: 'Accumulation',
      MMM_MTF_Alignment_Status: 'Strong_Aligned',

      // Section 3: Pre-Market Structure & Tier Targets
      HRLR_Level: 5910.00,
      HRLR_Confirmed_Time: '08:45',
      LRLR_Target_1: 5950.00,
      LRLR_Target_2: 5975.00,
      LRLR_Target_3: 6000.00,
      Tier_1_Exited: true,
      LRLR_Tier2_Reached: true,
      LRLR_Tier3_Reached: false,

      // Section 4: System Parameters
      Layer3_Confidence_Score: 85,

      // Section 5: Trade Execution
      Your_Actual_Entry_Time: '09:42',
      Your_Actual_Entry_Price: 5923.50,
      Entry_Reason: 'Phase 3 Confirmed',
      Entry_Timing: 'Phase III Confirmed',
      Your_Actual_Exit_Time: '11:15',
      Your_Actual_Exit_Price: 5952.25,
      Your_Exit_Reason: 'Target Hit',
      Exit_Type: 'Limit Filled',
      Exit_Tier_Executed: 'Tier_1_and_2',
      Layer4_System_Stop_Loss: 5905.00,
      Target_Price: 5975.00,
      Max_Risk_Dollars: 150.00,
      Risk_Dollars: 92.50,
      Stop_Distance_Points: 18.50,
      Risk_Acceptable: true,

      // Section 6: Trade Analysis
      Pre_Trade_Confidence: 8,
      Post_Trade_Notes: 'Clean breakout setup. Waited for secondary test confirmation. Entry was slightly late but still caught the move.',
      Key_Insight: 'Patience on Phase III confirmation led to optimal entry. Trust the system.'
    };

    // Fill each field
    Object.entries(sampleData).forEach(([fieldName, value]) => {
      const field = document.getElementById(fieldName);
      if (!field) return;

      if (field.type === 'checkbox') {
        field.checked = value;
        // Trigger change event for conditional logic
        field.dispatchEvent(new Event('change'));
      } else {
        field.value = value;
      }
    });

    // Update conditional fields visibility
    Object.entries(conditionalFields).forEach(([triggerId, config]) => {
      const trigger = document.getElementById(triggerId);
      if (trigger) updateConditionalField(trigger, config);
    });
  }

  // =========================================
  // RESET BUTTON
  // =========================================
  function setupResetButton() {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset the form?')) {
        form.reset();
        setDefaultDate();

        // Reset conditional fields
        Object.entries(conditionalFields).forEach(([triggerId, config]) => {
          const trigger = document.getElementById(triggerId);
          if (trigger) updateConditionalField(trigger, config);
        });

        // Clear any error states
        form.querySelectorAll('input, select, textarea').forEach(field => {
          field.style.borderColor = 'transparent';
        });

        showMessage('success', 'Form reset successfully!');
      }
    });
  }

  // =========================================
  // FIELD ANIMATIONS
  // =========================================
  function setupFieldAnimations() {
    const sections = document.querySelectorAll('.form-section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(section);
    });
  }

  // =========================================
  // MESSAGES
  // =========================================
  function showMessage(type, text) {
    const message = type === 'success' ? successMessage : errorMessage;
    const messageText = message.querySelector('.message-text');

    messageContainer.classList.remove('hidden');
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    if (messageText) messageText.textContent = text;
    message.classList.remove('hidden');

    // Auto-hide after 4 seconds
    setTimeout(() => {
      message.classList.add('hidden');
      if (successMessage.classList.contains('hidden') && errorMessage.classList.contains('hidden')) {
        messageContainer.classList.add('hidden');
      }
    }, 4000);
  }

  // =========================================
  // CSV EXPORT FUNCTION
  // =========================================
  function exportToCSV() {
    const formData = new FormData(form);
    const data = {};

    // Collect all form field values
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Handle checkboxes (they don't appear in FormData if unchecked)
    form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      data[checkbox.name] = checkbox.checked ? 'true' : 'false';
    });

    // Create CSV content
    const headers = Object.keys(data);
    const values = Object.values(data).map(v => {
      // Escape quotes and wrap in quotes if contains comma
      const str = String(v).replace(/"/g, '""');
      return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str}"` : str;
    });

    const csvContent = headers.join(',') + '\n' + values.join(',');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    // Generate filename with date
    const dateField = document.getElementById('Date');
    const tradeDate = dateField?.value || new Date().toISOString().split('T')[0];
    const tradeId = document.getElementById('Trade_ID')?.value || 'trade';
    const filename = `trade_${tradeDate}_${tradeId}.csv`;

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showMessage('success', `Exported to ${filename}`);
    console.log('📤 CSV Exported:', filename);
  }

  // =========================================
  // CSV IMPORT FUNCTION
  // =========================================
  function importFromCSV(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      try {
        const content = e.target.result;
        const lines = content.split('\n');

        if (lines.length < 2) {
          showMessage('error', 'CSV file is empty or invalid');
          return;
        }

        // Parse headers and values
        const headers = parseCSVLine(lines[0]);
        const values = parseCSVLine(lines[1]);

        if (headers.length !== values.length) {
          showMessage('error', 'CSV headers and values count mismatch');
          return;
        }

        // Create data object
        const data = {};
        headers.forEach((header, index) => {
          data[header.trim()] = values[index]?.trim() || '';
        });

        // Fill form fields
        let filledCount = 0;
        Object.entries(data).forEach(([fieldName, value]) => {
          const field = document.getElementById(fieldName);
          if (!field) return;

          if (field.type === 'checkbox') {
            field.checked = value.toLowerCase() === 'true';
            field.dispatchEvent(new Event('change'));
          } else {
            field.value = value;
          }
          filledCount++;
        });

        showMessage('success', `Imported ${filledCount} fields from CSV`);
        console.log('📥 CSV Imported:', filledCount, 'fields');

      } catch (error) {
        console.error('CSV Import Error:', error);
        showMessage('error', 'Failed to parse CSV file');
      }
    };

    reader.onerror = function() {
      showMessage('error', 'Failed to read CSV file');
    };

    reader.readAsText(file);
  }

  // Helper function to parse CSV line (handles quoted values)
  function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);

    return result;
  }

  // =========================================
  // CSV EVENT LISTENERS
  // =========================================
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const importCsvInput = document.getElementById('importCsvInput');

  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', exportToCSV);
  }

  if (importCsvInput) {
    importCsvInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        importFromCSV(file);
        // Reset input so same file can be selected again
        e.target.value = '';
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
