import axios from "axios";
import { setAlert } from "./alert";
import { GET_POST, POST_ERROR, UPDATE_LIKES, DELETE_POST } from "../types";

//Get post
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("api/posts");
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//DELETE POST
export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADD LIKE
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/likes/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//REMOVE LIKE
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/unlikes/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
