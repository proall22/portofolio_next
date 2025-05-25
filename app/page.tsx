"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "./components/ThemeProvider";
import { XPProvider } from "./contexts/XPContext";
import ProgressBar from "./components/ProgressBar";
import XPBar from "./components/XPBar";
import XPTracker from "./components/XPTracker";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import WebAssemblyDemo from "./components/WebAssemblyDemo";
import DynamicDataVisualization from "./components/DynamicDataVisualization";
// import Web3Integration from "./components/Web3Integration";
import InteractiveCodePlayground from "./components/InteractiveCodePlayground";
import EasterEgg from "./components/EasterEgg";
import { useScrollProgress } from "./hooks/useScrollProgress";

// Dynamically import components that use the theme context to ensure they're only loaded client-side
const Header = dynamic(() => import("./components/Header"), { ssr: false });
const MobileNavigation = dynamic(
	() => import("./components/MobileNavigation"),
	{ ssr: false }
);

export default function GamifiedPortfolio() {
	const [currentSection, setCurrentSection] = useState(0);
	const [isMobile, setIsMobile] = useState(false);
	const { progress } = useScrollProgress();

	const sections = ["hero", "about", "skills", "projects", "contact"];

	useEffect(() => {
		// Check if we're on mobile
		setIsMobile(window.innerWidth < 768);

		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);

		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const windowHeight = window.innerHeight;

			// Determine which section is currently in view
			for (let i = 0; i < sections.length; i++) {
				const section = document.getElementById(sections[i]);
				if (!section) continue;

				const sectionTop = section.offsetTop;
				const sectionHeight = section.offsetHeight;

				if (
					scrollPosition >= sectionTop - windowHeight / 3 &&
					scrollPosition < sectionTop + sectionHeight - windowHeight / 3
				) {
					setCurrentSection(i);
					break;
				}
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, [sections]);

	return (
		<ThemeProvider>
			<XPProvider>
				<div className="min-h-screen transition-colors duration-500">
					<Header />
					<ProgressBar progress={progress} />
					<XPBar />
					<XPTracker />
					<main className="container mx-auto px-4">
						<HeroSection />
						<AboutSection />
						<SkillsSection />
						<ProjectsSection />
						<InteractiveCodePlayground />
						<WebAssemblyDemo />
						<DynamicDataVisualization />
						{/* <Web3Integration /> */}
						<ContactSection />
						<EasterEgg />
					</main>
					{isMobile && (
						<MobileNavigation
							sections={sections}
							currentSection={currentSection}
						/>
					)}
					<Footer />
				</div>
			</XPProvider>
		</ThemeProvider>
	);
}
