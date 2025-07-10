import  { useState } from 'react';
import Icon from '@mdi/react';
import { mdiDelete, mdiRename } from '@mdi/js'; // Переконайтеся, що mdiRename правильно імпортований
import { PagesResultProps } from '@grapesjs/react';
import { BTN_CLS, MAIN_BORDER_COLOR, cx } from './common';

export default function CustomPageManager({ pages, selected, add, select, remove }: PagesResultProps) {
  const [editingPageId, setEditingPageId] = useState(null);
  const [editingName, setEditingName] = useState(''); 
  const addNewPage = () => {
    const nextIndex = pages.length + 1; 
    add({
      name: `/new-page-${nextIndex}`,
      component: `<h1>Page content ${nextIndex}</h1><div>BLOCK</div>`, 
    });
  };

  const handleRemove = (page) => {
    remove(page);
  };

  const handleRename = (page) => {
    setEditingPageId(page.getId());
    setEditingName(page.getName()); 
  };

  const handleNameChange = (event) => {
    setEditingName(event.target.value);
  };

  const handleNameSubmit = (page) => { 
    page.setName(editingName);
   // console.log(`New name for page ${page.getId()}: ${editingName}`);
   // console.log(page);
    setEditingPageId(null); // Вийти з режиму редагування
  };
  const cancelNameSubmit = () => { 
    setEditingPageId(null); // Вийти з режиму редагування
  };
  
  return (
    <div className="gjs-custom-page-manager">
      <div className="p-2">
        <button type="button" className={BTN_CLS} onClick={addNewPage}>
          Add new page
        </button>
      </div>
      {pages.map((page, index) => (
        <div key={page.getId()} className={cx("flex items-center py-2 px-4 border-b", index === 0 && "border-t", MAIN_BORDER_COLOR)}>
          {editingPageId === page.getId() ? (
            <>
              <input className="text-black" type="text" value={editingName} onChange={handleNameChange} />
              <button className="py-2" type="button" onClick={() => handleNameSubmit(page)}>Save</button>
              <button className="py-2" type="button" onClick={() => cancelNameSubmit()}>X</button>
            </>
          ) : (
            <>
              <button type="button" className="flex-grow text-left" onClick={() => select(page)}>
                {page.getName() || "Untitled page"}
              </button>
              {selected !== page && (
                <>
                  <button type="button" onClick={() => handleRemove(page)}>
                    <Icon size={0.7} path={mdiDelete} />
                  </button>
                  <button type="button" onClick={() => handleRename(page)}>
                    <Icon size={0.7} path={mdiRename} />
                  </button>
                </>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
