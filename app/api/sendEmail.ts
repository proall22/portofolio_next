// filepath: c:\Users\admin\Downloads\portofolio_next\pages\api\sendEmail.js
import nodemailer from "nodemailer";

interface EmailRequestBody {
	name: string;
	email: string;
	message: string;
}

interface EmailResponse {
	message: string;
}

export default async function handler(
	req: { method: string; body: EmailRequestBody },
	res: { status: (code: number) => { json: (body: EmailResponse) => void } }
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { name, email, message } = req.body;

	if (!name || !email || !message) {
		return res.status(400).json({ message: "All fields are required" });
	}

	try {
		// Configure the transporter
		const transporter = nodemailer.createTransport({
			service: "gmail", // Use your email provider (e.g., Gmail, Outlook)
			auth: {
				user: process.env.EMAIL_USER as string, // Your email address
				pass: process.env.EMAIL_PASS as string, // Your email password or app-specific password
			},
		});

		// Email options
		const mailOptions = {
			from: email,
			to: process.env.RECEIVER_EMAIL as string, // Your email address to receive messages
			subject: `New Contact Form Submission from ${name}`,
			text: `You have a new message from ${name} (${email}):\n\n${message}`,
		};

		// Send the email
		await transporter.sendMail(mailOptions);

		return res.status(200).json({ message: "Email sent successfully" });
	} catch (error) {
		console.error("Error sending email:", error);
		return res.status(500).json({ message: "Failed to send email" });
	}
}
