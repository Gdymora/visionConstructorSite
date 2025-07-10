import {  useEffect, useState } from "react";
import Window from "./Window";

const WinManager = ({ children, addWindow }) => {
  const [windows, setWindows] = useState([]);

  // Функція для закриття вікна за його id
  const closeWindow = (id) => {
      setWindows(prevWindows => prevWindows.filter(window => window.id !== id));
  };

  // Функція для додавання нового вікна
  const addNewWindow = (config) => {
      // Перевірка, чи вже існує вікно з таким id
      if (!windows.some(window => window.id === config.id)) {
          // Якщо вікно відсутнє, додаємо його до стану
          setWindows(prevWindows => [...prevWindows, config]);
      }
  };

  // Викликаємо функцію додавання вікон при зміні addWindow
  useEffect(() => {
      addWindow.forEach(config => {
          addNewWindow(config);
      });
  }, [addWindow, addNewWindow]);

  return (
      <div>
          {windows.map((window) => (
              <Window
                  key={window.id}
                  id={window.id}
                  title={window.title}
                  initialPos={window.pos}
                  onClose={() => closeWindow(window.id)}
              >
                  {window.content}
                  {children}
              </Window>
          ))}
      </div>
  );
};

export default WinManager;
