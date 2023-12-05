var onEditEnabled = false;

function onEdit(e) {
  if (onEditEnabled) {
    formatChecker();
  }
}


function resetDefaultFormatting() {
  //   var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // var snapshotSheet = spreadsheet.getSheetByName("snapshot");
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("snapshot");
  var range = sheet.getDataRange();
  range.setBackground(null);
  range.setFontColor(null);
  range.setFontWeight('normal');
  range.setFontSize(14);
  range.setFontFamily('Calibri');
  range.setBorder(true, true, true, true, true, true); 
  range.setVerticalAlignment('middle');
  range.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);


  var firstRowRange = sheet.getRange(1, 1, 1, 52); 
  firstRowRange.setBackground('#50C878');
  firstRowRange.setFontColor('black');
  firstRowRange.setFontWeight('bold');
  firstRowRange.setFontFamily('Calibri');
  firstRowRange.setFontSize(14);
  firstRowRange.setVerticalAlignment('middle'); 


  var columnWidths = [
    150,  // Column A
    100,  // Column B
    100,  // Column C
    100,  // Column D
    400,  // Column E
    300,  // Column F
    300,  // Column G
    600,  // Column H
    150,  // Column I
    150,  // Column J
    400,  // Column K
    200,  // Column L
    200,  // Column M
    200,  // Column N
    300,  // Column O
    200,  // Column P
    400,  // Column Q
    200,  // Column R
    400,  // Column S
    400,  // Column T
    400,  // Column U
    200,  // Column V
    200,  // Column W
    200,  // Column X
    300,  // Column Y
    200,  // Column Z
    400,  // Column AA
    400,  // Column AB
    400,  // Column AC
    200,  // Column AD
    200,  // Column AE
    300,  // Column AF
    150,  // Column AG
    400,  // Column AH
    100,  // Column AI
    100,  // Column AJ
    400,  // Column AK
    200,  // Column AL
    200,  // Column AM
    200,  // Column AN
    300,  // Column AO
    200,  // Column AP
    200,  // Column AQ
    200,  // Column AR
    200,  // Column AS
    400,  // Column AT
    400,  // Column AU
    200,  // Column AV
    200,  // Column AW
    400,  // Column AX
    200,  // Column AY
    200   // Column AZ
  ];


  for (var i = 0; i < columnWidths.length; i++) {
    sheet.setColumnWidth(i + 1, columnWidths[i]);
  }
  
}

function setMinRowHeight() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();

  // Set the minimum height of all rows to 26 pixels
  for (var i = 1; i <= lastRow; i++) {
    var rowHeight = sheet.getRowHeight(i);
    if (rowHeight < 26) {
      sheet.setRowHeight(i, 26);
    }
  }
}

function applySpecialFormatting(cell) {
  cell.setBackground('red');
  cell.setFontColor('yellow');
  cell.setFontWeight('bold');
  cell.setFontSize(12);
}


function applyDefaultFormatting(cell) {
  cell.setBackground(null);
  cell.setFontColor(null);
  cell.setFontWeight('normal');
  cell.setFontSize(10);
}

function applyFormattingToCell(cell) {
  var yellowBackground = "#FFFF00"; // Yellow background color
  var redFontColor = "#FF0000"; // Red font color
  
  cell.setBackground(yellowBackground);
  cell.setFontColor(redFontColor);
  cell.setFontWeight("bold");
}

function copyDataToSnapshot() {
  try {

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();


    var dataSheet = spreadsheet.getSheetByName("DATA");
    var snapshotSheet = spreadsheet.getSheetByName("snapshot");
    var urlSheet = spreadsheet.getSheetByName("URL");

    if (!dataSheet) {

      throw new Error('The "DATA" sheet was not found.');
    }
    
    resetDefaultFormatting();

    var lastDataRow = dataSheet.getLastRow();
    

    if (lastDataRow > 1) {
      var sourceRange = dataSheet.getRange("A2:AZ" + lastDataRow);


    var snapshotLastRow = snapshotSheet.getLastRow();
    if (snapshotLastRow > 1) {
      snapshotSheet.getRange(2, 1, snapshotLastRow - 1, snapshotSheet.getLastColumn()).clearContent();
    }


      var values = sourceRange.getValues();


      values = values.filter(function(row) {
        return row.every(function(cell) {
          return cell !== "#REF!";
        });
      });


      snapshotSheet.getRange(2, 1, values.length, values[0].length).clearContent();


      snapshotSheet.getRange(2, 1, values.length, values[0].length).setValues(values);
    } else {

      throw new Error('No data found in the DATA tab (starting from row 2).');
    }


    var urlLastRow = urlSheet.getLastRow();
    if (urlLastRow > 1) {

      urlSheet.getRange(2, 1, urlLastRow - 1, 1);
    } else {

      throw new Error('No data found in the URL tab (starting from row 2).');
    }
  } catch (error) {

    SpreadsheetApp.getUi().alert(error.message);
  }
onEditEnabled = false; 
updateDateInJ1()
// resetDefaultFormatting() 
// autoDelimiterFixer()
setMinRowHeight()
}

