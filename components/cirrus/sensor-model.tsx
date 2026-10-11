"use client";

import { useEffect, useRef } from "react";
import type { Material, Mesh, Object3D, WebGLRenderer } from "three";

const MODEL_PATH = "/media/htpxw-sensor-v25-3/";
const MODEL_NAME = "htpxw_sensor_v25_3";

function disposeObject(object: Object3D) {
  object.traverse((child) => {
    const mesh = child as Mesh;
    mesh.geometry?.dispose();
    const material = mesh.material as Material | Material[] | undefined;
    if (Array.isArray(material)) material.forEach((item) => item.dispose());
    else material?.dispose();
  });
}

type SensorModelProps = {
  /** "auto" spins on its own and faces front while the page scrolls; "manual" turns only when dragged or with arrow keys. */
  mode?: "auto" | "manual";
  className?: string;
};

export function SensorModel({ mode = "auto", className = "h-[300px] w-full sm:h-[380px] lg:h-[440px]" }: SensorModelProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const manual = mode === "manual";

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let stopped = false;
    let frame = 0;
    let renderer: WebGLRenderer | null = null;
    let sensor: Object3D | null = null;
    let observer: ResizeObserver | null = null;
    let onScroll: (() => void) | null = null;
    let scrollTimer = 0;
    let detachControls: (() => void) | null = null;

    void (async () => {
      const THREE = await import("three");
      const { MTLLoader } = await import("three/addons/loaders/MTLLoader.js");
      const { OBJLoader } = await import("three/addons/loaders/OBJLoader.js");
      if (stopped) return;

      const materials = await new MTLLoader().setPath(MODEL_PATH).loadAsync(`${MODEL_NAME}.mtl`);
      if (stopped) return;
      materials.preload();

      sensor = await new OBJLoader()
        .setMaterials(materials)
        .setPath(MODEL_PATH)
        .loadAsync(`${MODEL_NAME}.obj`);
      if (stopped || !sensor) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      if (getComputedStyle(mount).position === "static") mount.style.position = "relative";
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 1000);
      scene.add(new THREE.AmbientLight(0xffffff, 0.85));
      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(2, 3, 4);
      scene.add(key);
      scene.add(new THREE.DirectionalLight(0xd6e4ff, 0.55).translateX(-3).translateZ(-2));

      // The labeled face and opening sit on the model's underside. Turn that face toward the camera.
      sensor.rotation.x = -Math.PI / 2;
      sensor.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(sensor);
      const size = box.getSize(new THREE.Vector3());
      sensor.position.sub(box.getCenter(new THREE.Vector3()));
      const turntable = new THREE.Group();
      turntable.add(sensor);
      const tilt = new THREE.Group();
      tilt.add(turntable);
      scene.add(tilt);
      if (manual) {
        turntable.rotation.y = 0.55;
        tilt.rotation.x = 0.42;
      }

      camera.position.set(0, 0, 1);
      camera.lookAt(0, 0, 0);

      const fitCamera = () => {
        const vFov = (camera.fov * Math.PI) / 180;
        const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
        const distanceForHeight = size.y / 2 / Math.tan(vFov / 2);
        const distanceForWidth = size.x / 2 / Math.tan(hFov / 2);
        camera.position.z = Math.max(distanceForHeight, distanceForWidth) * 1.45;
      };

      const resize = () => {
        const width = mount.clientWidth;
        const height = mount.clientHeight;
        if (!renderer || width === 0 || height === 0) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        fitCamera();
        camera.updateProjectionMatrix();
      };
      resize();
      observer = new ResizeObserver(resize);
      observer.observe(mount);

      let scrolling = false;
      let dragging = false;
      let spin = 0;
      let lastX = 0;
      let lastY = 0;

      if (manual) {
        const canvas = renderer.domElement;
        canvas.style.touchAction = "pan-y";
        canvas.style.cursor = "grab";
        const down = (event: PointerEvent) => {
          dragging = true;
          spin = 0;
          lastX = event.clientX;
          lastY = event.clientY;
          canvas.setPointerCapture(event.pointerId);
          canvas.style.cursor = "grabbing";
        };
        const move = (event: PointerEvent) => {
          if (!dragging) return;
          const dx = event.clientX - lastX;
          const dy = event.clientY - lastY;
          lastX = event.clientX;
          lastY = event.clientY;
          spin = dx * 0.012;
          turntable.rotation.y += spin;
          tilt.rotation.x = Math.max(-0.7, Math.min(0.7, tilt.rotation.x + dy * 0.008));
        };
        const up = (event: PointerEvent) => {
          dragging = false;
          if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
          canvas.style.cursor = "grab";
        };
        const key = (event: KeyboardEvent) => {
          const step = 0.18;
          if (event.key === "ArrowLeft") turntable.rotation.y -= step;
          else if (event.key === "ArrowRight") turntable.rotation.y += step;
          else if (event.key === "ArrowUp") tilt.rotation.x = Math.max(-0.7, tilt.rotation.x - step);
          else if (event.key === "ArrowDown") tilt.rotation.x = Math.min(0.7, tilt.rotation.x + step);
          else return;
          event.preventDefault();
        };
        canvas.addEventListener("pointerdown", down);
        canvas.addEventListener("pointermove", move);
        canvas.addEventListener("pointerup", up);
        canvas.addEventListener("pointercancel", up);
        mount.addEventListener("keydown", key);
        detachControls = () => {
          canvas.removeEventListener("pointerdown", down);
          canvas.removeEventListener("pointermove", move);
          canvas.removeEventListener("pointerup", up);
          canvas.removeEventListener("pointercancel", up);
          mount.removeEventListener("keydown", key);
        };
      } else {
        onScroll = () => {
          scrolling = true;
          window.clearTimeout(scrollTimer);
          scrollTimer = window.setTimeout(() => {
            scrolling = false;
          }, 180);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
      }

      const tick = () => {
        if (manual) {
          if (!dragging && Math.abs(spin) > 0.0001) {
            turntable.rotation.y += spin;
            spin *= reduced ? 0 : 0.94;
          }
        } else if (!reduced) {
          if (scrolling) {
            const delta = Math.atan2(Math.sin(-turntable.rotation.y), Math.cos(-turntable.rotation.y));
            turntable.rotation.y += delta * 0.14;
          } else {
            turntable.rotation.y += 0.004;
          }
        }
        renderer?.render(scene, camera);
        frame = requestAnimationFrame(tick);
      };
      tick();
    })();

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      if (onScroll) window.removeEventListener("scroll", onScroll);
      detachControls?.();
      window.clearTimeout(scrollTimer);
      observer?.disconnect();
      if (sensor) disposeObject(sensor);
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, [manual]);

  return (
    <div
      ref={mountRef}
      className={className}
      role="img"
      tabIndex={manual ? 0 : undefined}
      aria-label={
        manual
          ? "Model of the temperature, humidity and barometric pressure sensor. Drag or use the arrow keys to turn it."
          : "Rotating model of the temperature, humidity and barometric pressure sensor."
      }
    />
  );
}
