import React, { useRef } from 'react';
import { Icon } from 'semantic-ui-react';

export default function SearchBar({ images, setSearch }) {
	const searchRef = useRef();

	const handleChange = (e) => {
		const regex = new RegExp(e.target.value, 'gi');
		const search = images.filter(
			(image) =>
				image.data.name.match(regex) ||
				image.data.description.match(regex) ||
				image.data.tags.match(regex)
		);
		setSearch(search);
	};

	const handleClear = () => {
		searchRef.current.value = '';
		setSearch('');
	};

	return (
		<>
			<input
				type="text"
				className="w-3/5 rounded p-2 ml-3"
				placeholder="Search"
				onChange={handleChange}
				ref={searchRef}
			/>
			<button
				className="bg-white absolute transform -translate-x-8 translate-y-2"
				onClick={handleClear}
			>
				<Icon name="close" color="grey" />
			</button>
		</>
	);
}
