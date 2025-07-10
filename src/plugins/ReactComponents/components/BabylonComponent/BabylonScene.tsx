import { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';

const BabylonScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let engine;
    let resizeObserver;

    if (canvasRef.current) {
      engine = new BABYLON.Engine(canvasRef.current, true);
      const scene = new BABYLON.Scene(engine);
      const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 5), scene);
      camera.attachControl(canvasRef.current, true);
      const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
      const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);

      engine.runRenderLoop(() => {
        scene.render();
      });

      // Реагування на зміни розмірів canvas
      resizeObserver = new ResizeObserver(() => {
        engine.resize();
      });

      resizeObserver.observe(canvasRef.current);
    }

    return () => {
      if (resizeObserver && canvasRef.current) {
        resizeObserver.unobserve(canvasRef.current);
      }
      if (engine) {
        engine.dispose();
      }
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}></canvas>
  );
};

export default BabylonScene;
