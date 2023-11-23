/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import Player from "./Player";
import SpotLight from "./SpotLightMove";
import SpotLightMove from "./SpotLightMove";

export default function Goal({ actionBall, nodes }) {
  const group = useRef();
  const intensity = useRef(0);
  const shooterAction = useRef(null);
  const goalAction = useRef(null);
  const passAction = useRef(null);
  const [durations, setDurations] = useState();

  const data = useScroll();

  const matcap = useLoader(
    THREE.TextureLoader,
    "/src/assets/img/spectator.png"
  );
  const material = new THREE.MeshMatcapMaterial({
    matcap,
    side: THREE.DoubleSide,
  });

  useEffect(() => {}, []);

  useFrame(() => {
    if (
      durations == null &&
      shooterAction.current &&
      goalAction.current &&
      passAction.current
    ) {
      const tmpDurations = [];
      actionBall["Ball1"].play().paused = true;
      shooterAction.current["HeadMid"].play().paused = true;
      goalAction.current["Jump"].play().paused = true;
      passAction.current["PassEnd"].play().paused = true;
      tmpDurations.push(actionBall["Ball1"].getClip().duration);
      tmpDurations.push(shooterAction.current["HeadMid"].getClip().duration);
      tmpDurations.push(goalAction.current["Jump"].getClip().duration);
      tmpDurations.push(passAction.current["PassEnd"].getClip().duration);
      setDurations([...tmpDurations]);
    }


    if (!data.visible(0.225, 0.2) && group.current.visible == true) {
      group.current.visible = false;
    } else if (data.visible(0.225, 0.2)) {
      if (group.current.visible == false) {
        group.current.visible = true;
      }

      if (durations !== null && durations.length > 0) {
        actionBall["Ball1"].time = data.range(0.2825, 0.0325) * durations[0];
        shooterAction.current["HeadMid"].time =
          data.range(0.275, 0.035) * durations[1];
        goalAction.current["Jump"].time =
          data.range(0.285, 0.05) * durations[2];
        passAction.current["PassEnd"].time =
          data.range(0.236, 0.1) * durations[3];
      }
    }
  });

  return (
    <>
      {/* <SpotLightMove
        target={[
          0.10654682727715425, 0.020324277612842556, -0.5635984710842615,
        ]}
        intensity={intensity}
      ></SpotLightMove> */}
      <group ref={group} visible={true}>
        <Player
          action={shooterAction}
          material={material}
          config={{
            position: [
              0.10654682727715425, 0.020324277612842556, -0.5635984710842615,
            ],
            quaternion: [
              -0.000005217017130269479, 0.9535771127912418,
              0.000017700021410971273, -0.30114894922647706,
            ],
          }}
        ></Player>

        <Player
          action={goalAction}
          material={material}
          config={{
            position: [
              0.022493094674920187, 0.020323184588191184, -0.6373971595983139,
            ],
            quaternion: [
              -0.00035583020913424265, 0.28374071907076287,
              -0.00010442294572414904, 0.9589009682036604,
            ],
          }}
          // pivot
        ></Player>
        <Player
          action={passAction}
          material={material}
          config={{
            position: [
              0.4338436083677207, 0.0201486684264636, -0.6307142798489236,
            ],
            quaternion: [
              -0.0005127108139945434, -0.6014481879667491,
              0.00038645732689096725, 0.798911550154252,
            ],
          }}
        ></Player>

        <group name="but_1">
          <mesh
            castShadow
            name="Ball1"
            geometry={nodes.Ball1.geometry}
            material={material}
            position={[0.018, 0.065, -0.426]}
            rotation={[-0.116, -0.206, -0.024]}
            scale={0.003}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/src/assets/models/foot.glb");
