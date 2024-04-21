/*
	File: src/app/lib/RadioWithTickMark.tsx
	Description: This component displays a custom radio input.
*/

import React from "react";

interface RadioOption {
	id: string;
	value: string;
	label: string;
}

interface RadioWithTickMarkProps {
	options: RadioOption[];
	selectedValue: string;
	onChange: (value: string) => void;
}

const RadioWithTickMark: React.FC<RadioWithTickMarkProps> = ({ options, selectedValue, onChange }) => {
	const handleChange = (value: string) => {
		onChange(value);
	};

	return (
		<div className="flex flex-col space-y-3">
			{options.map((option) => (
				<div key={option.id} className="flex w-full flex-col gap-5 sm:flex-row">
					<div
						className="peer relative rounded-xl focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-900 w-full"
						tabIndex={0}>
						<input
							id={option.id}
							type="radio"
							className="hidden"
							value={option.value}
							checked={selectedValue === option.value}
							onChange={() => handleChange(option.value)}
						/>
						<label
							htmlFor={option.id}
							className={`relative inline-flex min-w-[11rem] cursor-pointer flex-col rounded-xl border bg-white hover:border-gray-900 px-[24px] py-[14px] border-gray-900 w-full ${
								selectedValue === option.value ? "border-gray-900" : "border-gray-300"
							}`}>
							<div className="flex flex-row items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 256 256"
									fill="currentColor"
									className={`check-circle-fill ml-auto fill-gray-900 flex-shrink-0 ${
										selectedValue === option.value ? "block" : "hidden"
									}`}
									width="20"
									height="20">
									<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"></path>
								</svg>
								<div className="text-left w-full pl-2">
									<div
										className={`w-full text-sm font-semibold ${
											selectedValue === option.value ? "text-gray-900" : "text-gray-500"
										}`}>
										{option.label}
									</div>
								</div>
							</div>
						</label>
					</div>
				</div>
			))}
		</div>
	);
};

export default RadioWithTickMark;
