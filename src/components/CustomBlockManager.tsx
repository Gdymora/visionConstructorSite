import { BlocksResultProps } from "@grapesjs/react";
import { MAIN_BG_COLOR, MAIN_BORDER_COLOR, cx } from "./common";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export type CustomBlockManagerProps = Pick<BlocksResultProps, "mapCategoryBlocks" | "dragStart" | "dragStop">;

export default function CustomBlockManager({ mapCategoryBlocks, dragStart, dragStop }: CustomBlockManagerProps) {
  const themeColor = ["bg-slate-300", "bg-slate-800"];
  return (
    <div className="gjs-block-categories text-left">
      {Array.from(mapCategoryBlocks).map(([category, blocks]) => (
        <Accordion key={category} disableGutters>
          <AccordionSummary
            className={`!${themeColor}`}
          >
            {category} {/* Назва категорії як заголовок акордеону */}
          </AccordionSummary>
          <AccordionDetails className={`${MAIN_BG_COLOR} flex flex-wrap`}>
            <div className="grid grid-cols-2 gap-2 p-2">
              {blocks.map((block) => (
                <div
                  key={block.getId()}
                  draggable
                  className={cx("flex flex-col items-center border rounded cursor-pointer py-2 px-5 transition-colors", MAIN_BORDER_COLOR)}
                  onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
                  onDragEnd={() => dragStop(false)}
                >
                  <div
                    className="h-10 w-10"
                    style={{ width: "2.5rem", height: "2.5rem", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}
                    dangerouslySetInnerHTML={{ __html: block.getMedia()! }}
                  />
                  <div className="text-sm text-center w-full" title={block.getLabel()}>
                    {block.getLabel()}
                  </div>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
