import * as THREE from 'three';
import { Cloud, Clouds,Sky as SkyImpl } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { useRef } from "react"

export default function GlobalFog() {
    const ref = useRef()
    const cloud0 = useRef()
    const { color, x, y, z, range, ...config } = {
      seed: 7,
      segments: 11,
      volume:  1.9,
      opacity: .25,
      fade:  0,
      growth:  3,
      speed: 0.41,
      x: 5,
      y:  6,
      z:   5,
      color: "white",
    }
    useFrame((state, delta) => {
      ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 2) / 2
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 2) / 2
      cloud0.current.rotation.y -= delta *.0001
    })
    return (
      <>
        <SkyImpl />
        <group ref={ref}>
          <Clouds material={THREE.MeshLambertMaterial} limit={400} range={range} position={[0,1,0]} scale={[.15,.15,.15]}>
            <Cloud ref={cloud0} {...config} bounds={[x, y, z]} color={color} />
            <Cloud {...config} bounds={[x, y, z]}  seed={2} position={[0, 0, 0]} />
            <Cloud {...config} bounds={[x, y, z]}  seed={3} position={[0, 0, 0]} />
            <Cloud {...config} bounds={[x, y, z]} seed={4} position={[0, 0, 0]} />
            <Cloud {...config} bounds={[x, y, z]}  seed={5} position={[0, 0, 0]} />
            <Cloud concentrate="outside" growth={10}  opacity={1.25} seed={0.3} bounds={200} volume={200} />
          </Clouds>
        </group>
      </>
    )
  }
  