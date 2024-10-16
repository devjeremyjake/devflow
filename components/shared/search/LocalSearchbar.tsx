'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface CustomInputProp {
	route: string;
	iconPosition: string;
	imgSrc: string;
	placeholder: string;
	otherClasses?: string;
}
const LocalSearchbar = ({
	route,
	iconPosition,
	imgSrc,
	placeholder,
	otherClasses,
}: CustomInputProp) => {
	return (
		<div
			className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
		>
			{iconPosition === 'left' && (
				<Image
					src={imgSrc}
					height={24}
					width={24}
					alt="search icon"
					className="cursor-pointer"
				/>
			)}
			<Input
				placeholder={placeholder}
				type="text"
				value=""
				onChange={() => {}}
				className="paragraph-regular no-focus placeholder border-none shadow-none bg-transparent outline-none"
			/>
			{iconPosition === 'right' && (
				<Image
					src={imgSrc}
					height={24}
					width={24}
					alt="search icon"
					className="cursor-pointer"
				/>
			)}
		</div>
	);
};

export default LocalSearchbar;
