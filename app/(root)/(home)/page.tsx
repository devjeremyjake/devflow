import { UserButton } from '@clerk/nextjs';
const Home = () => {
	return (
		<div>
			Home page
			<UserButton afterSignOutUrl="/" />
		</div>
	);
};

export default Home;
