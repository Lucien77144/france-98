// AlambicScene.js
import React, { useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  PerspectiveCamera,
  ScrollControls,
  useAnimations,
  useGLTF,
} from '@react-three/drei';
import { editable as e } from '@theatre/r3f';
import { useThree, useLoader } from '@react-three/fiber';
import { TemplateContext } from '../../../../providers/TemplateProvider';
import { SoundContext } from '../../../../providers/SoundProvider';
import SceneManager from '../../SceneManager';
import AnchorController from '../shared/RailCamera/AnchorController';

function AnchorScene(props) {
  const { camera } = useThree();
  const group = useRef();
  const anchors = useRef([]);
  const { nodes, materials, animations } = useGLTF(
    '/src/assets/models/spline.glb'
  );
  const { nodes: n2, materials: m2 } = useGLTF(
    '/src/assets/models/supporter.glb'
  );
  const { actions } = useAnimations(animations, group);

  const { canScroll } = useContext(TemplateContext);
  const { audioListener, audioScene } = useContext(SoundContext);

  useEffect(() => {
    camera.add(audioListener.current);
    return () => {
      camera.remove(audioListener.current);
    };
  }, [audioScene]);
  const matcapTexture = useLoader(
    THREE.TextureLoader,
    '/src/assets/img/spectator.png'
  );
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  // const material = new THREE.MeshNormalMaterial()

  function fctEmpty(ref) {
    return (
      <mesh
        ref={ref}
        name="Cube"
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        position={[-46.263, 0, -0.998]}
        rotation={[Math.PI, -1.24, Math.PI]}
        visible={false}
      />
    );
  }

  function renderInteractObjects() {
    return (
      <>
        <e.mesh
          visible
          theatreKey={'interactObj'}
          position={[1, 2, 3]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="hotpink" transparent />
        </e.mesh>
      </>
    );
  }

  return (
    <>
      <ScrollControls
        pages={canScroll.current ? 5 : 0}
        enabled={canScroll}
        damping={0.33}
        distance={2}
      >
        {/*<e.pointLight theatreKey="Light" position={[10, 10, 10]} intensity={10}/>*/}
        <group ref={group} {...props} dispose={null}>
          <group name="Scene">
            <SceneManager
              fctEmpty={fctEmpty}
              interactObjects={renderInteractObjects()}
              actions={actions}
              focusMechanic={'default'}
            >
              <PerspectiveCamera makeDefault far={1000} />
              <AnchorController anchorsRef={anchors}></AnchorController>
              <group name="NurbsPath" />
              <group name={'anchors'} ref={anchors}>
                <mesh
                  name="anchors-0"
                  geometry={nodes['anchors-0'].geometry}
                  material={materials.Material}
                  position={[-46.263, 0, -0.998]}
                  rotation={[Math.PI, -1.24, Math.PI]}
                  scale={[0.1, 0.1, 0.1]}
                  visible={false}
                />
                <mesh
                  name="anchors-1"
                  geometry={nodes['anchors-1'].geometry}
                  material={materials['Material.001']}
                  position={[-31.488, 0, 0.771]}
                  rotation={[0, -1.535, 0]}
                  scale={[0.1, 0.1, 0.1]}
                />
                <mesh
                  name="anchors-2"
                  geometry={nodes['anchors-2'].geometry}
                  material={materials['Material.002']}
                  position={[-16.579, 0, 0.136]}
                  rotation={[Math.PI, -1.553, Math.PI]}
                  scale={[0.1, 0.1, 0.1]}
                ></mesh>
                <mesh
                  name="anchors-3"
                  geometry={nodes['anchors-3'].geometry}
                  material={materials['Material.003']}
                  position={[-3.845, 0, 0.21]}
                  rotation={[0, -1.492, 0]}
                  scale={[0.1, 0.1, 0.1]}
                />
                <mesh
                  name="anchors-4"
                  geometry={nodes['anchors-4'].geometry}
                  material={materials['Material.004']}
                  position={[2, 0, 0]}
                  rotation={[0, -1.571, 0]}
                  scale={[0.1, 0.1, 0.1]}
                />
              </group>
              <group
                scale={1.333}
                position={[-35, 0, 0]}
                rotation={[0, -Math.PI / 4, 0]}
              >
                <skinnedMesh
                  geometry={n2.Cube.geometry}
                  material={material}
                  skeleton={n2.Cube.skeleton}
                />
                <primitive object={n2.spine} />
                <primitive object={n2.neutral_bone} />
              </group>
            </SceneManager>
          </group>
        </group>
      </ScrollControls>
    </>
  );
}
export default AnchorScene;
