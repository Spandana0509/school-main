const cds = require('@sap/cds');
const XLSX = require('xlsx');
module.exports = cds.service.impl(async function () {
  this.on('ExcelUpload', async (req) => {
    const { mimeType, fileName, fileContent, fileExtension } = req.data;

    if (mimeType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return req.error('Unsupported file type. Please upload an Excel file.');
    }

    try {
        const fileBuffer = Buffer.from(fileContent, 'base64');
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; 
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        const tx = cds.transaction(req);
        for (const row of data) {
            await tx.run(INSERT.into('school_school').entries({
              id:row['id'],
      ID:row['ID'],
      school_name: row['school_Name'],
        school_ID: row['school_ID'],
        
        address: row['address'],
        no_of_classes: row['no_of_classes'],
        no_of_teachers: row['no_of_teachers']
            }));
        }
        return { success: true };

    } catch (error) {
        console.error('File upload failed:', error);
        return req.error('Failed to process the file. Please try again.');
    }
    });
});