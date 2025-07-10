import { useState } from "react";

const Cookies = () => {
  const [display, sertDisplay] = useState(true);

  const Display = () => {
    sertDisplay(false);
  };
  return (
    <>
      {display && (
        <div className="card cookie-popup shadow rounded py-3 px-4">
          <p className="text-muted mb-0">
            This website uses cookies to provide you with a great user experience. By using it, you can
            <a href="javascript:void(0)" className="text-success h6">
              accept
            </a>{" "}
            or close it.
          </p>

          <div className="cookie-popup-actions text-end">
            <button onClick={Display}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cookies;
