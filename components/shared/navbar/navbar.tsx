import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
	return (
		<div className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
			<Link href="/" className="flex items-center gap-1">
				<Image
					src="/assets/images/site-logo.svg"
					alt="Site logo"
					width={23}
					height={23}
				/>
				<p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
					<span className="text-primary-500">Dev</span>Flow
				</p>
			</Link>
			Global search implmentation
			<div className="flex-between gap-5">
				Theme
				<SignedIn>
					<UserButton
						afterSwitchSessionUrl="/"
						appearance={{
							elements: {
								avatarBox: 'h-7 w-7',
							},
							variables: { colorPrimary: '#ff7000' },
						}}
					/>
				</SignedIn>
			</div>
		</div>
	);
};

export default Navbar;
