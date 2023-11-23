import React, { useRef } from 'react';
import { MeshStandardMaterial } from 'three';
import { MeshBasicMaterial, DoubleSide } from 'three';
import SpectatorsLargeD from '../Spectators/SpectatorsLargeD';
import Smoke from '../Smoke/Smoke';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

export default function Stadium({ nodes, material, materials }) {
  const progressSmoke1 = useRef(1);
  const progressSmoke2 = useRef(1);
  const progressSmoke3 = useRef(0);


  const data = useScroll();

  const stadeMaterial = new MeshBasicMaterial({
    map: materials['Material.002'].map,
  });

  useFrame((state,delta) => {

    if(data.visible(0.2,1) && progressSmoke3.current < 1){
      progressSmoke3.current += delta/2
    }
    // if(data.visible(0.375,1) && progressSmoke1.current < 1){
    //   progressSmoke1.current += delta/2  
    // }
    // if(data.visible(0.407,1) && progressSmoke2.current < 1){
    //   progressSmoke2.current += delta/2  
    // }
  });

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
        material={materials['Material.001']}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />

      <mesh name="Plane" geometry={nodes.Plane.geometry} material={material} />
      <pointLight
        intensity={1}
        position={[0, .65, 0]}
        shadow-mapSize={[4096, 4096]}
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
      <Smoke
        // pivot
        nameConf={'sm1'}
        configCloud={{
          seed: 61,
          segments: { value: 17, min: 1, max: 80, step: 1 },
          volume: 4,
          opacity: 1,
          fade: 3,
          growth: 14.0,
          speed: 0.35,
          x: 5,
          y: 2.5,
          z: 5,
          color: '#13582d',
        }}
        configProps={{
          position: [
            0.7527804262450353, 0.07365932536007919, 0.2907510533188442,
          ],
        }}
        progressScroll={progressSmoke3}
      ></Smoke>
      <Smoke
        nameConf={'sm2'}
        configCloud={{
          seed: { value: 15, min: 1, max: 100, step: 1 },
          segments: { value: 16, min: 1, max: 80, step: 1 },
          volume: { value: 19, min: 0, max: 100, step: 0.1 },
          opacity: { value: 0.29, min: 0, max: 1, step: 0.01 },
          fade: { value: 0, min: 0, max: 400, step: 1 },
          growth: { value: 6, min: 0, max: 20, step: 1 },
          speed: { value: 0.53, min: 0, max: 1, step: 0.01 },
          x: { value: 4, min: 0, max: 100, step: 1 },
          y: { value: 3, min: 0, max: 100, step: 1 },
          z: { value: 10, min: 0, max: 100, step: 1 },
          color: '#656921',
        }}
        configProps={{
          position: [
            0.7122205924592314, 0.07650980419265092, -0.28362644009290716,
          ],
        }}
        progressScroll={progressSmoke3}

      ></Smoke>
      <Smoke
        nameConf={'sm3'}
        configCloud={{
          seed: { value: 24, min: 1, max: 100, step: 1 },
          segments: { value: 19, min: 1, max: 80, step: 1 },
          volume: { value: 23.5, min: 0, max: 100, step: 0.1 },
          opacity: { value: 0.21, min: 0, max: 1, step: 0.01 },
          fade: { value: 0, min: 0, max: 400, step: 1 },
          growth: { value: 4, min: 0, max: 20, step: 1 },
          speed: { value: 0.67, min: 0, max: 1, step: 0.01 },
          x: { value: 11, min: 0, max: 100, step: 1 },
          y: { value: 6, min: 0, max: 100, step: 1 },
          z: { value: 8, min: 0, max: 100, step: 1 },
          color: '#c40101',
        }}
        configProps={{
          position: [
            -0.7073991215833195, 0.045261130903242304, -0.23546001809101966,
          ],
        }}
        progressScroll={progressSmoke1}
      ></Smoke>
      <Smoke
        nameConf={'sm4'}
        configCloud={{
          seed: { value: 21, min: 1, max: 100, step: 1 },
          segments: { value: 51, min: 1, max: 80, step: 1 },
          volume: { value: 8.6, min: 0, max: 100, step: 0.1 },
          opacity: { value: 0.43, min: 0, max: 1, step: 0.01 },
          fade: { value: 0, min: 0, max: 400, step: 1 },
          growth: { value: 1, min: 0, max: 20, step: 1 },
          speed: { value: 0.67, min: 0, max: 1, step: 0.01 },
          x: { value: 3, min: 0, max: 100, step: 1 },
          y: { value: 10, min: 0, max: 100, step: 1 },
          z: { value: 3, min: 0, max: 100, step: 1 },
          color: '#FFFFFF',
        }}
        configProps={{
          position: [-0.75, 0.03592831548856044, 0],
        }}
        progressScroll={progressSmoke2}
      ></Smoke>
      <Smoke
        nameConf={'sm5'}
        configCloud={{
          seed: { value: 24, min: 1, max: 100, step: 1 },
          segments: { value: 19, min: 1, max: 80, step: 1 },
          volume: { value: 23.5, min: 0, max: 100, step: 0.1 },
          opacity: { value: 0.21, min: 0, max: 1, step: 0.01 },
          fade: { value: 0, min: 0, max: 400, step: 1 },
          growth: { value: 4, min: 0, max: 20, step: 1 },
          speed: { value: 0.67, min: 0, max: 1, step: 0.01 },
          x: { value: 11, min: 0, max: 100, step: 1 },
          y: { value: 6, min: 0, max: 100, step: 1 },
          z: { value: 8, min: 0, max: 100, step: 1 },
          color: '#292b79',
        }}
        configProps={{
          position: [-0.65, 0.045261130903242304, 0.175],
        }}
        progressScroll={progressSmoke1}
      ></Smoke>
    </group>
  );
}
