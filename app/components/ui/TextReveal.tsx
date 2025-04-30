"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";

interface TextRevealProps {
	children: ReactNode;
	threshold?: number;
	staggerChildren?: number;
	duration?: number;
	delay?: number;
	className?: string;
	once?: boolean;
	direction?: "up" | "down" | "left" | "right";
	distance?: number;
}

export default function TextReveal({
	children,
	threshold = 0.1,
	staggerChildren = 0.03,
	duration = 0.5,
	delay = 0,
	className = "",
	once = false,
	direction = "up",
	distance = 20,
}: TextRevealProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		amount: threshold,
		once,
	});

	// Convert children to string if it's not already
	const text = typeof children === "string" ? children : String(children);

	// Split text into words
	const words = text.split(" ");

	// Get animation direction values
	const getDirectionValues = () => {
		switch (direction) {
			case "up":
				return { y: distance, x: 0 };
			case "down":
				return { y: -distance, x: 0 };
			case "left":
				return { x: distance, y: 0 };
			case "right":
				return { x: -distance, y: 0 };
			default:
				return { y: distance, x: 0 };
		}
	};

	const { x, y } = getDirectionValues();

	// Animation variants
	const container = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: {
				staggerChildren: staggerChildren,
				delayChildren: delay * i,
			},
		}),
	};

	const child = {
		hidden: {
			opacity: 0,
			x,
			y,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 100,
			},
		},
		visible: {
			opacity: 1,
			x: 0,
			y: 0,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 100,
				duration,
			},
		},
	};

	return (
		<motion.span
			ref={ref}
			className={`inline-block ${className}`}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={container}
		>
			<span className="sr-only">{text}</span>
			<span aria-hidden="true">
				{words.map((word, index) => (
					<span key={index} className="inline-block whitespace-nowrap mr-1">
						{Array.from(word).map((char, charIndex) => (
							<motion.span
								key={charIndex}
								className="inline-block"
								variants={child}
							>
								{char}
							</motion.span>
						))}{" "}
					</span>
				))}
			</span>
		</motion.span>
	);
}
