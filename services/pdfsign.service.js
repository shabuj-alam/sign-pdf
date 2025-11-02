import multer from "multer";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';


// Configure multer for file uploads
const storage = multer.memoryStorage();

export const pdfUpload = multer({
  storage: storage,
  limits: { filesize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});


export const pdfSign = async (req, res) => {
    try {
        if (!req.file) {
          return res.status(400).json({ error: 'No PDF file uploaded' });
        }
    
        // Get signature text from request (or use default)
        const signatureText = req.body.signatureName || 'Digitally Signed';
        const signatureDate = new Date().toLocaleDateString();
    
        // Load the PDF
        const pdfDoc = await PDFDocument.load(req.file.buffer);
        
        // Get the first page
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();
    
        // Embed font
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
        // Add signature box on the first page (bottom right corner)
        const signatureBoxWidth = 200;
        const signatureBoxHeight = 60;
        const margin = 25;
    
        // Draw signature box background
        firstPage.drawRectangle({
          x: width - signatureBoxWidth - margin,
          y: margin,
          width: signatureBoxWidth,
          height: signatureBoxHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1.5,
          color: rgb(0.95, 0.95, 0.95),
        });
    
        // Add "Digitally Signed" label
        firstPage.drawText('DIGITALLY SIGNED', {
          x: width - signatureBoxWidth - margin + 10,
          y: margin + signatureBoxHeight - 20,
          size: 8,
          font: boldFont,
          color: rgb(0, 0, 0),
        });
    
        // Add signature name
        firstPage.drawText(signatureText, {
          x: width - signatureBoxWidth - margin + 10,
          y: margin + signatureBoxHeight - 35,
          size: 8,
          font: boldFont,
          color: rgb(0, 0.2, 0.6),
        });
    
        // Add date
        firstPage.drawText(`Date: ${signatureDate}`, {
          x: width - signatureBoxWidth - margin + 10,
          y: margin + signatureBoxHeight - 50,
          size: 8,
          font: font,
          color: rgb(0, 0, 0),
        });
    
        // Save the signed PDF
        const signedPdfBytes = await pdfDoc.save();
    
        // Send the signed PDF back
        res.set({
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="signed-${req.file.originalname}"`,
          'Content-Length': signedPdfBytes.length
        });
    
        res.send(Buffer.from(signedPdfBytes));
    
      } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).json({ error: 'Failed to process PDF', details: error.message });
      }
}