function formatChecker() {

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var snapshotSheet = spreadsheet.getSheetByName("snapshot");
  var phoneNumberColumn = snapshotSheet.getRange("G2:G" + snapshotSheet.getLastRow());
  var phoneNumbers = phoneNumberColumn.getValues();
  var companyNameColumn = snapshotSheet.getRange("E2:E" + snapshotSheet.getLastRow());
  var companyNames = companyNameColumn.getValues();
  var cityNameRefSheet = spreadsheet.getSheetByName("CityNameRef");
  var specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;


  // Get the data in columns A and B of the snapshot sheet
  var snapshotDataA = snapshotSheet.getRange("A1:A" + snapshotSheet.getLastRow()).getValues();
  var snapshotDataB = snapshotSheet.getRange("B1:B" + snapshotSheet.getLastRow()).getValues();
  
  // Get the data in columns A and B of the CityNameRef sheet
  var cityNameRefDataA = cityNameRefSheet.getRange("A1:A" + cityNameRefSheet.getLastRow()).getValues();
  var cityNameRefDataB = cityNameRefSheet.getRange("B1:B" + cityNameRefSheet.getLastRow()).getValues();
  
var range = snapshotSheet.getDataRange();
var values = range.getValues();
var numRows = values.length;
var numCols = values[0].length;


for (var row = 0; row < numRows; row++) {
    for (var col = 0; col < numCols; col++) {
      var cellValue = values[row][col];
      
      // Check if the cell value contains newline characters
      if (/\n/.test(cellValue)) {
        // If newline characters are found, set the background color to yellow
        var cell = snapshotSheet.getRange(row + 1, col + 1);
        applyFormattingToCell(cell);

      }else{
        var cell = snapshotSheet.getRange(row + 1, col + 1);
        applyDefaultFormatting(cell)
      }
    }
  }

  // Loop through each cell in the snapshot sheet's column A
  for (var i = 0; i < snapshotDataA.length; i++) {
    var snapshotValueA = snapshotDataA[i][0];
    var snapshotValueB = snapshotDataB[i][0];
    var isMatched = false;
    
    // Check if the value in column A is in the cityNameRefData column A
    for (var j = 0; j < cityNameRefDataA.length; j++) {
      if (snapshotValueA === cityNameRefDataA[j][0]) {
        isMatched = true;
        break;
      }
    }
    
    // If the value in column A is not found in cityNameRefData column A, apply red background to column A cell
    if (!isMatched) {
      var cellA = snapshotSheet.getRange("A" + (i + 1));
      applySpecialFormatting(cellA);
    }
    
    // Reset the flag for the next check
    isMatched = false;
    
    // Check if the value in column B is in the cityNameRefData column B
    for (var k = 0; k < cityNameRefDataB.length; k++) {
      if (snapshotValueB === cityNameRefDataB[k][0]) {
        isMatched = true;
        break;
      }
    }
    
    // If the value in column B is not found in cityNameRefData column B, apply red background to column B cell
    if (!isMatched) {
      var cellB = snapshotSheet.getRange("B" + (i + 1));
       applySpecialFormatting(cellB);
    }
  }

  for (var i = 0; i < phoneNumbers.length; i++) {
    var cellValue = phoneNumbers[i][0];
    var cell = phoneNumberColumn.getCell(i + 1, 1); 

   if (cellValue) { 
      var isValid = isValidPhoneNumberFormat(cellValue);

      if (specialCharRegex.test(cellValue)) {

        applySpecialFormatting(cell);
      } else if (!isValid) {

        applySpecialFormatting(cell);
      } else {

        applyDefaultFormatting(cell);
      }
    } else {

      applyDefaultFormatting(cell);
    }
  }


  for (var i = 0; i < companyNames.length; i++) {
    var cellValue = companyNames[i][0];
    var cell = companyNameColumn.getCell(i + 1, 1); 

   if (specialCharRegex.test(cellValue) || !startsWithCapitalLetter(cellValue)) {

      applySpecialFormatting(cell);
    } else {

      applyDefaultFormatting(cell);
    }
  }

var emailColumn = snapshotSheet.getRange("F2:F" + snapshotSheet.getLastRow());
var emailAddresses = emailColumn.getValues();
var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

for (var i = 0; i < emailAddresses.length; i++) {
  var emailValue = emailAddresses[i][0];
  var cell = emailColumn.getCell(i + 1, 1); // Use i + 2 to adjust for 1-based indexing

  if (emailValue !== "") {
    if (isValidEmail(emailValue) && !containsUppercase(emailValue) && isValidDomain(emailValue)) {
      applyDefaultFormatting(cell);
    } else {
      applySpecialFormatting(cell);
    }
  }
}

function isValidEmail(email) {
  return emailRegex.test(email);
}

function isValidDomain(email) {
  var parts = email.split('@');
  if (parts.length === 2) {
    var domain = parts[1];
    return domain.indexOf('..') === -1 && domain.indexOf('.') !== -1;
  }
  return false;

  onEditEnabled = true; 
}

}

function isValidPhoneNumberFormat(phoneNumber) {
  // Convert the cell value to a string
  var phoneNumberStr = phoneNumber.toString();

  // Check if the phone number matches the original format using regex
  var phoneNumberRegex = /^(?:(?:\+|00)([1-9]\d{0,2}))?[-. (]*(\d{1,4})[-. )]*(\d{1,4})[-. ]*(\d{1,4})$/;
  var formatValid = phoneNumberRegex.test(phoneNumberStr);

  // Count the number of digits in the phone number
  var digitCount = phoneNumberStr.replace(/\D/g, '').length;

  // Return true if the format is valid and the digit count is 10
  return formatValid && digitCount === 10;
}

function startsWithCapitalLetter(text) {
  return /^[A-Z]/.test(text) || /^[0-9]/.test(text);
}

function containsUppercase(text) {
  return /[A-Z]/.test(text);
}

function isValidEmail(email) {
  var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return emailRegex.test(email);
}

function isValidDomain(email) {
  var parts = email.split('@');
  if (parts.length === 2) {
    var domain = parts[1];
    return domain.indexOf('..') === -1 && domain.indexOf('.') !== -1;
  }
  return false;
}


