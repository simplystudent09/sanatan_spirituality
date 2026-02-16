/**
 * Google Apps Script - Append form data to USER DATA CAPTURE sheet
 *
 * Setup:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/13BB78AX_kX7grN8mwTSSDCjbOAZoKXsqOuMgRCVXXQs/edit
 * 2. Add "Contact Number" in cell B1 (A1 already has "Name")
 * 3. Go to Extensions > Apps Script
 * 4. Replace any default code with this script
 * 5. Save (Ctrl/Cmd + S)
 * 6. Deploy > New deployment > Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. Authorize when prompted, then copy the Web app URL
 * 8. Add to your .env: VITE_GOOGLE_SHEETS_WEB_APP_URL=<your-web-app-url>
 */

var CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

function doOptions() {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(CORS_HEADERS);
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var name = (data.name || '').toString().trim();
    var contactNumber = (data.contact_number || data.contactNumber || '').toString().trim();

    if (name && contactNumber) {
      sheet.appendRow([name, contactNumber]);
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, message: 'Added to sheet' }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(CORS_HEADERS);
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, message: 'Name and contact required' }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(CORS_HEADERS);
    }
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(CORS_HEADERS);
  }
}
