import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

const url = "http://localhost:7000/posts";

export const getPosts = () => async (dispatch) => {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      //  "Authorization": "Bearer " + localStorage.getItem("token")
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: FETCH_ALL,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createPost = (post) => async (dispatch) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      dispatch({
        type: CREATE,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
export const updatePost = (currentId, Updatepost) => async (dispatch) => {
  // patch request
  fetch(`${url}/${currentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Updatepost),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: UPDATE,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const likePost = (currentId) => async (dispatch) => {
  fetch(`${url}/${currentId}/likePost`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: LIKE,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deletePost = (currentId) => async (dispatch) => {
  fetch(`${url}/${currentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: DELETE,
        payload: currentId,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