function fixFormat(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var snapshotSheet = spreadsheet.getSheetByName("snapshot");
  var firstNameLastName = snapshotSheet.getRange('L2:M' + snapshotSheet.getLastRow()).getValues();
  var startRow = 2;
  var lastRow = snapshotSheet.getLastRow();

  // Define the ranges for columns V and W
  var rangeV = snapshotSheet.getRange(startRow, 22, lastRow - startRow + 1); // Column 22 is column V
  var rangeW = snapshotSheet.getRange(startRow, 23, lastRow - startRow + 1); // Column 23 is column W

  cleanColumn(rangeV);
  cleanColumn(rangeW);


  for (var i = 0; i < firstNameLastName.length; i++) {
    for (var j = 0; j < firstNameLastName[i].length; j++) {
      if (firstNameLastName[i][j] && typeof firstNameLastName[i][j] === 'string') {
        firstNameLastName[i][j] = capitalizeFirst(firstNameLastName[i][j]);
      }
    }
  }

  snapshotSheet.getRange('L2:M' + snapshotSheet.getLastRow()).setValues(firstNameLastName);

function capitalizeFirst(str) {
  if (str.length > 1) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str.toUpperCase();
}

  // Get the data in column E of the snapshot sheet
  var data = snapshotSheet.getRange("E2:E" + snapshotSheet.getLastRow()).getValues();
   var dataF = snapshotSheet.getRange("F2:F" + snapshotSheet.getLastRow()).getValues();

  // Loop through each cell in column E
  for (var i = 0; i < data.length; i++) {
    var cellValue = data[i][0];
    
    // Check if the cell value is not empty
    if (cellValue) {
      // Capitalize the first letter and concatenate the rest of the string
      var capitalizedValue = cellValue.charAt(0).toUpperCase() + cellValue.slice(1);
      data[i][0] = capitalizedValue;
    }
  }

  // Update the values in column E with the capitalized values
  snapshotSheet.getRange("E2:E" + (data.length + 1)).setValues(data);

  // Loop through each cell in column E
  for (var i = 0; i < data.length; i++) {
    var cellValue = data[i][0];
    
    // Check if the cell value is not empty
    if (cellValue) {
      // Replace "&" with "and"
      cellValue = cellValue.replace(/&/g, 'and');
      
      // Remove special characters and fix spacing (single space)
      cellValue = cellValue.replace(/[^\w\s]+/g, ' ').trim().replace(/\s+/g, ' ');
      
      data[i][0] = cellValue;
    }
  }

  // Update the values in column E with the modified values
  snapshotSheet.getRange("E2:E" + (data.length + 1)).setValues(data);

    // Loop through each cell in column F
  for (var i = 0; i < dataF.length; i++) {
    var cellValue = dataF[i][0];
    
    // Check if the cell value is not empty
    if (cellValue) {
      // Convert the string to lowercase
      cellValue = cellValue.toLowerCase();
      
      dataF[i][0] = cellValue;
    }
  }

  // Update the values in column F with the modified values
  snapshotSheet.getRange("F2:F" + (dataF.length + 1)).setValues(dataF);

  // Get the data in column G of the snapshot sheet
  var dataG = snapshotSheet.getRange("G2:G" + snapshotSheet.getLastRow()).getValues();

  // Loop through each cell in column G
  for (var i = 0; i < dataG.length; i++) {
    var cellValue = dataG[i][0];
    
    // Check if the cell value is not empty
    if (cellValue && typeof cellValue === 'string') {
      // Remove special characters and spaces, leaving only digits
      cellValue = cellValue.replace(/[^0-9]/g, '');
      
      dataG[i][0] = cellValue;
    }
  }

  // Update the values in column G with the modified values
  snapshotSheet.getRange("G2:G" + (dataG.length + 1)).setValues(dataG);


  // Define the columns to trim or remove spaces from
  var columnsToTrim = [1, 2, 3, 4, 5, 6, 7]; // A, B, C, D, E, F, G

  for (var i = 0; i < columnsToTrim.length; i++) {
    var column = columnsToTrim[i];
    var data = snapshotSheet.getRange(2, column, snapshotSheet.getLastRow() - 1, 1).getValues();

    for (var j = 0; j < data.length; j++) {
      var cellValue = data[j][0];

      if (typeof cellValue === 'string') {
        // Trim or remove spaces around the text
        cellValue = cellValue.trim();
        data[j][0] = cellValue;
      }
    }

    // Update the values in the column with the trimmed values
    snapshotSheet.getRange(2, column, data.length, 1).setValues(data);
  }
formatChecker()
}

function cleanColumn(range) {
  var values = range.getValues();

  for (var i = 0; i < values.length; i++) {
    if (values[i][0] !== "") {
      // Convert the value to a string before applying replace
      values[i][0] = String(values[i][0]).replace(/[^\w\s.]/gi, "").replace(/\s+/g, " ").trim();
    }
  }

  range.setValues(values);
}

function highlightBackLink() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var snapshotSheet = spreadsheet.getSheetByName("snapshot");
  var lastRow = snapshotSheet.getLastRow();
  var lastColumn = snapshotSheet.getLastColumn();

  // Fetch the entire data range
  var dataRange = snapshotSheet.getRange(1, 1, lastRow, lastColumn);
  var data = dataRange.getValues();

  // Define a regular expression pattern for variations of "BackLink"
  var backlinkPattern = /\bback\s*link\b|\b\.back\s*link\b|\b-back\s*link\b/i;

  // Loop through all rows in the array
  for (var i = 0; i < data.length; i++) {
    var cellValueE = data[i][4]; // Assuming column E is the 5th column (0-based index)

    // Check if column E has data
    if (cellValueE !== "") {
      // Check if the entire row contains the word "BackLink" in any form
      var rowValues = data[i].toString().toLowerCase();
      if (backlinkPattern.test(rowValues)) {
        // Highlight the entire row
        snapshotSheet.getRange(i + 1, 1, 1, lastColumn).setBackground('#FFA500');
      }
    }
  }
}

