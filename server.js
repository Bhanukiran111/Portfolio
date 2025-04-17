const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config({ path: './mail.env' });

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Contact Form API!');  // Simple message for testing
});

// Contact Form Route
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Configure Nodemailer with environment variables
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // Use the host from .env
            port: process.env.MAIL_PORT, // Use the port from .env
            secure: process.env.MAIL_PORT === '465',  // SSL for port 465, TLS for 587
            auth: {
                user: process.env.EMAIL, // Email address from .env
                pass: process.env.EMAIL_PASSWORD // Application-specific password from .env
            },
            tls: {
                rejectUnauthorized: false // Allow connections even if there are SSL certificate issues
            }
        });

        // Email options
        const mailOptions = {
            from: email, // Sender's email
            to: process.env.EMAIL, // Your email from .env
            subject: `Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        // Send Email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error("Error sending email:", error); // Log detailed error for debugging
        res.status(500).json({ error: 'Failed to send message.', details: error.message });
    }
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});