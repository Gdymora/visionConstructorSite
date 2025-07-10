import { useState, useRef, useEffect, useCallback } from "react";

const Window = ({ title, children, onClose, initialPos, hasSVG }: any) => {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState(initialPos);
  const [zIndex, setZIndex] = useState(initialPos.zIndex);
  const ref = useRef(null);

  const iconStyle = {
    backgroundImage: hasSVG
      ? `url("data:image/svg+xml;utf8,${encodeURIComponent(hasSVG)}")`
      : "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M11.09 20l-4.92-4.92 1.41-1.41 3.51 3.5 8.5-8.5 1.41 1.41z'/></svg>\")",
    /* Додайте інші необхідні властивості */
  };

  const startDrag = useCallback((e) => {
    setIsDragging(true);
    ref.current.offset = {
      x: e.clientX - ref.current.getBoundingClientRect().left,
      y: e.clientY - ref.current.getBoundingClientRect().top,
    };
  }, []);

  const onDrag = useCallback((e) => {
    if (!isDragging) return;
    const x = e.clientX - ref.current.offset.x;
    const y = e.clientY - ref.current.offset.y;
    setPos({ x, y });
  }, [isDragging]);

  const stopDrag = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    const handleMouseMove = (e) => onDrag(e);
    const handleMouseUp = () => stopDrag();

    if (isDragging) {
      document.body.classList.add("unselectable");
      document.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (isDragging) {
        document.body.classList.remove("unselectable");
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [isDragging, onDrag, stopDrag]);

  const onMinimize = useCallback(() => {
    setWinClass(ref, "minimized");
  }, []);

  const onRollup = useCallback(() => {
    setWinClass(ref, "rolledup");
  }, []);

  const setWinClass = useCallback((ref, classname) => {
    if (ref.current) {
      const objClasses = ref.current.className.split(" ");
      const index = objClasses.indexOf(classname);
      if (index === -1) {
        objClasses.push(classname);
      } else {
        objClasses.splice(index, 1);
      }
      ref.current.className = objClasses.join(" ");
    }
  }, []);

  return (
    <div
      ref={ref}
      className="win"
      style={{ top: `${pos.y}px`, left: `${pos.x}px`, zIndex }}
      onMouseDown={startDrag}
    >
      <div className="wintitle">
        <div className="icon" style={iconStyle}></div>
        <div className="title">{title}</div>
        <div className="btn btnClose imgClose" onClick={onClose}></div>
        <div className="btn btnMin imgMin" onClick={onMinimize}></div>
        <div className="btn btnRollup imgRollup" onClick={onRollup}></div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Window;
