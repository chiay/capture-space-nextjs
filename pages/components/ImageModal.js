import { useState } from 'react';
import { Modal, Image, Divider, Icon, Header } from 'semantic-ui-react';
import ImageTag from './ImageTag';

export default function ImageModal({ image, open, setOpen }) {
	const tags = image.data.tags.split(',');
	const [likes, setLikes] = useState(image.data.likes);
	const [loading, isLoading] = useState(false);

	const handleLike = async () => {
		try {
			isLoading(true);
			await fetch('/api/likeImage', {
				method: 'PATCH',
				body: JSON.stringify({
					id: image.id,
					likes,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			isLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Modal
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			dimmer="blurring"
		>
			<Modal.Header>{image.data.name}</Modal.Header>
			<Modal.Content image>
				<Image
					size="medium"
					src={`data:${image.data.type};base64,${image.data.image}`}
				/>
				<Modal.Description>
					<Divider horizontal>
						<Header as="h4">
							<Icon name="tag" />
							Description
						</Header>
					</Divider>
					<p>{image.data.description}</p>
					<div className="flex flex-wrap">
						{image.data.tags &&
							tags.map((tag, index) => {
								return <ImageTag tag={tag} key={index} />;
							})}
					</div>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<button
					className="bg-white rounded mr-5"
					onClick={() => {
						setLikes((prev) => prev + 1);
						handleLike();
					}}
					disabled={loading}
				>
					<Icon name="like" inverted color="red" />
					{likes}
				</button>
				<button
					className="bg-blue-600 text-white rounded p-2"
					onClick={() => setOpen(false)}
					disabled={loading}
				>
					Close
				</button>
			</Modal.Actions>
		</Modal>
	);
}
