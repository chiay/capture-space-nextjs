import { likeImage } from '../../utils/db';

export default async function handler(req, res) {
	const { id, likes } = req.body;
	if (req.method !== 'PATCH') {
		return res.status(405).json({ msg: 'Invalid method' });
	}

	try {
		const updated = await likeImage(id, likes);
		return res.status(200).json(updated);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'Something went wrong.' });
	}
}
