import React, { useState, DragEvent, ChangeEvent, useEffect } from "react";

interface UploaderProps {
  onChange: (files: FileList | null) => void;
  style?: React.CSSProperties;
  className?: string;
}

const UploaderLot = ({ onChange, style, className }: UploaderProps) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setFiles(droppedFiles);
      const urls = Array.from(droppedFiles).map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
      onChange(droppedFiles);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = e.target.files;
      setFiles(selectedFiles);
      const urls = Array.from(selectedFiles).map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
      onChange(selectedFiles);
    }
  };
  /*  */
  function createFileList(files: File[]): FileList {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
  }

  const handleDeleteFile = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    // Забороняємо подальше розповсюдження події кліку
    event.stopPropagation();
    if (files && previewUrls) {
      const updatedFiles = Array.from(files);
      updatedFiles.splice(index, 1);
      const updatedUrls = Array.from(previewUrls);
      updatedUrls.splice(index, 1);
      // Видаляємо видалені прев'юшки
      const removedPreviewUrls = previewUrls.slice(index, index + 1);
      removedPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
      setFiles(createFileList(updatedFiles));
      setPreviewUrls(updatedUrls);
      onChange(createFileList(updatedFiles));
    }
  };

  const uploaderStyle: React.CSSProperties = {
    border: "2px dashed #ccc",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    display: "flex",
    minHeight: "230px",
    justifyContent: "center",
    alignItems: "center",
    ...style,
  };
  const previewStyle: React.CSSProperties = {
    border: "2px dashed #ccc",
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const deleteIconStyle = {
    color: "#ea3f06",
  };

  const uploaderHoverStyle: React.CSSProperties = {
    border: "2px dashed #05194fe8", // змінюємо колір при наведенні
  };
  const colorHoverStyle: React.CSSProperties = {
    color: "#1137e3", // змінюємо колір при наведенні
  };
  const imageVideoStyle: React.CSSProperties = {
    height: "100%",
    objectFit: "contain",
  };

  const audioStyle: React.CSSProperties = {
    objectFit: "contain",
  };

  return (
    <div
      style={{ ...uploaderStyle, ...(isHovered ? uploaderHoverStyle : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => document.getElementById("fileInput")?.click()}
    >
      <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileChange} multiple />

      {(!files || files.length <= 0) && <p style={isHovered ? colorHoverStyle : {}}>Click or drag files here</p>}

      <div className="grid grid-cols-3 gap-4">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative">
            {files && files[index] && (
              <div style={{ ...previewStyle, ...(isHovered ? uploaderHoverStyle : {}) }}>
                {/* Кнопка видалення */}
                <button onClick={(e) => handleDeleteFile(index, e)} className="absolute top-3 right-3 bg-none rounded-md mx-2">
                  <i className="fa-regular fa-trash-can" style={deleteIconStyle}></i>
                </button>
                {/* Прев'ю файлу */}
                {files[index].type.startsWith("image/") && <img src={url} alt="Preview" style={imageVideoStyle} />}
                {files[index].type.startsWith("video/") && <video src={url} controls style={imageVideoStyle} />}
                {files[index].type.startsWith("audio/") && <audio src={url} controls style={audioStyle} />}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploaderLot;
