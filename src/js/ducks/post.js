const DELETE_POST = `post/DELETE_POST`;

const initialState = {
	deleting: false
};

export default function reducer() {

}

export function deletePost( post ) {
	return { type: DELETE_POST, post };
}