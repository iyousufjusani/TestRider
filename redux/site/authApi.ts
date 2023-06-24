import { INSTANCE } from "../../config/axiosInstance";

export default class AuthApi {
  public async register(data: { email: string; password: string }) {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/register",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  }
  public async refreshTokens(data: { refreshToken: string }) {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/refresh-tokens",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  }

  public async resetPassword(data: { email: string }) {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/reset-password",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  }

  public async getCurrentUser() {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: "/auth/current-user",
      })
        .then(resolve)
        .catch(reject);
    });
  }
  public async login(data: { email: string; password: string }) {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/login",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  }
}
