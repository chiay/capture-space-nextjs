import { getImages } from '../../utils/db';

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405).json({ msg: 'Invalid method' });
	}

	try {
		const images = await getImages();
		return res.status(200).json(images);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'Something went wrong.' });
	}
}
