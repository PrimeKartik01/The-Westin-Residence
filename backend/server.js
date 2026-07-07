import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(cors());

app.use(express.json());

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