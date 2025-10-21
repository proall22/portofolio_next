"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const skillCategories = [
	{
		name: "Frontend",
		skills: ["React", "Vue.js", "CSS/SASS", "TypeScript", "Webpack"],
	},
	{
		name: "Backend",
		skills: ["Node.js", "Python", "Java", "SQL", "GraphQL"],
	},
	{
		name: "Design",
		skills: ["Figma", "Adobe XD", "UI/UX", "Responsive Design", "Prototyping"],
	},
	{
		name: "Security",
		skills: [
			"Penetration Testing",
			"Network Security",
			"Cryptography",
			"OWASP",
			"Security Auditing",
		],
	},
];

export default function SkillsSection() {
	const [activeCategory, setActiveCategory] = useState(skillCategories[0].name);
	const { theme } = useTheme();
	const [skillLevels, setSkillLevels] = useState<
		Record<string, { percentage: number; experience: string }>
	>({});

	// Generate consistent skill levels on component mount (client-side only)
	useEffect(() => {
		const levels: Record<string, { percentage: number; experience: string }> = {
			React: { percentage: 90, experience: "4+ years" },
			"Next.js": { percentage: 85, experience: "4+ years" },
			Express: { percentage: 80, experience: "4+ years" },
			"Vue.js": { percentage: 75, experience: "4+ years" },
			"CSS/SASS": { percentage: 85, experience: "4+ years" },
			TypeScript: { percentage: 90, experience: "4+ years" },
			Webpack: { percentage: 80, experience: "4+ years" },
			"Node.js": { percentage: 90, experience: "6+ years" },
			Python: { percentage: 85, experience: "4+ years" },
			Java: { percentage: 70, experience: "3+ years" },
			SQL: { percentage: 85, experience: "5+ years" },
			GraphQL: { percentage: 80, experience: "4+ years" },
			Figma: { percentage: 80, experience: "4+ years" },
			"Responsive Design": { percentage: 90, experience: "5+ years" },
			"Penetration Testing": { percentage: 70, experience: "3+ years" },
			"Security Auditing": { percentage: 65, experience: "2+ years" },
			OWASP: { percentage: 70, experience: "3+ years" },
		};

		setSkillLevels(levels);
	}, []);

	return (
		<section id="skills" className="min-h-screen py-20">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-3xl md:text-4xl font-bold mb-8 text-center skills-title"
			>
				Skills
			</motion.h2>
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<h3
							className={`text-2xl font-semibold mb-4 ${
								theme === "dark" ? "" : "text-fuchsia-600"
							}`}
						>
							Skill Categories
						</h3>
						<div className="space-y-4">
							{skillCategories.map((category) => (
								<motion.button
									key={category.name}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setActiveCategory(category.name)}
									className={`w-full px-4 py-2 rounded-full ${
										activeCategory === category.name
											? theme === "dark"
												? "bg-teal-400 text-midnight-blue"
												: "bg-gradient-to-r from-fuchsia-400 to-purple-500 text-white"
											: theme === "dark"
											? "bg-gray-700"
											: "bg-white bg-opacity-70 text-gray-700 shadow-sm"
									}`}
								>
									{category.name}
								</motion.button>
							))}
						</div>
					</div>
					<div>
						<h3
							className={`text-2xl font-semibold mb-4 ${
								theme === "dark" ? "" : "text-fuchsia-600"
							}`}
						>
							Skills
						</h3>
						<div className="grid grid-cols-2 gap-4">
							{skillCategories
								.find((category) => category.name === activeCategory)
								?.skills.map((skill, index) => (
									<motion.div
										key={skill}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										className={`rounded-lg p-4 text-center transition-colors duration-300 ${
											theme === "dark"
												? "bg-gray-800 hover:bg-gray-700"
												: "light-card hover:shadow-md"
										}`}
									>
										<h4
											className={`text-lg font-semibold mb-2 ${
												theme === "dark" ? "" : "text-fuchsia-600"
											}`}
										>
											{skill}
										</h4>
										<motion.div
											className={`w-full rounded-full h-2 mb-4 ${
												theme === "dark" ? "bg-gray-600" : "bg-gray-200"
											}`}
											initial={{ width: 0 }}
											animate={{ width: "100%" }}
											transition={{ duration: 1, delay: index * 0.2 }}
										>
											<motion.div
												className={`h-2 rounded-full ${
													theme === "dark"
														? "bg-teal-400"
														: "bg-gradient-to-r from-fuchsia-400 to-purple-500"
												}`}
												initial={{ width: 0 }}
												animate={{
													width: `${skillLevels[skill]?.percentage || 70}%`,
												}}
												transition={{ duration: 1, delay: index * 0.2 }}
											/>
										</motion.div>
										<p
											className={`text-sm ${
												theme === "dark" ? "text-gray-400" : "text-gray-600"
											}`}
										>
											Experience:{" "}
											{skillLevels[skill]?.experience || `${index + 1} years`}
										</p>
									</motion.div>
								))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