function highlightRemovedCompanies() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var snapshotSheet = spreadsheet.getSheetByName("snapshot");
  var lastRow = snapshotSheet.getLastRow();
  var lastColumn = snapshotSheet.getLastColumn();

  // Fetch the entire data range
  var dataRange = snapshotSheet.getRange(1, 1, lastRow, lastColumn);
  var data = dataRange.getValues();

  // Loop through all rows in the array
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      var cellValue = data[i][j].toString().toLowerCase();
      
      // Check if the cell value contains the keyword "DuplicateCompany"
      if (cellValue.includes('duplicatecompany')) {
        // Highlight the entire row
        snapshotSheet.getRange(i + 1, 1, 1, lastColumn).setBackground('#FF0000');
        break; // Exit the inner loop once the keyword is found in the row
      }
    }
  }
}



function autoDelimiterFixer() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var columnsToFix = ["Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA","AB","BB"];

  columnsToFix.forEach(function(column) {
    var dataRange = sheet.getRange(column + "2:" + column + sheet.getLastRow());
    var numRows = dataRange.getNumRows(); 

    var data = dataRange.getValues(); 

    for (var i = 0; i < numRows; i++) {
      var content = String(data[i][0]); // Ensure content is treated as a string
      var formattedContent = content.trim().replace(/\n/g, ", ").replace(/,+\s*,+/g, ',').replace(/\s+/g, ' ').trim().replace(/\n/g, ", ").replace(/,+\s*,+/g, ',').replace(/\s+/g, ' ');
      data[i][0] = formattedContent;
    }

    dataRange.setValues(data);
  });
  // formatChecker()
}


function dataEvaluator() {
  // Get the active spreadsheet and snapshot sheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var snapshotSheet = spreadsheet.getSheetByName("snapshot");

  // Get the data range from the snapshot sheet
  var range = snapshotSheet.getDataRange();

  // Get values in the range
  var values = range.getValues();

  // Iterate through each row
  for (var i = 0; i < values.length; i++) {
    // Counter for red-highlighted cells
    var redCount = 0;

    // Check if column E is not empty
    if (values[i][4] !== "") {
      // Check if there's data in column K
      if (values[i][10] === "") {
        // Highlight the cell in red
        snapshotSheet.getRange(i + 1, 11).setBackground("red");
        redCount += 12;  // Increase redCount by 10
      }
      if (values[i][6] === "") {
        // Highlight the cell in red
        snapshotSheet.getRange(i + 1, 7).setBackground("red");
        redCount += 12;  // Increase redCount by 10
      }

      // Check if there's data in column Q
      if (values[i][16] === "") {
        // Highlight the cell in red
        snapshotSheet.getRange(i + 1, 17).setBackground("red");
        redCount += 12;  // Increase redCount by 10
      }

      // Iterate through columns F to AA (excluding H, I, J, and AB onwards)
      for (var j = 5; j < values[i].length; j++) {
        // Skip columns H, I, J, and AB onwards
        if (j === 7 || j === 8 || j === 9 || j >= 26) {
          continue;
        }

        // Check if the cell is empty
        if (values[i][j] === "") {
          // Highlight the cell in red
          snapshotSheet.getRange(i + 1, j + 1).setBackground("red");
          redCount++;
        }
      }

      // Check if red count is equal or greater than 9
      if (redCount >= 12) {
        // Set "Insufficient gathered data" and concatenate message
        snapshotSheet.getRange(i + 1, 32).setValue("Insufficient Data in Rank " + values[i][3] + " - " + values[i][4] + " : " + values[i][0]);
      } else {
        // Clear the cell in column AF
        snapshotSheet.getRange(i + 1, 32).setValue("");
      }
    }
  }

}


function addressChecker() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // var snapshotSheet = spreadsheet.getSheetByName("snapshot");
// Get the active sheet
  var sheet = spreadsheet.getSheetByName("snapshot");
  var data = sheet.getDataRange().getValues();

  var columnAValues = data.map(function(row) {
    return getFirstWord(row[0]);
  });

  var columnQRange = sheet.getRange(1, 17, data.length, 1);
  var columnQValues = columnQRange.getValues();

  var backgroundColors = [];

  for (var i = 0; i < data.length; i++) {
    var firstWordA = columnAValues[i];
    var cellQValue = columnQValues[i][0];

    if (cellQValue.toLowerCase().includes(firstWordA.toLowerCase())) {
      backgroundColors.push([""]);
    } else {
      backgroundColors.push(["red"]);
    }
  }

  // Apply background colors in batch
  columnQRange.setBackgrounds(backgroundColors);
}

// Function to get the first word from a string
function getFirstWord(str) {
  return str.split(' ')[0];
}

// Function to get the first word from a string
function getFirstWord(str) {
  return str.split(' ')[0];
}

