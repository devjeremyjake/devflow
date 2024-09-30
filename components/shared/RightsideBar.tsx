import Image from 'next/image';
import Link from 'next/link';
import RenderTag from './RenderTag';

const hotQuestion = [
	{ _id: 1, title: 'How do i use express as a custom server in NextJs' },
	{ _id: 2, title: 'How do i use express as a custom server in NextJs' },
	{ _id: 3, title: 'How do i use express as a custom server in NextJs' },
	{ _id: 4, title: 'How do i use express as a custom server in NextJs' },
	{ _id: 5, title: 'How do i use express as a custom server in NextJs' },
];

const popularTags = [
	{
		_id: 1,
		name: 'Javascript',
		totalQuestions: 5,
	},
	{
		_id: 2,
		name: 'Typescript',
		totalQuestions: 1,
	},
	{
		_id: 3,
		name: 'React',
		totalQuestions: 7,
	},
	{
		_id: 4,
		name: 'NextJs',
		totalQuestions: 2,
	},
	{
		_id: 5,
		name: 'VueJs',
		totalQuestions: 5,
	},
];

const RightsideBar = () => {
	return (
		<section
			className="bckground-light900_dark200 light-border 
        sticky right-0 top-0 flex h-screen flex-col overflow-y-auto
        border-1 p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden 
        w-[350px] max-xl:hidden custom-scrollbar"
		>
			<div>
				<h3 className="h3-bold text-dark200_light900">Top Questions</h3>
				<div className="mt-7 flex w-full flex-col gap-[30px]">
					{hotQuestion?.map((question) => (
						<Link
							key={question._id}
							href={`/questions/${question?._id}`}
							className="flex cursor-pointer items-center justify-between gap-7"
						>
							<p className="body-medium text-dark500_light700">
								{question?.title}
							</p>
							<Image
								alt="chevron right"
								height={20}
								width={20}
								src="/assets/icons/chevron-right.svg"
								className="invert-colors"
							/>
						</Link>
					))}
				</div>
			</div>
			<div className="mt-16">
				<h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
				<div className="mt-7 flex flex-col gap-4">
					{popularTags?.map((tag) => <RenderTag tag={tag} key={tag?._id} />)}
				</div>
			</div>
		</section>
	);
};

export default RightsideBar;
