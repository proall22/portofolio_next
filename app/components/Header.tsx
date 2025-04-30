"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
	motion,
	AnimatePresence,
	useScroll,
	useTransform,
} from "framer-motion";
import {
	Sun,
	Moon,
	Code,
	User,
	Briefcase,
	Mail,
	Menu,
	X,
	Award,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useXP } from "../contexts/XPContext";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const { level, xp, unlockedAchievements } = useXP();
	const [greeting, setGreeting] = useState("");
	const [activeSection, setActiveSection] = useState("hero");
	const [scrolled, setScrolled] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [showAchievements, setShowAchievements] = useState(false);

	const { scrollY } = useScroll();
	const headerOpacity = useTransform(scrollY, [0, 50], [0.7, 0.95]);
	const headerBlur = useTransform(scrollY, [0, 50], [5, 10]);
	const headerShadow = useTransform(
		scrollY,
		[0, 50],
		["0 0 0 rgba(0,0,0,0)", "0 4px 20px rgba(0,0,0,0.1)"]
	);

	useEffect(() => {
		setMounted(true);

		const hour = new Date().getHours();
		if (hour < 12) setGreeting("Good Morning");
		else if (hour < 18) setGreeting("Good Afternoon");
		else setGreeting("Good Evening");

		// Add smooth scrolling to the document
		document.documentElement.style.scrollBehavior = "smooth";

		// Function to determine which section is currently in view
		const handleScroll = () => {
			const sections = ["hero", "about", "skills", "projects", "contact"];
			const scrollPosition = window.scrollY;

			// Check if page is scrolled to add background to header
			setScrolled(scrollPosition > 50);

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const offsetTop = element.offsetTop;
					const offsetHeight = element.offsetHeight;

					if (
						scrollPosition >= offsetTop - 100 &&
						scrollPosition < offsetTop + offsetHeight - 100
					) {
						setActiveSection(section);
						break;
					}
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const menuItems = [
		{ name: "About", icon: User, href: "#about" },
		{ name: "Skills", icon: Code, href: "#skills" },
		{ name: "Projects", icon: Briefcase, href: "#projects" },
		{ name: "Contact", icon: Mail, href: "#contact" },
	];

	const handleNavClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string
	) => {
		e.preventDefault();
		const targetId = href.substring(1);
		const targetElement = document.getElementById(targetId);

		if (targetElement) {
			// Get the header height to offset the scroll position
			const headerHeight = document.querySelector("header")?.offsetHeight || 0;

			// Calculate the target position with offset
			const targetPosition = targetElement.offsetTop - headerHeight;

			// Scroll to the target position
			window.scrollTo({
				top: targetPosition,
				behavior: "smooth",
			});

			// Close mobile menu if open
			setIsOpen(false);
		}
	};

	// Don't render theme-dependent UI until mounted
	if (!mounted) {
		return (
			<header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-md">
				<nav className="container mx-auto px-4 py-4 flex justify-between items-center">
					<div className="text-xl md:text-2xl font-bold">
						<span className="text-teal-400">{greeting}</span>
						<span className="text-purple-400">, Dev</span>
						<span className="text-white">Master</span>
					</div>
					<div className="w-10 h-10"></div> {/* Placeholder for theme toggle */}
				</nav>
			</header>
		);
	}

	return (
		<motion.header
			className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
			style={{
				backgroundColor:
					theme === "dark"
						? `rgba(17, 24, 39, ${headerOpacity})`
						: `rgba(255, 255, 255, ${headerOpacity})`,
				backdropFilter: `blur(${headerBlur}px)`,
				boxShadow: headerShadow,
			}}
		>
			<nav className="container mx-auto px-4 py-4 flex justify-between items-center">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className="text-xl md:text-2xl font-bold"
				>
					<span className="text-teal-400 dark:text-teal-300">{greeting}</span>
					<span className="text-purple-400 dark:text-purple-300">, Dev</span>
					<span className="text-gray-800 dark:text-gray-100">Master</span>
				</motion.div>

				{/* XP Level Display */}
				<div className="hidden md:flex items-center mr-4">
					<div
						className={`
              flex items-center px-3 py-1 rounded-full cursor-pointer
              ${
								theme === "dark"
									? "bg-gray-800 hover:bg-gray-700"
									: "bg-gray-100 hover:bg-gray-200"
							}
              transition-colors duration-200
            `}
						onClick={() => setShowAchievements(!showAchievements)}
					>
						<div
							className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2
                ${
									theme === "dark"
										? "bg-teal-500 text-gray-900"
										: "bg-teal-600 text-white"
								}
              `}
						>
							{level}
						</div>
						<span
							className={`text-sm ${
								theme === "dark" ? "text-gray-300" : "text-gray-700"
							}`}
						>
							{xp} XP
						</span>
						<Award
							className={`ml-2 w-4 h-4 ${
								theme === "dark" ? "text-yellow-400" : "text-yellow-500"
							}`}
						/>
					</div>
				</div>

				<div className="hidden md:flex space-x-4">
					{menuItems.map((item, index) => (
						<motion.a
							key={item.name}
							href={item.href}
							onClick={(e) => handleNavClick(e, item.href)}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.1 * index }}
							whileHover={{
								scale: 1.1,
								y: -2,
								transition: { type: "spring", stiffness: 400, damping: 10 },
							}}
							whileTap={{ scale: 0.95 }}
							className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-300 ${
								activeSection === item.href.substring(1)
									? "text-teal-400 dark:text-teal-300"
									: "text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-300"
							}`}
						>
							<item.icon className="w-4 h-4" />
							<span>{item.name}</span>
						</motion.a>
					))}
				</div>
				<div className="flex items-center space-x-4">
					<motion.button
						whileHover={{ scale: 1.1, rotate: 15 }}
						whileTap={{ scale: 0.95 }}
						onClick={toggleTheme}
						className={`p-2 rounded-full ${
							theme === "dark"
								? "bg-gray-800 text-gray-300 hover:text-white"
								: "bg-gray-100 text-gray-700 hover:text-gray-900"
						} transition-all duration-300`}
						aria-label={
							theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
						}
					>
						<AnimatePresence mode="wait" initial={false}>
							<motion.div
								key={theme}
								initial={{ y: -20, opacity: 0, rotate: -90 }}
								animate={{ y: 0, opacity: 1, rotate: 0 }}
								exit={{ y: 20, opacity: 0, rotate: 90 }}
								transition={{ duration: 0.2 }}
							>
								{theme === "dark" ? (
									<Sun className="w-5 h-5" />
								) : (
									<Moon className="w-5 h-5" />
								)}
							</motion.div>
						</AnimatePresence>
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setIsOpen(!isOpen)}
						className={`md:hidden p-2 rounded-full ${
							theme === "dark"
								? "bg-gray-800 text-gray-300 hover:text-white"
								: "bg-gray-100 text-gray-700 hover:text-gray-900"
						} transition-all duration-300`}
						aria-label="Toggle menu"
					>
						<AnimatePresence mode="wait" initial={false}>
							<motion.div
								key={isOpen ? "open" : "closed"}
								initial={{ rotate: -90, opacity: 0 }}
								animate={{ rotate: 0, opacity: 1 }}
								exit={{ rotate: 90, opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								{isOpen ? (
									<X className="w-6 h-6" />
								) : (
									<Menu className="w-6 h-6" />
								)}
							</motion.div>
						</AnimatePresence>
					</motion.button>
				</div>
			</nav>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className={`md:hidden overflow-hidden ${
							theme === "dark"
								? "bg-gray-900 bg-opacity-95"
								: "bg-white bg-opacity-95"
						} backdrop-blur-md`}
					>
						{menuItems.map((item, index) => (
							<motion.a
								key={item.name}
								href={item.href}
								onClick={(e) => handleNavClick(e, item.href)}
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.3, delay: index * 0.1 }}
								className={`block px-4 py-3 text-sm ${
									activeSection === item.href.substring(1)
										? "text-teal-400 dark:text-teal-300"
										: theme === "dark"
										? "text-gray-300 hover:bg-gray-800"
										: "text-gray-700 hover:bg-gray-100"
								} transition-colors duration-300`}
							>
								<div className="flex items-center space-x-2">
									<item.icon className="w-4 h-4" />
									<span>{item.name}</span>
								</div>
							</motion.a>
						))}

						{/* Mobile XP display */}
						<div className="px-4 py-3 flex items-center">
							<div
								className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2
                  ${
										theme === "dark"
											? "bg-teal-500 text-gray-900"
											: "bg-teal-600 text-white"
									}
                `}
							>
								{level}
							</div>
							<span
								className={`text-sm ${
									theme === "dark" ? "text-gray-300" : "text-gray-700"
								}`}
							>
								{xp} XP - {unlockedAchievements.length} Achievements
							</span>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Achievements Panel */}
			<AnimatePresence>
				{showAchievements && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className={`
              absolute right-4 top-16 w-80 p-4 rounded-lg shadow-lg z-50
              ${theme === "dark" ? "bg-gray-800" : "bg-white"}
            `}
					>
						<div className="flex justify-between items-center mb-3">
							<h3
								className={`font-bold ${
									theme === "dark" ? "text-gray-200" : "text-gray-800"
								}`}
							>
								Your Achievements
							</h3>
							<button
								onClick={() => setShowAchievements(false)}
								className={`p-1 rounded-full ${
									theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
								}`}
							>
								<X className="w-4 h-4" />
							</button>
						</div>

						<div className="max-h-80 overflow-y-auto pr-1">
							{unlockedAchievements.length > 0 ? (
								<div className="space-y-2">
									{unlockedAchievements.map((achievement) => (
										<div
											key={achievement.id}
											className={`
                        p-2 rounded-md flex items-start
                        ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}
                      `}
										>
											<Award
												className={`w-5 h-5 mr-2 flex-shrink-0 ${
													theme === "dark"
														? "text-yellow-400"
														: "text-yellow-500"
												}`}
											/>
											<div>
												<p
													className={`font-medium ${
														theme === "dark" ? "text-gray-200" : "text-gray-800"
													}`}
												>
													{achievement.title}
												</p>
												<p
													className={`text-xs ${
														theme === "dark" ? "text-gray-400" : "text-gray-600"
													}`}
												>
													{achievement.description}
												</p>
												<p
													className={`text-xs font-semibold ${
														theme === "dark" ? "text-teal-400" : "text-teal-600"
													}`}
												>
													+{achievement.xp} XP
												</p>
											</div>
										</div>
									))}
								</div>
							) : (
								<p
									className={`text-center py-4 italic ${
										theme === "dark" ? "text-gray-400" : "text-gray-500"
									}`}
								>
									No achievements unlocked yet. Explore the site to earn XP!
								</p>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	);
}
