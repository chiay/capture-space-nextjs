import { useState } from 'react';
import useSWR from 'swr';
import ImageContainer from './ImageContainer';
import SearchBar from './SearchBar';

export default function ImagesSection() {
	const { data: images, error } = useSWR('/api/images');
	const [search, setSearch] = useState();

	return (
		<>
			<SearchBar images={images} setSearch={setSearch} />
			{search && (
				<div className="mt-5 flex flex-wrap justify-start">
					{search.map((image) => {
						return <ImageContainer key={image.id} image={image} />;
					})}
				</div>
			)}
			{!search && images && (
				<div className="mt-5 flex flex-wrap justify-start">
					{error && (
						<p className="text-red-400 text-center">
							Failed to load images.
						</p>
					)}
					{!images && <p className="text-white text-center">Loading...</p>}
					{images &&
						images.map((image) => {
							return <ImageContainer key={image.id} image={image} />;
						})}
				</div>
			)}
		</>
	);
}
