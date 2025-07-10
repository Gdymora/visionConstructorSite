import { BlockProperties } from "grapesjs";
import { useEffect } from "react";

// Розширюємо інтерфейс BlockProperties для включення css
declare module "grapesjs" {
  interface BlockProperties {
    css?: string;
  }
}

interface Block {
  getId(): string;
  get<K extends keyof BlockProperties>(key: K): BlockProperties[K];
  getMedia(): string;
}

interface HtmlBlockManagerProps {
  mapCategoryBlocks: Map<string, Block[]>;
  dragStart: (block: Block, event: DragEvent) => void;
  dragStop: (value: boolean) => void;
  selectedCategory: string;
}

export default function HtmlBlockManager({
  mapCategoryBlocks,
  dragStart,
  dragStop,
  selectedCategory,
}: HtmlBlockManagerProps) {
  const filteredCategories = Array.from(mapCategoryBlocks).filter(
    ([category]) => category === selectedCategory
  );

  useEffect(() => {
    // Функція для ін'єкції CSS
    const injectCSS = (css: BlockProperties["css"], blockId: string) => {
      if (!css || typeof css !== "string") return;

      const styleId = `style-${blockId}`;
      let styleTag = document.getElementById(styleId);

      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }

      styleTag.textContent = css;
    };

    // Застосовуємо тільки CSS для кожного блоку
    filteredCategories.forEach(([_, blocks]) => {
      blocks.forEach((block) => {
        try {
          const blockId = block.getId();
          const css = block.get("css");
          injectCSS(css, blockId);
        } catch (error) {
          console.error("Error processing block CSS:", error);
        }
      });
    });

    // Cleanup функція
    return () => {
      filteredCategories.forEach(([_, blocks]) => {
        blocks.forEach((block) => {
          try {
            const blockId = block.getId();
            const styleTag = document.getElementById(`style-${blockId}`);
            if (styleTag) styleTag.remove();
          } catch (error) {
            console.error("Error in cleanup:", error);
          }
        });
      });
    };
  }, [filteredCategories]);

  // Функція для очищення HTML від script тегів
  const sanitizeHtml = (content: BlockProperties["content"]): string => {
    if (!content) return "";
    const htmlContent = typeof content === "string" ? content : "";
    return htmlContent.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );
  };

  // Функція для отримання label
  const getLabel = (block: Block): string => {
    const label = block.get("label");
    return typeof label === "string" ? label : "";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 p-4 relative">
      {filteredCategories.flatMap(([_, blocks]) =>
        blocks.map((block) => (
          <div
            key={block.getId()}
            draggable
            className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-move bg-white"
            onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
            onDragEnd={() => dragStop(false)}
          >
            <div
              className="preview-container min-h-[200px] w-full overflow-hidden z-30"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(block.get("content")),
              }}
            />
            {getLabel(block) && (
              <div className="mt-2 text-sm text-gray-600">
                {getLabel(block)}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
