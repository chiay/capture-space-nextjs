import faunadb from 'faunadb';
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });
const q = faunadb.query;

const getImages = async () => {
	const { data } = await client.query(
		q.Map(
			q.Paginate(q.Documents(q.Collection('images'))),
			q.Lambda('ref', q.Get(q.Var('ref')))
		)
	);

	const images = data.map((image) => {
		image.id = image.ref.id;
		delete image.ref;
		return image;
	});

	return images;
};

const newImage = async (name, description, tags, image) => {
	return await client.query(
		q.Create(q.Collection('images'), {
			data: { name, description, tags, image },
		})
	);
};

module.exports = { getImages, newImage };
