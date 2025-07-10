import { useState, useRef, useEffect } from "react";

interface Settings {
  // string властивості
  text: string;
  
  // number властивості
  fontSize: number;
  proximityThreshold: number;
  effectIntensity: number;
  containerWidth: number;
  containerHeight: number;
  
  // boolean властивості
  blurEffect: boolean;
  glowEffect: boolean;
  waveEffect: boolean;
  colorEffect: boolean;
  pushEffect: boolean;
  animateAppearance: boolean;
  randomMovement: boolean;
  cyclicColor: boolean;
  wordWrap: boolean;
}

// Створимо тип для ключів, які є boolean
type BooleanSettings = {
  [K in keyof Settings]: Settings[K] extends boolean ? K : never
}[keyof Settings];

interface Point {
  x: number;
  y: number;
}

// Константи для налаштувань
const SETTINGS_KEY = "text-effect-settings";
const DEFAULT_SETTINGS: Settings = {
  text: "Hello Interactive Text",
  fontSize: 24,
  blurEffect: true,
  glowEffect: true,
  waveEffect: false,
  colorEffect: false,
  pushEffect: false,
  proximityThreshold: 60,
  effectIntensity: 1,
  animateAppearance: true,
  randomMovement: false,
  cyclicColor: false,
  wordWrap: true,
  containerWidth: 800,
  containerHeight: 200,
};

