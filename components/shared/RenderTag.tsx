import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Prop {
	_id: number;
	name: string;
	totalQuestions: number;
}

const RenderTag = ({ tag }: { tag: Prop }) => {
	return (
		<Link href={`/tags/${tag?._id}`} className="flex justify-between gap-2">
			<Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
				{tag?.name}
			</Badge>
			{tag?.totalQuestions > 0 && (
				<p className="small-medium text-dark500_light700">
					{tag?.totalQuestions}
				</p>
			)}
		</Link>
	);
};

export default RenderTag;
