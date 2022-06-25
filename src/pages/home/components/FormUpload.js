import React, { useState } from "react";
import Upload from "../../../components/Upload";
import { getBase64 } from "../../../helpers/commons";

const FormUpload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async (file) => {
    try {
      const url = await getBase64(file);

      if (url) {
        setFile({
          url,
        });
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Upload
        files={file ? [file] : []}
        onDelete={(e) => {
          setFile(null);
        }}
        onUpload={handleUpload}
        accept="image/png, image/jpeg"
      />
    </div>
  );
};

export default FormUpload;
