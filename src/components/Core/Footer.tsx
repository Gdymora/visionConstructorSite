const Footer = () => {
  return (
    <div className="footer bg-gray-800 text-white p-1 dark:bg-gray-700 transition-colors duration-300 flex-shrink-0">
      <div className="flex justify-around items-center">
        <button className="bg-gray-700 px-2 py-1 text-xs rounded dark:bg-gray-600 transition-colors duration-300 hover:bg-gray-600">
          📊 Status
        </button>
        <button className="bg-gray-700 px-2 py-1 text-xs rounded dark:bg-gray-600 transition-colors duration-300 hover:bg-gray-600">
          ⚡ Performance
        </button>
        <button className="bg-gray-700 px-2 py-1 text-xs rounded dark:bg-gray-600 transition-colors duration-300 hover:bg-gray-600">
          💾 Auto-save: ON
        </button>
        <div className="text-xs text-gray-400">
          Ready
        </div>
      </div>
    </div>
  );
};

export default Footer;