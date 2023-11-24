/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import cloneGltf from "../../../../../Utils/Utils";
import PlayerModel from "./PlayerModel";

export default function PlayerIdle({
  data = null,
  action,
  material,
  config,
  pivot = false,
}) {
  const clone = useRef();
  const model = useGLTF("/src/assets/models/footballIdle.glb");

  useEffect(() => {
    clone.current = cloneGltf(model);
    clone.current.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material;
        child.castShadow = true;
      }
    });
  }, []);

  return (
    <>
      {clone.current && (
        <PlayerModel
          data={data}
          action={action}
          clone={clone}
          material={material}
          config={{ scale: 0.08, ...config }}
          pivot={pivot}
        />
      )}
    </>
  );
}