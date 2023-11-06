"use client";

import { SearchManufacturerProps } from "@/types";
import Image from "next/image";
import { Combobox, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { manufacturers } from "@/constants";

const SearchManufacturer = ({
	manufacturer,
	setManufacturer,
}: SearchManufacturerProps) => {
	const [query, setQuery] = useState("");

	//filtering manufacturers from query, removing empty spaces from the query, removing empty spaces from the manufacturers list, everything in lower case
	const filteredManufacturers =
		query === ""
			? manufacturers
			: manufacturers.filter((item) =>
					item
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	return (
		<div className="search-manufacturer">
			<Combobox>
				<div className="relative w-full">
					<Combobox.Button className="absolute top-[14px]">
						<Image
							src="/car-logo.svg"
							alt="Car Logo"
							width={20}
							height={20}
							className="ml-4"
						/>
					</Combobox.Button>
					<Combobox.Input
						className="search-manufacturer__input"
						placeholder="Volkswagen"
						displayValue={(manufacturer: string) => manufacturer}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery("")}
					>
						<Combobox.Options>
							{/* use for create or not found - an empty option (if we don't have any manufacturers) */}
							{filteredManufacturers.length === 0 && query !== "" ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
									Nothing found
								</div>
							) : (
								filteredManufacturers.map((item) => (
									<Combobox.Option
										key={item}
										className={({ active }) => `
                                        relative search-manufacturer__option
                                        ${
																					active
																						? "bg-primary-blue text-white"
																						: "text-gray-900"
																				}
                                        `}
										value={item}
									>
										{item}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
};

export default SearchManufacturer;
