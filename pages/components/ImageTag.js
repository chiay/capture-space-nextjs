import React from 'react';

export default function ImageTag({ tag }) {
	return (
		<div className="w-max mt-4 mx-1 p-1 text-sm text-white rounded-md bg-green-500 shadow-lg">
			{tag}
		</div>
	);
}
