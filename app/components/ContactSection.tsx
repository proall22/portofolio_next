"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, MessageSquare } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import ScrollAnimationWrapper from "./ui/ScrollAnimationWrapper";
import TextReveal from "./ui/TextReveal";

export default function ContactSection() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [formErrors, setFormErrors] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");
	const { theme } = useTheme();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error when user starts typing
		if (formErrors[name as keyof typeof formErrors]) {
			setFormErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = () => {
		let valid = true;
		const newErrors = { name: "", email: "", message: "" };

		// Validate name
		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
			valid = false;
		}

		// Validate email
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
			valid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
			valid = false;
		}

		// Validate message
		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
			valid = false;
		}

		setFormErrors(newErrors);
		return valid;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);

		// Simulate API call
		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			setSubmitStatus("success");
			setFormData({ name: "", email: "", message: "" });

			// Reset success message after 5 seconds
			setTimeout(() => {
				setSubmitStatus("idle");
			}, 5000);
		} catch (error) {
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section
			id="contact"
			className="min-h-screen py-20 relative overflow-hidden"
		>
			<div
				className={`absolute inset-0 ${
					theme === "dark"
						? "bg-gradient-to-br from-teal-900 via-purple-900 to-midnight-blue opacity-50"
						: "bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 opacity-70"
				} blur-xl`}
			></div>

			<ScrollAnimationWrapper animation="fade" className="mb-8 relative z-10">
				<TextReveal className="text-3xl md:text-4xl font-bold text-center contact-title">
					Contact Me
				</TextReveal>
			</ScrollAnimationWrapper>

			<div className="max-w-2xl mx-auto relative z-10">
				<div
					className={`p-8 rounded-lg ${
						theme === "dark" ? "bg-gray-800 bg-opacity-80" : "light-card"
					}`}
				>
					<form onSubmit={handleSubmit} className="space-y-6">
						<ScrollAnimationWrapper
							animation="slide"
							direction="up"
							delay={0.1}
							distance={20}
						>
							<div>
								<label
									htmlFor="name"
									className={`block text-sm font-medium mb-2 ${
										theme === "dark" ? "text-gray-300" : "text-gray-700"
									}`}
								>
									Name
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<User
											className={`w-5 h-5 ${
												theme === "dark" ? "text-gray-500" : "text-gray-400"
											}`}
										/>
									</div>
									<input
										id="name"
										name="name"
										type="text"
										value={formData.name}
										onChange={handleChange}
										className={`w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 ${
											theme === "dark"
												? "text-gray-300 bg-gray-700 bg-opacity-70"
												: "text-gray-800 bg-white bg-opacity-70"
										} ${formErrors.name ? "border border-red-500" : ""}`}
										placeholder="Your name"
									/>
								</div>
								{formErrors.name && (
									<p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
								)}
							</div>
						</ScrollAnimationWrapper>

						<ScrollAnimationWrapper
							animation="slide"
							direction="up"
							delay={0.2}
							distance={20}
						>
							<div>
								<label
									htmlFor="email"
									className={`block text-sm font-medium mb-2 ${
										theme === "dark" ? "text-gray-300" : "text-gray-700"
									}`}
								>
									Email
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Mail
											className={`w-5 h-5 ${
												theme === "dark" ? "text-gray-500" : "text-gray-400"
											}`}
										/>
									</div>
									<input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleChange}
										className={`w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 ${
											theme === "dark"
												? "text-gray-300 bg-gray-700 bg-opacity-70"
												: "text-gray-800 bg-white bg-opacity-70"
										} ${formErrors.email ? "border border-red-500" : ""}`}
										placeholder="your.email@example.com"
									/>
								</div>
								{formErrors.email && (
									<p className="mt-1 text-sm text-red-500">
										{formErrors.email}
									</p>
								)}
							</div>
						</ScrollAnimationWrapper>

						<ScrollAnimationWrapper
							animation="slide"
							direction="up"
							delay={0.3}
							distance={20}
						>
							<div>
								<label
									htmlFor="message"
									className={`block text-sm font-medium mb-2 ${
										theme === "dark" ? "text-gray-300" : "text-gray-700"
									}`}
								>
									Message
								</label>
								<div className="relative">
									<div className="absolute top-3 left-3 pointer-events-none">
										<MessageSquare
											className={`w-5 h-5 ${
												theme === "dark" ? "text-gray-500" : "text-gray-400"
											}`}
										/>
									</div>
									<textarea
										id="message"
										name="message"
										rows={4}
										value={formData.message}
										onChange={handleChange}
										className={`w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 ${
											theme === "dark"
												? "text-gray-300 bg-gray-700 bg-opacity-70"
												: "text-gray-800 bg-white bg-opacity-70"
										} ${formErrors.message ? "border border-red-500" : ""}`}
										placeholder="Type your message here..."
									/>
								</div>
								{formErrors.message && (
									<p className="mt-1 text-sm text-red-500">
										{formErrors.message}
									</p>
								)}
							</div>
						</ScrollAnimationWrapper>

						<ScrollAnimationWrapper
							animation="slide"
							direction="up"
							delay={0.4}
							distance={20}
						>
							<motion.button
								type="submit"
								disabled={isSubmitting}
								whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
								whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
								className={`w-full py-3 px-4 rounded-md flex items-center justify-center ${
									isSubmitting
										? theme === "dark"
											? "bg-gray-600 cursor-not-allowed"
											: "bg-gray-300 cursor-not-allowed"
										: theme === "dark"
										? "bg-teal-400 text-midnight-blue hover:bg-teal-500"
										: "bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:from-pink-500 hover:to-purple-600"
								} transition-colors duration-300`}
							>
								{isSubmitting ? (
									<>
										<svg
											className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Sending...
									</>
								) : (
									<>
										<Send className="w-5 h-5 mr-2" />
										Send Message
									</>
								)}
							</motion.button>
						</ScrollAnimationWrapper>

						<AnimatePresence>
							{submitStatus === "success" && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className="mt-4 p-3 bg-green-100 dark:bg-green-900 dark:bg-opacity-30 text-green-800 dark:text-green-300 rounded-md text-center"
								>
									Thank you! Your message has been sent successfully.
								</motion.div>
							)}

							{submitStatus === "error" && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className="mt-4 p-3 bg-red-100 dark:bg-red-900 dark:bg-opacity-30 text-red-800 dark:text-red-300 rounded-md text-center"
								>
									Oops! Something went wrong. Please try again later.
								</motion.div>
							)}
						</AnimatePresence>
					</form>

					<ScrollAnimationWrapper
						animation="fade"
						delay={0.6}
						className="mt-8 text-center"
					>
						<p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
							Or reach out directly:
						</p>
						<a
							href="mailto:contact@example.com"
							className={`inline-block mt-2 transition-transform duration-300 hover:scale-105 ${
								theme === "dark"
									? "text-teal-400 hover:underline"
									: "text-pink-600 hover:underline"
							}`}
						>
							judeaio120@gmail.com
						</a>
					</ScrollAnimationWrapper>
				</div>
			</div>
		</section>
	);
}
