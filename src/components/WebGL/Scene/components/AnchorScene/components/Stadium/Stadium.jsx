import React, { useEffect, useRef } from "react";
import { MeshStandardMaterial } from "three";
import { MeshBasicMaterial, DoubleSide } from "three";
import SpotLight from "../Goal/SpotLight";

export default function Stadium({ nodes, material }) {
  const materialPlane = new MeshStandardMaterial({
    color: "#57A883",
    side: DoubleSide,
  });
  
  return (
    <group>
      <group name="STADE1" position={[0, 0, -0.043]}>
        <mesh
          name="Boole"
          geometry={nodes.Boole.geometry}
          material={material}
          position={[0, 0, 0.043]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
          // castShadow
          // receiveShadow
        />
        <mesh
          name="Plane001"
          // castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={materialPlane}
          position={[0.018, -0.123, 0.062]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={0.01}
        />
        <SpotLight
               config={{
                position: [
                  -7.481953795620818e-8, 0.5706194238256737, 0.0016212674764971746,
                ],
                quaternion: [
                  -0.000005217017130269479, 0.9535771127912418,
                  0.000017700021410971273, -0.30114894922647706,
                ],
              }}

          pivot
        ></SpotLight>
      </group>
      <mesh name="Plane" geometry={nodes.Plane.geometry} material={material} />
    </group>
  );
}
