const cds = require('@sap/cds');
const xlsx = require('xlsx');

module.exports = cds.service.impl(async function () {
  const { School } = this.entities;

  this.before('READ', School, async () => {
    await importExcelData();
  });

  async function importExcelData() {
    const db = await cds.connect.to('db');
    const { School } = db.entities('com.satinfotech.school');

    // Read the Excel file
    const workbook = xlsx.readFile('C:/Users/Hp/school.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    let jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: null });

    // Function to parse Excel date value
    function parseDate(excelDate) {
      if (typeof excelDate === 'number') {
        const excelEpoch = new Date(Date.UTC(1899, 11, 30));
        const jsDate = new Date(excelEpoch.getTime() + excelDate * 86400000);
        return jsDate.toISOString().split('T')[0];
      }
      return excelDate;
    }

    // Trim field names, parse dates, filter out empty rows and validate critical fields
    jsonData = jsonData.map(row => {
      const trimmedRow = {};
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          const trimmedKey = key.trim();
          let value = row[key];

          // Add any date parsing if necessary for Hospital schema
          if (trimmedKey === 'established_date' && value) {
            value = parseDate(value);
          }

          trimmedRow[trimmedKey] = value;
        }
      }
      return trimmedRow;
    });

    jsonData = jsonData.filter(row => {
      const hasData = Object.values(row).some(value => value !== null && value !== '');
      const hasCriticalFields =  row.school_ID;
      if (!hasData) {
        console.warn('Empty row:', row);
      }
      if (!hasCriticalFields) {
        console.warn('Row with missing critical data:', row);
      }
      return hasData && hasCriticalFields;
    });

    console.log('Filtered data to be imported:', jsonData);

    // Clear existing data
    await db.run(DELETE.from(School));

    // Insert new data
    for (const row of jsonData) {
      console.log('Inserting row:', row);
      await db.run(INSERT.into(School).entries(row));
    }

    console.log('Data imported successfully');
  }
});