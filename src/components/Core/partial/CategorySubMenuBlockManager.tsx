import { BlocksResultProps } from '@grapesjs/react';

export type CategorySubmenuBlockManagerProps = Pick<BlocksResultProps, 'mapCategoryBlocks' | 'dragStart' | 'dragStop'> & {
    selectedCategory: string;
};

export default function CategorySubmenuBlockManager({
    mapCategoryBlocks,
    dragStart,
    dragStop,
    selectedCategory,
}: CategorySubmenuBlockManagerProps) {
    const filteredCategories = Array.from(mapCategoryBlocks).filter(([category]) => category === selectedCategory);
    return (
       <div className="carus">
      {filteredCategories.flatMap(([category, blocks]) => (
        blocks.map((block) => (
          <div
            key={block.getId()}
            draggable
            className="carus__col"
            onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
            onDragEnd={() => dragStop(false)}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
              dangerouslySetInnerHTML={{ __html: block.getMedia()! }}
            />
          </div>
        ))
      ))}
    </div>
    );
}
