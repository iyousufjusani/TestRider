import { Auth, OAuthProvider, User } from "firebase/auth";
import {
  CollectionReference,
  deleteField,
  DocumentData,
} from "firebase/firestore";
import { DRIVER_COLLECTION } from "../../config";
import { INSTANCE } from "../../config/axiosInstance";
import { auth, firestore, storage } from "../../firebase/app";
import {
  signInWithEmailAndPass,
  signInWithPopupAuth,
  userLogout,
  userReauthenticate,
  userUpdatePassword,
} from "../../firebase/auth";
import {
  getFirstoreColection,
  getFirstoreDoc,
  getFirstoreSubDocs,
  setFirestoreDoc,
  setFirstoreSubDoc,
  updateFirebaseDoc,
  updateFirstoreSubDoc,
} from "../../firebase/firestore";
import {
  getDownloadUrl,
  getStorageRef,
  uploadBytesStorage,
} from "../../firebase/storage";

export default class AuthApi {
  private colectionRef: CollectionReference;
  private authRef: Auth;
  constructor(
    colectionRef = getFirstoreColection(firestore, DRIVER_COLLECTION),
    authRef = auth
  ) {
    this.colectionRef = colectionRef;
    this.authRef = authRef;
  }

  public async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(resolve, reject);
    });
  }
  public async reAuthenticateUser(user: User, password: string) {
    const authenticated = await userReauthenticate(user, password);
    return authenticated;
  }
  public async signinWithProviderPopup(providerName: string) {
    const user = await signInWithPopupAuth(this.authRef, providerName);
    return user;
  }

  public async changePassword(user: User, password: string) {
    const authenticated = await userUpdatePassword(user, password);
    return authenticated;
  }

  public async uploadImageStorage(file: File): Promise<string | null> {
    const storageRef = getStorageRef(storage);
    const uploadTask = await uploadBytesStorage(storageRef, file);
    const link = await getDownloadUrl(uploadTask.ref);
    return link;
  }

  public async setSubCollection(file: File): Promise<string | null> {
    const storageRef = getStorageRef(storage);
    const uploadTask = await uploadBytesStorage(storageRef, file);
    const link = await getDownloadUrl(uploadTask.ref);
    return link;
  }
  public async removeSubDoc(
    userId: string,
    docId: string,
    field: string
  ): Promise<any> {
    await updateFirstoreSubDoc(
      this.colectionRef,
      userId,
      ["addtionalDocuments", docId],
      { [field]: deleteField(), isCompleted: false }
    );

    return {
      docId,
      field,
    };
  }
  public async updateDocFirebase(
    id: string,
    data: any
  ): Promise<Object | null> {
    await updateFirebaseDoc(this.colectionRef, id, data);

    return {
      ...data,
    };
  }

  public async emailIsExist(data: { email: string }) {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/user/checkEmail",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  }
  public async checkPhoneNumber(data: { phoneNumber: string }) {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/user/checkPhoneNumber",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  }

  public async updateAuthEmail(data: { email: string }) {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/user/updateEmail",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  }
  public async verifyEmailCode(data: { code: string }) {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/user/verify-email",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  }
  public async resendEmailCode() {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: "/user/send-verify-email",
      })
        .then(resolve)
        .catch(reject);
    });
  }
  public async createUserAuth(data: {
    email: string;
    password: string;
    displayName: string;
    phoneNumber: string;
  }) {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/user",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  }

  public async saveUserfirestore<TData extends DocumentData>(
    data: TData,
    id: string
  ): Promise<TData> {
    await setFirestoreDoc(this.colectionRef, id, data);

    return data;
  }

  public async sigInWithEmailAndPassword(email: string, password: string) {
    const user = await signInWithEmailAndPass(this.authRef, email, password);
    return user;
  }
  public async getFirestoreUser(id: string) {
    const user = await getFirstoreDoc(this.colectionRef, id);
    return user.exists() ? { ...user.data(), id } : null;
  }
  public async logout() {
    const user = await userLogout(this.authRef);
    return user;
  }
  public async addSubDoc(data: any, id: string, name: string, docId: string) {
    await setFirstoreSubDoc(
      this.colectionRef,
      id,
      ["addtionalDocuments", docId],
      { ...data, name }
    );
    return {
      ...data,
      name,
      id: docId,
    };
  }

  public async updateSubDoc(
    data: any,
    id: string,
    name: string,
    docId: string
  ) {
    await updateFirstoreSubDoc(
      this.colectionRef,
      id,
      ["addtionalDocuments", docId],
      { ...data, name }
    );
    return {
      ...data,
      name,
      id: docId,
    };
  }
  public async getUserAdditionalInfo(id: string) {
    const getDocs = await getFirstoreSubDocs(
      this.colectionRef,
      id,
      ["addtionalDocuments"],
      []
    );

    return getDocs.empty
      ? []
      : getDocs.docs.map((doc) => {
          return {
            ...doc.data(),

            id: doc.id,
          };
        });
  }
}
