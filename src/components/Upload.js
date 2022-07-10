import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Upload as UploadAntd } from "antd";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { pushNotif } from "../helpers/notification";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const Upload = ({ files, loading, onUpload, onDelete, onChange, accept }) => {
  const [localLoading, setLocalLoading] = useState(loading);
  const [fileList, setFileList] = useState([]);
  const [getfile, setFile] = useState({});

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    setFileList(files);
  }, [files]);

  const uploadButton = (
    <div>
      {localLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleCustomRequest = async ({ file }) => {
    try {
      setFile(file);
      setLocalLoading(true);
      const uploadResult = await onUpload(file);
      console.log("upoadResult", uploadResult);
      pushNotif("success", "This is a success message");
    } catch (error) {
      console.log(error);
    } finally {
      setLocalLoading(false);
    }
  };

  const handlePreview = async (file) => {
    console.log("handlePreview", file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    file.name = getfile.name;
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url?.substring(file.url?.lastIndexOf("/") + 1)
    );
  };

  return (
    <>
      <UploadAntd
        fileList={fileList}
        customRequest={handleCustomRequest}
        name="upload"
        listType="picture-card"
        onPreview={handlePreview}
        onRemove={onDelete}
        accept={accept}
      >
        {fileList.length ? "" : uploadButton}
      </UploadAntd>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

Upload.propTypes = {
  loading: PropTypes.bool,
  files: PropTypes.arrayOf(PropTypes.any),
  onUpload: PropTypes.func,
  onDelete: PropTypes.func,
  onChange: PropTypes.func,
  accept: PropTypes.string,
};

Upload.defaultProps = {
  loading: false,
  files: PropTypes.arrayOf(PropTypes.any),
  onUpload: () => {},
  onDelete: () => {},
  onChange: () => {},
  accept: "",
};

export default Upload;
