import { useState } from "react";
import { Tab } from "@headlessui/react";
import { BlocksProvider } from "@grapesjs/react";
import HtmlBlockManager from "./HtmlBlockManager";

const BlockCategoriesManager = ({ categories = [] }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedTab(1);
  };

  return (
    <div className="h-full flex flex-col">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 border-b">
          <Tab
            className={({ selected }) =>
              `px-4 py-2 text-sm font-medium border-b-2 ${
                selected
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500"
              }`
            }
          >
            Categories
          </Tab>
          {selectedCategory && (
            <Tab
              className={({ selected }) =>
                `px-4 py-2 text-sm font-medium border-b-2 ${
                  selected
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500"
                }`
              }
            >
              {selectedCategory} Blocks
            </Tab>
          )}
        </Tab.List>

        <Tab.Panels className="flex-1 overflow-y-auto">
          <Tab.Panel>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors"
                >
                  <h3 className="font-medium text-gray-900">{category}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    View {category.toLowerCase()} blocks
                  </p>
                </button>
              ))}
            </div>
          </Tab.Panel>

          <Tab.Panel>
            {selectedCategory && (
              <BlocksProvider>
                {(props) => (
                  <HtmlBlockManager
                    {...props}
                    selectedCategory={selectedCategory}
                  />
                )}
              </BlocksProvider>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default BlockCategoriesManager;
