import Image from 'next/image';

interface MetricProp {
	imageUrl: string;
	alt: string;
	value: string | number;
	title: string;
	href?: string;
	textStyles?: string;
	isAuthor?: boolean;
}

const Metric = ({
	imageUrl,
	alt,
	value,
	title,
	href,
	textStyles,
	isAuthor,
}: MetricProp) => {
	return (
		<div className="flex-center flex-wrap gap-1 cursor-pointer">
			<Image
				src={imageUrl}
				alt={alt}
				width={16}
				height={16}
				className={`object-contain ${href ? 'rounded-full' : ''}`}
			/>
			<p className={`${textStyles} flex items-center gap-1`}>
				{value}
				<span
					className={`small-regular line-clamp-1 ${isAuthor} ? 'max-sm:hidden' : ''`}
				>
					{title}
				</span>
			</p>
		</div>
	);
};

export default Metric;
