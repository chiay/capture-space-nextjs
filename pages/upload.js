import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function upload() {
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			name: '',
			description: '',
			tags: '',
			image: null,
		},
	});
	const router = useRouter();
	const [error, setError] = useState('');
	const [loading, isLoading] = useState(false);

	const onSubmit = async (data) => {
		const { name, description, tags } = data;
		if (data.image[0].size > 3145728) {
			return setError('File size exceeded limit.');
		}
		try {
			isLoading(!loading);
			const base64 = await imageToBase64(data.image[0]);
			const image = base64.split(',');
			await fetch('/api/newImage', {
				method: 'POST',
				body: JSON.stringify({
					name,
					description,
					tags,
					likes: 0,
					type: data.image[0].type,
					image: image[1],
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			isLoading(!loading);
			router.push('/');
		} catch (err) {
			console.log(err);
		}
	};

	const imageToBase64 = (img) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(img);
			reader.onload = () => {
				resolve(reader.result);
			};
			reader.onerror = (error) => {
				reject(error);
			};
		});
	};

	return (
		<div>
			<Head>
				<title>Capture Space - Upload</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="w-full">
				<h1 className="text-2xl text-center text-white font-bold">
					Upload an image!
				</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="my-4">
						<label
							htmlFor="name"
							className="block my-2 text-white font-medium"
						>
							Name*
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="w-full rounded p-2"
							autoComplete="off"
							ref={register({ required: true })}
						/>
						{errors.name && errors.name.type === 'required' && (
							<p className="text-red-400">This field is required.</p>
						)}
					</div>
					<div className="my-4">
						<label
							htmlFor="description"
							className="block my-2 text-white font-medium"
						>
							Description
						</label>
						<input
							type="text"
							id="description"
							name="description"
							className="w-full rounded p-2"
							autoComplete="off"
							ref={register}
						/>
					</div>
					<div className="my-4">
						<label
							htmlFor="tags"
							className="block my-2 text-white font-medium"
						>
							Tags
						</label>
						<input
							type="text"
							id="tags"
							name="tags"
							placeholder="Separate each tag with comma"
							className="w-full rounded p-2"
							autoComplete="off"
							ref={register}
						/>
					</div>
					<div className="my-4">
						<label
							htmlFor="image"
							className="block my-2 text-white font-medium"
						>
							Image Upload* (Max. 3MB)
						</label>
						<input
							type="file"
							id="image"
							name="image"
							className="w-full rounded p-1 text-white"
							accept="image/png, image/jpeg"
							ref={register({ required: true })}
						/>
						{errors.image && errors.name.type === 'required' && (
							<p className="text-red-400">This field is required.</p>
						)}
						{error && <p className="text-red-400">{error}</p>}
					</div>
					<div className="flex justify-center my-5">
						<button
							type="submit"
							className="bg-blue-600 text-white rounded p-2 mx-1 hover:bg-blue-700"
							disabled={loading}
						>
							Upload
						</button>
						<Link href="/">
							<a className="bg-white rounded p-2 mx-1 hover:bg-gray-200">
								Cancel
							</a>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