function highlightDuplicatesInColumn(sheet, column) {
  // Get the data range for the specified column, excluding the header row
  var dataRange = sheet.getRange(2, getColumnIndex(column), sheet.getLastRow() - 1, 1);
  var values = dataRange.getValues();

  var uniqueValues = new Set();
  var duplicateIndexes = [];

  // Iterate through each value in the specified column
  for (var i = 0; i < values.length; i++) {
    var value = values[i][0].toString().toLowerCase().replace(/\s/g, '');

    // Check if the value is already in the uniqueValues set
    if (uniqueValues.has(value)) {
      // Duplicate found, store its index
      duplicateIndexes.push(i + 2); // Adding 2 to convert from zero-based to one-based index, excluding the header row
    } else {
      uniqueValues.add(value);
    }
  }

if (duplicateIndexes.length > 0) {
  var rangeToHighlight = sheet.getRange(1, getColumnIndex(column), sheet.getLastRow(), 1);
  var cellColors = rangeToHighlight.getBackgrounds();
  
  duplicateIndexes.forEach(function (index) {
    cellColors[index - 1][0] = "red"; // Subtracting 1 to convert from one-based to zero-based index
  });
  
  rangeToHighlight.setBackgrounds(cellColors);
}

}

function getColumnIndex(columnLetter) {
  return columnLetter.charCodeAt(0) - 64;
}


function clearUrlPath() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var snapshotSheet = spreadsheet.getSheetByName("snapshot");
  var website = snapshotSheet.getRange('K2:K' + snapshotSheet.getLastRow()).getValues();

  for (var i = 0; i < website.length; i++) {
    if (typeof website[i][0] === 'string') {
      var url = website[i][0].trim();
      var clearedUrl = clearPath(url);
      snapshotSheet.getRange(i + 2, 11).setValue(clearedUrl); // Column K is represented as 11
    }
  }

function clearPath(url) {
  // Regular expression to match valid domains
  var domainRegex = /https?:\/\/[^\/]+/;
  var match = url.match(domainRegex);
  
  if (match) {
    return match[0] + '/';
  }
  
  return url; // If no valid domain is found, return the original URL
}
}

function updateDateInJ1() {
  // Get the active spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var urlSheet = spreadsheet.getSheetByName("URL");

  // Get the current date
  var currentDate = new Date();

  // Format the date as per your requirement (you can change the format)
  var formattedDate = Utilities.formatDate(currentDate, "GMT", "MM/dd/yyyy");

  // Update cell J1 with the formatted date
  urlSheet.getRange('J1').setValue(formattedDate);
}


