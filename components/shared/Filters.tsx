'use client';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface FilterSingleProp {
	name: string;
	value: string;
}

interface Props {
	filters: FilterSingleProp[];
	otherClasses: string;
	containerClasses: string;
}

const Filters = ({ filters, otherClasses, containerClasses }: Props) => {
	return (
		<div className={`relative ${containerClasses}`}>
			<Select>
				<SelectTrigger
					className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5 outline-none`}
				>
					<div className="line-clamp-1 flex-1 text-left">
						<SelectValue placeholder="Select a Filter" />
					</div>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{filters?.map((filter) => (
							<SelectItem key={filter?.name} value={filter?.value}>
								{filter?.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default Filters;
