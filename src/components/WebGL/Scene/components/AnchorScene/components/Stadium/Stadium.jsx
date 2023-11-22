import React, { useEffect, useRef, useState } from "react";
import { MeshStandardMaterial } from "three";
import { MeshBasicMaterial, DoubleSide } from "three";
import SpectatorsLargeD from "../Spectators/SpectatorsLargeD";

export default function Stadium({ nodes, material, materials }) {
  const stadeMaterial = new MeshBasicMaterial({
    map: materials["Material.002"].map,
  });
  const mat= new MeshStandardMaterial()

  return (
    <group>
      <mesh
        name="STADE"
        geometry={nodes.STADE.geometry}
        material={stadeMaterial}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        name="TERRAIN_1"
        receiveShadow
        geometry={nodes.TERRAIN_1.geometry}
        material={materials["Material.001"]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />

      <mesh name="Plane" geometry={nodes.Plane.geometry} material={material} />
      <pointLight
            intensity={1}
            position={[0, 0.45, 0]}
            shadow-mapSize={[2048, 2048]}
            castShadow={true}
          />
      <SpectatorsLargeD
        material={material}
        position={[-0.01, 0, 0]}
      ></SpectatorsLargeD>
      <SpectatorsLargeD
        material={material}
        rotation={[0, Math.PI, 0]}
        position={[0.045, 0, 0]}
      ></SpectatorsLargeD>
    </group>
  );
}