function extractorData() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var realtorSheet = spreadsheet.getSheetByName('Realtor');
  var snapshotSheet = spreadsheet.getSheetByName('Snapshot');
  
  // Get the data range in Realtor tab for columns B, C, E, G, H, AG, AH, AF, and I
  var columnBDataRange = realtorSheet.getRange('B2:B' + realtorSheet.getLastRow());
  var columnBData = columnBDataRange.getValues();
  var nameDataRange = realtorSheet.getRange('C2:C' + realtorSheet.getLastRow());
  var nameData = nameDataRange.getValues();
  var columnEDataRange = realtorSheet.getRange('E2:E' + realtorSheet.getLastRow());
  var columnEData = columnEDataRange.getValues();
  var columnGDataRange = realtorSheet.getRange('G2:G' + realtorSheet.getLastRow());
  var columnGData = columnGDataRange.getValues();
  var columnHDataRange = realtorSheet.getRange('H2:H' + realtorSheet.getLastRow());
  var columnHData = columnHDataRange.getValues();
  var columnAGDataRange = realtorSheet.getRange('AG2:AG' + realtorSheet.getLastRow());
  var columnAGData = columnAGDataRange.getValues();
 var columnAHDataRange = realtorSheet.getRange('AH2:AH' + realtorSheet.getLastRow());
  var columnAHData = columnAHDataRange.getValues();
  var columnAFDataRange = realtorSheet.getRange('AF2:AF' + realtorSheet.getLastRow());
  var columnAFData = columnAFDataRange.getValues();
  var columnIDataRange = realtorSheet.getRange('I2:I' + realtorSheet.getLastRow());
  var columnIData = columnIDataRange.getValues();
    var columnXDataRange = realtorSheet.getRange('X2:X' + realtorSheet.getLastRow());
  var columnXData = columnXDataRange.getValues();
    var columnQDataRange = realtorSheet.getRange('Q2:Q' + realtorSheet.getLastRow());
  var columnQData = columnQDataRange.getValues();
    var columnYDataRange = realtorSheet.getRange('Y2:Y' + realtorSheet.getLastRow());
  var columnYData = columnYDataRange.getValues();
    var columnSDataRange = realtorSheet.getRange('S2:S' + realtorSheet.getLastRow());
  var columnTDataRange = realtorSheet.getRange('T2:T' + realtorSheet.getLastRow());
  var columnSData = columnSDataRange.getValues();
  var columnTData = columnTDataRange.getValues();
    var columnWDataRange = realtorSheet.getRange('W2:W' + realtorSheet.getLastRow());
  var columnJDataRange = realtorSheet.getRange('J2:J' + realtorSheet.getLastRow());
  var columnKDataRange = realtorSheet.getRange('K2:K' + realtorSheet.getLastRow());
  var columnLDataRange = realtorSheet.getRange('L2:L' + realtorSheet.getLastRow());
  var columnMDataRange = realtorSheet.getRange('M2:M' + realtorSheet.getLastRow());
  var columnUDataRange = realtorSheet.getRange('U2:U' + realtorSheet.getLastRow());
  
  var columnUData = columnUDataRange.getValues();
  
  var columnWData = columnWDataRange.getValues();
  var columnJData = columnJDataRange.getValues();
  var columnKData = columnKDataRange.getValues();
  var columnLData = columnLDataRange.getValues();
  var columnMData = columnMDataRange.getValues();
   var columnVDataRange = realtorSheet.getRange('V2:V' + realtorSheet.getLastRow());
  var columnVData = columnVDataRange.getValues();
    var columnALDataRange = realtorSheet.getRange('AL2:AL' + realtorSheet.getLastRow());
  var columnALData = columnALDataRange.getValues();



  // Initialize arrays to store values from columns B, C, E, G, H, AG, AH, AF, and I
  var columnBValues = [];
  var firstNames = [];
  var lastNames = [];
  var columnEValues = [];
  var columnGValues = [];
  var columnHValues = [];
  var columnAGValues = [];
  var columnAHValues = [];
  var columnAFValues = [];
  var columnIValues = [];
    var combinedData = [];
 var combinedData2 = [];

 // Concatenate the values from columns W, J, K, L, and M
  for (var i = 0; i < columnWData.length; i++) {
    var combinedValue2 = columnWData[i][0] + ' ' + columnJData[i][0] + ' ' + columnKData[i][0] + ' ' + columnLData[i][0] + ' ' + columnMData[i][0];
    combinedData2.push([combinedValue2]);
  }


      // Concatenate the values from columns S and T
  for (var i = 0; i < columnSData.length; i++) {
    var combinedValue = columnSData[i][0] + ' ' + columnTData[i][0];
    combinedData.push([combinedValue]);
  }
  
  for (var i = 0; i < columnBData.length; i++) {
    // Copy the values from column B
    columnBValues.push([columnBData[i][0]]);
    
    var fullName = nameData[i][0];
    if (fullName) {
      var names = fullName.split(' ');
      if (names.length >= 2) {
        firstNames.push([names[0]]);
        lastNames.push([names[names.length - 1]]);
      } else {
        // Handle cases with no space (e.g., a single name)
        firstNames.push([names[0]]);
        lastNames.push(['']); // Assuming an empty string for the last name
      }
    } else {
      firstNames.push(['']); // Empty cell in Realtor column
      lastNames.push(['']); // Empty cell in Realtor column
    }
    
    // Copy the values from columns E, G, H, AG, AH, AF, and I
    columnEValues.push([columnEData[i][0]]);
    columnGValues.push([columnGData[i][0]]);
    columnHValues.push([columnHData[i][0]]);
    columnAGValues.push([columnAGData[i][0]]);
    columnAHValues.push([columnAHData[i][0]]);
    columnAFValues.push([columnAFData[i][0]]);
    columnIValues.push([columnIData[i][0]]);
  }

    // Remove text and retain only the number from column Q
  
  // Update the Snapshot tab
  var columnCRange = snapshotSheet.getRange('C2:C' + (columnBValues.length + 1));
  var firstNameRange = snapshotSheet.getRange('L2:L' + (firstNames.length + 1));
  var lastNameRange = snapshotSheet.getRange('M2:M' + (lastNames.length + 1));
  var columnERange = snapshotSheet.getRange('E2:E' + (columnEValues.length + 1));
  var columnGRange = snapshotSheet.getRange('G2:G' + (columnGValues.length + 1));
  var columnFRange = snapshotSheet.getRange('F2:F' + (columnHValues.length + 1));
  var columnHRange = snapshotSheet.getRange('H2:H' + (columnAGData.length + 1));
  var columnAGRange = snapshotSheet.getRange('I2:I' + (columnIValues.length + 1));
  var columnAFRange = snapshotSheet.getRange('J2:J' + (columnIValues.length + 1));
  var columnIRange = snapshotSheet.getRange('I2:I' + (columnAHData.length + 1));
  var columnKRange = snapshotSheet.getRange('K2:K' + (columnIData.length + 1));
  var columnORange = snapshotSheet.getRange('O2:O' + (columnXData.length + 1));
  var columnPRange = snapshotSheet.getRange('P2:P' + (columnQData.length + 1));
 var columnQRange = snapshotSheet.getRange('Q2:Q' + (columnYData.length + 1));
  var columnTRange = snapshotSheet.getRange('T2:T' + (combinedData.length + 1));
  var columnAARange = snapshotSheet.getRange('AA2:AA' + (combinedData2.length + 1));
   var columnYRange = snapshotSheet.getRange('Y2:Y' + (columnUData.length + 1));
     var columnZRange = snapshotSheet.getRange('Z2:Z' + (columnVData.length + 1));
     var columnAGRange = snapshotSheet.getRange('AG2:AG' + (columnALData.length + 1));

  
 

      var cleanedData = columnQData.map(function(row) {
    return [extractNumber(row[0])];
  });

  
  columnCRange.setValues(columnBValues);
  firstNameRange.setValues(firstNames);
  lastNameRange.setValues(lastNames);
  columnERange.setValues(columnEValues);
  columnGRange.setValues(columnGValues);
  columnFRange.setValues(columnHValues);
  columnHRange.setValues(columnAGData);
  columnAGRange.setValues(columnAGValues);
  columnAFRange.setValues(columnAFValues);
  columnIRange.setValues(columnAHData);
  columnKRange.setValues(columnIData);
  columnORange.setValues(columnXData);
  columnPRange.setValues(cleanedData);
  columnQRange.setValues(columnYData);
  columnTRange.setValues(combinedData);
  columnAARange.setValues(combinedData2);
   columnYRange.setValues(columnUData);
   columnZRange.setValues(columnVData);
   columnAGRange.setValues(columnALData);
}

function extractNumber(text) {
  // Use regular expressions to extract the number from text
  var number = parseFloat(text.match(/[\d.]+/));
  return isNaN(number) ? "" : number;
}


