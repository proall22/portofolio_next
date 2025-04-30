"use client";

import {
	createContext,
	useContext,
	useRef,
	type ReactNode,
	useMemo,
} from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

interface ScrollAnimationContextType {
	scrollYProgress: any;
	smoothScrollYProgress: any;
}

const ScrollAnimationContext = createContext<
	ScrollAnimationContextType | undefined
>(undefined);

export function ScrollAnimationProvider({ children }: { children: ReactNode }) {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const smoothScrollYProgress = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<ScrollAnimationContext.Provider
			value={{ scrollYProgress, smoothScrollYProgress }}
		>
			<div ref={containerRef} className="relative">
				{children}
			</div>
		</ScrollAnimationContext.Provider>
	);
}

export function useScrollAnimation() {
	const context = useContext(ScrollAnimationContext);
	if (context === undefined) {
		throw new Error(
			"useScrollAnimation must be used within a ScrollAnimationProvider"
		);
	}
	return context;
}

export function AnimatedSection({
	children,
	className,
	animation = "fade",
	threshold = 0.2,
	delay = 0,
	duration = 0.5,
	distance = 50,
	staggerChildren = 0.1,
	...props
}: {
	children: ReactNode;
	className?: string;
	animation?:
		| "fade"
		| "slide-up"
		| "slide-down"
		| "slide-left"
		| "slide-right"
		| "scale"
		| "rotate";
	threshold?: number;
	delay?: number;
	duration?: number;
	distance?: number;
	staggerChildren?: number;
	[key: string]: any;
}) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: [`start ${1 - threshold}`, `end ${threshold}`],
	});

	const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
	const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

	// Define animation values outside of getAnimationProps
	const x = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 0]);
	const smoothX = useSpring(x, { stiffness: 100, damping: 30 });
	const xRight = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 0]);
	const smoothXRight = useSpring(xRight, { stiffness: 100, damping: 30 });
	const y = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 0]);
	const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
	const yDown = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 0]);
	const smoothYDown = useSpring(yDown, { stiffness: 100, damping: 30 });
	const scale = useTransform(scrollYProgress, [0, 0.2, 1], [1, 1, 1]);
	const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
	const rotate = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 0]);
	const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

	// Different animation variants based on the animation prop
	const getAnimationProps = useMemo(() => {
		let animationProps: any = { opacity: smoothOpacity };

		switch (animation) {
			case "fade":
				break;
			case "slide-up":
				const slideUpY = useTransform(
					scrollYProgress,
					[0, 0.2, 1],
					[distance, 0, 0]
				);
				const smoothSlideUpY = useSpring(slideUpY, {
					stiffness: 100,
					damping: 30,
				});
				animationProps = { opacity: smoothOpacity, y: smoothSlideUpY };
				break;
			case "slide-down":
				const slideDownY = useTransform(
					scrollYProgress,
					[0, 0.2, 1],
					[-distance, 0, 0]
				);
				const smoothSlideDownY = useSpring(slideDownY, {
					stiffness: 100,
					damping: 30,
				});
				animationProps = { opacity: smoothOpacity, y: smoothSlideDownY };
				break;
			case "slide-left":
				const slideLeftX = useTransform(
					scrollYProgress,
					[0, 0.2, 1],
					[distance, 0, 0]
				);
				const smoothSlideLeftX = useSpring(slideLeftX, {
					stiffness: 100,
					damping: 30,
				});
				animationProps = { opacity: smoothOpacity, x: smoothSlideLeftX };
				break;
			case "slide-right":
				const slideRightX = useTransform(
					scrollYProgress,
					[0, 0.2, 1],
					[-distance, 0, 0]
				);
				const smoothSlideRightX = useSpring(slideRightX, {
					stiffness: 100,
					damping: 30,
				});
				animationProps = { opacity: smoothOpacity, x: smoothSlideRightX };
				break;
			case "scale":
				const scaleValue = useTransform(
					scrollYProgress,
					[0, 0.2, 1],
					[0.8, 1, 1]
				);
				const smoothScaleValue = useSpring(scaleValue, {
					stiffness: 100,
					damping: 30,
				});
				animationProps = { opacity: smoothOpacity, scale: smoothScaleValue };
				break;
			case "rotate":
				const rotateValue = useTransform(
					scrollYProgress,
					[0, 0.2, 1],
					[10, 0, 0]
				);
				const smoothRotateValue = useSpring(rotateValue, {
					stiffness: 100,
					damping: 30,
				});
				animationProps = { opacity: smoothOpacity, rotate: smoothRotateValue };
				break;
			default:
				break;
		}

		return animationProps;
	}, [animation, distance, smoothOpacity, scrollYProgress]);

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={{ opacity: 0 }}
			style={getAnimationProps}
			transition={{ duration, delay }}
			{...props}
		>
			{children}
		</motion.div>
	);
}

export function StaggerContainer({
	children,
	className,
	staggerDelay = 0.1,
	...props
}: {
	children: ReactNode;
	className?: string;
	staggerDelay?: number;
	[key: string]: any;
}) {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: staggerDelay,
				delayChildren: 0.1,
			},
		},
	};

	return (
		<motion.div
			className={className}
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false, amount: 0.2 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}

export function StaggerItem({
	children,
	className,
	animation = "fade-up",
	...props
}: {
	children: ReactNode;
	className?: string;
	animation?:
		| "fade-up"
		| "fade-down"
		| "fade-left"
		| "fade-right"
		| "scale"
		| "rotate";
	[key: string]: any;
}) {
	// Different animation variants based on the animation prop
	const getVariants = () => {
		switch (animation) {
			case "fade-up":
				return {
					hidden: { opacity: 0, y: 20 },
					visible: {
						opacity: 1,
						y: 0,
						transition: {
							type: "spring",
							stiffness: 100,
							damping: 15,
						},
					},
				};
			case "fade-down":
				return {
					hidden: { opacity: 0, y: -20 },
					visible: {
						opacity: 1,
						y: 0,
						transition: {
							type: "spring",
							stiffness: 100,
							damping: 15,
						},
					},
				};
			case "fade-left":
				return {
					hidden: { opacity: 0, x: 20 },
					visible: {
						opacity: 1,
						x: 0,
						transition: {
							type: "spring",
							stiffness: 100,
							damping: 15,
						},
					},
				};
			case "fade-right":
				return {
					hidden: { opacity: 0, x: -20 },
					visible: {
						opacity: 1,
						x: 0,
						transition: {
							type: "spring",
							stiffness: 100,
							damping: 15,
						},
					},
				};
			case "scale":
				return {
					hidden: { opacity: 0, scale: 0.8 },
					visible: {
						opacity: 1,
						scale: 1,
						transition: {
							type: "spring",
							stiffness: 100,
							damping: 15,
						},
					},
				};
			case "rotate":
				return {
					hidden: { opacity: 0, rotate: 10 },
					visible: {
						opacity: 1,
						rotate: 0,
						transition: {
							type: "spring",
							stiffness: 100,
							damping: 15,
						},
					},
				};
			default:
				return {
					hidden: { opacity: 0, y: 20 },
					visible: {
						opacity: 1,
						y: 0,
						transition: {
							type: "spring",
							stiffness: 100,
							damping: 15,
						},
					},
				};
		}
	};

	return (
		<motion.div className={className} variants={getVariants()} {...props}>
			{children}
		</motion.div>
	);
}
