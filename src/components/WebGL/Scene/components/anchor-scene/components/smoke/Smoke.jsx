import * as THREE from "three";
import {
  Cloud,
  Clouds,
  PivotControls,
  Sky as SkyImpl,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { useEffect } from "react";

export default function Smoke({pivot, configProps, configCloud,progressScroll = null ,nameConf ="Top" ,active = false}) {
  const ref = useRef();
  const rotationRef = useRef();
  const positionRef = useRef();
  const cloud0 = useRef();
  const progress = useRef(0);

  const { color, x, y, z, range, ...config } = useControls(nameConf,configCloud);

  useEffect(() => {
    

    window.addEventListener("keydown", (event) => {
      if (event.keyCode === 69 && pivot) {
        // Le code 69 correspond à la touche "E"
        console.log(positionRef.current, rotationRef.current);
        active = true;
      }
    });
  }, []);


  useFrame((state, delta) => {
    if(progress.current < 1 && ref.current && !progressScroll){
        progress.current += delta/5
        ref.current.scale.x = progress.current *.1
        ref.current.scale.y = progress.current *.1
        ref.current.scale.z = progress.current * .1
    }
    if(progressScroll != null && ref.current.scale.x != progressScroll.current){
      ref.current.scale.x = progressScroll.current *.1
      ref.current.scale.y = progressScroll.current *.1
      ref.current.scale.z = progressScroll.current * .1
    }
  })

  return (
    <>
      {pivot ? (
        <PivotControls
          scale={0.1}
          onDrag={(l, dl, w, dw) => {
            const position = new THREE.Vector3();
            const rotation = new THREE.Quaternion();
            w.decompose(position, rotation, new THREE.Vector3());
            rotationRef.current = rotation.toArray();
            positionRef.current = position.toArray();
          }}
        >
          <group ref={ref}  {...configProps} scale={[0,0,0]}>
            <Clouds
              material={THREE.MeshLambertMaterial}
              limit={400}
              range={range}
              
              scale={[0.15, 0.15, 0.15 ]}
            >
              <Cloud
                ref={cloud0}
                {...config}
                bounds={[x, y, z]}
                color={color}
              />
            </Clouds>
          </group>
        </PivotControls>
      ) : (
        <group ref={ref} scale={[0.1,0.1,0.1]} {...configProps}> 
          <Clouds
            material={THREE.MeshLambertMaterial}
            limit={400}
            range={range}
            scale={[0.15, 0.15, 0.15]}
          >
            <Cloud ref={cloud0} {...config} bounds={[x, y, z]} color={color} />
          </Clouds>
        </group>
      )}
    </>
  );
}
