import { RefObject } from "react";

const handleUploadImage = (inputFileRef: RefObject<HTMLInputElement> | null) => {
  if (inputFileRef) {
    inputFileRef.current?.click();
  }
}

export default handleUploadImage;