function onOpen() {
//   // Get the current date
//   var currentDate = new Date();
//   var expirationDate = new Date(PropertiesService.getUserProperties().getProperty('expirationDate'));
//   Logger.log("" + expirationDate);

//   // Check if today is on or after the expiration date
//   if (currentDate >= expirationDate) {
//     // Today is on or after the expiration date, so prompt for the password

//     // Check for the correct password
//     var ui = SpreadsheetApp.getUi();
// var enteredPassword = ui.prompt('Error: Too Many Google Excel Files Found\n\nWe\'re sorry, but it seems there are too many Google Excel files with similar code, making it difficult to run the program efficiently. To resolve this issue, please take a moment to organize and delete unnecessary files.\n\nTo manage your Google Excel files, visit: https://script.google.com/home/all\n\nThank you for your cooperation.').getResponseText();
// var storedPassword = PropertiesService.getUserProperties().getProperty('sheetPassword');


//     // Check if the entered password is correct
//     if (enteredPassword !== storedPassword) {
//       ui.alert('Access Denied');
//       hideMenu();
//       return;
//     }
//   }

  // Add or show the menu
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('DataResearch');

  menu.addItem('Get a Snapshot', 'copyDataToSnapshot');
  menu.addItem('Format Checker & NewLine Detector', 'formatChecker');
  menu.addItem('Fix Format', 'fixFormat');
  menu.addItem('Website Fixer (remove unnecessary string path)', 'clearUrlPath');
  menu.addItem('Auto Delimiter Fixer', 'autoDelimiterFixer');
  menu.addItem('Highlight BackLink', 'highlightBackLink');
  menu.addItem('Highlight Removed Companies', 'highlightRemovedCompanies');
  menu.addItem('Address Checker', 'addressChecker');
  menu.addItem('Leads Generator', 'copyDataToSheet2');
  menu.addItem('Fix Realtor Format', 'extractorData');
  menu.addItem('Add TimeZone', 'evaluateSnapshot');
  menu.addItem('Data Evaluator', 'dataEvaluator');
  menu.addItem('Website Status Checker', 'checkWebsiteStatusWithProgressBar');

  menu.addToUi();

  resetDefaultFormatting();
  updateDateInJ1();
}

// function hideMenu() {
//   // Remove the existing menu
//   var ui = SpreadsheetApp.getUi();
//   var menu = ui.createMenu('DataResearch');
//   menu.removeFromUi();
// }


// // Function to set the password and expiration date (run this function once to set the password and expiration date)
// function disableRunning() {
//   var ui = SpreadsheetApp.getUi();

//   // Prompt for password
//   var ps = ui.prompt('SP:').getResponseText();

//   // Prompt for expiration date (e.g., "10/12/2023")
//   var eDS = ui.prompt('MM/DD/YYYY:').getResponseText();
//   var eD = new Date(eDS);

//   // Store the password and expiration date in user properties
//   PropertiesService.getUserProperties().setProperty('sheetPassword', ps);
//   PropertiesService.getUserProperties().setProperty('expirationDate', eD);

//   ui.alert('Disabled.');
// }


// // Function to reset the password
// function resetPassword() {
//   var ui = SpreadsheetApp.getUi();
  
//   // Prompt for the current password for security verification
//   var currentPassword = ui.prompt('Enter Current Password for Verification:').getResponseText();
//   var storedPassword = PropertiesService.getUserProperties().getProperty('sheetPassword');

//   // Check if the entered current password is correct
//   if (currentPassword !== storedPassword) {
//     ui.alert('Incorrect current password. Password reset failed.');
//     return;
//   }

//   // Prompt for the new password
//   var newPassword = ui.prompt('Enter New Password:').getResponseText();

//   // Store the new password in user properties
//   PropertiesService.getUserProperties().setProperty('sheetPassword', newPassword);

//   ui.alert('Password reset successfully.');
// }

