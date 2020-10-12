import { GET_POST, POST_ERROR } from "../types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POST:
      return { ...state, posts: payload, loading: false };
    case POST_ERROR:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};
