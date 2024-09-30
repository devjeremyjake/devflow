'use client';
import { sidebarLinks } from '@/constants';
import { SignedOut } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

const LeftSideBar = () => {
	const route = usePathname();
	return (
		<section className="bckground-light900_dark200 light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] custom-scrollbar">
			<div className="flex flex-1 flex-col gap-3">
				{sidebarLinks?.map((item) => {
					const isActive =
						(route.includes(item?.route) && item?.route?.length > 1) ||
						route === item?.route;
					return (
						<Link
							key={item?.route}
							href={item?.route}
							className={`${isActive ? 'primary-gradient rounded-lg' : 'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-4`}
						>
							<Image
								alt={item?.label}
								height={20}
								width={20}
								src={item?.imgURL}
								className={`${isActive ? '' : 'invert-colors'}`}
							/>
							<p
								className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}
							>
								{item?.label}
							</p>
						</Link>
					);
				})}
			</div>
			<SignedOut>
				<div className="flex flex-col gap-3">
					<Link href="/sign-in">
						<Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
							<Image
								alt="login"
								height={20}
								width={20}
								src="/assets/icons/account.svg"
								className="invert-colors lg:hidden"
							/>
							<span className="primary-text-gradient max-lg:hidden">
								Log In
							</span>
						</Button>
					</Link>
					<Link href="/sign-up">
						<Button className="small-medium btn-tertiary light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none text-dark400_light900">
							<Image
								alt="sign up"
								height={20}
								width={20}
								src="/assets/icons/sign-up.svg"
								className="invert-colors lg:hidden"
							/>
							<span className="max-lg:hidden">Sign up</span>
						</Button>
					</Link>
				</div>
			</SignedOut>
		</section>
	);
};

export default LeftSideBar;
