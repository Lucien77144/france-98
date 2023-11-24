// AlambicScene.js
import React, { useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  PerspectiveCamera,
  ScrollControls,
  useAnimations,
  useGLTF,
  Environment,
  Stars,
  Stats,
} from '@react-three/drei';

import { editable as e } from '@theatre/r3f';
import { useThree, useLoader } from '@react-three/fiber';
import { TemplateContext } from '../../../../../providers/TemplateProvider';
import { SoundContext } from '../../../../../providers/SoundProvider';
import SceneManager from '../../SceneManager';
import GlobalFog from './components/GlobalFog/GlobalFog';
import RailCameraController from '../shared/RailCamera/RailCameraController';
import InteractivePoint, {
  POINT_TYPE,
} from '../shared/InteractivePoint/InteractivePoint';

import Stadium from './components/Stadium/Stadium';
import Goal1 from './components/Goal/Goal1';
import Goal2 from './components/Goal/Goal2';
import Goal3 from './components/Goal/Goal3';

import tracklist from './data/tracklist.json';
import AmbiantAudioManager from '../shared/AmbiantAudioManager/AmbiantAudioManager';
import IntroPlayers from './components/Goal/IntroPlayers';
import PositionalAudioManager from '../shared/PositionalAudioManager/PositionalAudioManager';
import { InterfaceContext } from '../../../../../providers/InterfaceProvider';

function TestAnchor(props) {
  const { camera, scene } = useThree();
  const group = useRef();
  const light = useRef();
  const anchors = useRef([]);
  const { nodes, materials, animations } = useGLTF(
    '/src/assets/models/stade6.glb'
  );

  const { actions } = useAnimations(animations, group);

  const { canScroll } = useContext(TemplateContext);
  const { startExperience } = useContext(InterfaceContext);
  const { audioListener } = useContext(SoundContext);

  useEffect(() => {
    if (!startExperience) return;
    camera.add(audioListener.current);

    if (light.current) {
      light.current.add(new THREE.RectAreaLightHelper(light.current));
    }
    return () => {
      camera.remove(audioListener.current);
    };
  }, [startExperience]);

  const matcap = useLoader(
    THREE.TextureLoader,
    '/src/assets/img/spectator.png'
  );
  const material = new THREE.MeshMatcapMaterial({
    matcap,
  });

  function fctEmpty(ref) {
    return (
      <mesh
        ref={ref}
        name="EMPTY"
        geometry={nodes.EMPTY.geometry}
        material={nodes.EMPTY.material}
        position={[-0.623, 1.2, -0.004]}
        rotation={[0, 0, 1.359]}
        visible={false}
      />
    );
  }

  function renderInteractObjects() {
    return (
      <>
        {/* <e.mesh
          visible
          theatreKey={"interactObj"}
          position={[1, 2, 3]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="hotpink" transparent />
        </e.mesh> */}

        {/* <group name="SPECTATEURS1">
          <InteractivePoint position={[0, 0.05, 0]} size={1} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.SPECTATEURS1.geometry}
            material={nodes.SPECTATEURS1.material}
            position={[0, 0.016, 0]}
          />
        </group> */}
      </>
    );
  }

  return (
    <>
      <ScrollControls
        pages={canScroll.current ? 5 : 0}
        enabled={canScroll}
        damping={0.5}
        distance={5}
      >
        {/*<e.pointLight theatreKey="Light" position={[10, 10, 10]} intensity={10}/>*/}
        {/* <Stats showPanel={0} className="stats" {...props} /> */}
        <group ref={group} {...props} dispose={null}>
          <group name="Scene">
            <SceneManager
              fctEmpty={fctEmpty}
              interactObjects={renderInteractObjects()}
              actions={actions}
            >
              <Environment
                files={'/src/assets/img/env4.hdr'}
                blur={0.15}
                background
              ></Environment>
              {/* <ambientLight intensity={Math.PI / 1.5} /> */}

              {/* dialog tracklist */}
              {tracklist.tracks.map(
                ({ size, position, context, range }, index) => (
                  <InteractivePoint
                    key={index}
                    size={size}
                    position={position}
                    audio={{
                      scene: tracklist.scene,
                      context,
                    }}
                    range={range}
                  />
                )
              )}

              {/* <AmbiantAudioManager /> */}
              {startExperience && <PositionalAudioManager />}

              <PerspectiveCamera makeDefault far={5} near={0.001} />
              <RailCameraController />
              <Stadium
                nodes={nodes}
                materials={materials}
                material={material}
                actions={actions}
              />

              <IntroPlayers />
              <Goal1 nodes={nodes} actionBall={actions} />
              <Goal2 nodes={nodes} actionBall={actions} />
              <Goal3 nodes={nodes} actionBall={actions} />

              <GlobalFog />
            </SceneManager>
          </group>
        </group>
      </ScrollControls>
    </>
  );
}
export default TestAnchor;