export default function TextEffectGenerator() {
  // Стани
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      return savedSettings ? { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const codeRef = useRef<HTMLPreElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Функція збереження налаштувань
  const saveSettings = (newSettings: Settings): void => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  // Функція скидання налаштувань
  const resetSettings = () => {
    saveSettings(DEFAULT_SETTINGS);
  };

  // Функція для вимірювання тексту
  const measureText = (text: string, fontSize: number): number => {
    try {
      const temp = document.createElement("span");
      temp.style.cssText = `
        position: absolute;
        visibility: hidden;
        font-size: ${fontSize}px;
        white-space: nowrap;
      `;
      temp.textContent = text;
      document.body.appendChild(temp);
      const width = temp.offsetWidth;
      document.body.removeChild(temp);
      return width;
    } catch (error) {
      console.error("Error measuring text:", error);
      return 0;
    }
  };

  // Функція для розрахунку позицій слів з переносом
  const calculateWordPositions = (words: string[], containerWidth: number, fontSize: number): { x: number; y: number }[] => {
    const positions: { x: number; y: number }[] = [];
    let currentX = 20;
    let currentY = fontSize;
    const lineHeight = fontSize * 1.5;
    const padding = 20;

    words.forEach((word) => {
      const wordWidth = measureText(word, fontSize);

      if (settings.wordWrap && currentX + wordWidth > containerWidth - padding) {
        currentX = 20;
        currentY += lineHeight;
      }

      positions.push({ x: currentX, y: currentY });
      currentX += wordWidth + 10;
    });

    return positions;
  };

  // Функція анімації появи тексту
  const animateTextAppearance = (word: SVGTextElement, index: number) => {
    word.style.opacity = "0";
    word.style.transform = "translateY(20px)";

    setTimeout(() => {
      word.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      word.style.opacity = "1";
      word.style.transform = "translateY(0)";
    }, index * 100);
  };

  // Функція для випадкових рухів
  const applyRandomMovement = (word: SVGTextElement) => {
    let offset = { x: 0, y: 0 };

    const animate = () => {
      if (!settings.randomMovement) return;

      offset.x += (Math.random() - 0.5) * settings.effectIntensity;
      offset.y += (Math.random() - 0.5) * settings.effectIntensity;

      // Обмеження руху
      const maxOffset = 10 * settings.effectIntensity;
      offset.x = Math.max(Math.min(offset.x, maxOffset), -maxOffset);
      offset.y = Math.max(Math.min(offset.y, maxOffset), -maxOffset);

      word.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
      requestAnimationFrame(animate);
    };

    animate();
  };

  // Функція для циклічної зміни кольору
  const applyCyclicColor = (word: SVGTextElement, index: number) => {
    const animate = () => {
      if (!settings.cyclicColor) return;

      const time = Date.now() / 1000;
      const hue = (time * 50 + index * 20) % 360;
      word.style.fill = `hsl(${hue}, 70%, 70%)`;

      requestAnimationFrame(animate);
    };

    animate();
  };

  // Функція створення SVG тексту
  const createSvgText = (container: HTMLDivElement, svg: SVGSVGElement) => {
    const words: string[] = settings.text.trim().split(/\s+/);
    const positions = calculateWordPositions(words, settings.containerWidth, settings.fontSize);

    words.forEach((word: string, index: number) => {
      const position = positions[index];
      const textElement: SVGTextElement = document.createElementNS("http://www.w3.org/2000/svg", "text");

      textElement.setAttribute("x", position.x.toString());
      textElement.setAttribute("y", position.y.toString());
      textElement.setAttribute("font-size", settings.fontSize.toString());
      textElement.setAttribute("class", "word");
      textElement.textContent = word;

      if (settings.blurEffect) {
        textElement.style.filter = "blur(2px)";
      }

      if (settings.animateAppearance) {
        animateTextAppearance(textElement, index);
      }

      if (settings.randomMovement) {
        applyRandomMovement(textElement);
      }

      if (settings.cyclicColor) {
        applyCyclicColor(textElement, index);
      }

      svg.appendChild(textElement);
    });
  };

  // Функція обробки руху миші
  const handleMouseMove = (e: MouseEvent, container: HTMLDivElement, svg: SVGSVGElement) => {
    const rect = container.getBoundingClientRect();
    const mousePos: Point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    Array.from(svg.getElementsByClassName("word")).forEach((word: Element) => {
      if (!(word instanceof SVGTextElement)) return;

      const wordRect = word.getBoundingClientRect();
      const wordCenter: Point = {
        x: wordRect.left - rect.left + wordRect.width / 2,
        y: wordRect.top - rect.top + wordRect.height / 2,
      };

      const distance = Math.hypot(mousePos.x - wordCenter.x, mousePos.y - wordCenter.y);
      const maxDistance = settings.proximityThreshold;

      if (distance < maxDistance) {
        const intensity = (1 - distance / maxDistance) * settings.effectIntensity;
        let transform = "";

        word.classList.add("active");

        if (settings.blurEffect) {
          word.style.filter = settings.glowEffect && intensity > 0.7 ? "url(#glow-preview)" : `blur(${(2 - intensity * 2) * settings.effectIntensity}px)`;
        }

        if (settings.waveEffect) {
          const time = Date.now() / 1000;
          const wave = Math.sin(time + wordCenter.x / 50) * 5 * settings.effectIntensity;
          transform += `translateY(${wave * intensity}px) `;
        }

        if (settings.colorEffect) {
          const hue = 200 + intensity * 60;
          const saturation = 70 + intensity * 20;
          word.style.fill = `hsl(${hue}, ${saturation}%, 70%)`;
        }

        if (settings.pushEffect) {
          const angle = Math.atan2(wordCenter.y - mousePos.y, wordCenter.x - mousePos.x);
          const push = 10 * intensity * settings.effectIntensity;
          const dx = Math.cos(angle) * push;
          const dy = Math.sin(angle) * push;
          transform += `translate(${dx}px, ${dy}px)`;
        }

        word.style.transform = transform;
      } else {
        word.classList.remove("active");
        word.style.filter = settings.blurEffect ? `blur(${2 * settings.effectIntensity}px)` : "none";
        word.style.transform = settings.randomMovement ? word.style.transform : "none";
        word.style.fill = settings.cyclicColor ? word.style.fill : "#aaa";
      }
    });
  };

  // Функція очищення анімацій
  const cleanupAnimations = (svg: SVGSVGElement) => {
    const words = svg.getElementsByClassName("word");
    Array.from(words).forEach((word) => {
      if (!(word instanceof SVGTextElement)) return;
      word.style.transform = "none";
      word.style.fill = "#aaa";
      word.style.filter = "none";
    });
  };
  // Ефект для preview
  useEffect(() => {
    if (activeTab === "preview" && previewRef.current) {
      const container = previewRef.current;
      container.innerHTML = "";

      // Створення SVG
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", settings.containerWidth.toString());
      svg.setAttribute("height", settings.containerHeight.toString());
      svg.style.maxWidth = "100%";
      svg.style.height = "auto";

      // Додавання фільтру для світіння
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      defs.innerHTML = `
        <filter id="glow-preview">
          <feGaussianBlur stdDeviation="${1 + settings.effectIntensity}" result="blur"/>
          <feFlood flood-color="#4444ff" flood-opacity="${0.3 * settings.effectIntensity}" result="color"/>
          <feComposite in="color" in2="blur" operator="in" result="shadow"/>
          <feMerge>
            <feMergeNode in="shadow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      `;
      svg.appendChild(defs);

      // Створення тексту
      createSvgText(container, svg);
      container.appendChild(svg);

      // Додавання обробника подій
      const mouseMoveHandler = (e: MouseEvent) => handleMouseMove(e, container, svg);
      container.addEventListener("mousemove", mouseMoveHandler);

      // Очищення
      return () => {
        cleanupAnimations(svg);
        container.removeEventListener("mousemove", mouseMoveHandler);
      };
    }
  }, [activeTab, settings]);

  // Генерація коду
  const generateCode = (): string => {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    .text-effect-container {
      position: relative;
      width: ${settings.containerWidth}px;
      height: ${settings.containerHeight}px;
      max-width: 100%;
      background: #1a1a1a;
      overflow: hidden;
      margin: 0 auto;
    }

    .word {
      transition: all 0.3s ease;
      fill: #aaa;
      dominant-baseline: hanging;
    }

    .word.active {
      fill: #fff;
    }
  </style>
</head>
<body>
  <div id="text-effect" class="text-effect-container"></div>

  <script>
  const settings = ${JSON.stringify(settings, null, 2)};
  const container = document.getElementById('text-effect');
  
  // Створення SVG
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute('width', settings.containerWidth);
  svg.setAttribute('height', settings.containerHeight);
  svg.style.maxWidth = '100%';
  svg.style.height = 'auto';
  
  // Додавання фільтру для світіння
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = \`
    <filter id="glow">
      <feGaussianBlur stdDeviation="\${1 + settings.effectIntensity}" result="blur"/>
      <feFlood flood-color="#4444ff" flood-opacity="\${0.3 * settings.effectIntensity}" result="color"/>
      <feComposite in="color" in2="blur" operator="in" result="shadow"/>
      <feMerge>
        <feMergeNode in="shadow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  \`;
  svg.appendChild(defs);

  function measureText(text, fontSize) {
    const temp = document.createElement('span');
    temp.style.cssText = \`
      position: absolute;
      visibility: hidden;
      font-size: \${fontSize}px;
      white-space: nowrap;
    \`;
    temp.textContent = text;
    document.body.appendChild(temp);
    const width = temp.offsetWidth;
    document.body.removeChild(temp);
    return width;
  }

  function calculateWordPositions(words, containerWidth, fontSize) {
    const positions = [];
    let currentX = 20;
    let currentY = fontSize;
    const lineHeight = fontSize * 1.5;
    const padding = 20;

    words.forEach((word) => {
      const wordWidth = measureText(word, fontSize);
      
      if (settings.wordWrap && currentX + wordWidth > containerWidth - padding) {
        currentX = 20;
        currentY += lineHeight;
      }

      positions.push({ x: currentX, y: currentY });
      currentX += wordWidth + 10;
    });

    return positions;
  }

  function applyRandomMovement(word) {
    let offset = { x: 0, y: 0 };
    
    function animate() {
      if (!settings.randomMovement) return;
      
      offset.x += (Math.random() - 0.5) * settings.effectIntensity;
      offset.y += (Math.random() - 0.5) * settings.effectIntensity;
      
      // Обмеження руху
      const maxOffset = 10 * settings.effectIntensity;
      offset.x = Math.max(Math.min(offset.x, maxOffset), -maxOffset);
      offset.y = Math.max(Math.min(offset.y, maxOffset), -maxOffset);
      
      word.style.transform = \`translate(\${offset.x}px, \${offset.y}px)\`;
      requestAnimationFrame(animate);
    }
    
    animate();
  }

  function applyCyclicColor(word, index) {
    function animate() {
      if (!settings.cyclicColor) return;
      
      const time = Date.now() / 1000;
      const hue = (time * 50 + index * 20) % 360;
      word.style.fill = \`hsl(\${hue}, 70%, 70%)\`;
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }

  function createText() {
    const words = settings.text.trim().split(/\\s+/);
    const positions = calculateWordPositions(words, settings.containerWidth, settings.fontSize);
    
    words.forEach((word, index) => {
      const position = positions[index];
      const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textElement.setAttribute('x', position.x);
      textElement.setAttribute('y', position.y);
      textElement.setAttribute('font-size', settings.fontSize);
      textElement.setAttribute('class', 'word');
      textElement.textContent = word;
      
      if (settings.blurEffect) {
        textElement.style.filter = \`blur(\${2 * settings.effectIntensity}px)\`;
      }
      
      if (settings.animateAppearance) {
        textElement.style.opacity = '0';
        textElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
          textElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          textElement.style.opacity = '1';
          textElement.style.transform = 'translateY(0)';
        }, index * 100);
      }
      
      if (settings.randomMovement) {
        applyRandomMovement(textElement);
      }
      
      if (settings.cyclicColor) {
        applyCyclicColor(textElement, index);
      }
      
      svg.appendChild(textElement);
    });
  }

  function handleMouseMove(e) {
    const rect = container.getBoundingClientRect();
    const mousePos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    Array.from(svg.getElementsByClassName('word')).forEach((word) => {
      const wordRect = word.getBoundingClientRect();
      const wordCenter = {
        x: wordRect.left - rect.left + wordRect.width / 2,
        y: wordRect.top - rect.top + wordRect.height / 2
      };
      
      const distance = Math.hypot(mousePos.x - wordCenter.x, mousePos.y - wordCenter.y);
      
      if (distance < settings.proximityThreshold) {
        const intensity = (1 - distance / settings.proximityThreshold) * settings.effectIntensity;
        let transform = '';
        
        word.classList.add('active');
        
        if (settings.blurEffect) {
          word.style.filter = settings.glowEffect && intensity > 0.7 
            ? 'url(#glow)'
            : \`blur(\${(2 - intensity * 2) * settings.effectIntensity}px)\`;
        }
        
        if (settings.waveEffect) {
          const time = Date.now() / 1000;
          const wave = Math.sin(time + wordCenter.x / 50) * 5 * settings.effectIntensity;
          transform += \`translateY(\${wave * intensity}px) \`;
        }
        
        if (settings.colorEffect) {
          const hue = 200 + intensity * 60;
          const saturation = 70 + intensity * 20;
          word.style.fill = \`hsl(\${hue}, \${saturation}%, 70%)\`;
        }
        
        if (settings.pushEffect) {
          const angle = Math.atan2(wordCenter.y - mousePos.y, wordCenter.x - mousePos.x);
          const push = 10 * intensity * settings.effectIntensity;
          const dx = Math.cos(angle) * push;
          const dy = Math.sin(angle) * push;
          transform += \`translate(\${dx}px, \${dy}px)\`;
        }
        
        word.style.transform = transform;
      } else {
        word.classList.remove('active');
        word.style.filter = settings.blurEffect ? \`blur(\${2 * settings.effectIntensity}px)\` : 'none';
        word.style.transform = settings.randomMovement ? word.style.transform : 'none';
        word.style.fill = settings.cyclicColor ? word.style.fill : '#aaa';
      }
    });
  }

  container.appendChild(svg);
  createText();
  container.addEventListener('mousemove', handleMouseMove);
</script>
</body>
</html>`;
  };

  // Копіювання коду
  const copyToClipboard = async () => {
    if (codeRef.current?.textContent) {
      try {
        await navigator.clipboard.writeText(codeRef.current.textContent);
        alert("Код скопійовано!");
      } catch (err) {
        console.error("Помилка копіювання:", err);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl text-white mb-6">Генератор інтерактивного тексту</h1>

        {/* Налаштування */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Базові налаштування */}
            <div className="space-y-4">
              <div>
                <label className="text-white block mb-2">Текст:</label>
                <input
                  type="text"
                  value={settings.text}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveSettings({ ...settings, text: e.target.value })}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Розмір шрифту: {settings.fontSize}px</label>
                <input
                  type="range"
                  min="12"
                  max="48"
                  value={settings.fontSize}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    saveSettings({
                      ...settings,
                      fontSize: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              {/* Нові налаштування розміру контейнера */}
              <div>
                <label className="text-white block mb-2">Ширина контейнера: {settings.containerWidth}px</label>
                <input
                  type="range"
                  min="300"
                  max="1200"
                  value={settings.containerWidth}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    saveSettings({
                      ...settings,
                      containerWidth: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Висота контейнера: {settings.containerHeight}px</label>
                <input
                  type="range"
                  min="100"
                  max="600"
                  value={settings.containerHeight}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    saveSettings({
                      ...settings,
                      containerHeight: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              {/* Налаштування радіусу дії та інтенсивності */}
              <div>
                <label className="text-white block mb-2">Радіус дії: {settings.proximityThreshold}px</label>
                <input
                  type="range"
                  min="20"
                  max="200"
                  value={settings.proximityThreshold}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    saveSettings({
                      ...settings,
                      proximityThreshold: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Інтенсивність ефектів: {settings.effectIntensity.toFixed(1)}</label>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={settings.effectIntensity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    saveSettings({
                      ...settings,
                      effectIntensity: parseFloat(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>
            </div>

            {/* Ефекти */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-white block mb-2">Ефекти:</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    ["wordWrap", "Перенос слів"],
                    ["blurEffect", "Розмиття"],
                    ["glowEffect", "Світіння"],
                    ["waveEffect", "Хвиля"],
                    ["colorEffect", "Зміна кольору"],
                    ["pushEffect", "Відштовхування"],
                    ["animateAppearance", "Анімація появи"],
                    ["randomMovement", "Випадковий рух"],
                    ["cyclicColor", "Зміна кольору за часом"],
                  ].map(([key, label]) => (
                    <label key={key} className="flex items-center text-white hover:bg-gray-700 p-2 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[key]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          saveSettings({
                            ...settings,
                            [key]: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Кнопка скидання */}
              <div className="mt-4">
                <button onClick={resetSettings} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                  Скинути налаштування
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Вкладки */}
        <div className="mb-4">
          <button
            className={`px-4 py-2 rounded-t-lg mr-2 transition-colors ${
              activeTab === "preview" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            Перегляд
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === "code" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("code")}
          >
            Код
          </button>
        </div>

        {/* Вміст вкладок */}
        {activeTab === "preview" ? (
          <div ref={previewRef} className="bg-gray-800 p-4 rounded-lg mb-6 min-h-[200px] relative" />
        ) : (
          <div className="relative">
            <pre ref={codeRef} className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-white text-sm">
              {generateCode()}
            </pre>
            <button onClick={copyToClipboard} className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Копіювати код
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
