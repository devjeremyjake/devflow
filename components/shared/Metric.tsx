import Image from 'next/image';
import Link from 'next/link';

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
	const metricContent = (
		<>
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
		</>
	);

	if (href) {
		return (
			<Link href={href} className="flex-center gap-1 cursor-pointer">
				{metricContent}
			</Link>
		);
	}

	return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metric;
