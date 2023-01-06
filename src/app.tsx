import useAsset from "ultra/hooks/use-asset.js";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Bounds,
  Center,
  Environment,
  // MeshTransmissionMaterial,
  OrbitControls,
  RandomizedLight,
  useGLTF,
} from "@react-three/drei";

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.2 gelatinous_cube.glb --transform --simplify
Author: glenatron (https://sketchfab.com/glenatron)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/gelatinous-cube-e08385238f4d4b59b012233a9fbdca21
Title: Gelatinous Cube
*/

export function GelatinousCube(props) {
  const config = {
    meshPhysicalMaterial: true,
    samples: { value: 6, min: 1, max: 32, step: 1 },
    resolution: { value: 2048, min: 256, max: 2048, step: 256 },
    transmission: { value: 0.5, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 4.5, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0.3, min: 0, max: 1 },
    anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortionSpeed: { value: 0.5, min: 0.01, max: 1, step: 0.01 },
    distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.65, min: 0, max: 1, step: 0.01 },
    attenuationDistance: { value: 0.5, min: 0, max: 2.5, step: 0.01 },
    attenuationColor: "#ffffff",
    color: "#c9ffa1",
    bg: "#334e3b",
  };
  const { nodes, materials } = useGLTF("/gelatinous_cube.glb");
  console.log({ nodes });
  return (
    <group dispose={null}>
      <mesh geometry={nodes.cube1.geometry} position={[-0.56, 0.38, -0.11]}>
        <meshPhysicalMaterial
          {...config}
        />
      </mesh>
      <mesh
        castShadow
        renderOrder={-100}
        geometry={nodes.cube2.geometry}
        material={materials.cube_mat}
        material-side={THREE.FrontSide}
        position={[-0.56, 0.38, -0.11]}
      />
      <mesh
        geometry={nodes.bubbles.geometry}
        material={materials.cube_bubbles_mat}
        position={[-0.56, 0.38, -0.11]}
      />
      <group position={[-0.56, 0.38, -0.41]}>
        <mesh
          geometry={nodes.arrows.geometry}
          material={materials.weapons_mat}
        />
        <mesh
          geometry={nodes.skeleton_1.geometry}
          material={materials.skele_mat}
        />
        <mesh
          geometry={nodes.skeleton_2.geometry}
          material={materials.weapons_mat}
          material-side={THREE.FrontSide}
        />
      </group>
    </group>
  );
}

export default function App() {
  const [mount, set] = useState(false);
  useEffect(() => {
    set(true);
  }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>basic</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href={useAsset("/favicon.ico")} />
        <link rel="preload" as="style" href={useAsset("/style.css")} />
        <link rel="stylesheet" href={useAsset("/style.css")} />
      </head>
      <body>
        <main>
          {!mount && <span>LOADING</span>}
          {mount && (
            <Canvas shadows camera={{ position: [15, 10, 15], fov: 30 }}>
              <ambientLight />
              <Bounds fit observe margin={1.25}>
                <Center top>
                  <GelatinousCube />
                </Center>
              </Bounds>
              <AccumulativeShadows
                temporal
                frames={100}
                alphaTest={0.9}
                color="#3ead5d"
                colorBlend={1}
                opacity={1}
                scale={12}
              >
                <RandomizedLight
                  radius={8}
                  ambient={0.5}
                  intensity={1}
                  position={[2.5, 5, -2.5]}
                  bias={0.001}
                />
              </AccumulativeShadows>
              <OrbitControls
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2}
                autoRotate
                autoRotateSpeed={0.05}
                makeDefault
              />
              <Environment
                files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
                background
                blur={1}
              />
            </Canvas>
          )}
        </main>
      </body>
    </html>
  );
}