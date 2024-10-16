import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
	const now = new Date();
	const elapsed = now.getTime() - createdAt.getTime();
	const seconds = Math.floor(elapsed / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	let timeString: string;

	if (years > 0) {
		timeString = `${years} year${years !== 1 ? 's' : ''}`;
	} else if (months > 0) {
		timeString = `${months} month${months !== 1 ? 's' : ''}`;
	} else if (weeks > 0) {
		timeString = `${weeks} week${weeks !== 1 ? 's' : ''}`;
	} else if (days > 0) {
		timeString = `${days} day${days !== 1 ? 's' : ''}`;
	} else if (hours > 0) {
		timeString = `${hours} hour${hours !== 1 ? 's' : ''}`;
	} else if (minutes > 0) {
		timeString = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
	} else {
		timeString = `${seconds} second${seconds !== 1 ? 's' : ''}`;
	}

	return `${timeString} ago.`;
};

export const formatBigNumber = (number: number): string => {
	if (number >= 1e6) {
		return `${(number / 1e6).toFixed(1)}M`;
	} else if (number >= 1e3) {
		return `${(number / 1e3).toFixed(1)}K`;
	}
	return number.toString();
};
