// components/ConfigPanel/ConfigPanel.tsx
import React from "react";
import { ConfigPanelProps } from "../../types";
import { Panel, Section, Label, RangeInput, Select, ColorInput, ValueSpan, AnimateButton } from "./styles";

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ styles, onStylesChange, onAnimateClick }) => {
  const handleInputChange = (key: keyof typeof styles, value: any) => {
    onStylesChange({
      ...styles,
      [key]: value,
    });
  };

  const updateGradientColorInputs = (count: number) => {
    handleInputChange("gradientColorCount", count);
  };

  return (
    <Panel>
      <AnimateButton onClick={onAnimateClick}>Анімувати</AnimateButton>
      <Section>
        <h4>Налаштування анімації</h4>
        <Label>
          Тривалість анімації (с):
          <RangeInput
            type="range"
            min={0.1}
            max={3}
            step={0.1}
            value={styles.duration}
            onChange={(e) => handleInputChange("duration", Number(e.target.value))}
          />
          <ValueSpan>{styles.duration}</ValueSpan>
        </Label>

        <Label>
          Відстань розходження Початкова (px):
          <RangeInput
            type="range"
            min={0}
            max={400}
            value={styles.initialSpacing}
            onChange={(e) => handleInputChange("initialSpacing", Number(e.target.value))}
          />
          <ValueSpan>{styles.initialSpacing}</ValueSpan>
        </Label>

        <Label>
          Відстань розходження анімована (px):
          <RangeInput
            type="range"
            min={0}
            max={500}
            step={10}
            value={styles.distance}
            onChange={(e) => handleInputChange("distance", Number(e.target.value))}
          />
          <ValueSpan>{styles.distance}</ValueSpan>
        </Label>

        <Label>
          Початковий поворот (град):
          <RangeInput
            type="range"
            min={-180}
            max={180}
            step={5}
            value={styles.rotation}
            onChange={(e) => handleInputChange("rotation", Number(e.target.value))}
          />
          <ValueSpan>{styles.rotation}</ValueSpan>
        </Label>

        <Label>
          Масштаб при наведенні:
          <RangeInput type="range" min={1} max={2} step={0.1} value={styles.scale} onChange={(e) => handleInputChange("scale", Number(e.target.value))} />
          <ValueSpan>{styles.scale}</ValueSpan>
        </Label>

        <Label>
          Тінь (px):
          <RangeInput type="range" min={0} max={50} step={1} value={styles.shadow} onChange={(e) => handleInputChange("shadow", Number(e.target.value))} />
          <ValueSpan>{styles.shadow}</ValueSpan>
        </Label>

        <Label>
          Функція переходу:
          <Select value={styles.timingFunction} onChange={(e) => handleInputChange("timingFunction", e.target.value)}>
            <option value="ease-out">ease-out</option>
            <option value="ease-in">ease-in</option>
            <option value="ease-in-out">ease-in-out</option>
            <option value="linear">linear</option>
            <option value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">bounce</option>
          </Select>
        </Label>
        {/* Анімація появи */}
        <Label>
          <input type="checkbox" checked={styles.fadeInAnimation} onChange={(e) => handleInputChange("fadeInAnimation", e.target.checked)} />
          Анімація появи
        </Label>

        {styles.fadeInAnimation && (
          <Label>
            Тривалість появи (с):
            <RangeInput
              type="range"
              min={0.1}
              max={2}
              step={0.1}
              value={styles.fadeInDuration}
              onChange={(e) => handleInputChange("fadeInDuration", Number(e.target.value))}
            />
            <ValueSpan>{styles.fadeInDuration}</ValueSpan>
          </Label>
        )}

        {/* Анімація ховера */}
        <Label>
          <input type="checkbox" checked={styles.hoverAnimation} onChange={(e) => handleInputChange("hoverAnimation", e.target.checked)} />
          Анімація при наведенні
        </Label>

        {styles.hoverAnimation && (
          <>
            <Label>
              Тривалість анімації ховера (с):
              <RangeInput
                type="range"
                min={0.1}
                max={2}
                step={0.1}
                value={styles.hoverDuration}
                onChange={(e) => handleInputChange("hoverDuration", Number(e.target.value))}
              />
              <ValueSpan>{styles.hoverDuration}</ValueSpan>
            </Label>

            <Label>
              Тип анімації:
              <Select value={styles.hoverTransform} onChange={(e) => handleInputChange("hoverTransform", e.target.value)}>
                <option value="scale">Масштабування</option>
                <option value="translateY">Підняття</option>
                <option value="both">Обидва ефекти</option>
              </Select>
            </Label>

            {(styles.hoverTransform === "scale" || styles.hoverTransform === "both") && (
              <Label>
                Масштаб при наведенні:
                <RangeInput
                  type="range"
                  min={1}
                  max={1.2}
                  step={0.01}
                  value={styles.hoverScale}
                  onChange={(e) => handleInputChange("hoverScale", Number(e.target.value))}
                />
                <ValueSpan>{styles.hoverScale}</ValueSpan>
              </Label>
            )}

            {(styles.hoverTransform === "translateY" || styles.hoverTransform === "both") && (
              <Label>
                Зміщення вгору (px):
                <RangeInput
                  type="range"
                  min={-20}
                  max={0}
                  step={1}
                  value={styles.hoverTranslateY}
                  onChange={(e) => handleInputChange("hoverTranslateY", Number(e.target.value))}
                />
                <ValueSpan>{styles.hoverTranslateY}</ValueSpan>
              </Label>
            )}
          </>
        )}
      </Section>

      <Section>
        <h5>Налаштування бордера</h5>

        {/* Звичайний бордер */}
        <Label>
          Товщина бордера (px):
          <RangeInput
            type="range"
            min={0}
            max={10}
            step={1}
            value={styles.borderWidth}
            onChange={(e) => handleInputChange("borderWidth", Number(e.target.value))}
          />
          <ValueSpan>{styles.borderWidth}</ValueSpan>
        </Label>

        <Label>
          Стиль бордера:
          <Select value={styles.borderStyle} onChange={(e) => handleInputChange("borderStyle", e.target.value)}>
            <option value="solid">Суцільний</option>
            <option value="dashed">Пунктирний</option>
            <option value="dotted">Точковий</option>
            <option value="double">Подвійний</option>
          </Select>
        </Label>

        <Label>
          Колір бордера:
          <ColorInput type="color" value={styles.borderColor} onChange={(e) => handleInputChange("borderColor", e.target.value)} />
        </Label>

        {/* Градієнтний бордер */}
        <Label>
          <input type="checkbox" checked={styles.borderGradient} onChange={(e) => handleInputChange("borderGradient", e.target.checked)} />
          Градієнтний бордер
        </Label>

        {styles.borderGradient && (
          <>
            <Label>
              Напрямок градієнта бордера (град):
              <RangeInput
                type="range"
                min={0}
                max={360}
                step={15}
                value={styles.borderGradientDirection}
                onChange={(e) => handleInputChange("borderGradientDirection", Number(e.target.value))}
              />
              <ValueSpan>{styles.borderGradientDirection}</ValueSpan>
            </Label>

            <Label>
              Кількість кольорів бордера:
              <Select value={styles.borderGradientColorCount} onChange={(e) => handleInputChange("borderGradientColorCount", Number(e.target.value))}>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Select>
            </Label>

            {Array.from({ length: styles.borderGradientColorCount }).map((_, index) => (
              <Label key={`border-gradient-${index}`}>
                Колір бордера {index + 1}:
                <ColorInput
                  type="color"
                  value={styles.borderGradientColors[index]}
                  onChange={(e) => {
                    const newColors = [...styles.borderGradientColors];
                    newColors[index] = e.target.value;
                    handleInputChange("borderGradientColors", newColors);
                  }}
                />
              </Label>
            ))}

            <Label>
              <input type="checkbox" checked={styles.borderGradientRepeat} onChange={(e) => handleInputChange("borderGradientRepeat", e.target.checked)} />
              Анімація градієнта бордера
            </Label>

            {styles.borderGradientRepeat && (
              <Label>
                Швидкість анімації бордера (с):
                <RangeInput
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={styles.borderGradientSpeed}
                  onChange={(e) => handleInputChange("borderGradientSpeed", Number(e.target.value))}
                />
                <ValueSpan>{styles.borderGradientSpeed}</ValueSpan>
              </Label>
            )}
          </>
        )}
      </Section>
      <Section>
        <h5>Налаштування градієнта</h5>
        <Label>
          <input type="checkbox" checked={styles.gradientAnimation} onChange={(e) => handleInputChange("gradientAnimation", e.target.checked)} />
          Градієнтна анімація
        </Label>

        <Label>
          Швидкість градієнтної анімації (с):
          <RangeInput
            type="range"
            min={1}
            max={20}
            step={1}
            value={styles.gradientSpeed}
            onChange={(e) => handleInputChange("gradientSpeed", Number(e.target.value))}
          />
          <ValueSpan>{styles.gradientSpeed}</ValueSpan>
        </Label>

        <Label>
          Напрямок градієнта (град):
          <RangeInput
            type="range"
            min={0}
            max={360}
            step={15}
            value={styles.gradientDirection}
            onChange={(e) => handleInputChange("gradientDirection", Number(e.target.value))}
          />
          <ValueSpan>{styles.gradientDirection}</ValueSpan>
        </Label>

        <Label>
          Кількість кольорів:
          <Select value={styles.gradientColorCount} onChange={(e) => updateGradientColorInputs(Number(e.target.value))}>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Select>
        </Label>

        <div>
          {Array.from({ length: styles.gradientColorCount }).map((_, index) => (
            <Label key={index}>
              Колір градієнта {index + 1}:
              <ColorInput
                type="color"
                value={styles.gradientColors[index]}
                onChange={(e) => {
                  const newColors = [...styles.gradientColors];
                  newColors[index] = e.target.value;
                  handleInputChange("gradientColors", newColors);
                }}
              />
            </Label>
          ))}
        </div>

        <Label>
          <input type="checkbox" checked={styles.gradientRepeat} onChange={(e) => handleInputChange("gradientRepeat", e.target.checked)} />
          Повторення градієнта
        </Label>
      </Section>

      <AnimateButton onClick={onAnimateClick}>Анімувати</AnimateButton>
    </Panel>
  );
};
