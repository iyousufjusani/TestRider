import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  StorageReference,
  StringFormat,
  uploadBytes,
  uploadBytesResumable,
  UploadMetadata,
  uploadString,
} from "firebase/storage";
export const getStorageRef = (storage: FirebaseStorage) => {
  const storageRef = ref(storage, "images");
  return storageRef;
};

export const uploadBytesStorage = async (
  storageRef: StorageReference,
  bytes: Uint8Array | Blob | ArrayBuffer,
  metadata?: UploadMetadata
) => {
  const uploadTask = await uploadBytes(storageRef, bytes, metadata);
  return uploadTask;
};
export const uploadBytesResumableStorage = async (
  storageRef: StorageReference,
  bytes: Uint8Array | Blob | ArrayBuffer,
  metadata?: UploadMetadata
) => {
  const uploadTask = uploadBytesResumable(storageRef, bytes, metadata);
  return uploadTask;
};
export const uploadStringStorage = async (
  storageRef: StorageReference,
  message: string,
  format?: StringFormat,
  metaData?: UploadMetadata
) => {
  const uploadTask = await uploadString(storageRef, message, format, metaData);
  return uploadTask;
};

export const getDownloadUrl = async (storageRef: StorageReference) => {
  const link = await getDownloadURL(storageRef);
  return link;
};
