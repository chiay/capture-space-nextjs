import { newImage } from '../../utils/db';

export default async function handler(req, res) {
	const { name, description, tags, likes, type, image } = req.body;
	if (req.method !== 'POST') {
		return res.status(405).json({ msg: 'Invalid method' });
	}

	try {
		const newEntry = await newImage(
			name,
			description,
			tags,
			likes,
			type,
			image
		);
		return res.status(200).json(newEntry);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'Something went wrong.' });
	}
}
