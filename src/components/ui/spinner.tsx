import { cn } from "~/lib/utils";

interface SpinnerProps {
	size?: "sm" | "md" | "lg" | "xl";
	variant?: "default" | "dots" | "pulse" | "bars";
	className?: string;
	label?: string;
}

const sizeClasses = {
	sm: "size-4",
	md: "size-6",
	lg: "size-8",
	xl: "size-12",
};

export function Spinner({
	size = "md",
	variant = "default",
	className,
	label = "Loading...",
}: SpinnerProps) {
	const baseClasses = "inline-block";
	const sizeClass = sizeClasses[size];

	if (variant === "dots") {
		return (
			<div
				className={cn(baseClasses, "flex space-x-1", className)}
				role="img"
				aria-label={label}
			>
				<div
					className={cn("animate-bounce rounded-full bg-current", sizeClass)}
					style={{ animationDelay: "0ms" }}
				/>
				<div
					className={cn("animate-bounce rounded-full bg-current", sizeClass)}
					style={{ animationDelay: "150ms" }}
				/>
				<div
					className={cn("animate-bounce rounded-full bg-current", sizeClass)}
					style={{ animationDelay: "300ms" }}
				/>
			</div>
		);
	}

	if (variant === "pulse") {
		return (
			<div
				className={cn(
					baseClasses,
					"animate-pulse rounded-full bg-current",
					sizeClass,
					className,
				)}
				role="img"
				aria-label={label}
			/>
		);
	}

	if (variant === "bars") {
		return (
			<div
				className={cn(baseClasses, "flex space-x-1", className)}
				role="img"
				aria-label={label}
			>
				<div
					className={cn("animate-pulse bg-current", sizeClass)}
					style={{ animationDelay: "0ms", height: "100%", width: "20%" }}
				/>
				<div
					className={cn("animate-pulse bg-current", sizeClass)}
					style={{ animationDelay: "150ms", height: "100%", width: "20%" }}
				/>
				<div
					className={cn("animate-pulse bg-current", sizeClass)}
					style={{ animationDelay: "300ms", height: "100%", width: "20%" }}
				/>
				<div
					className={cn("animate-pulse bg-current", sizeClass)}
					style={{ animationDelay: "450ms", height: "100%", width: "20%" }}
				/>
			</div>
		);
	}

	return (
		<svg
			className={cn(baseClasses, "animate-spin", sizeClass, className)}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			role="img"
			aria-label={label}
		>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			/>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	);
}
