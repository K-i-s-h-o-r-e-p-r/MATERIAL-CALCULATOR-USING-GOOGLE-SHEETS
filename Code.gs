// This function renders the HTML form when the web app is accessed
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

// Function to handle form submission
function submitForm(materialType, dimension, length) {
  try {
    // Log inputs for debugging
    Logger.log("Material Type: " + materialType);
    Logger.log("Dimension: " + dimension);
    Logger.log("Length: " + length);

    // Calculate weight based on material type and dimensions
    var weight = calculateMaterialWeight(materialType, dimension, length);

    // Store data into Google Sheet
    var sheet = SpreadsheetApp.openById('1UBDDxB-6Sl9tL4afKFMUOPhbn2uRQkNv_n6ZPeuCvO8').getSheetByName('Sheet1');
    sheet.appendRow([materialType, dimension, length, weight]);

    return "Data Submitted Successfully! The calculated weight is: " + weight + " kg.";
  } catch (error) {
    Logger.log("Error: " + error.message);
    return "Error: " + error.message;
  }
}

// Function to calculate material weight based on type and dimensions
function calculateMaterialWeight(materialType, dimension, length) {
  var density;

  // Set density based on material type (in kg/m³)
  switch(materialType.toLowerCase()) {
    case 'steel':
      density = 7850; // Density of steel
      break;
    case 'aluminum':
      density = 2700; // Density of aluminum
      break;
    case 'brass':
      density = 8500; // Density of brass
      break;
    default:
      throw new Error('Unknown material type');
  }

  // Calculate weight for a square rod
  var weight = (dimension * dimension * length * density) / 1000000; // Convert to kg

  // Return weight rounded to 2 decimal places
  return weight.toFixed(2);
}
