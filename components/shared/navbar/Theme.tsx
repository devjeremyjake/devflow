'use client';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { themes } from '@/constants';
import { useTheme } from '@/context/ThemeProvider';
import Image from 'next/image';

const Theme = () => {
	const { mode, setMode } = useTheme();
	return (
		<div>
			<Menubar className="relative border-none bg-transparent shadow-none">
				<MenubarMenu>
					<MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
						{mode === 'dark' ? (
							<Image
								src="/assets/icons/moon.svg"
								alt="Moon icon"
								width={20}
								height={20}
								className="active-theme"
							/>
						) : (
							<Image
								src="/assets/icons/sun.svg"
								alt="Sun icon"
								width={20}
								height={20}
								className="active-theme"
							/>
						)}
					</MenubarTrigger>
					<MenubarContent className="absolute right-[-3rem] space-y-2 mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-30">
						{themes?.map((data) => (
							<MenubarItem
								key={data?.id}
								onClick={() => {
									setMode(data?.value);
									if (data?.value !== 'system') {
										localStorage.theme = data?.value;
									} else {
										localStorage.removeItem('theme');
									}
								}}
								className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
							>
								<Image
									alt={data?.label}
									src={data?.icon}
									width={16}
									height={16}
									className={`${mode === data?.value && 'active-theme'}`}
								/>
								<p
									className={`body-semibold text-light-500 ${mode === data?.value ? 'text-primary-500' : 'text-dark100_light900'}`}
								>
									{data?.label}
								</p>
							</MenubarItem>
						))}
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
};

export default Theme;
