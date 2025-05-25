"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Palette, Shield, X, ExternalLink, Github } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { useTheme } from "./ThemeProvider";

const projects = [
	{
		title: "E-commerce Platform",
		description: "A full-stack e-commerce solution with React and Node.js",
		category: "fullstack",
		icon: Code,
		longDescription:
			"This comprehensive e-commerce platform features user authentication, product catalog, shopping cart, payment processing, and order management. Built with React for the frontend and Node.js/Express for the backend, with MongoDB as the database.",
		technologies: [
			"React",
			"Node.js",
			"Express",
			"MongoDB",
			"Stripe API",
			"JWT Authentication",
		],
		demoUrl: "https://project-brown-sigma.vercel.app/",
		githubUrl: "https://github.com/proall22/ecom-web",
		image: "/gebeya.png",
	},
	{
		title: "Portfolio Website",
		description: "A responsive portfolio website with advanced animations",
		category: "frontend",
		icon: Palette,
		longDescription:
			"This portfolio website showcases creative work with advanced animations, interactive elements, and responsive design. It features a custom-built animation system, dynamic content loading, and optimized performance.",
		technologies: ["React", "Framer Motion", "GSAP", "Tailwind CSS", "Next.js"],
		demoUrl: null, // No live demo available
		githubUrl: null, // No public repo available
	},
	{
		title: "Security Audit Tool",
		description: "An automated security auditing tool for web applications",
		category: "security",
		icon: Shield,
		longDescription:
			"This security audit tool automatically scans web applications for common vulnerabilities such as XSS, CSRF, SQL injection, and more. It generates comprehensive reports with remediation suggestions and severity ratings.",
		technologies: ["Python", "Docker", "OWASP ZAP API", "Selenium", "Flask"],
		demoUrl: null,
		githubUrl: null, // No demo or public repo available
	},
	{
		title: "OmniConnect – AI Assistant for Productivity and Engagement",
		description:
			"A multi-functional AI assistant powered by IBM Watsonx for productivity and engagement.",
		category: "ai",
		icon: Code,
		longDescription:
			"OmniConnect is a multi-functional AI assistant powered by IBM Watsonx, designed to enhance professional productivity, personal management, and customer engagement. It integrates seamlessly with digital tools, leveraging NLP, sentiment analysis, and task automation to deliver personalized, context-aware assistance.",
		technologies: [
			"IBM Watsonx",
			"NLP",
			"Sentiment Analysis",
			"Task Automation",
			"Watson Discovery",
			"Machine Learning",
		],
		demoUrl: "https://omni-connect-one.vercel.app/",
		githubUrl: "https://github.com/proall22/OmniConnect",
		image: "/Ibm.png",
	},
];

