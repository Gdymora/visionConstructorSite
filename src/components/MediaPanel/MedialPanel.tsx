import useAxios from "../../Hooks/useAxios";
import { useEffect, useState } from "react";
import Menu from "../partial/Menu";
import ModalFileUpload from "./ModalSay/ModalFileUpload";
import { toast } from "react-toastify";
import ModalYesOrNot from "../partial/ModalYesOrNot";
import ModalCustom from "../partial/ModalCustom";
import AddTableDataForm from "../ControlPanel/AddTableDataForm";

const apiUrl = process.env.REACT_APP_API_URL;

interface UserFile {
  created_at: string;
  description: string | null;
  friends: string | null;
  id: number;
  title: string;
  type: string;
  updated_at: string;
  url: string;
  userfilable_id: number;
  userfilable_type: string;
  visible: string;
}

const MediaPanel = () => {
  const itemsModalTitle = {
    openList: { title: "Add List Item" },
    openAddList: { title: "Item 2" },
    openCreateList: { title: "Item 3" },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, sendRequest } = useAxios(`${apiUrl}/user-file`);
  const { sendRequest: sendRequestSave, data: dataSave, loading: loadingSave, error: errorSave } = useAxios(null);
  const { sendRequest: sendRequestDelete, data: dataDelete, loading: loadingDelete, error: errorDelete } = useAxios(null);

  const [selectedImage, setSelectedImage] = useState<UserFile | null>(null);
  const [files, setFiles] = useState<UserFile[] | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  const [fileIdDelete, setFileIdDelete] = useState<number[] | null>(null);
  const [token, setToken] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<UserFile[]>([]);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenList, setIsOpenList] = useState(false);
  const [isOpenAddList, setIsOpenAddList] = useState(false);
  const [isOpenCreateList, setIsOpenCreateList] = useState(false);
  
  useEffect(()=>{
    console.log('MediaPanel');
  }, []);

  const test = {
    dataTable: {
      id: 36,
      user_id: 11,
      table_name: "3DScene_1",
      table_structure: [
        { tag: "p", name: "title", type: "text", filter: null },
        { tag: "p", name: "url", type: "text", filter: null },
      ],
    },
    row: selectedItems,
    rowIndex: 0,
  };

  const handleAddRow = (row, rowIndex) => {
    console.log("handleAddRow", row, rowIndex);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    sendRequest("get", {}, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
  }, []);

  useEffect(() => {
    if (data) {
      setFiles(data);
    }
  }, [data]);

  useEffect(() => {
    if (dataDelete) {
      toast.success("Successfully deleted");
      const updatedFiles = files.filter((file) => !fileIdDelete.includes(file.id));
      setFiles(updatedFiles);
      setSelectedItems([]);
    }
  }, [dataSave, dataDelete]);

  useEffect(() => {
    const errorNow = error || errorDelete;
    if (errorNow) {
      toast.error("Error:", errorNow.message);
    }
  }, [error, errorDelete]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openLargeImage = (imageUrl: UserFile) => {
    setSelectedImage(imageUrl);
  };

  const closeLargeImage = () => {
    setSelectedImage(null);
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = event.target as HTMLImageElement;
    setImageDimensions({ width: img.width, height: img.height });
  };

  const deleteIconStyle = { color: "#ea3f06" };

  const openDeleteModal = (projectId: number) => {
    if (selectedItems.length > 1) {
      if (selectedItems.find((item) => item.id === projectId)) {
        openModalList();
      }
    } else {
      setIsOpenDelete(true);
      setFileIdDelete([projectId]);
    }
  };

  const openDeleteModalArray = () => {
    const arrayID = selectedItems.map((item) => item.id);
    setFileIdDelete(arrayID);
    deleteFile(arrayID);
    closeModalList();
  };

  const closeDeleteModal = () => {
    setIsOpenDelete(false);
  };

  const handleDeleteProject = () => {
    if (fileIdDelete) {
      deleteFile(fileIdDelete);
    }
    setIsOpenDelete(false);
  };

  const deleteFile = (ids: number[]) => {
    if (ids) {
      const url = `${apiUrl}/delete-user-files`;
      sendRequestDelete("post", { ids }, { headers: { Authorization: `Bearer ${token}` } }, url);
    }
  };

  const handleChange = (e, item) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      if (!selectedItems.some((existingItem) => existingItem.id === item.id)) {
        setSelectedItems([...selectedItems, item]);
      }
    } else {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    }
  };

  const openModalList = () => setIsOpenList(true);
  const closeModalList = () => setIsOpenList(false);

  const openModalAddList = () => setIsOpenAddList(true);
  const closeModalAddList = () => setIsOpenAddList(false);

  const openModalCreateList = () => {
    setIsOpenList(false);
    setIsOpenCreateList(true);
  };
  const closeModalCreateList = () => setIsOpenCreateList(false);

  return (
    <div className="flex">
      <main>

        <div className="m-4">
          <div className="mb-1 flex justify-start bg-white shadow-md rounded-md">
            <h2 className="text-lg font-semibold m-4 justify-right">Media panel</h2>
            <button type="button" className="m-2" onClick={openModal}>
              <i className="fa-regular fa-square-plus fa-xl" style={{ color: "#3e1e9f" }}></i>
            </button>
            {selectedItems.length > 0 && (
              <>
                <button type="button" className="m-2" onClick={openModal}>
                  <i className="fa-regular fa-square-plus fa-xl" style={{ color: "#3e1e9f" }}></i>
                </button>
                <button type="button" className="m-2" onClick={openModalList}>
                  <i className="fa-regular fa-trash-can" style={deleteIconStyle}></i>
                </button>
              </>
            )}
          </div>
        </div>

        <ModalFileUpload isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

        {selectedImage && imageDimensions && (
          <div className="large-image flex justify-content-center align-items-center" onClick={closeLargeImage}>
            <div className="mb-1 flex flex-col shadow-md rounded-md overflow-hidden">
              <div className="m bg-white">
                <div className="flex justify-end flex-row p-2 bg-white">Media Panel</div>
                <div className="flex-grow">
                  {selectedImage.type === "image" && (
                    <img src={`${apiUrl}/user-file/${selectedImage.url}`} alt="Large Media" width={imageDimensions.width} height={imageDimensions.height} />
                  )}
                  {selectedImage.type === "video" && <video src={`${apiUrl}/user-file/${selectedImage.url}`} controls />}
                  {selectedImage.type === "audio" && <audio src={`${apiUrl}/user-file/${selectedImage.url}`} controls />}
                </div>
              </div>
              <div className="p-2 flex flex-col text-white justify-content-center align-items-start">
                <p className="">{selectedImage.title}</p>
                <p className="">id: {selectedImage.id}</p>
                <p className=""> type: {selectedImage.type}</p>
                <p className="">updated: {selectedImage.updated_at}</p>
                <p className="">created: {selectedImage.created_at}</p>
                <p className="">visible: {selectedImage.visible}</p>
              </div>
            </div>
          </div>
        )}

        <div className="m-4 grid grid-cols-12 gap-1">
          {files &&
            files.map((mediaItem) => (
              <div key={mediaItem.id} className="mb-1 flex flex-col bg-white shadow-md rounded-md overflow-hidden">
                <div className="flex justify-end flex-row p-2 bg-white">
                  <input type="checkbox" checked={selectedItems.some((i) => i.id === mediaItem.id)} onChange={(e) => handleChange(e, mediaItem)} />
                  <button type="button" className="m-2" onClick={() => openDeleteModal(mediaItem.id)}>
                    <i className="fa-regular fa-trash-can" style={deleteIconStyle}></i>
                  </button>
                </div>
                <div onClick={() => openLargeImage(mediaItem)} className="flex-grow flex justify-center items-center">
                  {mediaItem.type === "image" && <img src={`${apiUrl}/user-file/${mediaItem.url}`} alt="Media" loading="lazy" onLoad={handleImageLoad} />}
                  {mediaItem.type === "video" && <video src={`${apiUrl}/user-file/${mediaItem.url}`} controls />}
                  {mediaItem.type === "audio" && <audio src={`${apiUrl}/user-file/${mediaItem.url}`} controls />}
                </div>
                <div className="p-2 bg-white">
                  <p className="p-2 truncate hover:text-clip">{mediaItem.title}</p>
                </div>
              </div>
            ))}
        </div>

        <div>
          <h2>Selected Items:</h2>
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>
                {index + 1} {item.title}
              </li>
            ))}
          </ul>
        </div>

        {isOpenDelete && (
          <ModalYesOrNot
            closeModal={closeDeleteModal}
            handleButtonClick={handleDeleteProject}
            text={{ head: "Delete a file", title: "Do you want to delete a file?" }}
          />
        )}

        {isOpenList && (
          <ModalCustom isOpen={isOpenList} closeModal={closeModalList} text={itemsModalTitle.openList.title} zIndex={10}>
            <div>
              <h2>List items:</h2>
              <ul>
                {selectedItems.map((item, index) => (
                  <li key={index}>
                    {index + 1} {item.title}
                    <input type="checkbox" onChange={(e) => handleChange(e, item)} checked />
                  </li>
                ))}
              </ul>
              <button type="button" className="m-2" onClick={openModalCreateList}>
                Create New List
              </button>
              <button type="button" className="m-2" onClick={openModalAddList}>
                Add list
              </button>
              <button type="button" className="m-2" onClick={openDeleteModalArray}>
                Delete
              </button>
            </div>
          </ModalCustom>
        )}

        {isOpenAddList && (
          <ModalCustom isOpen={isOpenAddList} closeModal={closeModalAddList} text={itemsModalTitle.openAddList.title} zIndex={10}>
            <div>
              <h2>Add List items:</h2>
              <ul>
                {selectedItems.map((item, index) => (
                  <li key={index}>
                    {index + 1} {item.title}
                    <input type="checkbox" onChange={(e) => handleChange(e, item)} checked />
                  </li>
                ))}
              </ul>
              <button type="button" className="m-2" onClick={openDeleteModalArray}>
                Add list
              </button>
            </div>
          </ModalCustom>
        )}

        {isOpenCreateList && (
          <ModalCustom isOpen={isOpenCreateList} closeModal={closeModalCreateList} text={itemsModalTitle.openCreateList.title} zIndex={10}>
            <div>
              <h2>Create List items:</h2>
              <ul>
                {selectedItems.map((item, index) => (
                  <li key={index}>
                    {index + 1} {item.title}
                    <input type="checkbox" onChange={(e) => handleChange(e, item)} checked />
                  </li>
                ))}
              </ul>
              <AddTableDataForm onAddTable={handleAddRow} tableData={test} />
              <button type="button" className="m-2" onClick={openDeleteModalArray}>
                Create List
              </button>
            </div>
          </ModalCustom>
        )}
      </main>
    </div>
  );
};

export default MediaPanel;
