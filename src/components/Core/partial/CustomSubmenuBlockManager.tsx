import { BlocksResultProps } from "@grapesjs/react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { MAIN_BG_COLOR, MAIN_BORDER_COLOR, cx } from "../../common";

export type CustomSubmenuBlockManagerProps = Pick<BlocksResultProps, "mapCategoryBlocks" | "dragStart" | "dragStop">;

export default function CustomSubmenuBlockManager({ mapCategoryBlocks, dragStart, dragStop }: CustomSubmenuBlockManagerProps) {
  return (
    <div className="gjs-block-categories text-left">
      {Array.from(mapCategoryBlocks).map(([category, blocks]) => (
        <Accordion key={category} disableGutters>
          <AccordionSummary className="!bg-slate-300">
            {category} {/* Назва категорії як заголовок акордеону */}
          </AccordionSummary>
          <AccordionDetails className={`${MAIN_BG_COLOR} flex flex-wrap`}>
            <div className="grid grid-cols-2 gap-2 p-2">
              {blocks.map((block) => (
                <div
                  key={block.getId()}
                  draggable
                  className={cx(
                    "flex flex-col items-center border rounded cursor-pointer py-2 px-5 transition-colors gjs-block gjs-four-color-h",
                    MAIN_BORDER_COLOR
                  )}
                  onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
                  onDragEnd={() => dragStop(false)}
                >
                  <div className={block.getLabel() ? "h-10 w-10" : "h-20 w-20"} dangerouslySetInnerHTML={{ __html: block.getMedia()! }} />
                  <div className="gjs-block-label">{block.getLabel()}</div>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
