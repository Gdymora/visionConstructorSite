const apiUrlTest = "https://jsonplaceholder.typicode.com";
const apiUrlGenerate = "https://generate.jdymora.com";
const generator = false;

const handleFetch = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error with fetch:", error);
    throw error;
  }
};

const createData = async (endpoint, data) => {
  const url = `${apiUrlTest}/${endpoint}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return handleFetch(url, options);
};

const readData = async (endpoint) => {
  const url = `${apiUrl}/${endpoint}`;
  return handleFetch(url);
};

const updateData = async (endpoint, data) => {
  const url = `${apiUrl}/${endpoint}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return handleFetch(url, options);
};

const deleteData = async (endpoint) => {
  const url = `${apiUrl}/${endpoint}`;
  const options = {
    method: "DELETE",
  };
  return handleFetch(url, options);
};

const changeColor = (elementId, color) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.color = color;
  }
};

const changeText = (elementId, newText) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerText = newText;
  }
};

const addClickListener = (elementId, callback) => {
  // addClickListener('', requireLocation('login'));
  const element = document.getElementById(elementId);
  if (element) {
    element.addEventListener("click", callback);
  }
};

const addSubmitListener = (elementId, callback) => {
  // addSubmitListener('', requireLocation('login'));
  const element = document.getElementById(elementId);
  if (element) {
    element.addEventListener("submit", callback);
  }
};

const fetchData = async (url) => {
  return handleFetch(url);
};

const setToken = (token) => {
  localStorage.setItem("authToken", token);
};

const getToken = () => {
  return localStorage.getItem("authToken");
};

const removeToken = () => {
  localStorage.removeItem("authToken");
};

// Перевіряє наявність токена і перенаправляє на сторінку входу, якщо токена немає
const requireLocation = (pathLocation) => {
  //requireLocation('login');
  try {
    if (generator) {
      let currentPath = window.location.pathname;
      let pathParts = currentPath.split("/");
      pathParts[pathParts.length - 1] = pathLocation;
      let newPath = pathParts.join("/");
      window.location.pathname = newPath;
    } else {
      console.log(pathLocation);
    }
  } catch (e) {
    console.error(e);
  }
};

window.myLibrary = {
  createData,
  readData,
  updateData,
  deleteData,
  changeColor,
  changeText,
  addClickListener,
  fetchData,
  setToken,
  getToken,
  removeToken,
  requireLocation,
  addSubmitListener
};
