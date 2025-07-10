import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ThreeJsSceneProps {
  mlsid?: string;
  modelUrl?: string;
  textureUrl?: string;
  children?: React.ReactNode;
  sceneProps: string;
}

const ThreeJsScene = ({ mlsid, modelUrl, textureUrl, sceneProps, children }: ThreeJsSceneProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIDRef = useRef<number | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const handleResize = () => {
    const width = canvasRef.current?.clientWidth || 0;
    const height = canvasRef.current?.clientHeight || 0;
    rendererRef.current?.setSize(width, height);
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });
    rendererRef.current = renderer;
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;
    cameraRef.current = camera;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    // Додамо напрямлене світло
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10);
    scene.add(light);

    let object: THREE.Object3D | null = null;

    if (modelUrl) {
      const loader = new GLTFLoader();
      loader.load(modelUrl, (gltf) => {
        object = gltf.scene;
        scene.add(object);
      });
    } else {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const texture = textureUrl ? new THREE.TextureLoader().load(textureUrl) : null;
      const material = new THREE.MeshPhongMaterial({ map: texture });
      object = new THREE.Mesh(geometry, material);
      scene.add(object);
    }

    const animate = () => {
      requestIDRef.current = requestAnimationFrame(animate);
      if (object) {
        object.rotation.x += 0.01;
        object.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };

    animate();
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseWheel = (event: WheelEvent) => {
      if (cameraRef.current) {
        const delta = event.deltaY * 0.01;
        cameraRef.current.position.z += delta;
      }
    };

    sceneRef.current = scene;
    if (mlsid) {
      (window as any)[1].scenes = {};
      (window as any)[1].scenes[mlsid] = sceneRef.current;
    }
    canvas?.addEventListener("wheel", handleMouseWheel);

    return () => {
      cancelAnimationFrame(requestIDRef.current!);
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
      canvas?.removeEventListener("wheel", handleMouseWheel);
    };
  }, [mlsid, modelUrl, textureUrl]);

  useEffect(() => {
    const handleScenesChange = () => {
      if (mlsid && (window as any)[1]?.scenes?.[mlsid]) {
        sceneRef.current = (window as any)[1].scenes[mlsid];//= new THREE.Color('#ffca6f'); 
      }
      console.log("scenesChange event triggered");
    };
    window[1].addEventListener("scenesChange", handleScenesChange);
    return () => {
      window[1].removeEventListener("scenesChange", handleScenesChange);
    };
  }, []);

  return (
    <div>
      <div>
        Mlsid: {mlsid} {sceneProps}
      </div>
      <div>{children}</div>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>
    </div>
  );
};

export default ThreeJsScene;

/* 
  // Змінити колір фону сцени
  window.scenes['Default MLSID'].background = new THREE.Color('#ffca6f');
  // Створюємо подію виклику перерендеру
  const scenesChangeEvent = new Event('scenesChange');
  window.dispatchEvent(scenesChangeEvent); 
*/
