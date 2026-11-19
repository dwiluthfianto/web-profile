import { uploadFileAction } from "@/lib/neon.actions";

export const getFileView = async (fileId: string) => {
  if (!fileId) return "";
  // Support direct external URLs or local storage endpoint
  if (fileId.startsWith("http://") || fileId.startsWith("https://") || fileId.startsWith("/")) {
    return fileId;
  }
  return `/api/storage/${fileId}`;
};

export const createFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return await uploadFileAction(formData);
};
