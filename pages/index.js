import Head from 'next/head';
import Link from 'next/link';
import ImagesSection from './components/ImagesSection';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Capture Space - Your Image Repository</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="">
				<h1 className="text-xl text-white font-bold">Capture Space</h1>
				<h3 className="text-lg text-white mt-1 mb-4">
					A place to show off your images to the rest of the world!
				</h3>
				<Link href="/upload">
					<a className="bg-blue-600 text-white rounded p-2 hover:text-white hover:bg-blue-700">
						Upload an image!
					</a>
				</Link>
				<ImagesSection />
			</main>

			<footer className=""></footer>
		</div>
	);
}
