import HomeFilters from '@/components/home/HomeFilters';
import QuestionsCard from '@/components/home/QuestionsCard';
import Filters from '@/components/shared/Filters';
import NoResult from '@/components/shared/NoResult';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import { getQuestions } from '@/lib/actions/question.action';
import Link from 'next/link';

const questions = [
	{
		_id: 1,
		title: 'What are the best practices for RESTful API design?',
		tags: [
			{ _id: 'api', name: 'API' },
			{ _id: 'rest', name: 'REST' },
		],
		author: { _id: 'a1', name: 'Alice Smith', picture: 'alice.jpg' },
		upvotes: 120,
		views: 1500,
		answers: [],
		createdAt: new Date('2024-10-05T11:00:00Z'),
	},
	{
		_id: 2,
		title: 'How to implement authentication in a web application?',
		tags: [
			{ _id: 'auth', name: 'Authentication' },
			{ _id: 'web', name: 'Web Development' },
		],
		author: { _id: 'a2', name: 'Bob Johnson', picture: 'bob.jpg' },
		upvotes: 95,
		views: 800,
		answers: [],
		createdAt: new Date('2024-10-05T11:00:00Z'),
	},
	{
		_id: 3,
		title: 'What are the key differences between SQL and NoSQL databases?',
		tags: [
			{ _id: 'database', name: 'Database' },
			{ _id: 'sql', name: 'SQL' },
		],
		author: { _id: 'a3', name: 'Charlie Brown', picture: 'charlie.jpg' },
		upvotes: 78,
		views: 600,
		answers: [],
		createdAt: new Date('2024-10-05T11:00:00Z'),
	},
	{
		_id: 4,
		title: 'What are effective strategies for responsive web design?',
		tags: [
			{ _id: 'design', name: 'Web Design' },
			{ _id: 'responsive', name: 'Responsive' },
		],
		author: { _id: 'a4', name: 'Diana Prince', picture: 'diana.jpg' },
		upvotes: 110,
		views: 1200,
		answers: [],
		createdAt: new Date('2024-10-05T11:00:00Z'),
	},
	{
		_id: 5,
		title: 'How do you optimize website performance?',
		tags: [
			{ _id: 'performance', name: 'Performance' },
			{ _id: 'web', name: 'Web Development' },
		],
		author: { _id: 'a5', name: 'Eve Adams', picture: 'eve.jpg' },
		upvotes: 88,
		views: 900,
		answers: [],
		createdAt: new Date('2024-10-05T11:00:00Z'),
	},
	{
		_id: 6,
		title: 'What are the challenges of cloud computing?',
		tags: [
			{ _id: 'cloud', name: 'Cloud Computing' },
			{ _id: 'challenges', name: 'Challenges' },
		],
		author: { _id: 'a6', name: 'Frank Castle', picture: 'frank.jpg' },
		upvotes: 65,
		views: 500,
		answers: [],
		createdAt: new Date('2024-10-05T11:00:00Z'),
	},
	{
		_id: 7,
		title: 'What programming languages are best for data science?',
		tags: [
			{ _id: 'data', name: 'Data Science' },
			{ _id: 'programming', name: 'Programming' },
		],
		author: { _id: 'a7', name: 'Grace Lee', picture: 'grace.jpg' },
		upvotes: 132,
		views: 1800,
		answers: [],
		createdAt: new Date('2024-10-05T11:00:00Z'),
	},
];

const Home = async () => {
	const result = await getQuestions({});
	console.log('Questions', result?.questions);
	return (
		<div>
			<div className="flex w-full flex-col-reverse justify-between sm:flex-row gap-4 sm:items-center">
				<h1 className="h1-bold text-dark100_light900">All Questions</h1>
				<Link href="/ask-question" className="flex justify-end max-sm:w-full">
					<Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
						Ask a Question
					</Button>
				</Link>
			</div>
			{/* Search and filter section */}
			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
				<LocalSearchbar
					route="/"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Search for questions"
					otherClasses="flex-1"
				/>
				<Filters
					filters={HomePageFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
					containerClasses="hidden max-md:flex"
				/>
			</div>
			<HomeFilters />
			<div className="mt-10 flex w-full flex-col gap-6">
				{result?.questions?.length > 0 ? (
					result?.questions?.map((question) => (
						<QuestionsCard
							key={question?._id}
							_id={question?._id}
							title={question?.title}
							tags={question?.tags}
							author={question?.author}
							upvotes={question?.upvotes}
							views={question?.views}
							answers={question?.answers}
							createdAt={question?.createdAt}
						/>
					))
				) : (
					<NoResult
						title="There's no question to show"
						description="Be the first to break the silence! 🚀 Ask a question and kickstart the
				discussion. our query could be the next thing others learn from. Get
				involved!"
						link="/ask-question"
						linkText="Ask a Question"
					/>
				)}
			</div>
		</div>
	);
};

export default Home;
