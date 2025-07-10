import { StylesResultProps } from "@grapesjs/react";
import ConditionalStylePropertyField from "./ConditionalStylePropertyField";

export default function ConditionStyleManager({ sectors }: Omit<StylesResultProps, "Container">) {
  return (
    <div className="gjs-custom-style-manager text-left">
      {sectors.map((sector) => (
        <> 
          {sector.getProperties().map((prop) => (
            <ConditionalStylePropertyField key={prop.getId()} prop={prop} classNameToCheck={"header"} />
          ))}
        </>
      ))}
    </div>
  );
}
