import { useEffect, useState } from "react";
// eslint-disable-next-line
import stylesModal from "./Modal.module.css";
import { toast } from "react-toastify";
import Button from "../../partial/Button/Button";
import Modal from "../../partial/Modal";
import UploaderLot from "../../partial/UploaderLot";
import useAxios from "../../../Hooks/useAxios";

const apiUrl = process.env.REACT_APP_API_URL;

export default function ModalFileUpload({ isModalOpen, setIsModalOpen }) {
  const [fileData, setFileData] = useState<FileList | null>(null);
  const [disabled, setDisabled] = useState(true);
  const { data, error, sendRequest } = useAxios(`${apiUrl}/user-file`);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  useEffect(() => {
    if (data) {
      toast.success(data.message);
      setDisabled(true);
    }
  }, [data]);

  useEffect(() => {
    const errorNow = error;
    if (errorNow) {
      toast.error("Error:", errorNow.message);
    }
  }, [error]);

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("titleData", "");

    if (fileData) {
      Array.from(fileData).forEach((file, index) => {
        formData.append(`fileData${index}`, file);
      });
    }
    sendRequest("post", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const handleFileChange = (data: FileList | null) => {
    setDisabled(false);
    setFileData(data);
  };

  return (
    <>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="relative bg-white rounded-lg shadow-xl">
          <div className={stylesModal.modalHeader}>
            <span>Uploade file</span>
            <div className={stylesModal.modalCloseButton} onClick={() => setIsModalOpen(false)}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
              </svg>
            </div>
          </div>
          <div className="overflow-y-auto max-h-[80vh]">
            <div className={stylesModal.modalContent}>
              <div className={stylesModal.gridBlock}>
                <div> </div>
                <div className={stylesModal.textFlexCenter}>
                  <p className="bold"></p>
                </div>
              </div>
              <UploaderLot onChange={handleFileChange} style={{}} className="custom-uploader-class" />
            </div>
          </div>

          <div className={stylesModal.modalFooter}>
            <Button className="btn btn-primary-send" onClick={handleSubmit} disabled={disabled}>
              Send
            </Button>{" "}
          </div>
        </div>
      </Modal>
    </>
  );
}