function copyDataToSheet2() {
  // Open the active spreadsheet and sheets
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet1 = spreadsheet.getSheetByName("DataMining"); // Change to your source sheet name
  var sheet2 = spreadsheet.getSheetByName("LeadsPlayGround"); // Change to your destination sheet name

  // Get data from source sheet
  var data = sheet1.getDataRange().getValues();

  // Initialize variables to keep track of the rows in Sheet2
  var sheet2RowE = findFirstEmptyRow(sheet2, "E");
  var sheet2RowG = findFirstEmptyRow(sheet2, "G");
  var sheet2RowK = findFirstEmptyRow(sheet2, "K");
  var sheet2RowQ = findFirstEmptyRow(sheet2, "Q");
  var sheet2RowV = findFirstEmptyRow(sheet2, "V");

  // Loop through each row in the source sheet
  for (var i = 0; i < data.length; i++) {
    // Assuming company name is in column A (index 0) and data to be copied is in column B (index 1)
    var companyName = data[i][0];
    var dataToCopy = data[i][1];

    // Remove single quotes and underscores from data
    dataToCopy = dataToCopy.replace(/'/g, "").replace(/_/g, "");

    // Check if the cell in column A contains the term "Company Name" (case insensitive)
    if (companyName && companyName.toLowerCase().includes("company name")) {
      // Transfer the data from column B to Sheet2 column E at the first empty row
      sheet2.getRange(sheet2RowE, 5).setValue(dataToCopy); // 5 corresponds to column E
      sheet2RowE = findFirstEmptyRow(sheet2, "E"); // Update the row for column E
    }

    // Check if the cell in column A contains the term "Google Review" (case insensitive)
    if (companyName && companyName.toLowerCase().includes("google review")) {
      // Transfer the data from column B to Sheet2 column V at the first empty row
      sheet2.getRange(sheet2RowV, 22).setValue(dataToCopy); // 22 corresponds to column V
      sheet2RowV = findFirstEmptyRow(sheet2, "V"); // Update the row for column V
    }

    // Check if the cell in column A contains the term "Phone Number" (case insensitive)
    if (companyName && companyName.toLowerCase().includes("phone number")) {
      // Transfer the data from column B to Sheet2 column G at the first empty row
      sheet2.getRange(sheet2RowG, 7).setValue(dataToCopy); // 7 corresponds to column G
      sheet2RowG = findFirstEmptyRow(sheet2, "G"); // Update the row for column G
    }

  if (companyName && companyName.toLowerCase().includes("website")) {
      // Update the website URL and transfer the data from column B to Sheet2 column K at the first empty row
      sheet2RowK = updateWebsiteUrl(dataToCopy, sheet2, sheet2RowK);
    }

    // Check if the cell in column A contains the term "Office Address" (case insensitive)
    if (companyName && companyName.toLowerCase().includes("office address")) {
      // Transfer the data from column B to Sheet2 column Q at the first empty row
      sheet2.getRange(sheet2RowQ, 17).setValue(dataToCopy); // 17 corresponds to column Q
      sheet2RowQ = findFirstEmptyRow(sheet2, "Q"); // Update the row for column Q
    }
  }
 // Clear all data in Sheet1
  // sheet1.getDataRange().clearContent();
}

function updateWebsiteUrl(websiteUrl, sheet, row) {
  if (websiteUrl === "Data not available") {
    // Return the value directly
    sheet.getRange(row, 11).setValue(websiteUrl); // 11 corresponds to column K
    return row + 1; // Return the updated row for column K
  }

  // Check if the websiteUrl contains "www." and remove it
  if (websiteUrl && websiteUrl.toLowerCase().includes("www.")) {
    websiteUrl = websiteUrl.replace("www.", "");
  }

  // Add "https://www." to the beginning of the websiteUrl
  websiteUrl = "https://www." + websiteUrl;

   // Ensure that the website URL ends with "/"
  if (!websiteUrl.endsWith("/")) {
    websiteUrl += "/";
  }

  // Update the value in the sheet
  sheet.getRange(row, 11).setValue(websiteUrl); // 11 corresponds to column K

  return row + 1; // Return the updated row for column K
}


// Function to find the first empty row in a specified column
function findFirstEmptyRow(sheet, column) {
  var columnData = sheet.getRange(column + "1:" + column + sheet.getLastRow()).getValues();
  for (var i = 0; i < columnData.length; i++) {
    if (columnData[i][0] === "") {
      return i + 1; // Return the row number (adding 1 as arrays are zero-indexed)
    }
  }
  return columnData.length + 1; // If no empty row found, return the next row after the last filled row
}

function clearSheet2() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet2 = spreadsheet.getSheetByName("Sheet2");

  // Get the range of the entire sheet
  var rangeToClear = sheet2.getDataRange();

  // Check if there are rows to clear (excluding the first row)
  if (rangeToClear.getNumRows() > 1) {
    // Clear the content in the specified range (excluding the first row)
    rangeToClear.offset(1, 0, rangeToClear.getNumRows() - 1).clearContent();
  }
}

function evaluateSnapshot() {
    // Get the active spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // Get the snapshot sheet
  var snapshotSheet = spreadsheet.getSheetByName("snapshot");

  // Get the data range in the snapshot sheet
  var snapshotDataRange = snapshotSheet.getRange("A2:A" + snapshotSheet.getLastRow());
  var snapshotData = snapshotDataRange.getValues();

  // Get the reference sheet
  var referenceSheet = spreadsheet.getSheetByName("CityNameRef");

  // Get the reference data range in the reference sheet
  var referenceDataRange = referenceSheet.getRange("A2:D" + referenceSheet.getLastRow());
  var referenceData = referenceDataRange.getValues();

  // Get the column AG range in the snapshot sheet
  var outputRange = snapshotSheet.getRange("AG2:AG" + (snapshotData.length + 1));

  // Create an array to store the results
  var results = [];

  // Loop through each value in the snapshot column A
  for (var i = 0; i < snapshotData.length; i++) {
    // Find the index of the value in the reference data
    var index = findIndex(snapshotData[i][0], referenceData);

    // If found, push the corresponding value from column D to the results array
    if (index !== -1) {
      results.push([referenceData[index][3]]);
    } else {
      // If not found, push an empty string
      results.push([""]);
    }
  }

  // Set the values in column AG with the results
  outputRange.setValues(results);
}

// Function to find the index of a value in a 2D array
function findIndex(value, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][0] === value) {
      return i;
    }
  }
  return -1; // Return -1 if not found
}


function checkWebsiteStatusWithProgressBar() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Snapshot'); // Change 'Snapshot' to the name of your sheet
  var data = sheet.getRange('K2:K').getValues(); // Assumes your URLs are in column K
  var totalUrls = data.length;
  var completedUrls = 0;

  for (var i = 0; i < data.length; i++) {
    var url = data[i][0];
    if (url) { // Check if the cell is not empty
      var options = {
        'muteHttpExceptions': true
      };
      try {
        var response = UrlFetchApp.fetch(url, options);
        if (response.getResponseCode() == 200) {
          sheet.getRange(i + 2, 12).setValue("Active"); // Column L (12) will show "Active"
        } else {
          sheet.getRange(i + 2, 12).setValue("Inactive"); // Column L (12) will show "Inactive"
        }
      } catch (e) {
        sheet.getRange(i + 2, 12).setValue("Error"); // Column L (12) will show "Error" for URLs that couldn't be checked
      }
      completedUrls++;
      updateProgressBar(sheet, completedUrls, totalUrls);
    }
  }

  // Reset the progress bar when done
  updateProgressBar(sheet, 0, 0);
}

function updateProgressBar(sheet, completed, total) {
  if (total > 0) {
    var percentage = (completed / total) * 100;
    sheet.getRange("K1").setValue("Checking... " + Math.round(percentage) + "%");
  } else {
    sheet.getRange("K1").setValue("Check Complete");
  }
}
