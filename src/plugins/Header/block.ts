import { source as st1 } from "./data/head-1";
import { source as st2 } from "./data/head-2";
import { source as st3 } from "./data/head-3";
import { source as st4 } from "./data/head-4";
import { source as st5 } from "./data/head-5";
import { source as st6 } from "./data/head-6";
import { source as st7 } from "./data/head-7";
import { source as st8 } from "./data/head-8";
import { source as st9 } from "./data/head-9";
import { source as st10 } from "./data/head-10";
import { source as st11 } from "./data/head-11";
import { source as st12 } from "./data/head-12";
import { source as st13 } from "./data/head-13";
import { source as st14 } from "./data/head-14";
import { source as a1s } from "./data/icons/cta-1";

const getSvgHtml = (svg) => {
  if (typeof window === "undefined") return "";
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  return svg.outerHTML;
};

const sources = [
  {
    id: "header-1",
    class: "",
    label: a1s,
    content: st1,
    сss: `    
    @media (max-width: 1024px) {
      .hidden-mobile {
        display: none;
      }
    }
    .dropdown-menu {
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
    }
      .dropdown-menu.show {
       opacity: 1;
    }`,
    category: "Header",
    script: `console.log(God like)`,
  },
  {
    id: "header-2",
    class: "",
    label: a1s,
    content: st2,
    category: "Header",
  },
  {
    id: "header-3",
    class: "",
    label: a1s,
    content: st3,
    category: "Header",
  },
  {
    id: "header-4",
    class: "",
    label: a1s,
    content: st4,
    category: "Header",
  },
  {
    id: "header-5",
    class: "",
    label: a1s,
    content: st5,
    category: "Header",
  },
  {
    id: "header-6",
    class: "",
    label: a1s,
    content: st6,
    category: "Header",
  },
  {
    id: "header-7",
    class: "",
    label: a1s,
    content: st7,
    category: "Header",
  },
  {
    id: "header-8",
    class: "",
    label: a1s,
    content: st8,
    category: "Header",
  },
  {
    id: "header-9",
    class: "",
    label: a1s,
    content: st9,
    category: "Header",
  },
  {
    id: "header-10",
    class: "",
    label: a1s,
    content: st10,
    category: "Header",
  },
  {
    id: "header-11",
    class: "",
    label: a1s,
    content: st11,
    category: "Header",
  },
  {
    id: "header-12",
    class: "",
    label: a1s,
    content: st12,
    category: "Header",
  },
  {
    id: "header-13",
    class: "",
    label: a1s,
    content: st13,
    css: `.grid-background {
            background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
            pointer-events: none;
          }`,
    script: `console.log(God like)`,
    category: "Header",
  },
  {
    id: "header-14",
    class: "",
    label: a1s,
    content: st14,
    category: "Header",
  },
];

export default (editor, options: any = {}) => {
  const bm = editor.Blocks;

  sources.forEach((s) => {
    console.log("Adding block:", s.id, s.script);

    bm.add(s.id, {
      media: getSvgHtml(editor.$(s.label).get(0)),
      attributes: { class: `${s.class}` },
      content: s.content,
      css: s.css,
      category: {
        label: s.category,
        open: s.category === options.openCategory,
      },
    });
  });
  editor.on("block:drag:stop", function (model) {
    if (!model || !model.components) return;

    const innerComponents = model.components();

    innerComponents.forEach((comp) => {
      if (comp.get("type") === "script") {
        const scriptContent = comp
          .toHTML()
          .replace(/<\/?script>/g, "")
          .trim();
        // Безпечно додаємо до wrapper
        try {
          const wrapper = editor.DomComponents.getWrapper();
          if (wrapper) {
            const currentScript = wrapper.get("script") || "";
            wrapper.set(
              "script",
              currentScript
                ? `${currentScript}\n${scriptContent}`
                : scriptContent,
              { silent: true }
            );
            // model.set("script", scriptContent); // Додаємо до моделі, а не до wrapper
            console.log("Скрипт додано до wrapper:", scriptContent);
          }
        } catch (error) {
          console.error("Помилка при додаванні скрипта:", error);
        }
        comp.remove();
      }
    });
  });
};
