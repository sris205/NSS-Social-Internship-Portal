const User = require("../models/User");
const Application = require("../models/Application");
const DailySubmission = require("../models/DailySubmission");

const fs = require("fs");
const path = require("path");

const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

const downloadCertificate = async (req, res) => {

    try {

        const { userId } = req.params;

        // Get Student
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // Check Application
        const application = await Application.findOne({
            userId,
            status: "approved"
        });

        if (!application) {
            return res.status(400).json({
                success: false,
                message: "Application not approved."
            });
        }

        // Get Verified Submissions
        const submissions = await DailySubmission.find({
            userId,
            status: "verified"
        });

        // Internship Complete?
        if (submissions.length < 10) {
            return res.status(400).json({
                success: false,
                message: "Complete all 10 verified days first."
            });
        }

        const fs = require("fs");
        const path = require("path");
        const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

        // Read the certificate template
        const imageBytes = fs.readFileSync(
            path.join(__dirname, "../assets/certificate-template.png")
        );

        // Create a new PDF
        const pdfDoc = await PDFDocument.create();

        // Embed the PNG image
        const pngImage = await pdfDoc.embedPng(imageBytes);

        // Get image size
        const { width, height } = pngImage.scale(1);
        console.log(width, height);

        // Add a page
        const page = pdfDoc.addPage([width, height]);

        // Draw the certificate image
        page.drawImage(pngImage, {
            x: 0,
            y: 0,
            width,
            height
        });

        // Load font
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const fontSize = 80;
        const textWidth = font.widthOfTextAtSize(
            user.name,
            fontSize
        );

        page.drawText(user.name, {
            x: (width-textWidth)/2,
            y: 760,
            size: fontSize,
            font,
            color: rgb(0.38, 0.53, 0.58)   // similar blue-green color
        
        });
         
        const date = new Date().toLocaleDateString("en-GB");
        page.drawText(date, {
            x: 1040,
            y: 425,
            size: 24,
            font,
            color: rgb(0,0,0)
        
        });

        const pdfBytes = await pdfDoc.save();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${user.name}_Certificate.pdf`
        );

        return res.send(Buffer.from(pdfBytes));

        // We'll generate PDF here in the next step

        // res.json({
        //     success: true,
        //     studentName: user.name,
        //     date: new Date().toLocaleDateString()
        // });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

module.exports = {
    downloadCertificate
};