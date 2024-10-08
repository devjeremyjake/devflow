'use client';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { SignedOut } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavContent = () => {
	const route = usePathname();
	return (
		<section className="flex h-full flex-col gap-6 pt-16">
			{sidebarLinks?.map((item) => {
				const isActive =
					(route.includes(item?.route) && item?.route?.length > 1) ||
					route === item?.route;
				return (
					<SheetClose asChild key={item?.route}>
						<Link
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
							<p className={`${isActive ? 'base-bold' : 'base-medium'}`}>
								{item?.label}
							</p>
						</Link>
					</SheetClose>
				);
			})}
		</section>
	);
};

const MobileNav = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Image
					src="/assets/icons/hamburger.svg"
					alt="Hamburger menu"
					height={36}
					width={36}
					className="invert-colors sm:hidden"
				/>
			</SheetTrigger>
			<SheetContent
				side="left"
				className="background-light900_dark200 border-none"
			>
				<Link href="/" className="flex items-center gap-1">
					<Image
						src="/assets/images/site-logo.svg"
						alt="Site logo"
						width={23}
						height={23}
					/>
					<p className="h2-bold text-dark100_light900 font-spaceGrotesk">
						<span className="text-primary-500">Dev</span>Flow
					</p>
				</Link>
				<div>
					<SheetClose asChild>
						<NavContent />
					</SheetClose>
					<SignedOut>
						<div className="flex flex-col gap-3">
							<SheetClose asChild>
								<Link href="/sign-in">
									<Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
										<span className="primary-text-gradient">Log In</span>
									</Button>
								</Link>
							</SheetClose>
							<SheetClose asChild>
								<Link href="/sign-up">
									<Button className="small-medium btn-tertiary light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none text-dark400_light900">
										Sign up
									</Button>
								</Link>
							</SheetClose>
						</div>
					</SignedOut>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;
