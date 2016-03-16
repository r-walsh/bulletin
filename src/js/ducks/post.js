const DELETE_POST = `post/DELETE_POST`;

const initialState = {

};

export default function reducer( state = initialState, action ) {

}

export function deletePost( post ) {
	return { type: DELETE_POST, post };
}