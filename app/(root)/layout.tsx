import Navbar from '@/components/shared/navbar/navbar';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<main className="background-light850_dark100 relative">
			<Navbar />
			<div className="flex">
				LefrsideBar
				<section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
					<div className="mx-auto w-full max-w-5xl">{children}</div>
				</section>
				RightsideBar
			</div>
			Toaster
		</main>
	);
};

export default Layout;
