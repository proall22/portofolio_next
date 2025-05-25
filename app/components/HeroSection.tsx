"use client";

import { motion } from "framer-motion";
import { GitlabIcon as GitHub, Linkedin, Twitter } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import ParallaxSection from "./ui/ParallaxSection";
import ScrollAnimationWrapper from "./ui/ScrollAnimationWrapper";
import TextReveal from "./ui/TextReveal";
import avatar from "../assets/avatar.png";
import Image from "next/image";

export default function HeroSection() {
	const { theme } = useTheme();

	// Animation variants for social icons
	const socialIconVariants = {
		initial: { scale: 0, opacity: 0 },
		animate: (i: number) => ({
			scale: 1,
			opacity: 1,
			transition: {
				delay: 1.2 + i * 0.2,
				type: "spring",
				stiffness: 260,
				damping: 20,
			},
		}),
		hover: {
			scale: 1.2,
			rotate: 5,
			transition: {
				type: "spring",
				stiffness: 400,
				damping: 10,
			},
		},
		tap: { scale: 0.9 },
	};

	return (
		<section
			id="hero"
			className="min-h-screen flex items-center justify-center relative overflow-hidden"
		>
			{/* Background parallax elements */}
			<ParallaxSection speed={0.2} className="absolute inset-0 z-0">
				<div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 opacity-20 dark:opacity-10 blur-3xl" />
				<div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-300 to-teal-300 opacity-20 dark:opacity-10 blur-3xl" />
			</ParallaxSection>

			<div className="text-center z-10">
				<ScrollAnimationWrapper
					animation="scale"
					duration={0.8}
					delay={0.2}
					springConfig={{ stiffness: 100 }}
					className="mb-8 relative"
				>
					<div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full blur-md opacity-70 scale-110 animate-pulse" />
					<Image
						src={avatar}
						alt="Developer Avatar"
						width={128}
						height={128}
						className="w-32 h-32 mx-auto rounded-full border-4 border-teal-400 relative z-10 object-cover"
						priority
					/>
				</ScrollAnimationWrapper>

				<ScrollAnimationWrapper
					animation="slide"
					direction="up"
					delay={0.4}
					distance={30}
				>
					<TextReveal className="text-4xl md:text-6xl font-bold mb-4 hero-title">
						Misgana
					</TextReveal>
				</ScrollAnimationWrapper>

				<ScrollAnimationWrapper
					animation="slide"
					direction="up"
					delay={0.6}
					distance={30}
				>
					<div
						className={`text-xl md:text-2xl mb-8 ${
							theme === "dark" ? "text-gray-300" : "text-gray-700"
						}`}
					>
						<TextReveal staggerChildren={0.01} delay={0.8}>
							Full-Stack Developer | Designer | Security Enthusiast
						</TextReveal>
					</div>
				</ScrollAnimationWrapper>

				<motion.div
					initial="initial"
					animate="animate"
					className="flex justify-center space-x-6"
				>
					<motion.a
						href="https://github.com/proall22/"
						target="_blank"
						rel="noopener noreferrer"
						className={`${
							theme === "dark"
								? "text-gray-300 hover:text-white"
								: "text-gray-600 hover:text-indigo-600"
						} transition-colors duration-300`}
						variants={socialIconVariants}
						custom={0}
						whileHover="hover"
						whileTap="tap"
					>
						<GitHub className="w-8 h-8" />
					</motion.a>
					<motion.a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
						className={`${
							theme === "dark"
								? "text-gray-300 hover:text-white"
								: "text-gray-600 hover:text-blue-600"
						} transition-colors duration-300`}
						variants={socialIconVariants}
						custom={1}
						whileHover="hover"
						whileTap="tap"
					>
						<Linkedin className="w-8 h-8" />
					</motion.a>
					<motion.a
						href="https://x.com/home"
						target="_blank"
						rel="noopener noreferrer"
						className={`${
							theme === "dark"
								? "text-gray-300 hover:text-white"
								: "text-gray-600 hover:text-sky-500"
						} transition-colors duration-300`}
						variants={socialIconVariants}
						custom={2}
						whileHover="hover"
						whileTap="tap"
					>
						<Twitter className="w-8 h-8" />
					</motion.a>
				</motion.div>

				{/* Scroll indicator */}
				<motion.div
					className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						delay: 2,
						duration: 1,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
					}}
				>
					<div className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center pt-2">
						<motion.div
							className="w-1.5 h-1.5 rounded-full bg-gray-400"
							animate={{
								y: [0, 12, 0],
							}}
							transition={{
								duration: 1.5,
								repeat: Number.POSITIVE_INFINITY,
								repeatType: "loop",
								ease: "easeInOut",
							}}
						/>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
