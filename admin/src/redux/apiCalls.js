// apiCalls.js

import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import { publicRequest, userRequest } from "../requestMethod";

import {
  getProductSuccess,
  getProductFailure,
} from "./productRedux";

export const login = (user) => {
  return (dispatch) => {
    dispatch(loginStart());
    return publicRequest
      .post("/auth/login", user)
      .then((res) => {
        dispatch(loginSuccess(res.data));
        return res.data; 
      })
      .catch((error) => {
        dispatch(loginFailure());
        throw error; 
      });
  };
};
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const res = await userRequest.get("product");
      console.log(res.data);
      dispatch(getProductSuccess(res.data));
    } catch (err) {
      dispatch(getProductFailure());
    }
  };
};
