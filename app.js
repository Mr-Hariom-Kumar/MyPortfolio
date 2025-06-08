const express = require('express');
const app = express();
const port = 1200;
const flash = require("connect-flash");
const path = require('path');
const session = require('express-session');
const nodemailer = require('nodemailer');

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "hariom.9931533536@gmail.com",
        pass: "tjhtzjnalijrdsqk",
    },
});

async function generateOTP(email, otp) {
    const info = await transporter.sendMail({
        from: "hariom.9931533536@gmail.com",
        to: email,
        subject: "OTP Verification",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 10px;">
                <h2>OTP Verification</h2>
                <p>Your OTP verification code is:</p>
                <p style="font-size: 28px; font-weight: bold; color:rgb(29, 100, 171);">${otp}</p>
                <p>Please do not share this code with anyone.</p>
            </div>
        `
    });

    console.log("OTP sent:", info.messageId);
}

app.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    req.session.otp = otp;
    req.session.email = email;

    try {
        await generateOTP(email, otp);
        req.flash("success", "OTP sent to your email.");
    } catch (e) {
        req.flash("error", "Failed to send OTP.");
    }

    res.redirect("back");
});

app.post("/sendmail", async (req, res) => {
    const { name, email, message, otp } = req.body;

    if (Number(otp) === Number(req.session.otp) && email === req.session.email) {
        try {
            await transporter.sendMail({
                from: email,
                to: "766hariwork@gmail.com",
                subject: `Message from ${name}`,
                text: message
            });

            req.flash("success", "Message sent successfully!");
        } catch (e) {
            req.flash("error", "Failed to send message.");
        }
    } else {
        req.flash("error", "Invalid OTP. Please verify your email.");
    }

    res.redirect("https://mr-hariom-kumar.github.io/MyPortfolio/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
