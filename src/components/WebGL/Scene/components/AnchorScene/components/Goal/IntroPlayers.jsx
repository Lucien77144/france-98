/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import PlayerIdle from "./PlayerIdle";
import Smoke from "../Smoke/Smoke";

export default function IntroPlayers() {
  const group = useRef();
  const progressScroll = useRef(0);

  const frP1 = useRef(null);
  const frP2 = useRef(null);
  const frP3 = useRef(null);
  const frP4 = useRef(null);
  const frP5 = useRef(null);
  const frP6 = useRef(null);
  const frP7 = useRef(null);
  const frP8 = useRef(null);
  const frP9 = useRef(null);
  const frP10 = useRef(null);
  const frP11 = useRef(null);

  const brP1 = useRef(null);
  const brP2 = useRef(null);
  const brP3 = useRef(null);
  const brP4 = useRef(null);
  const brP5 = useRef(null);
  const brP6 = useRef(null);
  const brP7 = useRef(null);
  const brP8 = useRef(null);
  const brP9 = useRef(null);
  const brP10 = useRef(null);
  const brP11 = useRef(null);

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

  useEffect(() => {
    console.log("plop");
  }, []);

  const setAnimFr = () => {
    frP1.current["Idle1"].play();
    frP1.current["Idle1"].time = Math.random();
    frP2.current["Idle4"].play();
    frP2.current["Idle4"].time = Math.random();
    frP3.current["Idle3"].play();
    frP3.current["Idle3"].time = Math.random();
    frP4.current["Idle1"].play();
    frP4.current["Idle1"].time = Math.random();
    frP5.current["Idle3"].play();
    frP5.current["Idle3"].time = Math.random();
    frP6.current["Idle2"].play();
    frP6.current["Idle2"].time = Math.random();
    frP7.current["Idle4"].play();
    frP7.current["Idle4"].time = Math.random();
    frP8.current["Idle2"].play();
    frP8.current["Idle2"].time = Math.random();
    frP9.current["Idle3"].play();
    frP9.current["Idle3"].time = Math.random();
    frP10.current["Idle4"].play();
    frP10.current["Idle4"].time = Math.random();
    frP11.current["Idle2"].play();
    frP11.current["Idle2"].time = Math.random();
  };

  const setAnimBr = () => {
    brP1.current["Idle1"].play();
    brP1.current["Idle1"].time = Math.random();
    brP2.current["Idle4"].play();
    brP2.current["Idle4"].time = Math.random();
    brP3.current["Idle3"].play();
    brP3.current["Idle3"].time = Math.random();
    brP4.current["Idle1"].play();
    brP4.current["Idle1"].time = Math.random();
    brP5.current["Idle3"].play();
    brP5.current["Idle3"].time = Math.random();
    brP6.current["Idle2"].play();
    brP6.current["Idle2"].time = Math.random();
    brP7.current["Idle4"].play();
    brP7.current["Idle4"].time = Math.random();
    brP8.current["Idle2"].play();
    brP8.current["Idle2"].time = Math.random();
    brP9.current["Idle3"].play();
    brP9.current["Idle3"].time = Math.random();
    brP10.current["Idle4"].play();
    brP10.current["Idle4"].time = Math.random();
    brP11.current["Idle2"].play();
    brP11.current["Idle2"].time = Math.random();
  };

  useFrame((state, delta) => {
    if (durations == null && frP1.current != null) {
      const tmpDurations = [];
      setAnimFr();
      setAnimBr();
      setDurations([...tmpDurations]);
    }

    if (!data.visible(0., 0.3) && group.current.visible == true) {
      group.current.visible = false;
    } else if (data.visible(0., 0.3)) {
      if (group.current.visible == false) {
        group.current.visible = true;
      }

      if (data.visible(0.125, 1) && progressScroll.current < 1) {
        progressScroll.current = data.visible(0.125, 1);
      }
    }
  });

  return (
    <>
      <group ref={group} visible={true}>
        <group
          name="franceSide"
          position={[0.03, 0, 0.01 - 0.125]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <PlayerIdle
            // pivot
            action={frP1}
            material={material}
            config={{
              position: [
                -0.000028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                0.0005073648154922324, -0.00003181584704349668,
                -6.494582287909178e-8, 0.9999998707843374,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={frP2}
            material={material}
            config={{
              position: [
                -0.015028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={frP3}
            material={material}
            config={{
              position: [
                -0.030028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={frP4}
            material={material}
            config={{
              position: [
                -0.045028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={frP5}
            material={material}
            config={{
              position: [
                -0.060028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={frP6}
            material={material}
            config={{
              position: [
                -0.075028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={frP7}
            material={material}
            config={{
              position: [
                0.015028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={frP8}
            material={material}
            config={{
              position: [
                0.030028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={frP9}
            material={material}
            config={{
              position: [
                0.045028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={frP10}
            material={material}
            config={{
              position: [
                0.060028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={frP11}
            material={material}
            config={{
              position: [
                0.075028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
        </group>
        <group
          name="brasilSide"
          position={[0.03, 0, -0.02 + 0.125]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <PlayerIdle
            // pivot
            action={brP1}
            material={material}
            config={{
              position: [
                -0.000028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                0.0005073648154922324, -0.00003181584704349668,
                -6.494582287909178e-8, 0.9999998707843374,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={brP2}
            material={material}
            config={{
              position: [
                -0.015028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={brP3}
            material={material}
            config={{
              position: [
                -0.030028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={brP4}
            material={material}
            config={{
              position: [
                -0.045028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={brP5}
            material={material}
            config={{
              position: [
                -0.060028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={brP6}
            material={material}
            config={{
              position: [
                -0.075028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={brP7}
            material={material}
            config={{
              position: [
                0.015028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={brP8}
            material={material}
            config={{
              position: [
                0.030028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={brP9}
            material={material}
            config={{
              position: [
                0.045028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={brP10}
            material={material}
            config={{
              position: [
                0.060028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
          <PlayerIdle
            action={brP11}
            material={material}
            config={{
              position: [
                0.075028136695829582436, 0.022561840667766987,
                -0.05177512292585167,
              ],
              quaternion: [
                -0.00036806944306820897, 0.0002454369216942743,
                -3.373449085971185e-8, 0.9999999021427959,
              ],
            }}
          ></PlayerIdle>
        </group>
        <Smoke
          progressScroll={progressScroll}
          nameConf={"smFr1"}
          configCloud={{
            seed: { value: 100, min: 1, max: 100, step: 1 },
            segments: { value: 36, min: 1, max: 80, step: 1 },
            volume: { value: 10.2, min: 0, max: 100, step: 0.1 },
            opacity: { value: 0.3, min: 0, max: 1, step: 0.01 },
            fade: { value: 0, min: 0, max: 400, step: 1 },
            growth: { value: 0, min: 0, max: 20, step: 1 },
            speed: { value: 0.49, min: 0, max: 1, step: 0.01 },
            x: { value: 3, min: 0, max: 100, step: 1 },
            y: { value: 6, min: 0, max: 100, step: 1 },
            z: { value: 0, min: 0, max: 100, step: 1 },
            color: "#375280",
          }}
          configProps={{
            position: [
              0.1726207484988215, 0.030986495614354737, 0.0377938894469866,
            ],
          }}
        />
        <Smoke
          progressScroll={progressScroll}
          nameConf={"smFr2"}
          configCloud={{
            seed: { value: 24, min: 1, max: 100, step: 1 },
            segments: { value: 37, min: 1, max: 80, step: 1 },
            volume: { value: 9, min: 0, max: 100, step: 0.1 },
            opacity: { value: 0.45, min: 0, max: 1, step: 0.01 },
            fade: { value: 0, min: 0, max: 400, step: 1 },
            growth: { value: 1, min: 0, max: 20, step: 1 },
            speed: { value: 0.79, min: 0, max: 1, step: 0.01 },
            x: { value: 4, min: 0, max: 100, step: 1 },
            y: { value: 12, min: 0, max: 100, step: 1 },
            z: { value: 2, min: 0, max: 100, step: 1 },
            color: "#FFFFFF",
          }}
          configProps={{
            position: [
              0.23859957562541692, 0.011930685850475029, 0.11873708746183159,
            ],
          }}
        />
        <Smoke
          progressScroll={progressScroll}
          nameConf={"smFr3"}
          configCloud={{
            seed: { value: 21, min: 1, max: 100, step: 1 },
            segments: { value: 46, min: 1, max: 80, step: 1 },
            volume: { value: 10, min: 0, max: 100, step: 0.1 },
            opacity: { value: 0.48, min: 0, max: 1, step: 0.01 },
            fade: { value: 0, min: 0, max: 400, step: 1 },
            growth: { value: 1, min: 0, max: 20, step: 1 },
            speed: { value: 0.79, min: 0, max: 1, step: 0.01 },
            x: { value: 4, min: 0, max: 100, step: 1 },
            y: { value: 12, min: 0, max: 100, step: 1 },
            z: { value: 2, min: 0, max: 100, step: 1 },
            color: "#904141",
          }}
          configProps={{
            position: [
              0.19204239421740268, 0.021609510057845966, 0.19516998646026648,
            ],
          }}
        />
        <Smoke
          nameConf={"smBr1"}
          configCloud={{
            seed: { value: 28, min: 1, max: 100, step: 1 },
            segments: { value: 37, min: 1, max: 80, step: 1 },
            volume: { value: 16.3, min: 0, max: 100, step: 0.1 },
            opacity: { value: 0.25, min: 0, max: 1, step: 0.01 },
            fade: { value: 0, min: 0, max: 400, step: 1 },
            growth: { value: 0, min: 0, max: 20, step: 1 },
            speed: { value: 0.49, min: 0, max: 1, step: 0.01 },
            x: { value: 6, min: 0, max: 100, step: 1 },
            y: { value: 9, min: 0, max: 100, step: 1 },
            z: { value: 3, min: 0, max: 100, step: 1 },
            color: "#3b7253",
          }}
          configProps={{
            position: [
              0.20771216203317874, 0.019876896321130124, -0.20532418320782572,
            ],
          }}
          progressScroll={progressScroll}
        />
        <Smoke
          progressScroll={progressScroll}
          nameConf={"smBr2"}
          configCloud={{
            seed: { value: 1, min: 1, max: 100, step: 1 },
            segments: { value: 41, min: 1, max: 80, step: 1 },
            volume: { value: 18.2, min: 0, max: 100, step: 0.1 },
            opacity: { value: 0.3, min: 0, max: 1, step: 0.01 },
            fade: { value: 0, min: 0, max: 400, step: 1 },
            growth: { value: 4, min: 0, max: 20, step: 1 },
            speed: { value: 0.49, min: 0, max: 1, step: 0.01 },
            x: { value: 4, min: 0, max: 100, step: 1 },
            y: { value: 3, min: 0, max: 100, step: 1 },
            z: { value: 8, min: 0, max: 100, step: 1 },
            color: "#a7903c",
          }}
          configProps={{
            position: [
              0.23982114885479866, 0.02485383364462607, -0.08394492831232198,
            ],
          }}
        />
      </group>
    </>
  );
}

useGLTF.preload("/src/assets/models/foot.glb");
