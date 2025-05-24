"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Palette } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import ParallaxSection from "./ui/ParallaxSection";
import ScrollAnimationWrapper from "./ui/ScrollAnimationWrapper";
import TextReveal from "./ui/TextReveal";

const timelineItems = [
	{
		year: "2018",
		title: "Full-Stack Developer",
		description:
			"4+ years experience in frontend (React, Next.js, TailwindCSS) and backend (Node.js, Express, Prisma) development.",
		icon: Briefcase,
	},
	{
		year: "2024",
		title: "Cybersecurity Intern – INSA",
		description:
			"3-month internship focused on penetration testing, vulnerability scanning, and reporting security risks.",
		icon: Briefcase,
	},
	{
		year: "2019",
		title: "Full-Stack Developer",
		description: "Developed and maintained complex web applications",
		icon: Briefcase,
	},
	{
		year: "2022",
		title: "Graphics Designer",
		description:
			"Created UI designs, branding assets, and social media graphics using tools like Figma, Photoshop, and Illustrator.",
		icon: Palette,
	},
	{
		year: "2025",
		title: "B.S. in Software Engineering",
		description: "Graduating with honors, specializing in software engineering",
		icon: GraduationCap,
	},
];

export default function AboutSection() {
	const { theme } = useTheme();

	return (
		<section id="about" className="min-h-screen py-20 relative">
			{/* Background parallax elements */}
			<ParallaxSection speed={0.3} className="absolute inset-0 z-0">
				<div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-emerald-300 to-teal-300 opacity-20 dark:opacity-10 blur-3xl" />
				<div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-green-300 to-emerald-300 opacity-20 dark:opacity-10 blur-3xl" />
			</ParallaxSection>

			<ScrollAnimationWrapper animation="fade" delay={0.1} className="mb-8">
				<TextReveal className="text-3xl md:text-4xl font-bold text-center about-title relative z-10">
					About Me
				</TextReveal>
			</ScrollAnimationWrapper>

			<div className="max-w-3xl mx-auto relative z-10">
				{timelineItems.map((item, index) => (
					<ScrollAnimationWrapper
						key={index}
						animation="slide"
						direction="up"
						delay={index * 0.15}
						distance={30}
						threshold={0.2}
						repeat={true}
					>
						<div className="flex mb-8">
							<div className="flex flex-col items-center mr-4">
								<motion.div
									className={`w-12 h-12 rounded-full flex items-center justify-center ${
										theme === "dark"
											? "bg-teal-400 text-midnight-blue"
											: "bg-gradient-to-r from-teal-400 to-emerald-500 text-white"
									}`}
									whileHover={{
										scale: 1.1,
										boxShadow: "0 0 20px rgba(45, 212, 191, 0.5)",
									}}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 15,
									}}
								>
									<item.icon className="w-6 h-6" />
								</motion.div>
								{index !== timelineItems.length - 1 && (
									<motion.div
										className={`w-0.5 h-full ${
											theme === "dark"
												? "bg-teal-400"
												: "bg-gradient-to-b from-teal-400 to-emerald-500"
										} mt-2`}
										initial={{ height: 0 }}
										animate={{ height: "100%" }}
										transition={{ duration: 0.5, delay: 0.3 }}
									/>
								)}
							</div>
							<motion.div
								className={theme === "dark" ? "" : "light-card p-4 rounded-lg"}
								whileHover={{
									y: -5,
									boxShadow:
										theme === "dark"
											? "0 10px 30px -15px rgba(0, 0, 0, 0.5)"
											: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
								}}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 15,
								}}
							>
								<h3
									className={`text-xl font-semibold ${
										theme === "dark" ? "" : "text-emerald-600"
									}`}
								>
									{item.title}
								</h3>
								<p
									className={
										theme === "dark" ? "text-gray-400" : "text-gray-500"
									}
								>
									{item.year}
								</p>
								<p
									className={`mt-2 ${theme === "dark" ? "" : "text-gray-700"}`}
								>
									{item.description}
								</p>
							</motion.div>
						</div>
					</ScrollAnimationWrapper>
				))}
			</div>
		</section>
	);
}
