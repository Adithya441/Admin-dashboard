import jsPDF from "jspdf";

export const convertDataToPDF = (data,title) => {
  const doc = new jsPDF();
  doc.setFontSize(12);

  const startX = 14; // X position for the start of the table
  const startY = 30; // Y position for the start of the table
  const rowHeight = 10; // Height of each row
  const colWidth = 50; // Width of each column
  const numCols = 3;   // Number of columns
  const maxRowsPerPage = 20; // Maximum rows per page before a page break

  const headers = ["userId", "id", "completed"];

  // Function to draw the table header
  const drawTableHeader = () => {
    doc.text(`${title}`, startX, startY - 10);

    // Draw header text
    headers.forEach((header, index) => {
      doc.text(header, startX + index * colWidth + colWidth / 2, startY, { align: 'center' });
    });

    // Draw header lines
    const headerBottomY = startY + 5; // Y position for the bottom of the header line
    doc.line(startX, headerBottomY, startX + numCols * colWidth, headerBottomY); // Top line of the header
    for (let i = 0; i <= numCols; i++) {
      doc.line(startX + i * colWidth, startY, startX + i * colWidth, headerBottomY); // Vertical lines
    }
  };

  // Function to draw the rows of data
  const drawDataRows = (startIndex) => {
    for (let i = startIndex; i < Math.min(data.length, startIndex + maxRowsPerPage); i++) {
      const currentY = startY + ((i % maxRowsPerPage) + 1) * rowHeight; // Y position for the current row

      headers.forEach((_, index) => {
        const text = String(data[i][headers[index]] || '');
        const x = startX + index * colWidth + colWidth / 2;
        const y = currentY;

        // Center text in the cell
        doc.text(text, x, y, { align: 'center' });
      });

      // Draw horizontal line beneath each row
      doc.line(startX, currentY + rowHeight / 2, startX + numCols * colWidth, currentY + rowHeight / 2);
    }
  };

  // Draw the table headers and rows, handling pagination
  let pageNumber = 1;
  const totalPages = Math.ceil(data.length / maxRowsPerPage);

  for (let i = 0; i < data.length; i += maxRowsPerPage) {
    if (i > 0) {
      doc.addPage();
      doc.setFontSize(12);
    }

    drawTableHeader();
    drawDataRows(i);

    // Add page number
    doc.text(`Page ${pageNumber} of ${totalPages}`, 190, 280);

    pageNumber++;
  }

  // Save the generated PDF
  doc.save("data_export.pdf");
};
