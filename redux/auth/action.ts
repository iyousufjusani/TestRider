import { deleteField } from "firebase/firestore";
import { changePassProps } from "../../components/ChangePassword";
import { profileProps } from "../../components/ProfileForm";
import { registerState } from "../../interfaces";
import { AppDispatch, RootState } from "../../types";
import { addCreateHistory, createDisplayName } from "../../utils/auth.utils";

import AuthApi from "./authApi";
import { actions } from "./reducer";

const authApi = new AuthApi();
interface userState extends registerState {
  password: string;
}
export const userRegister =
  (user: userState, cb: Function) => async (dispatch: AppDispatch) => {
    const updatedUser = createDisplayName(user);
    const payload = {
      displayName: updatedUser.displayName,
      email: updatedUser.email,
      password: updatedUser.password,
      phoneNumber: updatedUser.phoneNumber,
    };
    try {
      const { data }: any = await authApi.createUserAuth(payload);
      const id = data.id;
      const savedPayload = {
        name: updatedUser.firstName + " " + updatedUser.lastName,

        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        provider: "firebase",
        role: "user",
        isActive: true,
        isProved: true,
      };
      const saveUser = await authApi.saveUserfirestore(
        addCreateHistory(savedPayload, { id }),
        id
      );
      const { user } = await authApi.sigInWithEmailAndPassword(
        saveUser.email,
        updatedUser.password
      );
      const actionPayload = {
        user: {
          ...saveUser,
          id: user.uid,
          emailVerified: user.emailVerified,
        },
        token: {
          access: await user.getIdToken(true),
          refresh: user.refreshToken,
          expirationTime: (await user.getIdTokenResult()).expirationTime,
        },
      };
      dispatch(actions.setUser(actionPayload));

      cb();
    } catch (error: any) {
      cb(error);
    }
  };

export const getCurrentUser =
  (cb: Function) => async (dispatch: AppDispatch) => {
    try {
      const user = await authApi.getCurrentUser();
      if (!user) {
        cb();
        return;
      }
      const fetchUser = await authApi.getFirestoreUser(user.uid);

      const payload = {
        user: {
          ...fetchUser,
          id: user.uid,
          emailVerified: user.emailVerified,
          provideDocuments: true,
        },
        token: {
          access: await user.getIdToken(true),
          refresh: user.refreshToken,
          expirationTime: (await user.getIdTokenResult()).expirationTime,
        },
      };

      dispatch(actions.setUser(payload));

      cb();
    } catch (error: any) {
      cb(error);
    }
  };
export const verifyEmailCode =
  (values: { code: string }, cb: Function) => async (dispatch: AppDispatch) => {
    try {
      const { data }: any = await authApi.verifyEmailCode(values);
      dispatch(actions.updateUser(data));
      cb();
    } catch (error: any) {
      cb(error);
      console.log(error);
    }
  };
export const signinWithProviderPopup =
  (providerName: string, cb: Function) => async (dispatch: AppDispatch) => {
    try {
      const { user } = await authApi.signinWithProviderPopup(providerName);

      let saveUser;
      const fetchUser = await authApi.getFirestoreUser(user.uid);
      if (fetchUser) {
        saveUser = fetchUser;
      } else {
        const savedPayload = {
          name: user.displayName,

          email: user.email,
          phoneNumber: user.phoneNumber,
          provider: providerName,
          role: "user",
          isActive: true,
          isProved: true,
        };
        saveUser = await authApi.saveUserfirestore(
          addCreateHistory(savedPayload, { id: user.uid }),
          user.uid
        );
      }

      const actionPayload = {
        user: {
          ...saveUser,
          id: user.uid,
          emailVerified: user.emailVerified,
        },
        token: {
          access: await user.getIdToken(true),
          refresh: user.refreshToken,
          expirationTime: (await user.getIdTokenResult()).expirationTime,
        },
      };
      dispatch(actions.setUser(actionPayload));

      cb();
    } catch (error: any) {
      cb(error);
      console.log(error);
    }
  };

export const resendEmailCode =
  (cb: Function) => async (dispatch: AppDispatch) => {
    try {
      const { data }: any = await authApi.resendEmailCode();
      dispatch(actions.updateUser(data));
      cb();
    } catch (error: any) {
      cb(error);
      console.log(error);
    }
  };
export const removeProfileImage =
  (cb: Function) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;

    try {
      if (!user) {
        return;
      }
      await authApi.updateDocFirebase(user?.id, {
        profileImage: deleteField(),
      });

      dispatch(actions.updateUser({ profileImage: null }));
      cb();
    } catch (error: any) {
      cb(error);
      console.log(error);
    }
  };

export const uploadProfileImage =
  (file: File, cb: Function) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;
    try {
      if (!user) {
        return;
      }
      const link = await authApi.uploadImageStorage(file);

      await authApi.updateDocFirebase(user?.id, { profileImage: link });
      dispatch(actions.updateUser({ profileImage: link }));
      cb();
    } catch (error: any) {
      cb(error);
      console.log(error);
    }
  };
export const updateUserProfile =
  (data: profileProps, cb: Function) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;

    try {
      if (!user) {
        return;
      }

      if (user.email !== data.email) {
        await authApi.updateAuthEmail({ email: data.email });
      }

      await authApi.updateDocFirebase(user?.id, data);

      dispatch(actions.updateUser(data));
      cb();
    } catch (error: any) {
      cb(error);
      console.log(error);
    }
  };

export const userLogout = (cb: Function) => async (dispatch: AppDispatch) => {
  try {
    await authApi.logout();
    dispatch(actions.logout());

    cb();
  } catch (error: any) {
    cb(error);
    console.log(error);
  }
};
export const updateUserPassword =
  (data: changePassProps, cb: Function) => async (dispatch: AppDispatch) => {
    try {
      const user = await authApi.getCurrentUser();
      if (!user) {
        cb();
        return;
      }
      const updatedUser = await authApi.reAuthenticateUser(
        user,
        data.oldPassword
      );
      if (!updatedUser) {
        cb();
        return;
      }
      await authApi.changePassword(updatedUser, data.newPassword);
      await authApi.logout();
      dispatch(actions.logout());

      cb();
    } catch (error: any) {
      cb(error);
      console.log(error);
    }
  };
export const userLogin =
  (data: { email: string; password: string }, cb: Function) =>
  async (dispatch: AppDispatch) => {
    try {
      const { user } = await authApi.sigInWithEmailAndPassword(
        data.email,
        data.password
      );
      const fetchUser = await authApi.getFirestoreUser(user.uid);

      const payload = {
        user: {
          ...fetchUser,
          id: user.uid,
          emailVerified: user.emailVerified,
        },
        token: {
          access: await user.getIdToken(true),
          refresh: user.refreshToken,
          expirationTime: (await user.getIdTokenResult()).expirationTime,
        },
      };

      dispatch(actions.setUser(payload));

      cb();
    } catch (error: any) {
      cb(error);
    }
  };
