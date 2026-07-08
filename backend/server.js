import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cors from "cors";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(cors());

app.use(express.json());

// In-memory OTP store: { email: { otp, expiresAt } }
const otpStore = new Map();

const transporter = nodemailer.createTransport({

    host: process.env.SMTP_HOST,

    port: Number(process.env.SMTP_PORT),

    secure: process.env.SMTP_SECURE === "true",

    auth: {

        user: process.env.SMTP_USER,

        pass: process.env.SMTP_PASS

    }

});

transporter.verify((error) => {

    if (error) {

        console.log(error);

    } else {

        console.log("SMTP Connected Successfully");

    }

});

app.get("/", (req, res) => {

    res.send("Server Running");

});

// ─── Send OTP ────────────────────────────────────────────────────────────────
app.post("/api/send-otp", async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }

        // Generate 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        otpStore.set(email, { otp, expiresAt });

        await transporter.sendMail({

            from: `"The Westin Residence" <${process.env.SMTP_USER}>`,

            to: email,

            subject: "🔐 Your OTP – The Westin Residence",

            html: `
                <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; background: #0b1325; color: #fff; border-radius: 12px; overflow: hidden;">
                    <div style="background: #0b1325; padding: 32px 40px; text-align: center; border-bottom: 1px solid #c9a84c33;">
                        <h1 style="color: #c9a84c; font-size: 22px; margin: 0; letter-spacing: 2px; text-transform: uppercase;">The Westin Residence</h1>
                    </div>
                    <div style="padding: 40px; text-align: center;">
                        <p style="color: #cbd5e1; font-size: 15px; margin-bottom: 24px;">Your One-Time Password to unlock the Master Plan:</p>
                        <div style="display: inline-block; background: #c9a84c22; border: 2px solid #c9a84c; border-radius: 12px; padding: 18px 40px; margin-bottom: 24px;">
                            <span style="color: #c9a84c; font-size: 40px; font-weight: bold; letter-spacing: 12px;">${otp}</span>
                        </div>
                        <p style="color: #94a3b8; font-size: 13px; margin: 0;">This OTP is valid for <strong style="color: #c9a84c;">10 minutes</strong>.</p>
                        <p style="color: #64748b; font-size: 12px; margin-top: 8px;">If you did not request this, please ignore this email.</p>
                    </div>
                    <div style="background: #050d1a; padding: 20px 40px; text-align: center;">
                        <p style="color: #475569; font-size: 11px; margin: 0;">© The Westin Residence. All rights reserved.</p>
                    </div>
                </div>
            `

        });

        res.json({ success: true, message: "OTP sent to your email." });

    } catch (error) {

        console.log(error);

        res.status(500).json({ success: false, message: "Failed to send OTP. Please try again." });

    }

});

// ─── Verify OTP ──────────────────────────────────────────────────────────────
app.post("/api/verify-otp", (req, res) => {

    const { email, otp } = req.body;

    console.log("[verify-otp] received:", { email, otp, type: typeof otp });

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Email and OTP are required." });
    }

    const record = otpStore.get(email);

    console.log("[verify-otp] stored record:", record);

    if (!record) {
        return res.status(400).json({ success: false, message: "OTP not found. Please request a new OTP." });
    }

    if (Date.now() > record.expiresAt) {
        otpStore.delete(email);
        return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one." });
    }

    console.log("[verify-otp] compare:", JSON.stringify(record.otp), "===", JSON.stringify(otp), "→", record.otp === otp);

    if (record.otp !== otp) {
        return res.status(400).json({ success: false, message: "Invalid OTP. Please try again." });
    }

    otpStore.delete(email);
    res.json({ success: true, message: "OTP verified successfully." });

});

// ─── Submit Lead ──────────────────────────────────────────────────────────────
app.post("/api/lead", async (req, res) => {

    try {

        const {
            name,
            email,
            mobile,
            city,
            requirement
        } = req.body;

        await transporter.sendMail({

            from: `"The Westin Residence" <${process.env.SMTP_USER}>`,

            to: process.env.SMTP_USER,

            replyTo: email,

            subject: "🏡 New Property Enquiry",

            html: `

                <h2>New Property Enquiry</h2>

                <table cellpadding="8" cellspacing="0" border="1">

                    <tr>
                        <td><strong>Name</strong></td>
                        <td>${name}</td>
                    </tr>

                    <tr>
                        <td><strong>Email</strong></td>
                        <td>${email}</td>
                    </tr>

                    <tr>
                        <td><strong>Mobile</strong></td>
                        <td>${mobile}</td>
                    </tr>

                    <tr>
                        <td><strong>City</strong></td>
                        <td>${city}</td>
                    </tr>

                    <tr>
                        <td><strong>Requirement</strong></td>
                        <td>${requirement}</td>
                    </tr>

                </table>

            `

        });

        res.json({

            success: true,

            message: "Enquiry Submitted Successfully."

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Unable to submit enquiry."

        });

    }

});

app.listen(process.env.PORT, () => {

    console.log(`Server running on ${process.env.PORT}`);

});