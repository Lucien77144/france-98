// AlambicScene.js
import React, { useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  PerspectiveCamera,
  ScrollControls,
  useAnimations,
  useGLTF,
  Environment,
} from '@react-three/drei';
import { editable as e } from '@theatre/r3f';
import { useThree, useLoader } from '@react-three/fiber';
import { TemplateContext } from '../../../../providers/TemplateProvider';
import { SoundContext } from '../../../../providers/SoundProvider';
import SceneManager from '../../SceneManager';
import GlobalFog from './components/GlobalFog/GlobalFog';
import RailCameraController from '../shared/RailCamera/RailCameraController';
import InteractivePoint, {
  POINT_TYPE,
} from '../shared/InteractivePoint/InteractivePoint';

function TestAnchor(props) {
  const { camera, scene } = useThree();
  const group = useRef();
  const light = useRef();
  const anchors = useRef([]);
  const { nodes, materials, animations } = useGLTF(
    '/src/assets/models/Stade.glb'
  );
  const { nodes: n2, materials: m2 } = useGLTF(
    '/src/assets/models/supporter.glb'
  );
  const { actions } = useAnimations(animations, group);

  const { canScroll } = useContext(TemplateContext);
  const { audioListener, audioScene } = useContext(SoundContext);

  useEffect(() => {
    camera.add(audioListener.current);

    if (light.current) {
      light.current.add(new THREE.RectAreaLightHelper(light.current));
    }
    return () => {
      camera.remove(audioListener.current);
    };
  }, [audioScene]);

  const matcap = useLoader(
    THREE.TextureLoader,
    '/src/assets/img/spectator.png'
  );
  const material = new THREE.MeshMatcapMaterial({
    matcap,
    side: THREE.DoubleSide,
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
      />
    );
  }

  function renderInteractObjects() {
    return (
      <>
        {/* <e.mesh
          visible
          theatreKey={'interactObj'}
          position={[1, 2, 3]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="hotpink" transparent />
        </e.mesh> */}
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
        <group ref={group} {...props} dispose={null}>
          <group name="Scene">
            <SceneManager
              fctEmpty={fctEmpty}
              interactObjects={renderInteractObjects()}
              actions={actions}
            >
              <Environment
                files={'/src/assets/img/env2.hdr'}
                blur={0.15}
              ></Environment>
              {/* <rectAreaLight width={.25} height={.5} intensity={20} rotation={[-Math.PI/2,0,0]} position={[0,0.5,0]} power={.5}> */}
              {/* </rectAreaLight> */}
              <ambientLight intensity={Math.PI / 1.5} />
              <PerspectiveCamera makeDefault far={1000} />

              <RailCameraController
              // anchorsRef={anchors}
              // lookAtPos={[0, 0, 0]}
              ></RailCameraController>

              <mesh
                name="Cage1"
                geometry={nodes.Cage1.geometry}
                material={material}
                position={[0, 0.048, 0.607]}
              />
              <mesh
                name="Cage2"
                geometry={nodes.Cage2.geometry}
                material={material}
                position={[0, 0.049, -0.691]}
              />
              <group name="STADE1">
                <group name="STADE1-_1">
                  <mesh
                    name="STADE1-_1001"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001'].geometry}
                    material={materials['_1.002']}
                  />
                  <mesh
                    name="STADE1-_1001_1"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_1'].geometry}
                    material={materials['_2_1.002']}
                  />
                  <mesh
                    name="STADE1-_1001_2"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_2'].geometry}
                    material={materials['_11_2.002']}
                  />
                  <mesh
                    name="STADE1-_1001_3"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_3'].geometry}
                    material={materials['_12_1.002']}
                  />
                  <mesh
                    name="STADE1-_1001_4"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_4'].geometry}
                    material={materials['_11_1.002']}
                  />
                  <mesh
                    name="STADE1-_1001_5"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_5'].geometry}
                    material={materials['_11.002']}
                  />
                  <mesh
                    name="STADE1-_1001_6"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_6'].geometry}
                    material={materials['_12.002']}
                  />
                  <mesh
                    name="STADE1-_1001_7"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_7'].geometry}
                    material={materials['_10.002']}
                  />
                  <mesh
                    name="STADE1-_1001_8"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_8'].geometry}
                    material={materials['_14.002']}
                  />
                  <mesh
                    name="STADE1-_1001_9"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_9'].geometry}
                    material={materials['_3.002']}
                  />
                  <mesh
                    name="STADE1-_1001_10"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_10'].geometry}
                    material={materials['Asphalt_New.002']}
                  />
                  <mesh
                    name="STADE1-_1001_11"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_11'].geometry}
                    material={materials['_7.002']}
                  />
                  <mesh
                    name="STADE1-_1001_12"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_12'].geometry}
                    material={materials['_Charcoal_.002']}
                  />
                  <mesh
                    name="STADE1-_1001_13"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_13'].geometry}
                    material={materials['_6.002']}
                  />
                  <mesh
                    name="STADE1-_1001_14"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_14'].geometry}
                    material={materials['__0137_Black__1.002']}
                  />
                  <mesh
                    name="STADE1-_1001_15"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_15'].geometry}
                    material={materials['Metal_Aluminum_Anodized.002']}
                  />
                  <mesh
                    name="STADE1-_1001_16"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_16'].geometry}
                    material={materials['_2.002']}
                  />
                  <mesh
                    name="STADE1-_1001_17"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_17'].geometry}
                    material={materials['_8.002']}
                  />
                  <mesh
                    name="STADE1-_1001_18"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_18'].geometry}
                    material={materials['_16.002']}
                  />
                  <mesh
                    name="STADE1-_1001_19"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_19'].geometry}
                    material={materials['Material85.002']}
                  />
                  <mesh
                    name="STADE1-_1001_20"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_20'].geometry}
                    material={materials['_17.002']}
                  />
                  <mesh
                    name="STADE1-_1001_21"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_21'].geometry}
                    material={materials['_0137_Black_.002']}
                  />
                  <mesh
                    name="STADE1-_1001_22"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_22'].geometry}
                    material={materials['FrontColor.004']}
                  />
                  <mesh
                    name="STADE1-_1001_23"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_23'].geometry}
                    material={materials['Color_005.002']}
                  />
                  <mesh
                    name="STADE1-_1001_24"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_24'].geometry}
                    material={materials['jean_blue.002']}
                  />
                  <mesh
                    name="STADE1-_1001_25"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_25'].geometry}
                    material={materials['Color_006.002']}
                  />
                  <mesh
                    name="STADE1-_1001_26"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_26'].geometry}
                    material={materials['Color_002.002']}
                  />
                  <mesh
                    name="STADE1-_1001_27"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_27'].geometry}
                    material={materials['_0128_White_.002']}
                  />
                  <mesh
                    name="STADE1-_1001_28"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_28'].geometry}
                    material={materials['FrontColor.005']}
                  />
                </group>
              </group>
              <mesh
                name="Plane"
                geometry={nodes.Plane.geometry}
                material={material}
              />
              <GlobalFog />

              <group name="SPECTATEURS1">
                <InteractivePoint
                  mode={POINT_TYPE.SOUND}
                  position={[0, 0.05, 0]}
                  size={1}
                  audio={{
                    scene: 'stadiumScene',
                    context: 'track_02',
                  }}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.SPECTATEURS1.geometry}
                  material={nodes.SPECTATEURS1.material}
                  position={[0, 0.016, 0]}
                />
              </group>

              <group name="TEMP_IPOINTS">
                {/* <InteractivePoint
                  mode={POINT_TYPE.SOUND}
                  position={[0, 1.05, 0]}
                  size={1}
                  audio={{
                    scene: 'stadiumScene',
                    context: 'track_02',
                  }}
                /> */}
                <InteractivePoint
                  mode={POINT_TYPE.SOUND}
                  position={[0, 1.05, 0]}
                  size={1}
                  audio={{
                    scene: 'stadiumScene',
                    context: 'track_03',
                  }}
                />
              </group>
            </SceneManager>
          </group>
        </group>
      </ScrollControls>
    </>
  );
}
export default TestAnchor;
