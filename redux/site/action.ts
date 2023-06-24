import { insertToken } from "../../config/axiosInstance";
import {
  forgetPasswordState,
  loginState,
  registerState,
} from "../../interfaces";
import { AppDispatch } from "../../types";

import AuthApi from "./authApi";
import { siteActions } from "./reducer";

const authApi = new AuthApi();

export const userRegister =
  (user: registerState, cb: any) => async (dispatch: AppDispatch) => {
    try {
      // const response: any = await authApi.register({
      //   email: user.email,
      //   password: user.password,
      // });
      // dispatch(siteActions.setUser(response.data));
      // localStorage.setItem("refresh-token", response.data.tokens.refresh.token);
      // localStorage.setItem("access-token", response.data.tokens.access.token);
    } catch (error: any) {
      cb(error);
    }
  };
