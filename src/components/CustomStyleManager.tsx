import { StylesResultProps } from '@grapesjs/react';
import { mdiMenuDown } from '@mdi/js';
import Icon from '@mdi/react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { MAIN_BG_COLOR } from './common';
import StylePropertyField from './StylePropertyField';

const accordionIcon = <Icon path={mdiMenuDown} size={0.7} />;

export default function CustomStyleManager({
  sectors,
}: Omit<StylesResultProps, 'Container'>) {
  const themeColor = ["bg-slate-300", "bg-slate-800"];
  return (
    <div className="gjs-custom-style-manager text-left">
      {sectors.map((sector) => (
        <Accordion key={sector.getId()} disableGutters>
          <AccordionSummary
            className={`!${themeColor}`}
            expandIcon={accordionIcon}
          >
            {sector.getName()}
          </AccordionSummary>
          <AccordionDetails className={`${MAIN_BG_COLOR} flex flex-wrap`}>
            {sector.getProperties().map((prop) => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