export default function ProjectsSection() {
	const [filter, setFilter] = useState("all");
	const [selectedProject, setSelectedProject] = useState<
		(typeof projects)[0] | null
	>(null);
	const { theme } = useTheme();

	const filteredProjects =
		filter === "all"
			? projects
			: projects.filter((project) => project.category === filter);

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (selectedProject) {
				const currentIndex = projects.findIndex(
					(p) => p.title === selectedProject.title
				);
				const nextIndex = (currentIndex + 1) % projects.length;
				setSelectedProject(projects[nextIndex]);
			}
		},
		onSwipedRight: () => {
			if (selectedProject) {
				const currentIndex = projects.findIndex(
					(p) => p.title === selectedProject.title
				);
				const prevIndex =
					(currentIndex - 1 + projects.length) % projects.length;
				setSelectedProject(projects[prevIndex]);
			}
		},
		preventDefaultTouchmoveEvent: true,
		trackMouse: false,
	});

	return (
		<section id="projects" className="min-h-screen py-20">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-3xl md:text-4xl font-bold mb-8 text-center projects-title"
			>
				Projects
			</motion.h2>
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-wrap justify-center mb-8 gap-2">
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setFilter("all")}
						className={`px-4 py-2 rounded-full ${
							filter === "all"
								? theme === "dark"
									? "bg-teal-400 text-midnight-blue"
									: "bg-gradient-to-r from-sky-400 to-blue-500 text-white"
								: theme === "dark"
								? "bg-gray-700"
								: "bg-white bg-opacity-70 text-gray-700 shadow-sm"
						}`}
					>
						All
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setFilter("fullstack")}
						className={`px-4 py-2 rounded-full ${
							filter === "fullstack"
								? theme === "dark"
									? "bg-teal-400 text-midnight-blue"
									: "bg-gradient-to-r from-sky-400 to-blue-500 text-white"
								: theme === "dark"
								? "bg-gray-700"
								: "bg-white bg-opacity-70 text-gray-700 shadow-sm"
						}`}
					>
						Full Stack
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setFilter("frontend")}
						className={`px-4 py-2 rounded-full ${
							filter === "frontend"
								? theme === "dark"
									? "bg-teal-400 text-midnight-blue"
									: "bg-gradient-to-r from-sky-400 to-blue-500 text-white"
								: theme === "dark"
								? "bg-gray-700"
								: "bg-white bg-opacity-70 text-gray-700 shadow-sm"
						}`}
					>
						Frontend
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setFilter("security")}
						className={`px-4 py-2 rounded-full ${
							filter === "security"
								? theme === "dark"
									? "bg-teal-400 text-midnight-blue"
									: "bg-gradient-to-r from-sky-400 to-blue-500 text-white"
								: theme === "dark"
								? "bg-gray-700"
								: "bg-white bg-opacity-70 text-gray-700 shadow-sm"
						}`}
					>
						Security
					</motion.button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{filteredProjects.map((project, index) => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className={`rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
								theme === "dark" ? "bg-gray-800" : "light-card"
							}`}
						>
							<div className="p-6">
								<div className="flex items-center mb-4">
									{project.category === "fullstack" && (
										<Code
											className={`w-8 h-8 mr-4 ${
												theme === "dark" ? "text-teal-400" : "text-blue-500"
											}`}
										/>
									)}
									{project.category === "frontend" && (
										<Palette
											className={`w-8 h-8 mr-4 ${
												theme === "dark" ? "text-teal-400" : "text-pink-500"
											}`}
										/>
									)}
									{project.category === "security" && (
										<Shield
											className={`w-8 h-8 mr-4 ${
												theme === "dark" ? "text-teal-400" : "text-green-500"
											}`}
										/>
									)}
									<h3
										className={`text-xl font-semibold ${
											theme === "dark" ? "" : "text-sky-600"
										}`}
									>
										{project.title}
									</h3>
								</div>
								<p
									className={`mb-4 ${
										theme === "dark" ? "text-gray-400" : "text-gray-600"
									}`}
								>
									{project.description}
								</p>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setSelectedProject(project)}
									className={`px-4 py-2 rounded-full ${
										theme === "dark"
											? "bg-teal-400 text-midnight-blue"
											: "bg-gradient-to-r from-sky-400 to-blue-500 text-white"
									}`}
								>
									View Details
								</motion.button>
							</div>
							<div
								className={
									theme === "dark"
										? "bg-gray-700 p-6"
										: "bg-white bg-opacity-50 p-6"
								}
							>
								{/* <h4
									className={`text-lg font-semibold mb-2 ${
										theme === "dark" ? "" : "text-sky-600"
									}`}
								>
									Preview
								</h4> */}
								<div
									className={`aspect-w-16 aspect-h-9 rounded-lg flex items-center justify-center ${
										theme === "dark" ? "bg-gray-600" : "bg-gray-200"
									}`}
								>
									<div
										className={
											theme === "dark" ? "text-gray-400" : "text-gray-500"
										}
									></div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* Full-screen modal for project details */}
			<AnimatePresence>
				{selectedProject && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
						onClick={() => setSelectedProject(null)}
					>
						<motion.div
							{...handlers}
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ type: "spring", damping: 25 }}
							className={`rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
								theme === "dark" ? "bg-gray-800" : "light-card"
							}`}
							onClick={(e) => e.stopPropagation()}
						>
							<div className="relative p-6">
								<button
									onClick={() => setSelectedProject(null)}
									className="absolute top-4 right-4 text-gray-400 hover:text-white"
									aria-label="Close modal"
								>
									<X className="w-6 h-6" />
								</button>

								<div className="flex items-center mb-6">
									{selectedProject.category === "fullstack" && (
										<Code
											className={`w-10 h-10 mr-4 ${
												theme === "dark" ? "text-teal-400" : "text-blue-500"
											}`}
										/>
									)}
									{selectedProject.category === "frontend" && (
										<Palette
											className={`w-10 h-10 mr-4 ${
												theme === "dark" ? "text-teal-400" : "text-pink-500"
											}`}
										/>
									)}
									{selectedProject.category === "security" && (
										<Shield
											className={`w-10 h-10 mr-4 ${
												theme === "dark" ? "text-teal-400" : "text-green-500"
											}`}
										/>
									)}
									<h3
										className={`text-2xl font-bold ${
											theme === "dark" ? "" : "text-sky-600"
										}`}
									>
										{selectedProject.title}
									</h3>
								</div>

								<div
									className={`aspect-w-16 aspect-h-9 rounded-lg mb-6 ${
										theme === "dark" ? "bg-gray-700" : "bg-gray-200"
									}`}
								>
									<div
										className={`flex items-center justify-center ${
											theme === "dark" ? "text-gray-400" : "text-gray-500"
										}`}
									>
										<img
											src={`${selectedProject.image}`}
											alt={`${selectedProject?.title || "Project"} Preview`}
											className="w-full h-full object-cover"
										/>
									</div>
								</div>

								<div className="mb-6">
									<h4
										className={`text-xl font-semibold mb-2 ${
											theme === "dark" ? "" : "text-sky-600"
										}`}
									>
										Description
									</h4>
									<p
										className={
											theme === "dark" ? "text-gray-300" : "text-gray-700"
										}
									>
										{selectedProject.longDescription}
									</p>
								</div>

								<div className="mb-6">
									<h4
										className={`text-xl font-semibold mb-2 ${
											theme === "dark" ? "" : "text-sky-600"
										}`}
									>
										Technologies
									</h4>
									<div className="flex flex-wrap gap-2">
										{selectedProject.technologies.map((tech) => (
											<span
												key={tech}
												className={`px-3 py-1 rounded-full text-sm ${
													theme === "dark"
														? "bg-gray-700"
														: "bg-white bg-opacity-70 text-gray-700 shadow-sm"
												}`}
											>
												{tech}
											</span>
										))}
									</div>
								</div>

								<div className="flex flex-wrap gap-4">
									<a
										href={selectedProject.demoUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={`flex items-center gap-2 px-4 py-2 rounded-full ${
											theme === "dark"
												? "bg-teal-400 text-midnight-blue"
												: "bg-gradient-to-r from-sky-400 to-blue-500 text-white"
										}`}
									>
										<ExternalLink className="w-4 h-4" />
										Live Demo
									</a>
									<a
										href={selectedProject.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={`flex items-center gap-2 px-4 py-2 rounded-full ${
											theme === "dark"
												? "bg-gray-700"
												: "bg-white text-gray-700 shadow-sm"
										}`}
									>
										<Github className="w-4 h-4" />
										View Code
									</a>
								</div>

								<div
									className={`mt-6 pt-6 text-center ${
										theme === "dark"
											? "border-t border-gray-700 text-gray-400"
											: "border-t border-gray-200 text-gray-500"
									}`}
								>
									<p className="text-sm">
										Swipe left or right to view more projects
									</p>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
