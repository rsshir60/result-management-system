// backend/controllers/adminController.js
const ExcelJS = require('exceljs');
const Result = require('../models/resultModel');

const uploadMarks = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const worksheet = workbook.getWorksheet(1);

    const results = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row

      const rowData = row.values.reduce((acc, value, index) => {
        acc[worksheet.getRow(1).getCell(index).text] = value;
        return acc;
      }, {});

      results.push({
        studentId: rowData.studentId, // Assuming 'studentId' is a column header in the Excel file
        type: req.body.type,
        marks: parseFloat(rowData.marks), // Assuming 'marks' is a column header in the Excel file
        data: rowData,
      });
    });

    await Result.insertMany(results);
    res.status(201).json({ message: 'Marks uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading marks', error });
  }
};

module.exports = {
  uploadMarks,
};
