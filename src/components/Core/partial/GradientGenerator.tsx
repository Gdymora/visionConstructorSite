import { useState, useEffect, useCallback } from "react";

const GradientGenerator = () => {
  const gradientStyle = {
    transition: "background 0.3s ease",
  };

  const [state, setState] = useState({
    backgroundColor1: "#ffffff",
    backgroundColor2: "#000000",
    backgroundGradientType: "radial",
    backgroundGradientAngle: 90,
    leftColor: "#00ff00",
    rightColor: "#0000ff",
    leftRadius: 0,
    rightRadius: 60,
    leftPositionX: 0,
    rightPositionX: 15,
    leftPositionY: 0,
    rightPositionY: 20,
    leftOpacity: 10,
    rightOpacity: 30,
    gradientType: "radial",
  });

  const updateState = (key, value) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const generateGradient = useCallback(() => {
    const {
      gradientType,
      backgroundGradientAngle,
      leftColor,
      rightColor,
      leftRadius,
      rightRadius,
      leftPositionX,
      rightPositionX,
      leftPositionY,
      rightPositionY,
      leftOpacity,
      rightOpacity,
      backgroundColor1,
      backgroundColor2,
      backgroundGradientType,
    } = state;

    const leftColorWithOpacity = `${leftColor}${Math.round(leftOpacity * 2.55)
      .toString(16)
      .padStart(2, "0")}`;
    const rightColorWithOpacity = `${rightColor}${Math.round(rightOpacity * 2.55)
      .toString(16)
      .padStart(2, "0")}`;

    let spotGradients = "";
    if (gradientType === "radial") {
      spotGradients = `
        radial-gradient(circle at ${leftPositionX}% ${leftPositionY}%, ${leftColorWithOpacity} 0%, rgba(4, 26, 4, 0) ${leftRadius}%),
        radial-gradient(circle at ${rightPositionX}% ${rightPositionY}%, ${rightColorWithOpacity} 0%, rgba(4, 26, 4, 0) ${rightRadius}%)
      `;
    } else if (gradientType === "linear") {
      spotGradients = `
        linear-gradient(${leftPositionY}deg, ${leftColorWithOpacity} ${leftPositionX}%, rgba(4, 26, 4, 0) ${leftRadius}%),
        linear-gradient(${rightPositionY}deg, ${rightColorWithOpacity} ${rightPositionX}%, rgba(4, 26, 4, 0) ${rightRadius}%)
      `;
    } else if (gradientType === "conic") {
      spotGradients = `
        conic-gradient(from ${leftPositionY}deg at ${leftPositionX}% 50%, ${leftColorWithOpacity} 0deg, rgba(4, 26, 4, 0) ${leftRadius}deg),
        conic-gradient(from ${rightPositionY}deg at ${rightPositionX}% 50%, ${rightColorWithOpacity} 0deg, rgba(4, 26, 4, 0) ${rightRadius}deg)
      `;
    }

    let bgGradient = "";
    if (backgroundGradientType === "linear") {
      bgGradient = `linear-gradient(${backgroundGradientAngle}deg, ${backgroundColor1}, ${backgroundColor2})`;
    } else {
      bgGradient = `radial-gradient(circle, ${backgroundColor1}, ${backgroundColor2})`;
    }

    return `${spotGradients}, ${bgGradient}`.replace(/\s+/g, " ").trim();
  }, [state]);

  const htmlCode = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Generated Gradient</title>
      <style>
          body, html {
              height: 100%;
              margin: 0;
              padding: 0;
          }
          .gradient-bg {
              width: 100%;
              height: 100%;
              background: ${generateGradient()};
          }
      </style>
  </head>
  <body>
      <div class="gradient-bg"></div>
  </body>
  </html>
    `.trim();

  const randomizeGradient = () => {
    const randomColor = () =>
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
    const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const gradientTypes = ["linear", "radial", "conic"];

    setState({
      backgroundColor1: randomColor(),
      backgroundColor2: randomColor(),
      backgroundGradientType: gradientTypes[randomNumber(0, 2)],
      backgroundGradientAngle: randomNumber(0, 360),
      leftColor: randomColor(),
      rightColor: randomColor(),
      leftRadius: randomNumber(0, 100),
      rightRadius: randomNumber(0, 100),
      leftPositionX: randomNumber(0, 100),
      rightPositionX: randomNumber(0, 100),
      leftPositionY: randomNumber(0, 360),
      rightPositionY: randomNumber(0, 360),
      leftOpacity: randomNumber(0, 100),
      rightOpacity: randomNumber(0, 100),
      gradientType: gradientTypes[randomNumber(0, 2)],
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Скопійовано до буфера обміну!");
      },
      (err) => {
        console.error("Не вдалося скопіювати текст: ", err);
      }
    );
  };

  useEffect(() => {
    const gradientContainer = document.getElementById("gradientContainer");
    if (gradientContainer) {
      gradientContainer.style.background = generateGradient();
    }
    document.body.style.background = generateGradient();
  }, [generateGradient]);

  return (
    <div className="p-4 bg-gray-800 overflow-auto text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div id="gradientContainer" className="gradient-bg flex-grow md:col-span-3" style={{ ...gradientStyle, height: "200px" }}></div>
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Background Color 1:</label>
            <input
              className="w-full"
              type="color"
              id="bgColor1"
              value={state.backgroundColor1}
              onChange={(e) => updateState("backgroundColor1", e.target.value)}
            />
          </div>
          <div>
            <label>Background Color 2:</label>
            <input
              className="w-full"
              type="color"
              id="bgColor2"
              value={state.backgroundColor2}
              onChange={(e) => updateState("backgroundColor2", e.target.value)}
            />
          </div>
          <div>
            <label>Background Gradient Type:</label>
            <select
              id="bgGradientType"
              className="w-full bg-gray-700 text-white"
              value={state.backgroundGradientType}
              onChange={(e) => updateState("backgroundGradientType", e.target.value)}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
          </div>
          <div>
            <label>Background Gradient Angle (deg):</label>
            <input
              className="w-full"
              type="range"
              id="bgGradientAngle"
              min="0"
              max="360"
              value={state.backgroundGradientAngle}
              onChange={(e) => updateState("backgroundGradientAngle", Number(e.target.value))}
            />
            <span>{state.backgroundGradientAngle}°</span>
          </div>
          <div>
            <label>Left Color:</label>
            <input className="w-full" type="color" id="leftColor" value={state.leftColor} onChange={(e) => updateState("leftColor", e.target.value)} />
          </div>
          <div>
            <label>Right Color:</label>
            <input className="w-full" type="color" id="rightColor" value={state.rightColor} onChange={(e) => updateState("rightColor", e.target.value)} />
          </div>
          <div>
            <label>Left Radius (%):</label>
            <input
              className="w-full"
              type="range"
              id="leftRadius"
              min="0"
              max="100"
              value={state.leftRadius}
              onChange={(e) => updateState("leftRadius", Number(e.target.value))}
            />
            <span>{state.leftRadius}%</span>
          </div>
          <div>
            <label>Right Radius (%):</label>
            <input
              className="w-full"
              type="range"
              id="rightRadius"
              min="0"
              max="100"
              value={state.rightRadius}
              onChange={(e) => updateState("rightRadius", Number(e.target.value))}
            />
            <span>{state.rightRadius}%</span>
          </div>
          <div>
            <label>Left Position X (%):</label>
            <input
              className="w-full"
              type="range"
              id="leftPositionX"
              min="0"
              max="100"
              value={state.leftPositionX}
              onChange={(e) => updateState("leftPositionX", Number(e.target.value))}
            />
            <span>{state.leftPositionX}%</span>
          </div>
          <div>
            <label>Right Position X (%):</label>
            <input
              className="w-full"
              type="range"
              id="rightPositionX"
              min="0"
              max="100"
              value={state.rightPositionX}
              onChange={(e) => updateState("rightPositionX", Number(e.target.value))}
            />
            <span>{state.rightPositionX}%</span>
          </div>
          <div>
            <label>Left Position Y (deg):</label>
            <input
              className="w-full"
              type="range"
              id="leftPositionY"
              min="0"
              max="360"
              value={state.leftPositionY}
              onChange={(e) => updateState("leftPositionY", Number(e.target.value))}
            />
            <span>{state.leftPositionY}°</span>
          </div>
          <div>
            <label>Right Position Y (deg):</label>
            <input
              className="w-full"
              type="range"
              id="rightPositionY"
              min="0"
              max="360"
              value={state.rightPositionY}
              onChange={(e) => updateState("rightPositionY", Number(e.target.value))}
            />
            <span>{state.rightPositionY}°</span>
          </div>
          <div>
            <label>Left Opacity (%):</label>
            <input
              className="w-full"
              type="range"
              id="leftOpacity"
              min="0"
              max="100"
              value={state.leftOpacity}
              onChange={(e) => updateState("leftOpacity", Number(e.target.value))}
            />
            <span>{state.leftOpacity}%</span>
          </div>
          <div>
            <label>Right Opacity (%):</label>
            <input
              className="w-full"
              type="range"
              id="rightOpacity"
              min="0"
              max="100"
              value={state.rightOpacity}
              onChange={(e) => updateState("rightOpacity", Number(e.target.value))}
            />
            <span>{state.rightOpacity}%</span>
          </div>
          <div>
            <label>Gradient Type:</label>
            <select
              id="gradientType"
              className="w-full bg-gray-700 text-white"
              value={state.gradientType}
              onChange={(e) => updateState("gradientType", e.target.value)}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
              <option value="conic">Conic</option>
            </select>
          </div>
          <div>
            <button onClick={randomizeGradient} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Randomize
            </button>
          </div>
        </div>
      </div>
      <>
        <div className="md:col-span-2">
          <h3>Background Gradient:</h3>
          <div className="bg-gray-700 p-2 rounded">{generateGradient()}</div>
        </div>
        <div className="md:col-span-2">
          <h3>CSS Code:</h3>
          <pre id="cssCode" className="bg-gray-700 p-2 rounded overflow-x-auto">
            {`background: ${generateGradient()};`}
          </pre>
          <button
            onClick={() => copyToClipboard(`background: ${generateGradient()};`)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Copy CSS
          </button>
        </div>
        <div>
          <h3>HTML Code:</h3>
          <pre className="bg-gray-700 p-2 rounded overflow-x-auto">{htmlCode}</pre>
          <button onClick={() => copyToClipboard(htmlCode)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
            Copy HTML
          </button>
        </div>
      </>
    </div>
  );
};

export default GradientGenerator;
